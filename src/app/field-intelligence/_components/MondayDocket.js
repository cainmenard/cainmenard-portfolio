'use client'
import { useState } from 'react'
import { DOCKET } from '../_data/fieldIntelligence'
import { track } from './track'

/**
 * Monday's docket. Three real situations the whole day has now equipped the
 * viewer to answer. They pick a call; the card reveals the actual answer and
 * marks the nuanced move. The point is not a quiz score, it is that these
 * decisions are now makeable.
 */
export default function MondayDocket() {
  const [picks, setPicks] = useState({})

  const pick = (d, o) => {
    if (picks[d.id]) return
    setPicks((p) => ({ ...p, [d.id]: o.id }))
    track('fi_docket', { docket: d.id, option: o.id, best: Boolean(o.best) })
  }

  return (
    <div className="fi-docket">
      {DOCKET.map((d) => {
        const picked = picks[d.id]
        return (
          <div key={d.id} className={`fi-docket__card${picked ? ' is-decided' : ''}`}>
            <span className="fi-docket__tag">{d.tag}</span>
            <p className="fi-docket__situation">{d.situation}</p>
            <p className="fi-docket__q">{d.question}</p>

            <div className="fi-docket__options">
              {d.options.map((o) => {
                const isPicked = picked === o.id
                const state = !picked
                  ? ''
                  : o.best
                  ? ' is-best'
                  : isPicked
                  ? ' is-picked'
                  : ' is-dim'
                return (
                  <button
                    key={o.id}
                    type="button"
                    className={`fi-docket__opt${state}`}
                    disabled={Boolean(picked)}
                    onClick={() => pick(d, o)}
                  >
                    {o.label}
                  </button>
                )
              })}
            </div>

            {picked && (
              <div className="fi-docket__answer">
                <span className="fi-docket__answer-tag">The call</span>
                <p>{d.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
