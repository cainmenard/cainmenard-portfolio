/**
 * Shared layout for a station: scene-setting head, the marquee interaction
 * (children), an optional data teaser, and optional go-deeper drawers.
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

        {drawers && <div className="fade-section" style={{ marginTop: '2rem' }}>{drawers}</div>}
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
