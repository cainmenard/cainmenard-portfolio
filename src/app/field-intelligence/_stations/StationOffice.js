import StationShell from '../_components/StationShell'
import Pipeline from '../_components/Pipeline'
import Drawer from '../_components/Drawer'
import { STATIONS, OFFICE_DRAWERS } from '../_data/fieldIntelligence'

const station = STATIONS.find((s) => s.id === 'office')

export default function StationOffice() {
  return (
    <StationShell
      station={station}
      drawers={
        <>
          {OFFICE_DRAWERS.map((d) => (
            <Drawer key={d.id} title={`Go deeper: ${d.title.toLowerCase()}`} eventId={`office-${d.id}`}>
              <p style={{ margin: 0 }}>{d.body}</p>
            </Drawer>
          ))}
        </>
      }
    >
      <Pipeline />
    </StationShell>
  )
}
