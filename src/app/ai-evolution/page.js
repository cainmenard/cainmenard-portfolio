'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { AI_EVOLUTION_NAV } from '@/data/navItems'

const WEBAPP_URL = 'https://project-performance-analysis.vercel.app'

export default function AIEvolution() {
  const activeSection = useSectionObserver()
  const scrolled = useScrollPosition()
  const [mobileNav, setMobileNav] = useState(false)

  return (
    <>
      <Nav
        navItems={AI_EVOLUTION_NAV}
        activeSection={activeSection}
        scrolled={scrolled}
        mobileNav={mobileNav}
        onToggleMobile={() => setMobileNav(!mobileNav)}
        logoHref="/"
        secondaryLink={{ href: '/', label: 'Main Site' }}
      />
      <MobileNav
        navItems={AI_EVOLUTION_NAV}
        mobileNav={mobileNav}
        onClose={() => setMobileNav(false)}
        secondaryLink={{ href: '/', label: 'Main Site' }}
      />

      <div className="min-h-screen bg-white dark:bg-slate-900">

        {/* ─── HERO ─── */}
        <section className="hero-gradient pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 text-center hero-fade-in">
            <p className="section-label mb-4">Case Study</p>
            <h1 className="section-heading text-4xl md:text-5xl lg:text-6xl mb-6">
              From Months of Dashboards<br className="hidden sm:block" /> to Hours of Code
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              I spent months building a project performance dashboard in Tableau. Then I rebuilt it
              as a full-stack web application in hours — using AI and voice-to-code — and deployed it for free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#evolution" className="btn-primary">See the Evolution</a>
              <a href="/" className="btn-outline">Back to Portfolio</a>
            </div>
          </div>
        </section>

        {/* ─── EVOLUTION TIMELINE ─── */}
        <section id="evolution" className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-label mb-3">The Journey</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-4">How It Evolved</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-14 max-w-2xl">
              The same analytical thinking, applied with different tools — and a radically different timeline.
            </p>

            <div className="evolution-timeline">

              {/* Phase 1: Tableau */}
              <div className="evolution-phase">
                <div className="evolution-phase-marker evolution-phase-marker--tableau" />
                <div className="evolution-phase-content">
                  <p className="evolution-phase-label">Phase 1 — Months</p>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">The Tableau Era</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Built as part of consulting engagements, this Tableau dashboard required weeks of data
                    modeling, calculated fields, parameter actions, and iterative design. Each revision
                    meant re-publishing to Tableau Public. The analysis was solid, but the process was
                    slow, the tool was expensive, and the audience was limited to those who knew
                    how to navigate Tableau&apos;s interface.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="evolution-tag">Tableau Desktop</span>
                    <span className="evolution-tag">SQL</span>
                    <span className="evolution-tag">Months of effort</span>
                    <span className="evolution-tag">Manual data transforms</span>
                    <span className="evolution-tag">$75/mo license</span>
                  </div>
                </div>
              </div>

              {/* Phase 2: AI */}
              <div className="evolution-phase">
                <div className="evolution-phase-marker evolution-phase-marker--ai" />
                <div className="evolution-phase-content">
                  <p className="evolution-phase-label">Phase 2 — Hours</p>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">The AI Leap</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Using Claude Code as an AI pair-programmer and Wispr Flow for voice-to-code,
                    I rebuilt the entire analysis as a standalone web application. No drag-and-drop
                    interface — just a conversation. I described what I wanted, refined it in real
                    time, and watched production-quality React code materialize from spoken ideas.
                    Wispr Flow turned stream-of-consciousness thinking into structured prompts
                    that Claude Code executed with precision.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="evolution-tag">Claude Code</span>
                    <span className="evolution-tag">Wispr Flow</span>
                    <span className="evolution-tag">Hours of effort</span>
                    <span className="evolution-tag">Voice-to-code</span>
                    <span className="evolution-tag">Natural language</span>
                  </div>
                </div>
              </div>

              {/* Phase 3: Result */}
              <div className="evolution-phase">
                <div className="evolution-phase-marker evolution-phase-marker--result" />
                <div className="evolution-phase-content">
                  <p className="evolution-phase-label">The Result</p>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">A Production Web Application</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    A multi-page React + TypeScript application with five dashboard views, interactive
                    Recharts visualizations (bar, scatter, pie, radar), KPI cards, CSV upload with
                    auto-parsing, cross-dimensional filters, AI-generated executive insights, strategic
                    recommendations, and full dark mode — deployed to Vercel for free. Anyone with a
                    browser can use it. No license, no login, no limitations.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="evolution-tag">React + TypeScript</span>
                    <span className="evolution-tag">Recharts</span>
                    <span className="evolution-tag">Vite</span>
                    <span className="evolution-tag">Tailwind CSS</span>
                    <span className="evolution-tag">Vercel</span>
                    <span className="evolution-tag">Zero licensing cost</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── LIVE APP EMBED ─── */}
        <section id="live-app" className="py-24 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-5xl mx-auto px-6">
            <p className="section-label mb-3">Live Application</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-4">Try It Yourself</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-2xl">
              This is the actual application — running live below. Load the sample data set
              to explore KPI dashboards, cost analysis, gain/fade breakdowns, and more.
            </p>

            {/* Desktop: iframe */}
            <div className="hidden md:block">
              <div className="webapp-iframe-container">
                <iframe
                  src={WEBAPP_URL}
                  title="Project Performance Analysis Web App"
                  loading="lazy"
                  allow="clipboard-read; clipboard-write"
                />
              </div>
            </div>

            {/* Mobile: link card */}
            <div className="md:hidden">
              <a
                href={WEBAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 text-center transition-all hover:shadow-lg hover:border-amber-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-900/20 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white mb-1">Open the Full Application</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Best experienced on a larger screen</p>
              </a>
            </div>

            <div className="mt-6 text-center">
              <a
                href={WEBAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase hover:underline transition"
                style={{ color: 'var(--accent)' }}
              >
                Open Full Application in New Tab
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ─── COMPARISON ─── */}
        <section id="comparison" className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-6">
            <p className="section-label mb-3">Side by Side</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-4">What Changed</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-2xl">
              Same analytical goal. Same domain expertise. Radically different process and outcome.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Tableau */}
              <div className="comparison-card comparison-card--tableau">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Traditional Approach</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">Tableau Dashboard</p>
                <div className="comparison-row">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Timeline</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Weeks to months</span>
                </div>
                <div className="comparison-row">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Cost</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">$75/mo license</span>
                </div>
                <div className="comparison-row">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Customization</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Platform-constrained</span>
                </div>
                <div className="comparison-row">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Hosting</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Tableau Public</span>
                </div>
                <div className="comparison-row">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Access</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Requires Tableau literacy</span>
                </div>
                <div className="comparison-row">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Data Input</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Pre-loaded only</span>
                </div>
              </div>

              {/* AI */}
              <div className="comparison-card comparison-card--ai">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">AI-Assisted Approach</h3>
                <p className="text-xs font-semibold uppercase tracking-wider mb-6" style={{ color: 'var(--accent)' }}>Claude Code + Wispr Flow</p>
                <div className="comparison-row">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Timeline</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>Hours</span>
                </div>
                <div className="comparison-row">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Cost</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>AI subscription only</span>
                </div>
                <div className="comparison-row">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Customization</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>Unlimited — it&apos;s code</span>
                </div>
                <div className="comparison-row">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Hosting</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>Vercel (free tier)</span>
                </div>
                <div className="comparison-row">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Access</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>Anyone with a browser</span>
                </div>
                <div className="comparison-row">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Data Input</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>CSV upload + sample data</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PERSPECTIVE ─── */}
        <section id="perspective" className="py-24 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-label mb-3">Perspective</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-12">What This Means</h2>

            {/* The Speed of Change */}
            <div className="pb-12 mb-12 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">The Speed of Change</h3>
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                <p>
                  This isn&apos;t a story about replacing Tableau. Tableau is excellent software. This is a story
                  about what happens when the barrier between thinking and building disappears.
                </p>
                <p>
                  With Wispr Flow, I didn&apos;t type prompts — I spoke them. Stream of consciousness. Brain dump.
                  The messy, nonlinear way people actually think about problems. Wispr Flow captured it,
                  structured it, and fed it to Claude Code, which turned it into production React components
                  in real time.
                </p>
                <p>
                  The result isn&apos;t just faster — it&apos;s a fundamentally different creative process.
                  Instead of wrestling with a tool&apos;s interface, I was having a conversation about what
                  I wanted to exist. And then it existed.
                </p>
              </div>
            </div>

            {/* For the Industry */}
            <div className="pb-12 mb-12 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">For Construction &amp; Infrastructure</h3>
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                <p>
                  Construction and infrastructure have been slow to adopt technology — not because people
                  don&apos;t see the value, but because the tools never met them where they were. Enterprise
                  platforms are expensive, rigid, and require IT departments to implement. The people
                  who understand the problems best — project managers, estimators, operations leaders —
                  have historically been the furthest from the tools that could help them.
                </p>
                <p>
                  AI changes that equation. A PM who understands cost drivers and margin erosion can now
                  describe the dashboard they wish they had — and build it. Not as a prototype. Not as
                  a mockup. As a deployed application that their team can use tomorrow.
                </p>
              </div>
            </div>

            {/* For the Economy */}
            <div className="pb-12 mb-12 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">The Bigger Picture</h3>
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                <p>
                  We&apos;re entering an era where the bottleneck is domain expertise, not technical skill.
                  AI doesn&apos;t replace the 15 years I spent in construction operations — it amplifies it.
                  Every calculated field in that Tableau dashboard reflected hard-won knowledge about how
                  projects actually fail: labor hours that creep, materials that spike, change orders
                  that compound.
                </p>
                <p>
                  That knowledge didn&apos;t go away when I switched tools. It became more powerful. Because
                  now I can express it as a custom application instead of conforming it to a platform&apos;s
                  constraints.
                </p>
                <p>
                  The people who will thrive in this next era aren&apos;t the ones who can code the fastest.
                  They&apos;re the ones who understand their domain deeply enough to know what to build.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a href="/" className="btn-primary">Back to Portfolio</a>
              <a href="/#projects" className="btn-outline">View All Projects</a>
            </div>
          </div>
        </section>

        <Footer variant="simple" />
      </div>
    </>
  )
}
