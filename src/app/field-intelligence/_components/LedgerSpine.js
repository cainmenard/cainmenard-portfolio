'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'
import { useCountUp } from './useCountUp'
import { track } from './track'

/**
 * The ledger token — a fixed-spine marker that carries the hour's running
 * value down the page and proves the "one labor hour, and back around" claim.
 *
 * It replaces the old decorative top ribbon. A single token rides a vertical
 * rail on the right edge; it shows the running dollar value, the timestamp,
 * and a stamp strip (Captured -> Approved -> Overran -> Judged -> Repriced)
 * that fills in as the reader passes each station. Both the token and the rail
 * fill shift color with the hour's state (copper -> amber -> red -> green), so
 * status reads at a glance from anywhere on the page.
 *
 * Motion split: the token's POSITION and the settled flag are written
 * imperatively to CSS variables on each rAF scroll tick, so the React tree
 * never re-renders per frame. Discrete state (which station's value / glyph /
 * verb / tone) updates only when the active station changes.
 *
 * Below the mobile breakpoint the spine geometry is dropped by CSS and the
 * same state renders as a bottom-fixed status bar.
 *
 * @param {{id:string,stamp:string,value:string,unit:string,status:string,verb:string,tone:string,glyph:string,time:string,countFrom?:number,countTo?:number,worstFade?:number,bestGain?:number}[]} ledger
 * @param {object} seed        pre-capture state shown before the first station
 * @param {number} activeIndex index of the active station, or -1
 * @param {boolean} looped     true once the loop has closed (finale onward)
 * @param {string} backHref
 * @param {string} backLabel
 */
