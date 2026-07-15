/**
 * Shared layout for a station: scene-setting head, the marquee interaction
 * (children), an optional data teaser, the quiet "my part" claim, optional
 * go-deeper drawers, and the one-line handoff to the next station.
 *
 * Each station file supplies its own interaction and drawers; this keeps
 * the rhythm identical across all five so the page reads as one system.
 */
export default function StationShell({ station, children, teaser, drawers }) {
  return (
    <section id={station.id} className="fi-section fi-station" aria-labelledby={`${station.id}-title`}>
      <div className="fi-wrap">
        <header className="fi-station__head fade-section">
          <div className="fi-station__meta">
            <span className="fi-kicker">{station.kicker}</span>
            <span className="fi-time">{station.time}</span>
          </div>
          <h2 id={`${station.id}-title`} className="fi-station__title">
            {station.title}
          </h2>
          <p className="fi-scene">{station.scene}</p>
          <span className="fi-cast">{station.cast}</span>
        </header>

        <div className="fade-section">{children}</div>

        {teaser && <div className="fade-section" style={{ marginTop: '1.75rem' }}>{teaser}</div>}

        <div className="fi-mypart fade-section">
          <span className="fi-mypart__tag">My part</span>
          {station.myPart}
        </div>

        {drawers && <div className="fade-section" style={{ marginTop: '2rem' }}>{drawers}</div>}

        <p className="fi-handoff fade-section">
          <svg className="fi-handoff__arrow" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="4" y1="12" x2="19" y2="12" />
            <polyline points="13 6 19 12 13 18" />
          </svg>
          {station.handoff}
        </p>
      </div>
    </section>
  )
}

/** The placeholder that marks where a station's hero interaction will land. */
export function InteractionStub({ label, title, note }) {
  return (
    <div className="fi-stub" role="img" aria-label={`${title} (interaction in progress)`}>
      <span className="fi-stub__label">{label}</span>
      <p className="fi-stub__title">{title}</p>
      {note && <p className="fi-muted" style={{ fontSize: '0.85rem', margin: 0 }}>{note}</p>}
    </div>
  )
}
