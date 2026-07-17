import StationShell from '../_components/StationShell'
import MondayDocket from '../_components/MondayDocket'
import MechanismGrid from '../_components/MechanismGrid'
import { STATIONS } from '../_data/fieldIntelligence'

const station = STATIONS.find((s) => s.id === 'decisions')

/**
 * Station 5, the payoff, reads as two movements instead of two stacked grids:
 *   01 the test  three real invitations to bid; the whole day now lets you
 *                make the call.
 *   02 the map   every call traces back to one cut of the day's data, tagged
 *                to the station that produced it.
 * Same movement spine as Station 4 so the page reads as one system.
 */
export default function StationDecisions() {
  return (
    <StationShell station={station}>
      {/* 01: the test, can you make the call */}
      <section className="fi-movement fade-section">
        <header className="fi-movement__head">
          <span className="fi-movement__idx">01</span>
          <h3 className="fi-movement__title">Can you make the call?</h3>
        </header>
        <p className="fi-movement__lede">
          Three invitations to bid are in the inbox. Pick a move on each. The whole day is
          behind you now, so these are makeable.
        </p>
        <MondayDocket />
      </section>

      {/* 02: the map, every call traces back to a cut of the data */}
      <section className="fi-movement fade-section">
        <header className="fi-movement__head">
          <span className="fi-movement__idx">02</span>
          <h3 className="fi-movement__title">What each cut of the data decides.</h3>
        </header>
        <p className="fi-movement__lede">
          None of those calls is a hunch. Each one is a rule the day earned. Tap a rule to
          see the exact cut behind it.
        </p>
        <MechanismGrid />
      </section>
    </StationShell>
  )
}
