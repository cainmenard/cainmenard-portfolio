'use client'
import { useState } from 'react'
import { MECHANISM_CARDS } from '../_data/fieldIntelligence'
import { track } from './track'

/**
 * The six decisions the completed-contracts data makes. Single-select
 * highlight: tap a card to bring one decision into focus (it lifts, the
 * others dim); tap it again to clear. Every card body stays in the DOM
 * regardless of state, so a pure scroller still reads all six. Motion is
 * CSS-only and gated by the scoped reduced-motion block.
 */
export default function MechanismGrid() {
  const [active, setActive] = useState(null)

  const select = (id) => {
    setActive((cur) => {
      const next = cur === id ? null : id
      if (next) track('fi_mechanism', { id: next })
      return next
    })
  }

  return (
    <div className={`fi-mech${active ? ' is-focused' : ''}`}>
      {MECHANISM_CARDS.map((m) => {
        const isActive = active === m.id
        return (
          <button
            type="button"
            key={m.id}
            className={
              'fi-mech__card' +
              (isActive ? ' is-active' : '') +
              (active && !isActive ? ' is-dim' : '')
            }
            aria-pressed={isActive}
            onClick={() => select(m.id)}
          >
            <h3>{m.title}</h3>
            <p>{m.body}</p>
          </button>
        )
      })}
    </div>
  )
}
