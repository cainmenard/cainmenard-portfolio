'use client'
import { useState } from 'react'
import { STOPWATCH } from '../_data/fieldIntelligence'
import { track } from './track'

/**
 * The time study. An eight-hour day splits 43% direct install, 42% support
 * work, 14% recoverable lost time. Opening the lost-time slice reveals the
 * causes: off-task leads, but material handling (17%) and missing information
 * from the office or GC (16%) are right behind, and both are fixable from a
 * desk. The 16% missing-information slice is the software problem the finale
 * pays off.
 */
export default function StopwatchStudy() {
  const [open, setOpen] = useState(false)

  const reveal = () => {
    if (open) return
    setOpen(true)
    track('fi_stopwatch_reveal')
  }

  return (
    <div className="fi-stop">
      <div
        className="fi-stop__bar"
        role="img"
        aria-label="An eight-hour day: 43 percent direct install, 42 percent support work, 14 percent recoverable lost time"
      >
        {STOPWATCH.segments.map((s) => (
          <div
            key={s.id}
            className={`fi-stop__seg fi-stop__seg--${s.id}`}
            style={{ flexGrow: s.pct }}
          >
            <span className="fi-stop__seg-pct fi-figure">{s.pct}%</span>
            <span className="fi-stop__seg-label">{s.label}</span>
          </div>
        ))}
      </div>

      {!open && (
        <button type="button" className="fi-stop__btn" onClick={reveal}>
          Open the 14% recoverable lost time
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="4" y1="12" x2="19" y2="12" />
            <polyline points="13 6 19 12 13 18" />
          </svg>
        </button>
      )}

      {open && (
        <div className="fi-stop__reveal">
          <p className="fi-stop__lead">
            Off-task leads the lost time. But the two causes right behind it are fixable from a desk.
          </p>
          <div className="fi-stop__causes">
            {STOPWATCH.lostCauses.map((cause) => (
              <div
                key={cause.id}
                className={`fi-stop__cause${cause.tieToFinale ? ' fi-stop__cause--finale' : ''}`}
              >
                <span className="fi-stop__cause-rank fi-figure">{cause.pct ? `${cause.pct}%` : 'Leads'}</span>
                <span className="fi-stop__cause-label">{cause.label}</span>
                <span className="fi-stop__cause-note">{cause.note}</span>
              </div>
            ))}
          </div>
          <p className="fi-stop__punch">{STOPWATCH.line}</p>
        </div>
      )}
    </div>
  )
}