export default function LedgerSpine({ ledger, seed, activeIndex, looped, backHref, backLabel }) {
  const n = ledger.length
  const reduced = useReducedMotion()

  const rootRef = useRef(null)
  const measureRef = useRef(null)
  const scrubbingRef = useRef(null)
  const loopedRef = useRef(looped)
  const reducedRef = useRef(reduced)
  loopedRef.current = looped
  reducedRef.current = reduced

  // Furthest station the reader has actually reached (stamps fill off this,
  // independent of hover-scrub or scrolling back up).
  const [reachedIndex, setReachedIndex] = useState(-1)
  useEffect(() => {
    if (activeIndex > reachedIndex) setReachedIndex(activeIndex)
  }, [activeIndex, reachedIndex])

  // Hover-scrub: while a stamp is hovered/focused, the token jumps to that
  // historical station; leaving snaps back to the real scroll position.
  const [scrubIndex, setScrubIndex] = useState(null)

  // Count-up tween: fires once when the reader arrives at Job Cost by scroll,
  // watching the hour go from $61.18 to $71.46 in real time.
  const { value: countValue, start: startCount, reset: resetCount } = useCountUp(800)
  const prevActive = useRef(-1)
  useEffect(() => {
    const JOB_COST = 2
    if (activeIndex === JOB_COST && prevActive.current < JOB_COST) {
      const e = ledger[JOB_COST]
      if (e.countFrom != null && e.countTo != null) startCount(e.countFrom, e.countTo)
    } else if (activeIndex !== JOB_COST) {
      resetCount()
    }
    prevActive.current = activeIndex
  }, [activeIndex, ledger, startCount, resetCount])

  // Which station's state the token is currently showing.
  const displayIndex =
    scrubIndex != null
      ? scrubIndex
      : looped
      ? n - 1
      : activeIndex >= 0
      ? activeIndex
      : reachedIndex

  const entry = displayIndex >= 0 ? ledger[displayIndex] : seed
  const tone = looped ? 'green' : entry.tone
  const glyph = looped ? 'coin' : entry.glyph

  // Value readout: the count-up figure while it runs at Job Cost, otherwise
  // the static value from the ledger record.
  let valueDisplay = entry.value
  if (scrubIndex == null && displayIndex === 2 && countValue != null) {
    valueDisplay = `$${countValue.toFixed(2)}`
  }

  const showShatter = displayIndex === 3

  // Flash the loop glyph once the returning token has travelled back up.
  const [arrived, setArrived] = useState(false)
  useEffect(() => {
    if (!looped) {
      setArrived(false)
      return
    }
    const t = setTimeout(() => setArrived(true), reduced ? 0 : 1300)
    return () => clearTimeout(t)
  }, [looped, reduced])

  /* ---- Position (imperative, per-frame) --------------------------------- *
   * Token y in [0,1] follows the viewport center between station centers, so
   * it docks exactly on a station when that station owns the center and
   * interpolates smoothly in between. Under reduced motion it snaps to the
   * nearest dock instead of gliding. */
  useEffect(() => {
    const rootEl = rootRef.current
    if (!rootEl) return
    let ticking = false
    let frame = 0

    const measure = () => {
      ticking = false
      if (!rootEl) return
      if (loopedRef.current) {
        rootEl.style.setProperty('--fi-ledger-y', '0') // return to the 6:15 mark
        rootEl.dataset.settled = '1'
        return
      }
      if (scrubbingRef.current != null) return

      const centers = ledger.map((l) => {
        const el = document.getElementById(l.id)
        if (!el) return null
        const r = el.getBoundingClientRect()
        return r.top + window.scrollY + el.offsetHeight / 2
      })
      if (centers.some((c) => c == null)) return

      const mid = window.scrollY + window.innerHeight / 2
      let y
      if (mid <= centers[0]) y = 0
      else if (mid >= centers[centers.length - 1]) y = 1
      else {
        let i = 0
        while (i < centers.length - 1 && mid >= centers[i + 1]) i++
        const frac = (mid - centers[i]) / (centers[i + 1] - centers[i])
        y = (i + frac) / (centers.length - 1)
      }

      // nearest dock + settled flag
      let nearest = Infinity
      let nearestI = 0
      centers.forEach((c, i) => {
        const d = Math.abs(mid - c)
        if (d < nearest) {
          nearest = d
          nearestI = i
        }
      })
      const settled = nearest < window.innerHeight * 0.22

      if (reducedRef.current) y = nearestI / (centers.length - 1)

      rootEl.style.setProperty('--fi-ledger-y', y.toFixed(4))
      rootEl.dataset.settled = settled ? '1' : '0'
    }

    measureRef.current = measure
    const onScroll = () => {
      if (ticking) return
      ticking = true
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ledger])

  // When the loop closes, send the token home even if the reader never scrolls.
  useEffect(() => {
    const rootEl = rootRef.current
    if (rootEl && looped) {
      rootEl.style.setProperty('--fi-ledger-y', '0')
      rootEl.dataset.settled = '1'
    }
  }, [looped])

  /* ---- Hover-scrub + jump ------------------------------------------------ */
  const scrub = useCallback(
    (i) => {
      scrubbingRef.current = i
      setScrubIndex(i)
      const rootEl = rootRef.current
      if (rootEl) {
        rootEl.style.setProperty('--fi-ledger-y', String(i / (n - 1)))
        rootEl.dataset.settled = '1'
      }
    },
    [n]
  )

  const endScrub = useCallback(() => {
    scrubbingRef.current = null
    setScrubIndex(null)
    measureRef.current?.()
  }, [])

  const jump = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 24
    window.scrollTo({ top, behavior: 'smooth' })
    track('fi_ledger_jump', { station: id })
  }, [])

  const stampLabel = entry.stamp || 'Pre-shift'

  return (
    <div
      ref={rootRef}
      className={`fi-ledger tone-${tone}${looped ? ' is-looped' : ''}${arrived ? ' is-arrived' : ''}`}
      data-settled="0"
    >
      <a className="fi-ledger__back" href={backHref}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        {backLabel}
      </a>

      {/* ---- Desktop spine ---- */}
      <nav className="fi-ledger__spine" aria-label="Ledger — one labor hour">
        <div className="fi-ledger__track">
          <span className="fi-ledger__fill" aria-hidden="true" />
          <span className="fi-ledger__start" aria-hidden="true" title="6:15am — where the hour begins" />

          {ledger.map((l, i) => {
            const filled = i <= reachedIndex
            const isActive = i === displayIndex
            return (
              <button
                key={l.id}
                type="button"
                className="fi-ledger__stamp"
                style={{ top: `${(i / (n - 1)) * 100}%` }}
                data-filled={filled ? '1' : '0'}
                data-active={isActive ? '1' : '0'}
                aria-label={`${l.stamp} — ${l.value}${l.unit ? ' ' + l.unit : ''}. Jump to this station.`}
                onMouseEnter={() => scrub(i)}
                onMouseLeave={endScrub}
                onFocus={() => scrub(i)}
                onBlur={endScrub}
                onClick={() => jump(l.id)}
              >
                <span className="fi-ledger__stamp-dot" aria-hidden="true" />
                <span className="fi-ledger__stamp-label">{l.stamp}</span>
              </button>
            )
          })}

          <div className="fi-ledger__token" aria-hidden="true">
            <span className="fi-ledger__glyph" key={showShatter ? 'scatter' : glyph}>
              {showShatter ? (
                <Shatter worst={entry.worstFade} best={entry.bestGain} reduced={reduced} />
              ) : (
                <Glyph kind={glyph} />
              )}
            </span>
            <span className="fi-ledger__readout">
              <span className="fi-ledger__figure fi-figure">
                {valueDisplay}
                {entry.unit && <i className="fi-ledger__unit">{entry.unit}</i>}
              </span>
              <span className="fi-ledger__status">{entry.status}</span>
              <span className="fi-ledger__verb">
                <em>{entry.verb}</em>
              </span>
            </span>
            <span className="fi-ledger__loopflash" aria-hidden="true">
              <Glyph kind="loop" />
            </span>
          </div>
        </div>
      </nav>

      {/* ---- Mobile status bar ---- */}
      <div className="fi-ledger__bar" role="status" aria-live="off">
        <span className="fi-ledger__glyph fi-ledger__glyph--bar" aria-hidden="true">
          <Glyph kind={glyph} />
        </span>
        <span className="fi-ledger__figure fi-figure">
          {valueDisplay}
          {entry.unit && <i className="fi-ledger__unit">{entry.unit}</i>}
        </span>
        <span className="fi-ledger__bar-meta">
          <span className="fi-ledger__bar-time">{entry.time}</span>
          <span className="fi-ledger__bar-stamp">{stampLabel}</span>
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Glyphs — the visual the token becomes at each station. Line-art on
 * currentColor so the tone var flows straight through.
 * ------------------------------------------------------------------ */
function Glyph({ kind }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  switch (kind) {
    case 'seed':
      return (
        <svg {...common}>
          <path d="M12 21v-7" />
          <path d="M12 14c-3 0-5-2-5-5 3 0 5 2 5 5Z" />
          <path d="M12 12c0-2.6 1.8-4.6 4.4-4.6C16.4 10 14.6 12 12 12Z" />
        </svg>
      )
    case 'paper':
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14H7Z" />
          <path d="M14 3v4h4" />
          <path d="M9.5 12h6M9.5 15h6M9.5 18h3.5" />
        </svg>
      )
    case 'chip':
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="3" />
          <path d="M8.5 12.2l2.4 2.4 4.6-4.8" />
        </svg>
      )
    case 'cliff':
      return (
        <svg {...common}>
          <path d="M3 7h6c0 5 1 9 4 9s4-4 8-4" />
          <path d="M18 10l2 2 2-2" fill="none" />
        </svg>
      )
    case 'scatter':
      return (
        <svg {...common}>
          <circle cx="6" cy="9" r="1.6" />
          <circle cx="10" cy="15" r="1.6" />
          <circle cx="14" cy="7" r="1.6" />
          <circle cx="18" cy="13" r="1.6" />
        </svg>
      )
    case 'coin':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8M10 10.2c0-1 .9-1.6 2-1.6s2 .6 2 1.5c0 2-4 1-4 3 0 .9.9 1.5 2 1.5s2-.6 2-1.6" />
        </svg>
      )
    case 'loop':
      return (
        <svg {...common}>
          <polyline points="4 5 4 10 9 10" />
          <path d="M5.5 15a8 8 0 1 0 1.9-8.4L4 10" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
        </svg>
      )
  }
}

