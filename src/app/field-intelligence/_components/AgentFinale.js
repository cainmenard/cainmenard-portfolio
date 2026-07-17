import AgentConsole from './AgentConsole'
import { FINALE } from '../_data/fieldIntelligence'

/**
 * The finale: an AI layer on top of the whole pipe. Rather than describe the
 * agent, the section hands it to the reader — a live, client-side query
 * console (AgentConsole) that filters, aggregates, and ranks the program
 * tracker and cites the rows behind every answer. The prose is deliberately
 * thin so the tool is the centrepiece.
 */
export default function AgentFinale() {
  return (
    <div className="fi-agentwrap">
      <p className="fi-kicker">{FINALE.kicker}</p>
      <h2 id="finale-title" className="fi-display" style={{ fontSize: 'clamp(1.9rem, 1.3rem + 2.4vw, 3.1rem)', margin: '0.6rem 0 1rem' }}>
        {FINALE.title}
      </h2>
      <p className="fi-lead" style={{ marginBottom: '1.5rem', maxWidth: '54ch' }}>{FINALE.body}</p>

      <AgentConsole />
    </div>
  )
}
