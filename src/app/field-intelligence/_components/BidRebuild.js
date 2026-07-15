import DataNote from './DataNote'
import { BID_REBUILD } from '../_data/fieldIntelligence'

const LO = 315000
const HI = 360000
const s = (v) => ((v - LO) / (HI - LO)) * 100
const usd = (n) => `$${n.toLocaleString('en-US')}`

/**
 * The payoff, clearly a sandbox composite. The old bid won the job but came in
 * below actual cost (a loss). The calibrated bid, priced from the book with the
 * measured factors, clears the actual cost. Figures are built off the real
 * $61.18 to $71.46 crew-rate factor, not a real ledger.
 */
export default function BidRebuild() {
  const { oldBid, calibratedBid, actualCost, captions, note } = BID_REBUILD

  return (
    <DataNote world="sandbox" label="Sandbox: rebuild the bid">
      <div className="fi-bid">
        <div className="fi-bid__scale" role="img" aria-label={`Old bid ${usd(oldBid)} below the actual cost ${usd(actualCost)}; calibrated bid ${usd(calibratedBid)} above it.`}>
          <span className="fi-bid__loss" style={{ width: `${s(actualCost)}%` }} aria-hidden="true" />
          <span className="fi-bid__cost" style={{ left: `${s(actualCost)}%` }}>
            <span className="fi-bid__cost-label fi-figure">Actual cost {usd(actualCost)}</span>
          </span>
          <span className="fi-bid__marker fi-bid__marker--old" style={{ left: `${s(oldBid)}%` }}>
            <span className="fi-bid__dot" />
            <span className="fi-bid__mlabel">
              Old bid <span className="fi-figure">{usd(oldBid)}</span>
            </span>
          </span>
          <span className="fi-bid__marker fi-bid__marker--cal" style={{ left: `${s(calibratedBid)}%` }}>
            <span className="fi-bid__dot" />
            <span className="fi-bid__mlabel">
              Calibrated bid <span className="fi-figure">{usd(calibratedBid)}</span>
            </span>
          </span>
        </div>

        <div className="fi-bid__captions">
          <p>
            <strong>Old bid.</strong> {captions.oldBid}
          </p>
          <p>
            <strong>Calibrated bid.</strong> {captions.calibratedBid}
          </p>
        </div>
        <p className="fi-bid__note fi-muted">{note}</p>
      </div>
    </DataNote>
  )
}