/* ------------------------------------------------------------------ *
 * Shatter — the copper dot breaks into the real spread as the reader
 * reaches Portfolio: red shards fly left (fade), green shards fly right
 * (gain), and the -68..+28 label fades in as the truth behind the
 * "0.6pt average". Positions are deterministic (no per-render randomness).
 * ------------------------------------------------------------------ */
const SHARDS = [
  { sign: 'red', dx: -30, dy: -14 },
  { sign: 'red', dx: -40, dy: 4 },
  { sign: 'red', dx: -26, dy: 16 },
  { sign: 'red', dx: -44, dy: -3 },
  { sign: 'green', dx: 28, dy: -12 },
  { sign: 'green', dx: 40, dy: 6 },
  { sign: 'green', dx: 25, dy: 17 },
  { sign: 'green', dx: 43, dy: -2 },
]

function Shatter({ worst, best, reduced }) {
  return (
    <span className={`fi-ledger__shatter${reduced ? ' is-static' : ''}`}>
      {SHARDS.map((s, i) => (
        <span
          key={i}
          className={`fi-ledger__shard fi-ledger__shard--${s.sign}`}
          style={{ '--dx': `${s.dx}px`, '--dy': `${s.dy}px`, animationDelay: `${i * 45}ms` }}
        />
      ))}
      <span className="fi-ledger__spread">
        <b className="fi-ledger__spread--fade">−{worst}</b>
        <b className="fi-ledger__spread--gain">+{best}</b>
      </span>
    </span>
  )
}
