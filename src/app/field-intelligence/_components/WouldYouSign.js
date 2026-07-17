'use client'
import { useState } from 'react'
import { EPC_SCATTER } from '../_data/fieldIntelligence'
import StatFigure from './StatFigure'
import { track } from './track'

const wc = EPC_SCATTER.worstCustomer

const W = 720
const H = 230
const PL = 24
const PR = 24
const PT = 34
const PB = 40
const px0 = PL
const px1 = W - PR
const VMIN = -74
const VMAX = 34

const sx = (v) => px0 + ((v - VMIN) / (VMAX - VMIN)) * (px1 - px0)
const cy = (i) => PT + 18 + (((i * 7) % 9) * 18) // deterministic vertical jitter

/**
 * "Would you sign it?" The book's revenue-weighted aggregate fade is a
 * harmless-looking 0.6 points. The viewer answers, then the scatter reveals
 * that the average hid the spread: project outcomes run from a 68-point fade to
 * a 28-point gain, and the largest customer is the deep left tail.
 */
export default function WouldYouSign() {
  const [answer, setAnswer] = useState(null)
  const revealed = answer !== null

  const choose = (a) => {
    if (revealed) return
    setAnswer(a)
    track('fi_wouldyousign', { answer: a })
  }

  const reaction =
    answer === 'yes'
      ? 'You just signed a book with a project that faded 68 points, and a customer that lost 5.7 million dollars.'
      : answer === 'no'
      ? 'You just walked from a book that also held a project that gained 28 points. The average told you nothing.'
      : ''

  return (
    <div className={`fi-sign${revealed ? ' is-revealed' : ''}`}>
      <div className="fi-sign__head">
        <div>
          <span className="fi-kicker">The utility-scale solar and wind EPC</span>
          <p className="fi-sign__agg">
            <span className="fi-figure">0.6</span> point aggregate fade
          </p>
          <p className="fi-muted" style={{ margin: 0, fontSize: '0.86rem' }}>
            39 projects, about $1.03B. On paper, a rounding error. Would you sign the next one?
          </p>
        </div>
        {!revealed && (
          <div className="fi-sign__ask">
            <button type="button" className="fi-pipe__btn fi-pipe__btn--primary" onClick={() => choose('yes')}>
              Sign it
            </button>
            <button type="button" className="fi-pipe__btn" onClick={() => choose('no')}>
              Walk
            </button>
          </div>
        )}
      </div>

      {revealed && (
        <figure className="fi-sign__scatter">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="A scatter of 39 project margin outcomes ranging from a 68 point fade to a 28 point gain, around a 0.6 point average. The five worst are the largest customer.">
            {[-60, -40, -20, 0, 20].map((t) => (
              <g key={t}>
                <line x1={sx(t)} y1={PT} x2={sx(t)} y2={H - PB} className="fi-sign__grid" />
                <text x={sx(t)} y={H - PB + 20} className="fi-sign__tick" textAnchor="middle">
                  {t > 0 ? `+${t}` : t}
                </text>
              </g>
            ))}
            {/* aggregate line at 0.6 pt fade */}
            <line x1={sx(-0.6)} y1={PT - 6} x2={sx(-0.6)} y2={H - PB} className="fi-sign__agg-line" />
            <text x={sx(-0.6)} y={PT - 12} className="fi-sign__agg-label" textAnchor="middle">
              average
            </text>

            {EPC_SCATTER.points.map((p, i) => (
              <circle
                key={i}
                cx={sx(p.v)}
                cy={cy(i)}
                r={p.worst ? 6 : 5}
                className={`fi-sign__dot${p.worst ? ' fi-sign__dot--worst' : ''}`}
                style={{ animationDelay: `${i * 22}ms` }}
              />
            ))}

            <text x={sx(-68)} y={cy(38) + 20} className="fi-sign__extreme" textAnchor="middle">68 fade</text>
            <text x={sx(28)} y={cy(0) - 12} className="fi-sign__extreme" textAnchor="middle">28 gain</text>
          </svg>
          <figcaption className="fi-sign__reaction">
            {reaction}
            <span className="fi-sign__note fi-muted">{EPC_SCATTER.note}</span>
          </figcaption>

          <div className="fi-sign__cut">
            <span className="fi-sign__cut-tag">The largest customer</span>
            <p className="fi-sign__cut-line">{wc.line}</p>
            <div className="fi-cutstats">
              <StatFigure size="sm" value={wc.projects} label="projects" />
              <StatFigure size="sm" value={wc.revenue} label="revenue" />
              <StatFigure size="sm" value={wc.netLoss} label="net loss" />
              <StatFigure size="sm" value={`${wc.directOverPct}%`} label="direct costs over" />
            </div>
          </div>
        </figure>
      )}
    </div>
  )
}
