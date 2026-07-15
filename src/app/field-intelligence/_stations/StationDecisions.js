import StationShell, { InteractionStub } from '../_components/StationShell'
import DataNote from '../_components/DataNote'
import { STATIONS, FINALE } from '../_data/fieldIntelligence'

const station = STATIONS.find((s) => s.id === 'decisions')

export default function StationDecisions() {
  return (
    <StationShell
      station={station}
      teaser={
        <DataNote world="field" label="Field note">
          <p style={{ margin: 0, lineHeight: 1.55 }}>{FINALE.proof.text}</p>
          <p className="fi-muted" style={{ margin: '0.6rem 0 0', fontSize: '0.86rem' }}>{FINALE.tieback}</p>
        </DataNote>
      }
    >
      <InteractionStub
        label="Marquee interaction"
        title="Monday's docket"
        note="Three invitations to bid, answered as interactive decisions, then the mechanism cards that show what each cut of the data decides."
      />
    </StationShell>
  )
}
