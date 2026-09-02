'use client'
import { useState } from 'react'
import { BUSINESSES, CAPTURE_METHODS } from '../_data/fieldIntelligence'

const LANE_TOP = ['12%', '42%', '70%']

/**
 * The marquee: twelve businesses placed on a Manual-to-Digital axis by how they
 * capture a field hour. Noted businesses show a glanceable stat and reveal a
 * field note on hover or keyboard focus; the cleanest-financials business sits
 * on the manual side and opens the FedEx shipment story. Squint test: the
 * left-heavy spread, and that one copper marker on the manual end, is the point.
 */
export default function CaptureBoard({ onFedexClick }) {
  const [active, setActive] = useState(null)

  return (
    <figure className="fi-board" aria-label="Twelve businesses across five capture methods, from manual to digital">
      <div className="fi-board__plot">
        {BUSINESSES.map((b) => {
          const noted = Boolean(b.note)
          const isOpen = active === b.id
          const cls =
            'fi-token' +
            (noted ? ' fi-token--noted' : '') +
            (b.fedex ? ' fi-token--fedex' : '') +
            (isOpen ? ' fi-token--open' : '')
          return (
            <div
              key={b.id}
              className="fi-token-wrap"
              style={{ left: `${b.digital * 100}%`, top: LANE_TOP[b.lane] || '42%' }}
            >
              <button
                type="button"
                className={cls}
                aria-label={
                  b.fedex
                    ? `${b.label}. Open the FedEx timecard story.`
                    : noted
                    ? `${b.label}: ${b.stat}`
                    : `A business capturing via ${methodLabel(b.method)}`
                }
                aria-expanded={noted ? isOpen : undefined}
                onMouseEnter={() => setActive(b.id)}
                onMouseLeave={() => setActive((a) => (a === b.id ? null : a))}
                onFocus={() => setActive(b.id)}
                onBlur={() => setActive((a) => (a === b.id ? null : a))}
                onClick={() => b.fedex && onFedexClick?.()}
              >
                <span className="fi-token__dot" aria-hidden="true">
                  {b.fedex && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8l9-5 9 5v8l-9 5-9-5z" />
                      <path d="M3 8l9 5 9-5" />
                    </svg>
                  )}
                </span>
              </button>

              {noted && <span className="fi-token__stat fi-figure" aria-hidden="true">{b.stat}</span>}

              {noted && isOpen && (
                <span role="tooltip" className={`fi-token__pop${b.fedex ? ' fi-token__pop--fedex' : ''}`}>
                  <span className="fi-token__pop-label">{b.label}</span>
                  {b.note}
                  {b.fedex && <span className="fi-token__pop-cue">Click to watch it travel &rarr;</span>}
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="fi-board__axis" aria-hidden="true">
        <div className="fi-board__gradient" />
        {CAPTURE_METHODS.map((m) => (
          <span key={m.id} className="fi-board__anchor" style={{ left: `${m.digital * 100}%` }}>
            <span className="fi-board__anchor-tick" />
            <span className="fi-board__anchor-label">{m.label}</span>
          </span>
        ))}
      </div>

      <figcaption className="fi-board__scale" aria-hidden="true">
        <span>Manual</span>
        <span>Digital</span>
      </figcaption>
    </figure>
  )
}

function methodLabel(id) {
  return CAPTURE_METHODS.find((m) => m.id === id)?.label || 'a manual method'
}
