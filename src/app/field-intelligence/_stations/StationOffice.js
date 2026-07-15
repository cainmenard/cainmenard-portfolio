import StationShell, { InteractionStub } from '../_components/StationShell'
import DataNote from '../_components/DataNote'
import StatFigure from '../_components/StatFigure'
import Drawer from '../_components/Drawer'
import { STATIONS, PIPELINE, OFFICE_DRAWERS } from '../_data/fieldIntelligence'

const station = STATIONS.find((s) => s.id === 'office')

export default function StationOffice() {
  return (
    <StationShell
      station={station}
      teaser={
        <DataNote world="field" label="Field note">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
            <StatFigure value="2 / 10" label="integrations automated, before the build" />
            <p className="fi-muted" style={{ margin: 0, maxWidth: '34ch', fontSize: '0.9rem', lineHeight: 1.55 }}>
              {PIPELINE.honest}
            </p>
          </div>
        </DataNote>
      }
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
      <InteractionStub
        label="Marquee interaction"
        title="Predict where the approved hour dies"
        note="Click the pipe you think leaks, reveal the two real leaks, then watch the single-trigger future state."
      />
    </StationShell>
  )
}
