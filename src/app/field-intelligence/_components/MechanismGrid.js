'use client'
import { useState } from 'react'
import { MECHANISM_CARDS } from '../_data/fieldIntelligence'
import { track } from './track'

/**
 * The data-to-decision map. Six rules the completed day now enforces on how
 * the next job gets priced. Each card pairs a finding with the call it drives;
 * tapping a card reveals the specific data cut behind it, tagged to the station
 * that produced it, so the abstract rule always cashes out in a real number.
 *
 * Tap to open one cut, tap again to close it. Every card's data cut stays in
 * the DOM regardless of state (visually collapsed, not unmounted), so a pure
 * scroller or a no-JS reader still gets all six. Motion is CSS-only and gated
 * by the scoped reduced-motion block.
 */
export default function MechanismGrid() {
  const [open, setOpen] = useState(null)

  const select = (id) => {
    setOpen((cur) => {
      const next = cur === id ? null : id
      if (next) track('fi_mechanism', { id: next })
      return next
    })
  }

  return (
    <div className="fi-mech">
      {MECHANISM_CARDS.map((m) => {
        const isOpen = open === m.id
        return (
          <button
            type="button"
            key={m.id}
            className={'fi-mech__card' + (isOpen ? ' is-open' : '')}
            aria-expanded={isOpen}
            onClick={() => select(m.id)}
          >
            <span className="fi-mech__station">{m.station.label}</span>
            <span className="fi-mech__finding">{m.finding}</span>
            <span className="fi-mech__decision">
              <svg className="fi-mech__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" y1="12" x2="18" y2="12" />
                <polyline points="12 6 18 12 12 18" />
              </svg>
              {m.decision}
            </span>
            <span className="fi-mech__cut">
              <span className="fi-mech__cut-inner" aria-hidden={!isOpen}>
                <span className="fi-mech__cut-tag">The cut behind it</span>
                <span className="fi-mech__cut-body">{m.dataCut}</span>
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
