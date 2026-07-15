import StationShell from '../_components/StationShell'
import MondayDocket from '../_components/MondayDocket'
import { STATIONS, MECHANISM_CARDS } from '../_data/fieldIntelligence'

const station = STATIONS.find((s) => s.id === 'decisions')

export default function StationDecisions() {
  return (
    <StationShell station={station}>
      <MondayDocket />

      <div className="fade-section fi-part">
        <p className="fi-kicker fi-part__k">What each cut of the data decides</p>
        <div className="fi-mech">
          {MECHANISM_CARDS.map((m) => (
            <div key={m.id} className="fi-mech__card">
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </StationShell>
  )
}
