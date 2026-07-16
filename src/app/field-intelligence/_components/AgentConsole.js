'use client'
import { useEffect, useRef, useState } from 'react'
import { PROGRAM_TRACKER, AGENT_CONSOLE } from '../_data/fieldIntelligence'
import { answer } from './agentEngine'
import { useReducedMotion } from './useReducedMotion'
import { track } from './track'

/**
 * The finale console: a live, grounded-retrieval demo of the agent.
 *
 * A visitor asks a question (a suggested chip or free text); the pure engine
 * computes the answer straight from the tracker rows and returns the refs it
 * used. Those refs are cited under the answer AND highlighted in the visible
 * data table, so "a source link on every answer" is something the reader can
 * watch happen. No model, no backend — the honesty is the point.
 */

function dueLabel(r) {
  if (r.done) return 'closed'
  if (r.dueIn < 0) return `${-r.dueIn}d past`
  if (r.dueIn === 0) return 'today'
  return `in ${r.dueIn}d`
}

function dueState(r) {
  if (r.done) return 'done'
  if (r.dueIn < 0) return 'overdue'
  if (r.dueIn <= 7) return 'soon'
  return 'open'
}

function valueLabel(r) {
  if (!r.amount) return '—'
  return r.amount >= 1e6 ? `$${(r.amount / 1e6).toFixed(2)}M` : `$${Math.round(r.amount / 1000)}k`
}

export default function AgentConsole() {
  const reduced = useReducedMotion()
  const { rows, sampleNote, columns } = PROGRAM_TRACKER
  const { handle, status, seedPrompt, prompts, hint } = AGENT_CONSOLE

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const idRef = useRef(0)
  const seededRef = useRef(false)
  const threadRef = useRef(null)
  const timerRef = useRef(null)

  // Refs cited by the most recent agent answer — highlighted in the table.
  const lastAgent = [...messages].reverse().find((m) => m.role === 'agent')
  const highlit = new Set(lastAgent?.cites || [])

  const nextId = () => {
    idRef.current += 1
    return idRef.current
  }

  const ask = (text) => {
    const q = text.trim()
    if (!q || pending) return
    track('fi_agent_ask', { q: q.slice(0, 48) })
    const res = answer(q, PROGRAM_TRACKER)
    setMessages((m) => [...m, { id: nextId(), role: 'user', text: q }])
    setInput('')

    const commit = () =>
      setMessages((m) => [
        ...m,
        { id: nextId(), role: 'agent', text: res.text, cites: res.cites, kind: res.kind },
      ])

    if (reduced) {
      commit()
      return
    }
    // A brief retrieval beat — deterministic, not a fake typewriter.
    setPending(true)
    timerRef.current = setTimeout(() => {
      setPending(false)
      commit()
    }, 480)
  }

  // Seed the transcript with one real answer on mount.
  useEffect(() => {
    if (seededRef.current) return
    seededRef.current = true
    const res = answer(seedPrompt, PROGRAM_TRACKER)
    setMessages([
      { id: nextId(), role: 'user', text: seedPrompt },
      { id: nextId(), role: 'agent', text: res.text, cites: res.cites, kind: res.kind },
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  // Keep the newest message in view without yanking the whole page.
  useEffect(() => {
    const el = threadRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, pending])

  const onSubmit = (e) => {
    e.preventDefault()
    ask(input)
  }

  return (
    <div className="fi-console" role="group" aria-label="Ask the program agent">
      <div className="fi-console__bar">
        <span className="fi-console__handle">{handle}</span>
        <span className="fi-console__status">
          <span className="fi-console__dot" aria-hidden="true" />
          {status}
        </span>
      </div>

      {/* The data it reads — visible, so the citations mean something. */}
      <div className="fi-console__data">
        <div className="fi-tracker-wrap">
          <table className="fi-tracker">
            <caption className="fi-tracker__cap">{sampleNote}</caption>
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c} scope="col">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const on = highlit.has(r.ref)
                return (
                  <tr key={r.ref} className={`fi-tracker__row${on ? ' is-cited' : ''}`}>
                    <td className="fi-tracker__ref">{r.ref}</td>
                    <td>{r.task}</td>
                    <td className="fi-tracker__book">{r.book}</td>
                    <td>{r.waitingOn}</td>
                    <td>
                      <span className={`fi-due fi-due--${dueState(r)}`}>{dueLabel(r)}</span>
                    </td>
                    <td className={`fi-tracker__val${r.amount ? '' : ' is-empty'}`}>{valueLabel(r)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transcript */}
      <div className="fi-console__thread" ref={threadRef} aria-live="polite">
        {messages.map((m) =>
          m.role === 'user' ? (
            <div key={m.id} className="fi-msg fi-msg--user">
              <span className="fi-msg__role">Ask</span>
              <p>{m.text}</p>
            </div>
          ) : (
            <div key={m.id} className={`fi-msg fi-msg--agent fi-msg--${m.kind}`}>
              <span className="fi-msg__role">Agent</span>
              <div className="fi-msg__body">
                <p>{m.text}</p>
                {m.cites?.length > 0 ? (
                  <p className="fi-msg__cites">
                    <span className="fi-msg__cites-label">&#8599; source</span>
                    {m.cites.map((ref) => (
                      <span key={ref} className="fi-cite-chip">{ref}</span>
                    ))}
                    <span className="fi-msg__ro">read-only</span>
                  </p>
                ) : (
                  m.kind === 'declined' && (
                    <p className="fi-msg__cites">
                      <span className="fi-msg__ro">no source — not in the data</span>
                    </p>
                  )
                )}
              </div>
            </div>
          )
        )}
        {pending && (
          <div className="fi-msg fi-msg--agent fi-msg--pending" aria-hidden="true">
            <span className="fi-msg__role">Agent</span>
            <span className="fi-console__typing">
              <i /><i /><i />
            </span>
          </div>
        )}
      </div>

      {/* Suggested prompts */}
      <div className="fi-console__chips">
        {prompts.map((p) => (
          <button key={p} type="button" className="fi-chip" onClick={() => ask(p)} disabled={pending}>
            {p}
          </button>
        ))}
      </div>

      {/* Free-text input */}
      <form className="fi-console__form" onSubmit={onSubmit}>
        <input
          type="text"
          className="fi-console__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the tracker…"
          aria-label="Ask the agent about the program tracker"
          autoComplete="off"
        />
        <button type="submit" className="fi-console__send" disabled={pending || !input.trim()}>
          Ask
        </button>
      </form>

      {hint && <p className="fi-console__hint">{hint}</p>}
    </div>
  )
}
