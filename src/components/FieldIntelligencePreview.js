'use client'

/**
 * FieldIntelligencePreview — a compact "Golden Hour" teaser for the Field
 * Intelligence interactive story. It reproduces the story's signature effect in
 * miniature: a sky that sweeps indigo predawn -> blue midday -> violet dusk, a
 * glowing sun that arcs across on the exact 4·p·(1−p) parabola the real page
 * uses, fading predawn stars, and a copper rail whose five station dots light
 * up as a spark travels FIELD -> DECISIONS.
 *
 * Everything below is derived in pure CSS from a single scalar, --fip-p (0 = day
 * begins, 1 = dusk), which this component writes each animation frame — mirroring
 * how the real story drives its whole scene off --fi-progress. Colors, ramps and
 * the sun parabola are lifted from src/app/field-intelligence/field-intelligence.css.
 *
 * Motion: the day plays once (~7s, ease-out) when the card scrolls into view and
 * settles at golden dusk with all dots lit; hover/focus replays it. When the
 * viewer prefers reduced motion, no rAF runs — it renders a static golden-hour
 * frame with every dot lit.
 */

import { useEffect, useRef } from 'react'

const STATIONS = ['Field', 'Office', 'Job Cost', 'Portfolio', 'Decisions']

// The frame we settle on (and freeze at, under reduced motion): the day runs to
// dusk, so the spark reaches DECISIONS and the whole rail is lit — the story's
// payoff, "ending with a decision."
const REST_P = 1
const DURATION = 7000 // ms for a full dawn->dusk pass

export default function FieldIntelligencePreview() {
  const rootRef = useRef(null)
  const rafRef = useRef(0)
  const startRef = useRef(0)

  // Write the progress scalar; the CSS does the rest.
  const setP = (p) => {
    const el = rootRef.current
    if (el) el.style.setProperty('--fip-p', String(p))
  }

  const stopAnim = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }

  const play = () => {
    stopAnim()
    startRef.current = 0
    const step = (now) => {
      if (!startRef.current) startRef.current = now
      const t = Math.min((now - startRef.current) / DURATION, 1)
      // ease-out so dawn opens briskly and the afternoon lingers
      const eased = 1 - Math.pow(1 - t, 2.2)
      setP(eased * REST_P) // 0 -> REST_P along the eased curve
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setP(REST_P)
        rafRef.current = 0
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setP(REST_P) // static golden-hour frame, all dots lit
      return
    }

    setP(0) // start before dawn

    // Kick off the day the first time the card scrolls into view.
    let played = false
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !played) {
            played = true
            play()
          } else if (!entry.isIntersecting) {
            // Pause work while off-screen; replay next time it enters view.
            stopAnim()
            played = false
          }
        })
      },
      { threshold: 0.35 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      stopAnim()
    }
  }, [])

  const handleReplay = () => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReduced) play()
  }

  return (
    <div
      ref={rootRef}
      className="fip-root mb-5"
      onMouseEnter={handleReplay}
      onFocus={handleReplay}
      tabIndex={-1}
      aria-hidden="true"
    >
      {/* Cinematic sky: gradient wash, warm horizon glow, predawn stars, arcing sun */}
      <div className="fip-sky">
        <div className="fip-stars" />
        <div className="fip-sun" />
      </div>

      {/* The rail: five stations, a copper fill + spark, dots that light in order */}
      <div className="fip-rail">
        <div className="fip-rail__track">
          <div className="fip-rail__fill" />
        </div>
        <div className="fip-rail__stations">
          {STATIONS.map((s, i) => (
            <div
              key={s}
              className="fip-station"
              style={{ '--fip-station': i / (STATIONS.length - 1) }}
            >
              <span className="fip-station__dot" />
              <span className="fip-station__label">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
