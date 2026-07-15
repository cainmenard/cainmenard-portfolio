import StationShell, { InteractionStub } from '../_components/StationShell'
import DataNote from '../_components/DataNote'
import StatFigure from '../_components/StatFigure'
import Citation from '../_components/Citation'
import Drawer from '../_components/Drawer'
import { STATIONS, INDUSTRY_FRAME, CITATIONS, VENDOR_GAUNTLET, TRAINING_ARC } from '../_data/fieldIntelligence'

const station = STATIONS.find((s) => s.id === 'field')

export default function StationField() {
  return (
    <StationShell
      station={station}
      teaser={
        <>
          <DataNote world="field" label="Field note">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
              <StatFigure value="1,800" unit="/mo" label="entries keyed by ~20 foremen" />
              <p className="fi-muted" style={{ margin: 0, maxWidth: '32ch', fontSize: '0.9rem', lineHeight: 1.55 }}>
                The foreman is the system of record and the single point of failure. Crews do not self-report.
              </p>
            </div>
          </DataNote>
          <p className="fi-muted" style={{ marginTop: '1rem', fontSize: '0.86rem' }}>
            Construction labor productivity has grown about 0.4% a year since 2000, against about 3% in manufacturing.
            <Citation
              detail={INDUSTRY_FRAME.text + ' ' + CITATIONS.mckinsey.detail}
              source={CITATIONS.mckinsey.label}
              url={CITATIONS.mckinsey.url}
            />
          </p>
        </>
      }
      drawers={
        <>
          <Drawer title="Go deeper: the vendor gauntlet" eventId="field-vendor">
            <p style={{ marginTop: 0 }}>{VENDOR_GAUNTLET.summary}</p>
            <p style={{ marginBottom: 0 }} className="fi-muted">
              {VENDOR_GAUNTLET.solution} The gate applied in every demo: “{VENDOR_GAUNTLET.gate}”
            </p>
          </Drawer>
          <Drawer title="Go deeper: the training arc" eventId="field-training">
            <p style={{ marginTop: 0 }}>{TRAINING_ARC.failure}</p>
            <p style={{ marginBottom: 0 }} className="fi-muted">
              {TRAINING_ARC.instrument} <span className="fi-projected">Projected</span> {TRAINING_ARC.goLive}.
            </p>
          </Drawer>
        </>
      }
    >
      <InteractionStub
        label="Marquee interaction"
        title="Twelve businesses, five ways to record one hour"
        note="A manual-to-digital board, plus the FedEx-timecard punchline as an animated moment."
      />
    </StationShell>
  )
}
