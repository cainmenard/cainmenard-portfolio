'use client'
import { useEffect, useRef, useState } from 'react'
import { FORENSIC_BOOKS, REPEATED_SHAPE } from '../_data/fieldIntelligence'

const MAX_ABS = Math.max(
  ...FORENSIC_BOOKS.flatMap((b) => b.bars.map((x) => Math.abs(x.variancePct)))
)

/**
 * The repeated shape across three forensic books: what you quote (materials,
 * subs) holds or comes under; what you predict (labor, equipment) runs over.
 * Diverging bars centered at zero, quote to the left in copper, predict to the
 * right in the danger tone. Bars grow in when the group scrolls into view.
 */
export default function DivergingBars() {
  const ref = useRef(null)
  const [grown, setGrown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGrown(true)
      return
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGrown(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={`fi-div${grown ? ' is-grown' : ''}`} ref={ref}>
      <div className="fi-div__legend" aria-hidden="true">
        <span className="fi-div__legend-l">Came in under (what you quote)</span>
        <span className="fi-div__legend-r">Ran over (what you predict)</span>
      </div>

      {FORENSIC_BOOKS.map((book) => (
        <div key={book.id} className="fi-div__book">
          <div className="fi-div__book-head">
            <span className="fi-div__book-name">{book.name}</span>
            <span className="fi-div__book-meta">
              {book.projects} projects, {book.value}
              {book.marginEst != null && (
                <>
                  {' '}· margin {book.marginEst}% to {book.marginActual}%
                </>
              )}
            </span>
          </div>

          {book.bars.map((bar) => {
            const width = (Math.abs(bar.variancePct) / MAX_ABS) * 50
            const left = bar.variancePct < 0
            return (
              <div key={bar.code} className="fi-div__row">
                <span className="fi-div__cat">{bar.code}</span>
                <div className="fi-div__track">
                  <span className="fi-div__center" aria-hidden="true" />
                  <span
                    className={`fi-div__bar fi-div__bar--${bar.kind} ${left ? 'is-left' : 'is-right'}`}
                    style={left ? { right: '50%', width: `${grown ? width : 0}%` } : { left: '50%', width: `${grown ? width : 0}%` }}
                  />
                </div>
                <span className={`fi-div__val fi-div__val--${bar.kind}`}>
                  {bar.variancePct > 0 ? '+' : ''}
                  {bar.variancePct}%
                </span>
              </div>
            )
          })}
        </div>
      ))}

      <p className="fi-div__shape">{REPEATED_SHAPE}</p>
    </div>
  )
}
