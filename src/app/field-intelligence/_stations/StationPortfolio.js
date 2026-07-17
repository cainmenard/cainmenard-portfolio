import StationShell from '../_components/StationShell'
import WouldYouSign from '../_components/WouldYouSign'
import DivergingBars from '../_components/DivergingBars'
import SeatFlip from '../_components/SeatFlip'
import BidRebuild from '../_components/BidRebuild'
import GuidedEmbed from '../_components/GuidedEmbed'
import Drawer from '../_components/Drawer'
import { STATIONS, PORTFOLIO_FRAME, OBJECTIONS, LOOP_MECHANICS } from '../_data/fieldIntelligence'

const station = STATIONS.find((s) => s.id === 'portfolio')

/**
 * Station 4, the centerpiece, reads as three movements instead of a flat stack
 * of parts:
 *   01 the hook       one book that looks fine; the scatter and its losing
 *                     customer reveal in one beat that the average lied.
 *   02 the proof      the same shape across three books, with the seat flip as
 *                     a detail and the objections demoted to a quiet aside.
 *   03 the payoff     the bias now has a price, and the analysis is a live tool.
 */
export default function StationPortfolio() {
  return (
    <StationShell station={station}>
      {/* 01: the hook, the average is a liar */}
      <section className="fi-movement fade-section">
        <header className="fi-movement__head">
          <span className="fi-movement__idx">01</span>
          <h3 className="fi-movement__title">The average is a liar.</h3>
        </header>
        <WouldYouSign />
      </section>

      {/* 02: the proof, the same shape, three books */}
      <section className="fi-movement fade-section">
        <header className="fi-movement__head">
          <span className="fi-movement__idx">02</span>
          <h3 className="fi-movement__title">The same shape, three books.</h3>
        </header>
        <p className="fi-movement__lede">
          One book could be luck. Here are three: {PORTFOLIO_FRAME.totalProjects} projects, about{' '}
          {PORTFOLIO_FRAME.totalValue}, three different companies. The bias repeats.
        </p>

        <DivergingBars />

        <div className="fi-movement__part fade-section">
          <p className="fi-kicker fi-part__k">The same company, two seats</p>
          <SeatFlip />
        </div>

        <div className="fi-movement__part fade-section">
          <p className="fi-kicker fi-part__k">Answered before a veteran raises it</p>
          <div className="fi-objections fi-objections--strip">
            {OBJECTIONS.map((o) => (
              <div key={o.id} className="fi-objection">
                <span className="fi-objection__q">{o.title}</span>
                <p>{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03: the payoff, so you can price the next one */}
      <section className="fi-movement fade-section">
        <header className="fi-movement__head">
          <span className="fi-movement__idx">03</span>
          <h3 className="fi-movement__title">So you can price the next one.</h3>
        </header>
        <p className="fi-movement__lede">
          Once the bias has a name, it has a price.
        </p>

        <GuidedEmbed />

        <div className="fi-movement__part fade-section">
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
      </section>
    </StationShell>
  )
}
