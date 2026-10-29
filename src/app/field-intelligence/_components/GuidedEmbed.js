'use client'
import { useEffect, useRef, useState } from 'react'
import { GUIDED_EMBED } from '../_data/fieldIntelligence'
import { track } from './track'

/**
 * The live, deployed analytics tool embedded in an iframe, mounted lazily so
 * the external app does not load until it is near the viewport. A persistent
 * "real deployed tool, sample data" label stays visible, three guided missions
 * tell the viewer what to look for, and a mobile fallback opens the tool in a
 * new tab since a dense Recharts app is a poor fit inside a phone iframe.
 */
export default function GuidedEmbed() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [mission, setMission] = useState(0)
  const missions = GUIDED_EMBED.missions

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="fi-embed" ref={ref}>
      {GUIDED_EMBED.frame && (
        <p className="fi-embed__frame-note">{GUIDED_EMBED.frame}</p>
      )}

      <div className="fi-embed__missions" role="tablist" aria-label="Guided missions">
        {missions.map((m, i) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={i === mission}
            className={`fi-embed__chip${i === mission ? ' is-active' : ''}`}
            onClick={() => {
              setMission(i)
              track('fi_mission', { mission: m.id })
            }}
          >
            {i + 1}. {m.title}
          </button>
        ))}
      </div>
      <p className="fi-embed__look">
        <strong>{missions[mission].title}.</strong> {missions[mission].look}
      </p>

      <div className="fi-embed__console">
        <div className="fi-embed__chrome">
          <span className="fi-embed__label">
            <span className="fi-embed__dot" aria-hidden="true" />
            {GUIDED_EMBED.label}
          </span>
          <a href={GUIDED_EMBED.url} target="_blank" rel="noopener noreferrer" className="fi-embed__open">
            Open in new tab &#8599;
          </a>
        </div>
        <div className="fi-embed__frame">
          {visible ? (
            <iframe
              src={GUIDED_EMBED.url}
              title="Project Performance Analysis, a deployed tool running sample data"
              loading="lazy"
              onLoad={() => setLoaded(true)}
            />
          ) : null}
          {!loaded && (
            <div className="fi-embed__skeleton" aria-hidden="true">
              Loading the live tool
            </div>
          )}
        </div>
      </div>

      <p className="fi-embed__note fi-muted">{GUIDED_EMBED.note}</p>

      <div className="fi-embed__mobile">
        <a href={GUIDED_EMBED.url} target="_blank" rel="noopener noreferrer" className="fi-pipe__btn fi-pipe__btn--primary">
          Open the tool &#8599;
        </a>
        <span className="fi-muted">The interactive tool works best on a larger screen.</span>
      </div>
    </div>
  )
}
