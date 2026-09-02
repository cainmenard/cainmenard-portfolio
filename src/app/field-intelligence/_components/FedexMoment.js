'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { FEDEX_STAGES } from '../_data/fieldIntelligence'
import { useReducedMotion } from './useReducedMotion'
import { track } from './track'

// Dwell before advancing to the next stage. The "about two weeks later" step
// lingers on purpose: the lag is the whole point.
const STEP_MS = [1000, 1400, 1200, 2400]
const LAST = FEDEX_STAGES.length - 1

/** Envelope position (percent along the rail) for a given stage index. */
function railPct(step) {
  if (step <= 1) return 0 // written / error: still on the jobsite
  if (step === 2) return 52 // shipped: in transit
  return 100 // surfaced / corrected: at corporate
}

/**
 * The FedEx timecard story as a shipment tracker. An envelope crosses from the
 * jobsite to corporate while the stages light up, and the "about two weeks
 * later" step deliberately lingers. Plays once when scrolled into view, replays
 * on the board's FedEx token or the Replay button, and rests fully revealed
 * under reduced motion.
 */
export default function FedexMoment({ trigger = 0 }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const timers = useRef([])
  const started = useRef(false)
  const [step, setStep] = useState(-1)

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const play = useCallback(() => {
    if (reduced) {
      setStep(LAST)
      return
    }
    clear()
    setStep(0)
    let acc = 0
    for (let i = 1; i <= LAST; i++) {
      acc += STEP_MS[i - 1]
      timers.current.push(setTimeout(() => setStep(i), acc))
    }
  }, [reduced])

  // Play once when it scrolls into view.
  useEffect(() => {
    if (reduced) {
      setStep(LAST)
      return
    }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          play()
          track('fi_fedex_played', { via: 'scroll' })
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [reduced, play])

  // External trigger (the board's FedEx token): scroll in and replay.
  useEffect(() => {
    if (trigger > 0) {
      ref.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' })
      started.current = true
      play()
      track('fi_fedex_played', { via: 'token' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  useEffect(() => () => clear(), [])

  const pct = railPct(step < 0 ? 0 : step)
  const inTransit = step === 2

  return (
    <div className="fi-fedex" ref={ref}>
      <div className="fi-fedex__track" aria-hidden="true">
        <span className="fi-fedex__place">Jobsite</span>
        <span className={`fi-fedex__rail${inTransit ? ' fi-fedex__rail--transit' : ''}`}>
          <span className="fi-fedex__rail-fill" style={{ width: `${pct}%` }} />
          <span className="fi-fedex__van" style={{ left: `${pct}%` }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8l9-5 9 5v8l-9 5-9-5z" />
              <path d="M3 8l9 5 9-5" />
              <path d="M12 13v8" />
            </svg>
          </span>
        </span>
        <span className="fi-fedex__place">Corporate</span>
      </div>

      <ol className="fi-fedex__stages">
        {FEDEX_STAGES.map((s, i) => (
          <li
            key={s.id}
            className={
              'fi-fedex__stage' +
              (step >= i ? ' is-active' : '') +
              (step === i ? ' is-current' : '')
            }
          >
            <span className="fi-fedex__when fi-figure">{s.when}</span>
            <span className="fi-fedex__stage-title">{s.title}</span>
            <span className="fi-fedex__stage-text">{s.text}</span>
          </li>
        ))}
      </ol>

      <div className="fi-fedex__foot">
        <button
          type="button"
          className="fi-fedex__replay"
          onClick={() => {
            started.current = true
            play()
            track('fi_fedex_played', { via: 'replay' })
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.5 15a9 9 0 1 0 2.1-9.4L1 10" />
          </svg>
          Replay
        </button>
        <p className="fi-muted" style={{ margin: 0, fontSize: '0.84rem' }}>
          Two weeks from punch to correction, and the correction only ever moves one way.
        </p>
      </div>
    </div>
  )
}
