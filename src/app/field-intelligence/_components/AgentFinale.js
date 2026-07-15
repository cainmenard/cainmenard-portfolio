import DataNote from './DataNote'
import AgentConsole from './AgentConsole'
import { FINALE } from '../_data/fieldIntelligence'

/**
 * The finale: an AI layer on top of the whole pipe, framed modestly. Rather
 * than assert the agent exists, this section lets the reader use it — a live,
 * client-side grounded-retrieval console (AgentConsole) that computes every
 * answer from the visible tracker and cites the rows it used. Read-only, a
 * source on every answer, honest refusals. Ties back to the missing-information
 * slice from the stopwatch.
 */
export default function AgentFinale() {
  return (
    <div className="fi-agentwrap">
      <p className="fi-kicker">{FINALE.kicker}</p>
      <h2 id="finale-title" className="fi-display" style={{ fontSize: 'clamp(1.8rem, 1.3rem + 2.2vw, 3rem)', margin: '0.6rem 0 1.25rem' }}>
        {FINALE.title}
      </h2>
      <p className="fi-lead" style={{ marginBottom: '1rem', maxWidth: '48ch' }}>{FINALE.body}</p>

      <ul className="fi-agent__constraints">
        {FINALE.constraints.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      <p className="fi-agent__invite">{FINALE.invite}</p>

      <AgentConsole />

      <DataNote world="field" label="Field note">
        <p style={{ margin: 0, lineHeight: 1.55 }}>{FINALE.proof.text}</p>
      </DataNote>

      <p className="fi-finale__proof">{FINALE.tieback}</p>
    </div>
  )
}
