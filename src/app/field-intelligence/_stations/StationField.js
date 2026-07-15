'use client'
import { useState } from 'react'
import StationShell from '../_components/StationShell'
import CaptureBoard from '../_components/CaptureBoard'
import FedexMoment from '../_components/FedexMoment'
import DataNote from '../_components/DataNote'
import Citation from '../_components/Citation'
import Drawer from '../_components/Drawer'
import { STATIONS, CITATIONS, FIELD_FACTS, VENDOR_GAUNTLET, TRAINING_ARC } from '../_data/fieldIntelligence'

const SPANISH_ONLY = FIELD_FACTS.find((f) => f.unit === 'Spanish-only')

const station = STATIONS.find((s) => s.id === 'field')

export default function StationField() {
  const [fedexTrigger, setFedexTrigger] = useState(0)

  return (
    <StationShell
      station={station}
      drawers={
        <>
          <Drawer title="Go deeper: the vendor gauntlet" eventId="field-vendor">
            <p style={{ marginTop: 0 }}>
              <strong>{VENDOR_GAUNTLET.window}.</strong> {VENDOR_GAUNTLET.summary}
            </p>
            <p className="fi-muted">{VENDOR_GAUNTLET.solution}</p>
            <div className="fi-dna">
              {VENDOR_GAUNTLET.dna.map((d) => (
                <div key={d.label} className="fi-dna__card">
                  <span className="fi-dna__label">{d.label}</span>
                  <span className="fi-dna__value">{d.value}</span>
                </div>
              ))}
            </div>
            <p className="fi-gate">“{VENDOR_GAUNTLET.gate}”</p>
            <p className="fi-muted" style={{ marginBottom: 0, fontSize: '0.82rem' }}>
              {VENDOR_GAUNTLET.honestLabel}
            </p>
          </Drawer>

          <Drawer title="Go deeper: the training arc" eventId="field-training">
            <p style={{ marginTop: 0 }}>{TRAINING_ARC.failure}</p>
            <ul>
              {TRAINING_ARC.worked.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <p className="fi-gate" style={{ fontStyle: 'normal', fontFamily: 'var(--fi-font-body)', fontWeight: 600 }}>
              {TRAINING_ARC.belief}
            </p>
            <p className="fi-muted">{TRAINING_ARC.instrument}</p>
            <p style={{ marginBottom: 0 }}>
              <span className="fi-projected">Projected</span> {TRAINING_ARC.goLive}. Program terminology:{' '}
              {TRAINING_ARC.terminology}.
            </p>
          </Drawer>

          <Drawer title="Go deeper: the design constraint" eventId="field-constraint">
            <DataNote world="field" label="Design constraint" className="fi-constraint">
              <p style={{ margin: 0, lineHeight: 1.55 }}>{SPANISH_ONLY.text}</p>
            </DataNote>
          </Drawer>
        </>
      }
    >
      <CaptureBoard onFedexClick={() => setFedexTrigger((t) => t + 1)} />

      <p className="fi-board__takeaway">{station.takeaway}</p>

      <p className="fi-muted fi-board__frame">
        That manual-heavy spread is not incidental. Construction labor productivity has grown about 0.4% a year
        since 2000, against about 3% in manufacturing — the same gap that shows up as 10% cumulative growth for
        construction against 90% for manufacturing, 2000 to 2022.
        <Citation
          detail={CITATIONS.mckinsey.detail}
          source={CITATIONS.mckinsey.label}
          url={CITATIONS.mckinsey.url}
        />
      </p>

      <FedexMoment trigger={fedexTrigger} />
    </StationShell>
  )
}
