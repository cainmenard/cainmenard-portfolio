'use client'
import { useEffect, useRef, useState } from 'react'
import { CLIFF } from '../_data/fieldIntelligence'
import { useReducedMotion } from './useReducedMotion'
import { track } from './track'

const c = CLIFF.chart
const W = 720
const H = 380
const PL = 54
const PR = 26
const PT = 34
const PB = 44
const px0 = PL
const px1 = W - PR
const py0 = PT
const py1 = H - PB

const sx = (x) => px0 + (x / 100) * (px1 - px0)
const sy = (y) => py1 - (y / c.yMax) * (py1 - py0)
const toPath = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'} ${sx(p.x).toFixed(1)} ${sy(p.y).toFixed(1)}`).join(' ')

const Y_TICKS = [0, 4, 8, 12, 16]
const X_TICKS = [0, 20, 40, 60, 80, 100]

/**
 * The 90% cliff. Two forecasts of the same job: the quiet one holds near the
 * bid margin and falls off a cliff near 90% complete; the honest weekly
 * reforecast bends early and lands soft. The 80%-of-labor-hours close-out
 * marker sits before the cliff. Draws in when triggered; rests fully drawn
 * under reduced motion.
 */
export default function CliffChart() {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const started = useRef(false)
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    if (reduced) {
      setPlayed(true)
      return
    }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          setPlayed(true)
          track('fi_cliff_played', { via: 'scroll' })
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [reduced])

  const replay = () => {
    setPlayed(false)
    // next frame -> re-trigger the draw
    requestAnimationFrame(() => requestAnimationFrame(() => setPlayed(true)))
    track('fi_cliff_played', { via: 'replay' })
  }

  const quietEnd = c.quiet[c.quiet.length - 1]
  const honestEnd = c.honest[c.honest.length - 1]

  return (
    <figure className={`fi-cliff${played ? ' is-drawn' : ''}`} ref={ref}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="fi-cliff__svg"
        role="img"
        aria-label="Two forecasts of the same job. The quiet forecast holds flat near 14 percent margin, then falls off a cliff near 90 percent complete to under 2 percent. The honest weekly reforecast bends down early and lands soft near 8 percent. Close-out fires at 80 percent of labor hours, before the cliff."
      >
        <text x={px0 - 44} y={py0 - 14} className="fi-cliff__axis-y">Projected margin</text>

        {Y_TICKS.map((t) => (
          <g key={`y${t}`}>
            <line x1={px0} y1={sy(t)} x2={px1} y2={sy(t)} className="fi-cliff__grid" />
            <text x={px0 - 10} y={sy(t)} className="fi-cliff__tick" dominantBaseline="middle" textAnchor="end">
              {t}%
            </text>
          </g>
        ))}
        {X_TICKS.map((t) => (
          <text key={`x${t}`} x={sx(t)} y={py1 + 22} className="fi-cliff__tick" textAnchor="middle">
            {t}%
          </text>
        ))}

        {/* 80% close-out marker */}
        <line x1={sx(c.markerX)} y1={py0} x2={sx(c.markerX)} y2={py1} className="fi-cliff__marker" />
        <text x={sx(c.markerX)} y={py0 - 18} className="fi-cliff__marker-label" textAnchor="middle">
          {c.markerLabel}
        </text>
        <text x={sx(c.markerX)} y={py0 - 5} className="fi-cliff__marker-sub" textAnchor="middle">
          {c.markerSub}
        </text>

        {/* the two forecasts */}
        <path d={toPath(c.quiet)} className="fi-cliff__line fi-cliff__line--quiet" pathLength="100" fill="none" />
        <path d={toPath(c.honest)} className="fi-cliff__line fi-cliff__line--honest" pathLength="100" fill="none" />

        {/* end markers */}
        <circle cx={sx(quietEnd.x)} cy={sy(quietEnd.y)} r="4.5" className="fi-cliff__dot fi-cliff__dot--quiet" />
        <circle cx={sx(honestEnd.x)} cy={sy(honestEnd.y)} r="4.5" className="fi-cliff__dot fi-cliff__dot--honest" />
        <text x={sx(94)} y={sy(6)} className="fi-cliff__annot" textAnchor="end">the cliff</text>
      </svg>

      <figcaption className="fi-cliff__legend">
        <span className="fi-cliff__key fi-cliff__key--quiet">{c.quietLabel}</span>
        <span className="fi-cliff__key fi-cliff__key--honest">{c.honestLabel}</span>
        <span className="fi-cliff__axis-x">Percent complete</span>
        <button type="button" className="fi-cliff__replay" onClick={replay}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.5 15a9 9 0 1 0 2.1-9.4L1 10" />
          </svg>
          Replay
        </button>
      </figcaption>
    </figure>
  )
}
