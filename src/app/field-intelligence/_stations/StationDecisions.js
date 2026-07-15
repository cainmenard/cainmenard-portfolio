import StationShell from '../_components/StationShell'
import MondayDocket from '../_components/MondayDocket'
import MechanismGrid from '../_components/MechanismGrid'
import { STATIONS } from '../_data/fieldIntelligence'

const station = STATIONS.find((s) => s.id === 'decisions')

export default function StationDecisions() {
  return (
    <StationShell station={station}>
      <MondayDocket />

      <div className="fade-section fi-part">
        <p className="fi-kicker fi-part__k">What each cut of the data decides</p>
        <p className="fi-muted" style={{ margin: '0 0 1rem', fontSize: '0.82rem' }}>
          Tap a decision to bring it into focus.
        </p>
        <MechanismGrid />
      </div>
    </StationShell>
  )
}
