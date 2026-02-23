'use client'
import { useState } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import { useFadeOnScroll } from '@/hooks/useFadeOnScroll'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { AI_EVOLUTION_NAV } from '@/data/navItems'

const TABLEAU_URL = 'https://public.tableau.com/views/ProjectPerformanceAnalysis/AnalysisOverview?:embed=y&:display_count=no&:showVizHome=no'
const WEBAPP_URL = 'https://project-performance-analysis.vercel.app'

const COMPARISON_DATA = [
  ['Timeline', 'Weeks to months', 'Hours'],
  ['Cost', '$75/mo per seat', 'AI subscription only'],
  ['Customization', 'Platform-constrained', "Unlimited — it's your code"],
  ['Hosting', 'Tableau Public', 'Vercel (free tier)'],
  ['Access', 'Requires Tableau literacy', 'Anyone with a browser'],
  ['Data Input', 'Pre-loaded only', 'CSV upload + sample data'],
  ['Ownership', 'Vendor-dependent', 'You own every line'],
]

export default function AIEvolution() {
  const activeSection = useSectionObserver()
  const scrolled = useScrollPosition()
  useFadeOnScroll()
  const [mobileNav, setMobileNav] = useState(false)
  const [activeView, setActiveView] = useState('webapp')

  return (
    <>
      <Nav
        navItems={AI_EVOLUTION_NAV}
        activeSection={activeSection}
        scrolled={scrolled}
        mobileNav={mobileNav}
        onToggleMobile={() => setMobileNav(!mobileNav)}
        logoHref="/"
        secondaryLink={{ href: '/', label: 'Portfolio' }}
      />
      <MobileNav
        navItems={AI_EVOLUTION_NAV}
        mobileNav={mobileNav}
        onClose={() => setMobileNav(false)}
        secondaryLink={{ href: '/', label: 'Portfolio' }}
      />

      <div className="min-h-screen">

        {/* ─── HERO ─── */}
        <header className="bg-white dark:bg-slate-900 pt-28 pb-14">
          <div className="max-w-3xl mx-auto px-6 hero-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <span className="article-tag">Case Study</span>
              <span className="article-tag">AI &amp; Construction</span>
            </div>
            <h1 className="article-headline mb-6">
              The Tool Changed.{' '}
              <br className="hidden sm:block" />
              The Expertise Didn&apos;t.
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl">
              The construction industry has spent decades waiting for technology to catch up to
              the people who actually build things. It finally did — just not the way anyone expected.
            </p>
            <div className="flex items-center gap-3 pb-8 border-b border-slate-200 dark:border-slate-700">
              <Image src="/headshot.jpg" alt="Cain Menard" width={44} height={44} className="rounded-full" priority />
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>Cain Menard</p>
                <p className="text-xs text-slate-400">Director of Consulting &amp; Operations</p>
              </div>
            </div>
          </div>
        </header>

        {/* ─── Parallax Hero Image ─── */}
        <div
          className="article-hero-image"
          style={{ backgroundImage: "url('/article-hero.jpg')" }}
          role="img"
          aria-label="Construction crane against the sky"
        />

        {/* ─── ARTICLE BODY ─── */}
        <div className="relative z-10">

          {/* ─── OPENING ─── */}
          <section id="opening" className="bg-white dark:bg-slate-900 py-20">
            <div className="max-w-2xl mx-auto px-6 article-prose fade-section">
              <p className="article-drop-cap">
                Remember that GEICO commercial? A couple of well-groomed cavemen sitting in a nice
                restaurant, visibly offended that GEICO just told the world their website was
                &ldquo;so easy, a caveman could do it.&rdquo;
              </p>
              <p>
                The joke worked because everybody assumed some people just aren&apos;t the tech type.
                Smart, sure — just not <em>that kind</em> of smart.
              </p>
              <p className="article-callout">
                That&apos;s over. The tools changed. And the people who know the most about how
                construction actually works are about to become the most valuable players in the
                room — not despite their lack of technical background, but because of the expertise
                they already have.
              </p>
            </div>
          </section>

          {/* ─── THE SHIFT ─── */}
          <section id="the-shift" className="bg-slate-50 dark:bg-slate-800 py-20">
            <div className="max-w-2xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">The Shift</p>
              <h2 className="article-section-heading mb-8">
                The Gap Between Thinking and Building Just Collapsed
              </h2>
              <div className="article-prose">
                <p>
                  A completed project performance dashboard built over several weeks or months three years
                  ago — data modeling, formulas, iterative design, testing, troubleshooting, and revisions —
                  can be rebuilt as a full production web application in just hours today. 5 powerful dashboard
                  views, interactive charts, KPI cards, cross-dimensional filters, executive insights, and
                  strategic recommendations. Deployed for free. No license, no login, no IT department involved,
                  using Claude Code as an AI pair-programmer and Wispr Flow for voice-to-code.
                </p>
                <p>
                  The process was stream-of-consciousness — describing what the application should do in a long,
                  ranting &ldquo;word salad,&rdquo; refining in real time, watching production-quality lines of
                  React code materialize from verbal instructions.
                </p>
                <p className="article-callout">
                  It&apos;s not a prototype. It&apos;s a deployed application, built by describing what it
                  should do in plain English.
                </p>
              </div>
            </div>
          </section>

          {/* ─── INTERACTIVE COMPARISON SHOWCASE ─── */}
          <section id="comparison" className="bg-white dark:bg-slate-900 py-20">
            <div className="max-w-4xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">Side by Side</p>
              <h2 className="article-section-heading mb-4">What Changed</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-2xl">
                Same analytical goal. Same domain expertise. Radically different process and outcome.
                Both tools below are live and fully functional&nbsp;&mdash; click through and use them.
              </p>

              {/* ─ Toggle ─ */}
              <div className="showcase-toggle" role="tablist">
                <button
                  role="tab"
                  aria-selected={activeView === 'tableau'}
                  className={`showcase-toggle__btn${activeView === 'tableau' ? ' showcase-toggle__btn--active' : ''}`}
                  onClick={() => setActiveView('tableau')}
                >
                  <svg className="showcase-toggle__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  Traditional BI Tool
                </button>
                <button
                  role="tab"
                  aria-selected={activeView === 'webapp'}
                  className={`showcase-toggle__btn${activeView === 'webapp' ? ' showcase-toggle__btn--active showcase-toggle__btn--accent' : ''}`}
                  onClick={() => setActiveView('webapp')}
                >
                  <svg className="showcase-toggle__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  AI-Built Web App
                </button>
              </div>

              {/* ─ Browser-Frame Showcase ─ */}
              <div className={`showcase-panel${activeView === 'webapp' ? ' showcase-panel--accent' : ''}`}>
                <div className="showcase-panel__bar">
                  <div className="showcase-panel__dots"><span /><span /><span /></div>
                  <div className="showcase-panel__url">
                    {activeView === 'tableau' ? 'public.tableau.com' : 'project-performance-analysis.vercel.app'}
                  </div>
                  <a
                    href={activeView === 'tableau' ? TABLEAU_URL : WEBAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="showcase-panel__ext"
                    aria-label="Open in new tab"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                </div>
                <div className="showcase-panel__viewport">
                  <iframe
                    src={TABLEAU_URL}
                    title="Original Tableau Dashboard — fully interactive"
                    className="showcase-panel__iframe"
                    style={{ display: activeView === 'tableau' ? 'block' : 'none' }}
                    loading="lazy"
                  />
                  <iframe
                    src={WEBAPP_URL}
                    title="AI-Built React Web App — fully interactive"
                    className="showcase-panel__iframe"
                    style={{ display: activeView === 'webapp' ? 'block' : 'none' }}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* ─ Info Card ─ */}
              <div className="showcase-info" key={activeView}>
                {activeView === 'tableau' ? (
                  <>
                    <h3 className="showcase-info__title">Tableau Public Dashboard</h3>
                    <p className="showcase-info__desc">
                      A project performance analytics dashboard built over several weeks in Tableau Desktop.
                      Fully functional&nbsp;&mdash; data modeling, calculated fields, interactive filters, and multiple views.
                      Hosted on Tableau Public. Requires a Tableau license to edit and Tableau literacy to navigate.
                    </p>
                    <div className="showcase-info__tags">
                      <span className="showcase-tag showcase-tag--neutral">Weeks to build</span>
                      <span className="showcase-tag showcase-tag--neutral">$75/mo per seat</span>
                      <span className="showcase-tag showcase-tag--neutral">Platform-constrained</span>
                      <span className="showcase-tag showcase-tag--neutral">Requires Tableau literacy</span>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="showcase-info__title showcase-info__title--accent">AI-Built React Web App</h3>
                    <p className="showcase-info__desc">
                      A full production web application built in hours using Claude Code and Wispr Flow voice-to-code.
                      Five dashboard views, interactive charts, KPI cards, CSV upload, executive insights, and strategic
                      recommendations. Deployed free on Vercel. No login. No license. Open it and use it.
                    </p>
                    <div className="showcase-info__tags">
                      <span className="showcase-tag showcase-tag--accent">Hours to build</span>
                      <span className="showcase-tag showcase-tag--accent">$0 hosting</span>
                      <span className="showcase-tag showcase-tag--accent">Unlimited customization</span>
                      <span className="showcase-tag showcase-tag--accent">Anyone with a browser</span>
                    </div>
                  </>
                )}
                <a
                  href={activeView === 'tableau' ? TABLEAU_URL : WEBAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`showcase-cta${activeView === 'webapp' ? ' showcase-cta--accent' : ''}`}
                >
                  Open Live Demo
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
              </div>

              {/* ─ Unified Comparison Table ─ */}
              <div className="showcase-compare">
                <div className="showcase-compare__head">
                  <div className="showcase-compare__label">Metric</div>
                  <div className="showcase-compare__label">Tableau</div>
                  <div className="showcase-compare__label showcase-compare__label--accent">AI Approach</div>
                </div>
                {COMPARISON_DATA.map(([metric, tableau, ai]) => (
                  <div className="showcase-compare__row" key={metric}>
                    <div className="showcase-compare__metric">{metric}</div>
                    <div className="showcase-compare__val">{tableau}</div>
                    <div className="showcase-compare__val showcase-compare__val--accent">{ai}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── MORE CONTENT COMING SOON ─── */}

          <Footer variant="simple" />
        </div>
      </div>
    </>
  )
}
