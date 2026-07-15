import DataNote from './DataNote'
import { FINALE } from '../_data/fieldIntelligence'

/**
 * The finale: an AI layer on top of the whole pipe, framed modestly. Grounded
 * on live program data, read-only, a source link on every answer. The value is
 * trust and retrieval, not oracle answers. Ties back to the missing-information
 * slice from the stopwatch.
 */
export default function AgentFinale() {
  return (
    <div className="fi-agentwrap">
      <p className="fi-kicker">{FINALE.kicker}</p>
      <h2 id="finale-title" className="fi-display" style={{ fontSize: 'clamp(1.8rem, 1.3rem + 2.2vw, 3rem)', margin: '0.6rem 0 1.25rem' }}>
        {FINALE.title}
      </h2>
      <p className="fi-lead" style={{ marginBottom: '1rem', maxWidth: '46ch' }}>{FINALE.body}</p>

      <ul className="fi-agent__constraints">
        {FINALE.constraints.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      <div className="fi-agent" role="figure" aria-label="An example grounded answer from the agent">
        <div className="fi-agent__q">
          <span className="fi-agent__who">Ask</span>
          {FINALE.agentDemo.q}
        </div>
        <div className="fi-agent__a">
          <p>{FINALE.agentDemo.a}</p>
          <span className="fi-agent__cite">&#8599; {FINALE.agentDemo.source}</span>
        </div>
      </div>

      <DataNote world="field" label="Field note">
        <p style={{ margin: 0, lineHeight: 1.55 }}>{FINALE.proof.text}</p>
      </DataNote>

      <p className="fi-finale__proof">{FINALE.tieback}</p>
    </div>
  )
}
