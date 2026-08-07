'use client'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { PIPELINE } from '../_data/fieldIntelligence'
import { useReducedMotion } from './useReducedMotion'
import { useOrientation } from './useOrientation'
import { track } from './track'

/**
 * The Office centerpiece, drawn as a live plumbing schematic. Five systems are
 * bolted together by four valves; the viewer clicks the valve where they think
 * the approved hour dies. Two valves are the real leaks (the approval queue and
 * manual re-keying) and rupture when found; the rest seal clean. A single
 * trigger then runs the future state, where an approved hour flows straight
 * through the pipe and budget-versus-actual updates the same day. The honest
 * beat stays attached: an integration delivers the bad punch faster, it does
 * not fix it.
 *
 * The schematic is one responsive SVG. Geometry comes from layout(orientation):
 * a left-to-right run on wide screens, a top-to-bottom stack on narrow ones, so
 * touch targets stay large and nothing scrolls sideways.
 */
export default function Pipeline() {
  const reduced = useReducedMotion()
  const orient = useOrientation()
  const { stages, points } = PIPELINE
  const [guessed, setGuessed] = useState({}) // { [pointId]: 'hit' | 'miss' }
  const [revealed, setRevealed] = useState(false)
  const [flowStep, setFlowStep] = useState(-1) // -1 = not run; else lit node index
  const timers = useRef([])

  const foundCount = points.filter((p) => p.leak && guessed[p.id] === 'hit').length
  const allFound = foundCount === 2
  const showFuture = revealed || allFound
  const running = flowStep >= 0
  const untouched = !revealed && !running && Object.keys(guessed).length === 0

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

  const geo = layout(orient, stages)
  const lastIndex = stages.length - 1

  return (
    <div className="fi-pipe-wrap">
      <div className="fi-pipe__head">
        <p className="fi-pipe__status" aria-live="polite">{status}</p>
        <div className="fi-pipe__score" aria-hidden="true">
          <span className="fi-pipe__score-label">Leaks</span>
          <span className={'fi-pipe__score-dot' + (foundCount >= 1 ? ' is-on' : '')} />
          <span className={'fi-pipe__score-dot' + (foundCount >= 2 ? ' is-on' : '')} />
        </div>
      </div>

      <div className={'fi-pipe' + (untouched ? ' is-untouched' : '')} data-orient={orient}>
        <svg
          className="fi-pipe__svg"
          viewBox={geo.viewBox}
          role="group"
          aria-label="Approved timecard pipeline. Click a valve to guess where the hour dies."
        >
          {/* Pipe segments (base run + flow overlay) */}
          {geo.segments.map((seg, i) => {
            const pt = points[i]
            const hit = revealed ? pt.leak : guessed[pt.id] === 'hit'
            const miss = !revealed && guessed[pt.id] === 'miss'
            const flowing = running && flowStep > i
            const segCls =
              'fi-pipe__seg' +
              (running ? ' is-sealed' : hit ? ' is-leak' : miss ? ' is-miss' : '')
            return (
              <Fragment key={`seg-${pt.id}`}>
                <path d={seg.d} className={segCls} />
                <path
                  d={seg.d}
                  pathLength="100"
                  className={'fi-pipe__seg-flow' + (flowing ? ' is-flow' : '')}
                />
              </Fragment>
            )
          })}

          {/* System nodes */}
          {geo.nodes.map((n, i) => {
            const lit = running && flowStep >= i
            const isEnd = i === lastIndex
            const lines = wrapLabel(n.label)
            return (
              <g
                key={n.id}
                className={
                  'fi-pipe__node' + (lit ? ' is-lit' : '') + (isEnd ? ' fi-pipe__node--end' : '')
                }
              >
                <rect
                  className="fi-pipe__node-box"
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx="12"
                />
                <text
                  className="fi-pipe__node-text"
                  x={n.cx}
                  y={n.cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {lines.map((ln, li) => (
                    <tspan key={li} x={n.cx} dy={li === 0 ? -(lines.length - 1) * 7.5 : 15}>
                      {ln}
                    </tspan>
                  ))}
                </text>
                {isEnd && lit && (
                  <g
                    className="fi-pipe__badge"
                    transform={`translate(${n.cx} ${n.y + n.h + 15})`}
                  >
                    <rect className="fi-pipe__badge-box" x="-44" y="-11" width="88" height="22" rx="11" />
                    <text className="fi-pipe__badge-text" x="0" y="1" textAnchor="middle" dominantBaseline="central">
                      {PIPELINE.budgetBadge}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* Valves — the clickable hand-offs */}
          {geo.segments.map((seg, i) => renderValve(points[i], seg))}
        </svg>
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

  function renderValve(pt, seg) {
    const hit = revealed ? pt.leak : guessed[pt.id] === 'hit'
    const miss = !revealed && guessed[pt.id] === 'miss'
    const resolvedClean = revealed && !pt.leak
    const done = revealed || running || Boolean(guessed[pt.id])
    const resting = !hit && !miss && !running && !resolvedClean
    const cls =
      'fi-pipe__valve' +
      (hit && !running ? ' is-leak' : '') +
      (miss && !running ? ' is-miss' : '') +
      (resolvedClean && !running ? ' is-clean' : '') +
      (running ? ' is-sealed' : '') +
      (resting && untouched ? ' is-hint' : '')

    const onKey = (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !done) {
        e.preventDefault()
        guess(pt)
      }
    }

    // Label sits below the valve on the horizontal run, beside it when stacked.
    const label = hit ? pt.title : miss || resolvedClean ? 'Clean hand-off' : null
    const labelProps =
      seg.orient === 'v'
        ? { x: 26, y: 4, textAnchor: 'start' }
        : { x: 0, y: 44, textAnchor: 'middle' }

    return (
      <g
        key={pt.id}
        className={cls}
        transform={`translate(${seg.mx} ${seg.my})`}
        role="button"
        tabIndex={done ? -1 : 0}
        aria-disabled={done || undefined}
        aria-label={
          hit
            ? `Leak found: ${pt.title}`
            : miss || resolvedClean
            ? 'A clean hand-off, not where the hour dies'
            : 'Guess whether the hour dies at this hand-off'
        }
        onClick={() => guess(pt)}
        onKeyDown={onKey}
      >
        {/* generous invisible hit area for touch + pointer */}
        <circle className="fi-pipe__valve-hit" r="24" />
        <circle className="fi-pipe__valve-halo" r="16" />
        <circle className="fi-pipe__valve-focus" r="21" />
        <circle className="fi-pipe__valve-ring" r="16" />
        <circle className="fi-pipe__valve-disc" r="11" />

        {resting && (
          <text className="fi-pipe__valve-q" x="0" y="1" textAnchor="middle" dominantBaseline="central">
            ?
          </text>
        )}

        {hit && !running && (
          <>
            {/* rupture burst */}
            <g className="fi-pipe__burst" aria-hidden="true">
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <line
                  key={a}
                  x1="0"
                  y1="0"
                  x2={Math.cos((a * Math.PI) / 180) * 20}
                  y2={Math.sin((a * Math.PI) / 180) * 20}
                />
              ))}
            </g>
            <circle className="fi-pipe__drip" cx="0" cy="18" r="3.5" />
          </>
        )}

        {miss && !running && (
          <path
            className="fi-pipe__check"
            d="M -5 0 L -1.5 3.5 L 5 -4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {resolvedClean && !running && (
          <path
            className="fi-pipe__check is-muted"
            d="M -5 0 L -1.5 3.5 L 5 -4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {label && (
          <text className="fi-pipe__valve-label" {...labelProps}>
            {label}
          </text>
        )}
      </g>
    )
  }
}

/* ------------------------------------------------------------------ *
 * Geometry. Pure: given an orientation and the stages, return the
 * viewBox, node rects, and the segments (with valve midpoints) between
 * them. Coordinates live here, never in the JSX.
 * ------------------------------------------------------------------ */
function layout(orient, stages) {
  const N = stages.length
  return orient === 'v' ? layoutV(stages, N) : layoutH(stages, N)
}

function layoutH(stages, N) {
  const W = 900
  const H = 250
  const nodeW = 124
  const nodeH = 64
  const cy = 104
  const gap = (W - N * nodeW) / (N - 1)
  const nodes = stages.map((s, i) => {
    const x = i * (nodeW + gap)
    return { ...s, x, y: cy - nodeH / 2, w: nodeW, h: nodeH, cx: x + nodeW / 2, cy }
  })
  const segments = []
  for (let i = 0; i < N - 1; i++) {
    const x1 = nodes[i].x + nodeW
    const x2 = nodes[i + 1].x
    segments.push({
      orient: 'h',
      d: `M ${x1} ${cy} L ${x2} ${cy}`,
      mx: (x1 + x2) / 2,
      my: cy,
    })
  }
  return { viewBox: `0 0 ${W} ${H}`, nodes, segments }
}

function layoutV(stages, N) {
  const W = 320
  const nodeW = 210
  const nodeH = 54
  const segLen = 64
  const cx = W / 2
  const top = 12
  const nodes = stages.map((s, i) => {
    const y = top + i * (nodeH + segLen)
    return { ...s, x: cx - nodeW / 2, y, w: nodeW, h: nodeH, cx, cy: y + nodeH / 2 }
  })
  const H = top + N * nodeH + (N - 1) * segLen + 40 // room for the end badge
  const segments = []
  for (let i = 0; i < N - 1; i++) {
    const y1 = nodes[i].y + nodeH
    const y2 = nodes[i + 1].y
    segments.push({
      orient: 'v',
      d: `M ${cx} ${y1} L ${cx} ${y2}`,
      mx: cx,
      my: (y1 + y2) / 2,
    })
  }
  return { viewBox: `0 0 ${W} ${H}`, nodes, segments }
}

/** Greedy-wrap a short node label to at most two lines. */
function wrapLabel(text, max = 13) {
  const words = text.split(' ')
  const lines = []
  let cur = ''
  for (const w of words) {
    if (cur && (cur + ' ' + w).length > max) {
      lines.push(cur)
      cur = w
    } else {
      cur = cur ? cur + ' ' + w : w
    }
  }
  if (cur) lines.push(cur)
  return lines.slice(0, 2)
}
