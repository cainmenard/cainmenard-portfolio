import StationShell, { InteractionStub } from '../_components/StationShell'
import DataNote from '../_components/DataNote'
import Drawer from '../_components/Drawer'
import { STATIONS, CLIFF, STOPWATCH } from '../_data/fieldIntelligence'

const station = STATIONS.find((s) => s.id === 'job-cost')

export default function StationJobCost() {
  return (
    <StationShell
      station={station}
      teaser={
        <DataNote world="field" label="Field note">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'baseline' }}>
            <p className="fi-figure" style={{ fontSize: '2rem', fontWeight: 500, margin: 0 }}>
              $71.46 <span className="fi-muted" style={{ fontSize: '0.9rem' }}>actual vs</span> $61.18{' '}
              <span className="fi-muted" style={{ fontSize: '0.9rem' }}>estimated</span>
            </p>
          </div>
          <p className="fi-muted" style={{ margin: '0.75rem 0 0', maxWidth: '46ch', fontSize: '0.9rem', lineHeight: 1.55 }}>
            {CLIFF.crewRate.caught} {CLIFF.marker}
          </p>
        </DataNote>
      }
      drawers={
        <Drawer title="Go deeper: the stopwatch" eventId="jobcost-stopwatch">
          <p style={{ marginTop: 0 }}>
            Field time studies coded an 8-hour day into {STOPWATCH.segments[0].pct}% direct install,{' '}
            {STOPWATCH.segments[1].pct}% support work, and {STOPWATCH.segments[2].pct}% recoverable lost time.
          </p>
          <p style={{ marginBottom: 0 }} className="fi-muted">
            Of the lost time, off-task leads, but material handling (~17%) and missing information from the office or GC
            (~16%) are right behind, and both are fixable from a desk. {STOPWATCH.line}
          </p>
        </Drawer>
      }
    >
      <InteractionStub
        label="Marquee interaction"
        title="The 90% cliff"
        note="Trigger the quiet forecast against the honest weekly reforecast, with the 80%-of-labor-hours close-out marker."
      />
    </StationShell>
  )
}
