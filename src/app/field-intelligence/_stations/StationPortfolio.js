import StationShell from '../_components/StationShell'
import WouldYouSign from '../_components/WouldYouSign'
import DivergingBars from '../_components/DivergingBars'
import SeatFlip from '../_components/SeatFlip'
import BidRebuild from '../_components/BidRebuild'
import GuidedEmbed from '../_components/GuidedEmbed'
import DataNote from '../_components/DataNote'
import StatFigure from '../_components/StatFigure'
import Drawer from '../_components/Drawer'
import { STATIONS, PORTFOLIO_FRAME, EPC_SCATTER, OBJECTIONS, LOOP_MECHANICS } from '../_data/fieldIntelligence'

const station = STATIONS.find((s) => s.id === 'portfolio')
const wc = EPC_SCATTER.worstCustomer

export default function StationPortfolio() {
  return (
    <StationShell station={station}>
      <p className="fi-lead fi-part" style={{ maxWidth: '48ch' }}>
        The completed jobs separate systematic bias from execution noise. Three books,{' '}
        {PORTFOLIO_FRAME.totalProjects} projects, about {PORTFOLIO_FRAME.totalValue}.
      </p>

      {/* Would you sign it, then the scatter reveal */}
      <div className="fade-section fi-part">
        <WouldYouSign />
      </div>

      {/* The repeated shape across three books */}
      <div className="fade-section fi-part">
        <p className="fi-kicker fi-part__k">The repeated shape</p>
        <DivergingBars />
      </div>

      {/* The seat flip */}
      <div className="fade-section fi-part">
        <p className="fi-kicker fi-part__k">The seat flip</p>
        <SeatFlip />
      </div>

      {/* The customer cut */}
      <div className="fade-section fi-part">
        <p className="fi-kicker fi-part__k">The customer cut</p>
        <DataNote world="field" label="The largest customer">
          <p style={{ margin: '0 0 1rem', fontSize: '1.05rem', fontFamily: 'var(--fi-font-display)' }}>{wc.line}</p>
          <div className="fi-cutstats">
            <StatFigure size="sm" value={wc.projects} label="projects" />
            <StatFigure size="sm" value={wc.revenue} label="revenue" />
            <StatFigure size="sm" value={wc.netLoss} label="net loss" />
            <StatFigure size="sm" value={`${wc.directOverPct}%`} label="direct costs over" />
          </div>
        </DataNote>
      </div>

      {/* Objections answered */}
      <div className="fade-section fi-part">
        <p className="fi-kicker fi-part__k">Answered before a veteran raises it</p>
        <div className="fi-objections">
          {OBJECTIONS.map((o) => (
            <div key={o.id} className="fi-objection">
              <span className="fi-objection__q">{o.title}</span>
              <p>{o.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The live tool */}
      <div className="fade-section fi-part">
        <p className="fi-kicker fi-part__k">The tool, deployed</p>
        <GuidedEmbed />
      </div>

      <div className="fade-section fi-part">
        <Drawer title="Go deeper: rebuild the bid" eventId="portfolio-bid">
          <BidRebuild />
        </Drawer>

        <Drawer title="Go deeper: how the loop actually closes" eventId="portfolio-loop">
          <ul>
            <li>{LOOP_MECHANICS.factTable}</li>
            <li>{LOOP_MECHANICS.segment}</li>
            <li>{LOOP_MECHANICS.reblend}</li>
            <li>{LOOP_MECHANICS.gate}</li>
          </ul>
        </Drawer>
      </div>
    </StationShell>
  )
}
