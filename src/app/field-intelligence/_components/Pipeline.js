'use client'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { PIPELINE } from '../_data/fieldIntelligence'
import { useReducedMotion } from './useReducedMotion'
import { track } from './track'

/**
 * The Office centerpiece. The viewer predicts where the approved hour dies by
 * clicking the hand-offs between systems; the two real leaks (the approval
 * queue and manual re-keying) are revealed; then a single trigger animates the
 * future state, where an approved hour flows straight through and budget-vs-
 * actual updates the same day. The honest beat stays attached: an integration
 * delivers the bad punch faster, it does not fix it.
 */
export default function Pipeline() {
  const reduced = useReducedMotion()
  const { stages, points } = PIPELINE
  const [guessed, setGuessed] = useState({}) // { [pointId]: 'hit' | 'miss' }
  const [revealed, setRevealed] = useState(false)
  const [flowStep, setFlowStep] = useState(-1) // -1 = not run; else lit node index
  const timers = useRef([])

  const foundCount = points.filter((p) => p.leak && guessed[p.id] === 'hit').length
  const allFound = foundCount === 2
  const showFuture = revealed || allFound
  const running = flowStep >= 0

  const guess = (pt) => {
    if (revealed || running || guessed[pt.id]) return
    setGuessed((g) => ({ ...g, [pt.id]: pt.leak ? 'hit' : 'miss' }))
    track('fi_pipeline_guess', { point: pt.id, leak: pt.leak })
  }

  const reveal = () => {
    setRevealed(true)
    track('fi_pipeline_reveal')
  }

  const runFuture = useCallback(() => {
    track('fi_pipeline_future')
    if (reduced) {
      setFlowStep(stages.length - 1)
      return
    }
    timers.current.forEach(clearTimeout)
    timers.current = []
    setFlowStep(0)
    for (let i = 1; i < stages.length; i++) {
      timers.current.push(setTimeout(() => setFlowStep(i), i * 620))
    }
  }, [reduced, stages.length])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const status = running
    ? PIPELINE.triggerShort
    : revealed || allFound
    ? 'Two leaks: the approval queue and manual re-keying. Everything else is a hand-off.'
    : foundCount > 0 || Object.keys(guessed).length > 0
    ? `${foundCount} of 2 leaks found. Keep looking, or reveal them.`
    : PIPELINE.prompt

  return (
    <div className="fi-pipe-wrap">
      <p className="fi-pipe__status" aria-live="polite">{status}</p>

      <div className="fi-pipe" role="group" aria-label="Approved timecard pipeline">
        {stages.map((s, i) => (
          <Fragment key={s.id}>
            <div
              className={
                'fi-pipe__node' +
                (running && flowStep >= i ? ' is-lit' : '') +
                (i === stages.length - 1 ? ' fi-pipe__node--end' : '')
              }
            >
              <span className="fi-pipe__node-label">{s.label}</span>
              {i === stages.length - 1 && running && flowStep >= i && (
                <span className="fi-pipe__badge">{PIPELINE.budgetBadge}</span>
              )}
            </div>

            {i < stages.length - 1 && renderPipe(points[i], i)}
          </Fragment>
        ))}
      </div>

      <p className="fi-pipe__middleware" aria-hidden="true">
        {PIPELINE.frame} {PIPELINE.before}
      </p>

      {/* Leak detail cards, shown as each is found or on reveal */}
      {(revealed || foundCount > 0) && (
        <div className="fi-pipe__leaks">
          {points
            .filter((p) => p.leak && (revealed || guessed[p.id] === 'hit'))
            .map((p) => (
              <div key={p.id} className="fi-pipe__leak-card">
                <span className="fi-pipe__leak-title">{p.title}</span>
                <p>{p.detail}</p>
              </div>
            ))}
        </div>
      )}

      <div className="fi-pipe__controls">
        {!showFuture && (
          <button type="button" className="fi-pipe__btn" onClick={reveal}>
            Reveal the two leaks
          </button>
        )}
        {showFuture && !running && (
          <button type="button" className="fi-pipe__btn fi-pipe__btn--primary" onClick={runFuture}>
            Run the future state
          </button>
        )}
        {running && (
          <button type="button" className="fi-pipe__btn" onClick={() => setFlowStep(-1)}>
            Reset
          </button>
        )}
      </div>

      {running && (
        <div className="fi-note fi-note--field fi-pipe__honest">
          <span className="fi-note__tag">The honest beat</span>
          <p style={{ margin: 0, lineHeight: 1.55 }}>{PIPELINE.honest}</p>
        </div>
      )}
    </div>
  )

  function renderPipe(pt, i) {
    const hit = revealed ? pt.leak : guessed[pt.id] === 'hit'
    const miss = !revealed && guessed[pt.id] === 'miss'
    const flowing = running && flowStep > i
    const cls =
      'fi-pipe__link' +
      (hit && !running ? ' is-leak' : '') +
      (miss && !running ? ' is-miss' : '') +
      (running ? ' is-sealed' : '') +
      (flowing ? ' is-flow' : '')
    return (
      <button
        key={pt.id}
        type="button"
        className={cls}
        onClick={() => guess(pt)}
        disabled={revealed || running || Boolean(guessed[pt.id])}
        aria-label={
          hit ? `Leak found: ${pt.title}` : miss ? 'Not a leak, a clean hand-off' : 'Guess whether the hour dies at this hand-off'
        }
      >
        <span className="fi-pipe__pipe" aria-hidden="true" />
        {hit && !running && <span className="fi-pipe__drip" aria-hidden="true" />}
        {miss && !running && (
          <span className="fi-pipe__x" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <line x1="3" y1="3" x2="9" y2="9" />
              <line x1="9" y1="3" x2="3" y2="9" />
            </svg>
          </span>
        )}
      </button>
    )
  }
}
