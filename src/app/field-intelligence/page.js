'use client'
import { useEffect, useRef } from 'react'
import { useFadeOnScroll } from '@/hooks/useFadeOnScroll'
import { useActiveSection } from './_components/useActiveSection'
import ProgressRail from './_components/ProgressRail'
import DataNote from './_components/DataNote'
import { track } from './_components/track'
import StationField from './_stations/StationField'
import StationOffice from './_stations/StationOffice'
import StationJobCost from './_stations/StationJobCost'
import StationPortfolio from './_stations/StationPortfolio'
import StationDecisions from './_stations/StationDecisions'
import {
  ROUTE,
  RAIL,
  SECTION_BANDS,
  HERO,
  FINALE,
  EPILOGUE,
  COLOPHON,
  CONTACT,
} from './_data/fieldIntelligence'

const SECTION_IDS = [
  'hero',
  'field',
  'office',
  'job-cost',
  'portfolio',
  'decisions',
  'finale',
  'epilogue',
  'colophon',
]
const LOOPED_SECTIONS = ['finale', 'epilogue', 'colophon']

export default function FieldIntelligence() {
  useFadeOnScroll()
  const activeSection = useActiveSection(SECTION_IDS)
  const band = SECTION_BANDS[activeSection] || 'predawn'

  const activeIndex = RAIL.findIndex((r) => r.id === activeSection)
  const looped = LOOPED_SECTIONS.includes(activeSection)

  // Instrumentation: coarse "which station is on screen" signal.
  const reached = useRef(new Set())
  useEffect(() => {
    if (!activeSection || reached.current.has(activeSection)) return
    reached.current.add(activeSection)
    track('fi_section_reached', { section: activeSection })
  }, [activeSection])

  return (
    <div className="fi-root" data-band={band}>
      <div className="fi-backdrop" aria-hidden="true" />

      <ProgressRail
        sections={RAIL}
        activeIndex={activeIndex}
        looped={looped}
        backHref={ROUTE.backHref}
        backLabel={ROUTE.backLabel}
      />

      <main id="main-content" className="fi-content">
        {/* ─── HERO ─── */}
        <section id="hero" className="fi-section fi-hero" aria-label="Introduction">
          <div className="fi-wrap fade-section">
            <p className="fi-kicker fi-hero__eyebrow">{HERO.eyebrow}</p>
            <h1 className="fi-hero__title">
              A Day of <em>Field Intelligence</em>
            </h1>
            <p className="fi-lead fi-hero__standfirst">{HERO.standfirst}</p>
            <a href="#field" className="fi-hero__cue" aria-label="Begin the day">
              <span className="fi-hero__cue-dot" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="4" x2="12" y2="20" />
                  <polyline points="6 14 12 20 18 14" />
                </svg>
              </span>
              {HERO.scrollCue}
            </a>
          </div>
        </section>

        {/* ─── FIVE STATIONS ─── */}
        <StationField />
        <StationOffice />
        <StationJobCost />
        <StationPortfolio />
        <StationDecisions />

        {/* ─── FINALE ─── */}
        <section id="finale" className="fi-section" aria-labelledby="finale-title">
          <div className="fi-wrap fi-wrap--narrow fade-section">
            <p className="fi-kicker">{FINALE.kicker}</p>
            <h2 id="finale-title" className="fi-display" style={{ fontSize: 'clamp(1.8rem, 1.3rem + 2.2vw, 3rem)', margin: '0.6rem 0 1.25rem' }}>
              {FINALE.title}
            </h2>
            <p className="fi-lead" style={{ marginBottom: '1.5rem' }}>{FINALE.body}</p>
            <DataNote world="field" label="Field note">
              <p style={{ margin: 0, lineHeight: 1.55 }}>{FINALE.proof.text}</p>
            </DataNote>
            <p className="fi-finale__proof">{FINALE.tieback}</p>
          </div>
        </section>

        {/* ─── EPILOGUE ─── */}
        <section id="epilogue" className="fi-section fi-epilogue" aria-labelledby="epilogue-title">
          <div className="fi-wrap fi-wrap--narrow fade-section">
            <p className="fi-time">{EPILOGUE.time}</p>
            <h2 id="epilogue-title" className="fi-epilogue__title">{EPILOGUE.title}</h2>
            <p className="fi-lead" style={{ maxWidth: '38ch', margin: '0 auto' }}>{EPILOGUE.body}</p>
            <div className="fi-closing__rule" aria-hidden="true" />
            <p className="fi-closing">{EPILOGUE.closingLine}</p>
          </div>
        </section>

        {/* ─── COLOPHON ─── */}
        <section id="colophon" className="fi-section" aria-labelledby="colophon-title">
          <div className="fi-wrap fade-section">
            <p id="colophon-title" className="fi-colophon__lede fi-display">{COLOPHON.lede}</p>
            <div className="fi-colophon__grid">
              {COLOPHON.items.map((item) => (
                <div key={item.title} className="fi-colophon__card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  {item.href && (
                    <a href={item.href} style={{ display: 'inline-block', marginTop: '0.75rem' }}>
                      {item.linkLabel} &rarr;
                    </a>
                  )}
                </div>
              ))}
            </div>

            <address className="fi-contact">
              <span className="fi-contact__name">{CONTACT.name}</span>
              <a href={CONTACT.siteHref}>{CONTACT.site}</a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <a href={CONTACT.githubHref} target="_blank" rel="noopener noreferrer">{CONTACT.github}</a>
            </address>
          </div>
        </section>
      </main>
    </div>
  )
}
