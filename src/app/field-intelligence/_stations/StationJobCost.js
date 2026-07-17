import StationShell from '../_components/StationShell'
import CliffChart from '../_components/CliffChart'
import StopwatchStudy from '../_components/StopwatchStudy'
import DataNote from '../_components/DataNote'
import { STATIONS, CLIFF } from '../_data/fieldIntelligence'

const station = STATIONS.find((s) => s.id === 'job-cost')

export default function StationJobCost() {
  return (
    <StationShell station={station}>
      <CliffChart />

      <DataNote world="field" label="The in-flight catch" className="fi-jobcost__catch">
        <p style={{ margin: 0, lineHeight: 1.55 }}>{CLIFF.crewRate.caught}</p>
        <p className="fi-muted" style={{ margin: '0.6rem 0 0', fontSize: '0.86rem' }}>{CLIFF.marker}</p>
      </DataNote>

      <div className="fi-jobcost__study">
        <p className="fi-kicker" style={{ marginBottom: '1rem' }}>The stopwatch</p>
        <StopwatchStudy />
      </div>
    </StationShell>
  )
}
