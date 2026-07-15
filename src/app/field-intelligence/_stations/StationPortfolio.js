import StationShell, { InteractionStub } from '../_components/StationShell'
import DataNote from '../_components/DataNote'
import StatFigure from '../_components/StatFigure'
import { STATIONS, PORTFOLIO_FRAME, BID_REBUILD, GUIDED_EMBED } from '../_data/fieldIntelligence'

const station = STATIONS.find((s) => s.id === 'portfolio')
const usd = (n) => `$${n.toLocaleString('en-US')}`

export default function StationPortfolio() {
  return (
    <StationShell
      station={station}
      teaser={
        <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))' }}>
          <DataNote world="field" label="Field note">
            <StatFigure value="532" unit="projects" label={`three forensic books, about ${PORTFOLIO_FRAME.totalValue}`} />
          </DataNote>
          {/* Sandbox world, deliberately distinct from the field notes above */}
          <DataNote world="sandbox" label="Sandbox">
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <StatFigure size="sm" value={usd(BID_REBUILD.oldBid)} label="old bid" />
              <StatFigure size="sm" value={usd(BID_REBUILD.calibratedBid)} label="calibrated bid" />
              <StatFigure size="sm" value={usd(BID_REBUILD.actualCost)} label="actual cost" />
            </div>
            <p className="fi-muted" style={{ margin: '0.75rem 0 0', fontSize: '0.82rem' }}>{BID_REBUILD.note}</p>
          </DataNote>
        </div>
      }
    >
      <InteractionStub
        label="Centerpiece"
        title="The estimating leak"
        note={`Would-you-sign, the scatter reveal, the three-book diverging bars, the seat flip, and the rebuild-the-bid payoff. Then the live tool (${GUIDED_EMBED.label}) with guided missions.`}
      />
    </StationShell>
  )
}
