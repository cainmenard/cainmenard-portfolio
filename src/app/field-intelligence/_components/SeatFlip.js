'use client'
import { useState } from 'react'
import { FORENSIC_BOOKS } from '../_data/fieldIntelligence'
import { track } from './track'

const water = FORENSIC_BOOKS.find((b) => b.id === 'water')

/**
 * The seat flip. The same water-infrastructure company on the same product
 * gained 4.18 points as a subcontractor and faded 4.85 as a GC. The nine-point
 * swing is what the GC seat costs, which makes PM availability a bid factor.
 */
export default function SeatFlip() {
  const [seat, setSeat] = useState('sub')
  const val = seat === 'sub' ? water.seat.sub : water.seat.gc
  const gain = val > 0

  const set = (s) => {
    setSeat(s)
    track('fi_seatflip', { seat: s })
  }

  return (
    <div className="fi-seat">
      <div className="fi-seat__toggle" role="tablist" aria-label="Delivery seat">
        <button
          type="button"
          role="tab"
          aria-selected={seat === 'sub'}
          className={`fi-seat__tab${seat === 'sub' ? ' is-active' : ''}`}
          onClick={() => set('sub')}
        >
          As subcontractor
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={seat === 'gc'}
          className={`fi-seat__tab${seat === 'gc' ? ' is-active' : ''}`}
          onClick={() => set('gc')}
        >
          As GC
        </button>
      </div>

      <div className={`fi-seat__readout${gain ? ' is-gain' : ' is-fade'}`}>
        <span className="fi-seat__num fi-figure">
          {gain ? '+' : ''}
          {val}
        </span>
        <span className="fi-seat__unit">points {gain ? 'gained' : 'faded'}</span>
      </div>

      <p className="fi-seat__caption">
        Same company, same product. The nine-point swing between the two seats is what the GC role actually costs. PM
        availability is a scored bid factor, so the org chart is a bidding constraint.
      </p>
    </div>
  )
}
