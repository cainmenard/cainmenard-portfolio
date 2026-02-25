'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import SideNav from '@/components/SideNav'
import Footer from '@/components/Footer'
import { useFadeOnScroll } from '@/hooks/useFadeOnScroll'

const TABLEAU_URL = 'https://public.tableau.com/views/ProjectPerformanceAnalysis/AnalysisOverview?:embed=y&:display_count=no&:showVizHome=no'
const WEBAPP_URL = 'https://project-performance-analysis.vercel.app'

export default function AIEvolution() {
  useFadeOnScroll()
  const [activeView, setActiveView] = useState('webapp')
  const comparisonRef = useRef(null)
  const [comparisonVisible, setComparisonVisible] = useState(false)

  useEffect(() => {
    const el = comparisonRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setComparisonVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <SideNav />

      <div className="min-h-screen article-page">

        {/* ─── HERO ─── */}
        <header className="bg-white dark:bg-slate-900 pt-16 pb-14">
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
                <p className="text-xs text-slate-400">Director of Consulting &amp; Operations &nbsp;&middot;&nbsp; 18 min read</p>
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
            </div>
            <div className="max-w-3xl mx-auto px-6 fade-section">
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
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">The Shift</p>
              <h2 className="article-section-heading mb-8">
                The Gap Between Thinking and Building Just Collapsed
              </h2>
            </div>
            <div className="max-w-2xl mx-auto px-6">
              <div className="article-prose fade-section">
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
              </div>
            </div>
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="article-callout">
                It&apos;s not a prototype. It&apos;s a deployed application, built by describing what it
                should do in plain English.
              </p>
            </div>
          </section>

          {/* ─── INTERACTIVE COMPARISON: CENTERPIECE ─── */}
          <section id="comparison" className="editorial-centerpiece" ref={comparisonRef}>
            {/* Sticky Column Headers */}
            <div className="comparison-sticky-headers">
              <span className="comparison-sticky-headers__label">Traditional BI Tool</span>
              <span className="comparison-sticky-headers__vs">VS</span>
              <span className="comparison-sticky-headers__label comparison-sticky-headers__label--accent">AI-Built Web App</span>
            </div>

            <div className="centerpiece-body">
              {/* Section header */}
              <div className="comparison-section-intro fade-section">
                <p className="section-label mb-3">The Proof</p>
                <h2 className="article-section-heading mb-4">What Changed</h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Same analytical goal. Same domain expertise. Radically different process and outcome.
                  Both tools below are live and fully functional&nbsp;&mdash; click through and use them.
                </p>
              </div>

              {/* ─ Toggle — visible below the dual breakpoint only ─ */}
              <div className="comparison-mobile-toggle fade-section">
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
              </div>

              {/* ─ Dual Panel Area ─ */}
              <div className={`comparison-panels${comparisonVisible ? ' comparison-panels--visible' : ''}`}>
                {/* ── Tableau Panel ── */}
                <div className={`comparison-panel comparison-panel--slide-left${activeView !== 'tableau' ? ' comparison-panel--hidden-sm' : ''}`}>
                  <div className="comparison-panel__browser">
                    <div className="showcase-panel__bar">
                      <div className="showcase-panel__dots"><span /><span /><span /></div>
                      <div className="showcase-panel__url">public.tableau.com</div>
                      <a href={TABLEAU_URL} target="_blank" rel="noopener noreferrer" className="showcase-panel__ext" aria-label="Open Tableau in new tab">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    </div>
                    <div className="comparison-panel__viewport">
                      <iframe src={TABLEAU_URL} title="Original Tableau Dashboard — fully interactive" className="comparison-panel__iframe" loading="lazy" />
                    </div>
                  </div>
                </div>

                {/* ── VS Badge ── */}
                <div className="comparison-divider" aria-hidden="true">
                  <span className="comparison-divider__badge">VS</span>
                </div>

                {/* ── Web App Panel ── */}
                <div className={`comparison-panel comparison-panel--accent comparison-panel--slide-right${activeView !== 'webapp' ? ' comparison-panel--hidden-sm' : ''}`}>
                  <div className="comparison-panel__browser comparison-panel__browser--accent">
                    <div className="showcase-panel__bar">
                      <div className="showcase-panel__dots"><span /><span /><span /></div>
                      <div className="showcase-panel__url">project-performance-analysis.vercel.app</div>
                      <a href={WEBAPP_URL} target="_blank" rel="noopener noreferrer" className="showcase-panel__ext" aria-label="Open web app in new tab">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    </div>
                    <div className="comparison-panel__viewport">
                      <iframe src={WEBAPP_URL} title="AI-Built React Web App — fully interactive" className="comparison-panel__iframe" loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ─ Metric Comparison Bar ─ */}
              <div className="comparison-metric-bar">
                <div className="comparison-metric-bar__item">
                  <span className="comparison-metric-bar__label">Timeline</span>
                  <span className="comparison-metric-bar__old">Weeks to Months</span>
                  <span className="comparison-metric-bar__arrow">&rarr;</span>
                  <span className="comparison-metric-bar__new">Hours</span>
                </div>
                <div className="comparison-metric-bar__divider" />
                <div className="comparison-metric-bar__item">
                  <span className="comparison-metric-bar__label">Cost</span>
                  <span className="comparison-metric-bar__old">$75/mo per seat</span>
                  <span className="comparison-metric-bar__arrow">&rarr;</span>
                  <span className="comparison-metric-bar__new">$0</span>
                </div>
                <div className="comparison-metric-bar__divider" />
                <div className="comparison-metric-bar__item">
                  <span className="comparison-metric-bar__label">Access</span>
                  <span className="comparison-metric-bar__old">Tableau literacy required</span>
                  <span className="comparison-metric-bar__arrow">&rarr;</span>
                  <span className="comparison-metric-bar__new">Anyone with a browser</span>
                </div>
              </div>
            </div>
          </section>

          {/* ─── THE NUMBERS BEHIND THE SHIFT ─── */}
          <section id="the-numbers" className="bg-slate-50 dark:bg-slate-800 py-20">
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">The Evidence</p>
              <h2 className="article-section-heading mb-8">
                The Numbers Behind the Shift
              </h2>
            </div>
            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  This isn&apos;t an edge case. The productivity data is accumulating fast.
                </p>
                <p>
                  GitHub&apos;s controlled experiment found developers using AI coding tools completed
                  tasks 55.8% faster. Harvard and BCG tested 758 consultants and found AI users produced
                  40% higher-quality output while finishing 25% faster. A Google principal engineer gave
                  Claude Code a three-paragraph problem description and received a working result in one
                  hour that matched what her team had spent a year building.
                </p>
              </div>
            </div>

            {/* ─ Data Callout Strip ─ */}
            <div className="max-w-4xl mx-auto px-6 my-14 fade-section">
              <div className="stat-strip">
                <div className="stat-card stagger-child">
                  <p className="stat-card__number">55.8%</p>
                  <p className="stat-card__label">faster task completion with AI coding tools</p>
                  <p className="stat-card__source">
                    <svg className="stat-card__icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    Source: GitHub/arXiv RCT
                  </p>
                </div>
                <div className="stat-card stagger-child">
                  <p className="stat-card__number">40%</p>
                  <p className="stat-card__label">higher quality output</p>
                  <p className="stat-card__source">
                    <svg className="stat-card__icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18L18.5 7.5 12 10.82 5.5 7.5 12 4.18zM5 8.82l6 3.33v7.03l-6-3.33V8.82zm8 10.36v-7.03l6-3.33v7.03l-6 3.33z"/></svg>
                    Source: Harvard/BCG, 758 consultants
                  </p>
                </div>
                <div className="stat-card stagger-child">
                  <p className="stat-card__number">1 hr <span className="stat-card__vs">vs.</span> 1 yr</p>
                  <p className="stat-card__label">AI reproduction of team project</p>
                  <p className="stat-card__source">
                    <svg className="stat-card__icon" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Source: Google/The Decoder
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  Google now generates roughly half its new code with AI. Over 90% of Fortune 100 companies
                  have deployed GitHub Copilot. Gartner projects 90% of software engineers will use AI code
                  assistants by 2028, up from under 14% in early 2024. The AI code tools market is valued at
                  $7.4 billion and heading toward $25–30 billion by 2030.
                </p>
                <p>
                  Andrej Karpathy, co-founder of OpenAI, coined what he calls &ldquo;vibe coding&rdquo; and
                  declared: &ldquo;The hottest new programming language is English.&rdquo; Jensen Huang,
                  NVIDIA&apos;s CEO, at the World Government Summit: &ldquo;Everybody in the world is now a
                  programmer.&rdquo; Satya Nadella, in his 2025 letter to shareholders: &ldquo;More than any
                  transformation before it, this generation of AI is radically changing every layer of the
                  tech stack.&rdquo;
                </p>
              </div>
            </div>
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="article-callout">
                For balance: a rigorous 2025 METR study found experienced open-source developers were
                actually 19% slower with AI tools on complex maintenance tasks — while believing they
                were 20% faster. AI excels at building new things from domain knowledge. It struggles with
                maintaining complex legacy codebases. That distinction matters significantly for how
                companies should think about adoption.
              </p>
            </div>
          </section>

          {/* ─── CONSTRUCTION PROFESSIONALS ─── */}
          <section id="untapped-builders" className="bg-white dark:bg-slate-900 py-20">
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">The Real Builders</p>
              <h2 className="article-section-heading mb-8">
                The Real Builders
              </h2>
            </div>

            {/* ─ Builder Expertise Visualization ─ */}
            <div className="max-w-4xl mx-auto px-6 my-12 fade-section">
              <div className="builder-viz">
                <div className="builder-viz__col">
                  <p className="builder-viz__heading">The Expertise</p>
                  <div className="builder-viz__card">
                    <p className="builder-viz__role">Superintendent</p>
                    <p className="builder-viz__insight">Knows which crews fall behind before the schedule shows it</p>
                  </div>
                  <div className="builder-viz__card">
                    <p className="builder-viz__role">Estimator</p>
                    <p className="builder-viz__insight">Knows which cost drivers eat margins before the bid closes</p>
                  </div>
                  <div className="builder-viz__card">
                    <p className="builder-viz__role">Project Manager</p>
                    <p className="builder-viz__insight">Knows which indicators flag trouble six weeks before the financials</p>
                  </div>
                </div>

                <div className="builder-viz__bridge">
                  <div className="builder-viz__bridge-line" />
                  <div className="builder-viz__bridge-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                  </div>
                  <div className="builder-viz__bridge-line" />
                </div>

                <div className="builder-viz__col">
                  <p className="builder-viz__heading builder-viz__heading--accent">What They&apos;ll Build</p>
                  <div className="builder-viz__output-card">
                    <p className="builder-viz__output-name">Crew Performance Tracker</p>
                    <p className="builder-viz__output-desc">Real-time field monitoring with automated alerts</p>
                  </div>
                  <div className="builder-viz__output-card">
                    <p className="builder-viz__output-name">Cost Analysis Dashboard</p>
                    <p className="builder-viz__output-desc">Live margin tracking and variance reporting</p>
                  </div>
                  <div className="builder-viz__output-card">
                    <p className="builder-viz__output-name">Project Health Monitor</p>
                    <p className="builder-viz__output-desc">Early warning system for at-risk projects</p>
                  </div>
                </div>
              </div>
              <p className="builder-viz__footer">Same knowledge. New medium. No code required.</p>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  Let me be clear — superintendents, project managers, and estimators aren&apos;t cavemen.
                  They&apos;re the people who actually understand how projects make or lose money. Which cost
                  drivers eat margins. Which reports are just busy work nobody reads. Which leading indicators
                  flag trouble six weeks before it shows up in the financials. That&apos;s fifteen, twenty,
                  thirty years of hard-earned knowledge that no software developer in Silicon Valley is going
                  to replicate.
                </p>
                <p>
                  The problem has never been that construction professionals aren&apos;t smart enough for
                  technology. The technology has never been smart enough for them. Good tech adapts to the
                  user, and the construction industry has been forced to settle for less. I wrote about this
                  a year ago: software developers should be upskilling and adapting their work to serve the
                  construction industry — not the other way around. I still believe that.
                </p>
                <p>
                  Until now, the IT department — if the company even had one — occupied a small, dark corner
                  of the office. JBKnowledge found fewer than half of construction companies have a single
                  dedicated IT employee. I still walk into companies where field supervisors don&apos;t have
                  devices. Paper daily reports. Handwritten timekeeping. Multi-million-dollar projects managed
                  with the same information tools available in 1985.
                </p>
                <p>
                  Meanwhile, those same companies are struggling to hire younger talent born into a
                  digital-first world. Gen Z participation in construction more than doubled between 2019 and
                  2023. But 41% of the pre-2020 workforce is expected to retire by 2031. There&apos;s a ticking
                  clock on the institutional knowledge in your people&apos;s heads — and no clear mechanism to
                  capture it before it walks out the door.
                </p>
              </div>
            </div>
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="article-callout">
                Here&apos;s the shift most people miss: those same superintendents who&apos;ve never written a
                line of code may become your most prolific software builders. Building custom applications
                is becoming as simple as describing what you need out loud, the way you&apos;d explain it to
                a colleague.
              </p>
            </div>
            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  Kevin Roose, a <em>New York Times</em> technology columnist, built a functional app in
                  about ten minutes. A non-coder in the Philippines built a custom expense management app in
                  two hours using plain language prompts. Harvard Business School has an active teaching
                  case on it — &ldquo;Lovable: Vibe Coding for the Other 99%.&rdquo;
                </p>
                <p>
                  If those people can do it, your best PM can do it. And the software they&apos;d build would
                  actually solve the problems they deal with every day — because they&apos;re the ones who
                  understand those problems.
                </p>
              </div>
            </div>
          </section>

          {/* ─── THE INDUSTRY THAT STANDS TO GAIN THE MOST ─── */}
          <section id="industry-productivity" className="bg-slate-50 dark:bg-slate-800 py-20">
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">The Industry</p>
              <h2 className="article-section-heading mb-8">
                The Industry That Stands to Gain the Most
              </h2>
            </div>

            {/* ─ Productivity Bar Chart ─ */}
            <div className="max-w-3xl mx-auto px-6 my-12 fade-section">
              <div className="prod-chart">
                <p className="prod-chart__title">Productivity Growth, 2000&ndash;2022</p>
                <p className="prod-chart__subtitle">Indexed output per worker</p>
                <div className="prod-chart__bars">
                  <div className="prod-chart__row">
                    <span className="prod-chart__label">Construction</span>
                    <div className="prod-chart__track">
                      <div className="prod-chart__fill prod-chart__fill--construction">
                        <span className="prod-chart__value prod-chart__value--outside">10%</span>
                      </div>
                    </div>
                  </div>
                  <div className="prod-chart__row">
                    <span className="prod-chart__label">Manufacturing</span>
                    <div className="prod-chart__track">
                      <div className="prod-chart__fill prod-chart__fill--manufacturing">
                        <span className="prod-chart__value">90%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="prod-chart__decline">
                  <svg className="prod-chart__decline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                    <polyline points="17 18 23 18 23 12" />
                  </svg>
                  <span className="prod-chart__decline-text">2020&ndash;2022: Construction productivity declined 8%</span>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  Construction productivity grew 10% between 2000 and 2022. Manufacturing grew 90% over the
                  same period. Let that sink in. And from 2020 to 2022, construction productivity didn&apos;t
                  just stagnate&nbsp;&mdash; it actually declined by 8%.
                </p>
                <p>
                  Construction is the second-least digitized major industry in the United States. Most companies
                  spend less than 1% of revenue on IT. For comparison, automotive and aerospace spend 3&ndash;5%.
                  The gap is massive&nbsp;&mdash; construction underspends cross-industry IT averages by 60&ndash;70%.
                </p>
                <p>
                  And the tools that do get implemented? They rarely deliver. Over 70% of ERP implementations
                  fail to meet their original business objectives. The industry hemorrhages an estimated $177
                  billion a year to operational inefficiencies. In 2020, poor data management alone cost the
                  construction industry $1.84 trillion globally&nbsp;&mdash; and only 55% of companies even have
                  a formal data plan. Ninety-six percent of the data generated on construction projects goes
                  completely unused. Field teams lose nearly two full working days every week&nbsp;&mdash; 14+
                  hours&nbsp;&mdash; just searching for project information and dealing with problems that
                  shouldn&apos;t exist.
                </p>
                <p>
                  None of this is a technology problem. It&apos;s a fit problem. The people who understand the
                  work best&nbsp;&mdash; who know exactly what dashboard they wish they had, which reports are
                  useless, which metrics actually predict when a job is going sideways&nbsp;&mdash; have always
                  been the furthest from the tools that could help them. They&apos;ve never had a way to turn
                  that knowledge into software without a six-figure budget and a year-long timeline.
                </p>
                <p>
                  AI changes that math. The AI-in-construction market sits at $3.9 billion today, projected to
                  hit $22.7 billion by 2032. Even Procore&nbsp;&mdash; the biggest construction management
                  platform in the market&nbsp;&mdash; launched an Agent Builder that lets construction
                  professionals customize AI workflows without writing a single line of code. The AGC&apos;s 2025
                  Workforce Survey shows 44% of firms already expect AI and robotics to improve job quality and
                  productivity.
                </p>
              </div>
            </div>
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="article-callout">
                The industry that&apos;s historically been last to adopt technology may have the most to gain
                from what&apos;s happening right now. The gap between what construction professionals know and
                what they&apos;ve been able to build with that knowledge is wider here than anywhere else. That
                gap is closing fast.
              </p>
            </div>
          </section>

          {/* ─── THE DOT-COM PARALLEL ─── */}
          <section id="dotcom-parallel" className="bg-white dark:bg-slate-900 py-20">
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">The Pattern</p>
              <h2 className="article-section-heading mb-8">
                The Dot-Com Parallel
              </h2>
            </div>

            {/* ─ Timeline Curve Graphic ─ */}
            <div className="max-w-4xl mx-auto px-6 my-12 fade-section">
              <div className="dotcom-chart">
                <p className="dotcom-chart__title">The Dot-Com Pattern</p>
                <p className="dotcom-chart__subtitle">Technology adoption follows a predictable arc</p>

                <div className="dotcom-curve">
                  {/* ── Dot-Com Bubble Curve ── */}
                  <svg viewBox="0 0 800 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="dotcom-curve__svg" preserveAspectRatio="xMidYMid meet">
                    {/* Grid lines */}
                    <line x1="60" y1="240" x2="760" y2="240" stroke="#1e293b" strokeWidth="1" />

                    {/* Phase labels along bottom */}
                    <text x="150" y="270" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">ERUPTION</text>
                    <text x="340" y="270" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">FRENZY</text>
                    <text x="480" y="270" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">CRASH</text>
                    <text x="660" y="270" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">GOLDEN AGE</text>

                    {/* Phase divider ticks */}
                    <line x1="240" y1="235" x2="240" y2="245" stroke="#334155" strokeWidth="1" />
                    <line x1="420" y1="235" x2="420" y2="245" stroke="#334155" strokeWidth="1" />
                    <line x1="540" y1="235" x2="540" y2="245" stroke="#334155" strokeWidth="1" />

                    {/* Main dot-com curve */}
                    <path
                      d="M 80 220 C 120 210, 160 190, 200 160 C 240 130, 280 70, 340 30 C 380 10, 400 15, 420 30 C 460 70, 480 160, 500 200 C 520 220, 540 225, 560 218 C 600 200, 660 160, 720 120"
                      stroke="url(#dotcomGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="dotcom-curve__path"
                    />

                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="dotcomGradient" x1="80" y1="0" x2="720" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="35%" stopColor="#f59e0b" />
                        <stop offset="55%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#22c55e" />
                      </linearGradient>
                      <linearGradient id="aiGradient" x1="80" y1="0" x2="480" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>

                    {/* Key event markers on the curve */}
                    {/* NASDAQ Peak */}
                    <circle cx="340" cy="30" r="5" fill="#f59e0b" className="dotcom-curve__dot" />
                    <line x1="340" y1="38" x2="340" y2="58" stroke="#f59e0b" strokeWidth="1" opacity="0.5" />
                    <rect x="262" y="60" width="156" height="36" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" opacity="0.9" />
                    <text x="340" y="75" fill="#f59e0b" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">NASDAQ PEAK</text>
                    <text x="340" y="89" fill="#94a3b8" fontSize="9.5" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">March 2000 &bull; 5,048</text>

                    {/* Crash */}
                    <circle cx="480" cy="188" r="5" fill="#ef4444" className="dotcom-curve__dot" />
                    <line x1="480" y1="170" x2="480" y2="145" stroke="#ef4444" strokeWidth="1" opacity="0.5" />
                    <rect x="414" y="112" width="132" height="36" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="1" opacity="0.9" />
                    <text x="480" y="127" fill="#ef4444" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">CRASH</text>
                    <text x="480" y="141" fill="#94a3b8" fontSize="9.5" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">$5 trillion wiped out</text>

                    {/* Amazon $7 */}
                    <circle cx="530" cy="222" r="5" fill="#ef4444" className="dotcom-curve__dot" />
                    <line x1="530" y1="210" x2="530" y2="188" stroke="#94a3b8" strokeWidth="1" opacity="0.3" />
                    <rect x="468" y="155" width="124" height="36" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" opacity="0.9" />
                    <text x="530" y="170" fill="#e2e8f0" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">AMAZON AT $7</text>
                    <text x="530" y="184" fill="#94a3b8" fontSize="9.5" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">per share</text>

                    {/* Golden Age */}
                    <circle cx="700" cy="128" r="5" fill="#22c55e" className="dotcom-curve__dot" />
                    <line x1="700" y1="120" x2="700" y2="100" stroke="#22c55e" strokeWidth="1" opacity="0.5" />
                    <rect x="610" y="58" width="180" height="44" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="1" opacity="0.9" />
                    <text x="700" y="74" fill="#22c55e" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">GOLDEN AGE</text>
                    <text x="700" y="93" fill="#94a3b8" fontSize="9.5" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">Amazon &bull; Google &bull; Booking</text>

                    {/* ── AI Investment Cycle (parallel line below) ── */}
                    <line x1="60" y1="300" x2="760" y2="300" stroke="#0f172a" strokeWidth="1" />

                    {/* AI curve - partial, with dashed future */}
                    <path
                      d="M 80 298 C 140 290, 200 270, 260 248 C 300 234, 340 220, 380 210"
                      stroke="url(#aiGradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="dotcom-curve__ai-path"
                    />
                    {/* Dashed future portion */}
                    <path
                      d="M 380 210 C 420 200, 460 196, 520 200 C 560 206, 600 220, 640 226 C 680 230, 720 218, 740 210"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="6 4"
                      opacity="0.4"
                    />

                    {/* AI label */}
                    <rect x="80" y="308" width="200" height="24" rx="4" fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth="1" opacity="0.6" />
                    <text x="180" y="324" fill="#a78bfa" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">AI INVESTMENT CYCLE, 2022–?</text>

                    {/* AI data point markers */}
                    <circle cx="120" cy="294" r="3.5" fill="#3b82f6" />
                    <text x="120" y="289" fill="#93c5fd" fontSize="8" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">ChatGPT</text>

                    <circle cx="220" cy="265" r="3.5" fill="#6366f1" />
                    <text x="220" y="258" fill="#a5b4fc" fontSize="8" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">$100B+</text>

                    <circle cx="320" cy="238" r="3.5" fill="#7c3aed" />
                    <text x="320" y="231" fill="#c4b5fd" fontSize="8" textAnchor="middle" fontFamily="var(--font-body), system-ui, sans-serif">NVIDIA 10×</text>

                    <circle cx="380" cy="210" r="4" fill="#8b5cf6" stroke="#c4b5fd" strokeWidth="1.5" />
                    <text x="395" y="205" fill="#c4b5fd" fontSize="8" textAnchor="start" fontFamily="var(--font-body), system-ui, sans-serif">Today</text>

                    {/* Question mark for future */}
                    <text x="640" y="222" fill="#8b5cf6" fontSize="16" fontWeight="700" opacity="0.4" textAnchor="middle" fontFamily="var(--font-display), Georgia, serif">?</text>
                  </svg>
                </div>

                <p className="dotcom-chart__source">Source: Carlota Pérez, <em>Technological Revolutions and Financial Capital</em></p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-8 mb-4" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>
                  Not convinced? That&apos;s fair. The investment numbers warrant skepticism.
                </h3>
                <p>
                  AI venture capital hit $202 billion in 2025&nbsp;&mdash; capturing roughly half of all global
                  VC funding. NVIDIA&apos;s stock rocketed 2,000% from 2022 lows to a market cap north of $5
                  trillion. Michael Burry called the AI boom &ldquo;a glorious folly&rdquo; and compared NVIDIA
                  to Cisco, which surged 3,800% before crashing 88% and never recovering to its
                  inflation-adjusted peak. Jeff Bezos called it &ldquo;kind of an industrial bubble.&rdquo; Sam
                  Altman&nbsp;&mdash; ChatGPT&apos;s version of Steve Jobs&nbsp;&mdash; himself said,
                  &ldquo;People will overinvest and lose money.&rdquo; An MIT study found 95% of 52
                  organizations achieved zero ROI from generative AI investments.
                </p>
              </div>
            </div>
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="article-callout">
                &ldquo;95% of organizations studied achieved zero ROI from generative AI
                investments.&rdquo;&nbsp;&mdash; MIT Sloan
              </p>
            </div>
            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  The dot-com crash wiped out $5 trillion in market value. Pets.com went from IPO to liquidation
                  in 268 days. Webvan raised over a billion dollars and was dead in two years.
                </p>
                <p>
                  But the technology survived. Internet users grew from 361 million in 2000 to over 4
                  billion&nbsp;&mdash; continuously, straight through the bust and out the other side. More than
                  70% of Americans were already online when the market bottomed out. The bad business models
                  died. The technology didn&apos;t.
                </p>
                <p>
                  And the failed ideas came back with better execution. Webvan became Instacart. Pets.com became
                  Chewy ($8.7 billion IPO). Kozmo became DoorDash. Amazon crashed from $107 to $7 a share
                  before becoming one of the most valuable companies on Earth.
                </p>
                <p>
                  Carlota Pérez, a techno-economist who&apos;s studied five major technological revolutions,
                  found they all follow the same arc: eruption, speculative frenzy, collapse, then a prosperous
                  golden age. The question for construction leaders isn&apos;t whether there will be a
                  correction. It&apos;s whether your company is positioned to come out the other
                  side&nbsp;&mdash; because that&apos;s where the real money is made.
                </p>
              </div>
            </div>
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="article-callout">
                &ldquo;The biggest and most sustainable profits tend to be made after the bubble has collapsed,
                not during the speculative frenzy.&rdquo;&nbsp;&mdash; Carlota Pérez
              </p>
            </div>
          </section>

          {/* ─── LEGACY SOFTWARE MUST ADAPT OR DISAPPEAR ─── */}
          <section id="legacy-software" className="bg-white dark:bg-slate-900 py-20">
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">The Reckoning</p>
              <h2 className="article-section-heading mb-8">
                Legacy Software Must Adapt or Disappear
              </h2>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  Custom applications built by domain experts will begin replacing large portions of
                  what legacy software currently does. Vendors that don&apos;t fundamentally enable deep
                  configuration and customization beyond what&apos;s traditionally offered will lose
                  market share. Some will cease to exist.
                </p>
                <p>
                  Microsoft CEO Satya Nadella declared &ldquo;SaaS is dead&rdquo; in late 2024. His
                  argument: business applications are databases with business logic bolted on. In an
                  agent-driven world, that logic migrates to AI agents that are database-agnostic. The
                  application layer collapses.
                </p>
                <p>
                  The market is responding. The iShares Expanded Tech-Software Sector ETF fell over
                  23% in early 2026. Salesforce and Workday each dropped over 40% in twelve months.
                  IDC concluded SaaS has become &ldquo;a patchwork of interfaces and data silos,
                  forcing users to adapt to the software rather than the other way around.&rdquo;
                </p>
              </div>
            </div>

            {/* ─ IDC Callout Visualization ─ */}
            <div className="max-w-3xl mx-auto px-6 my-12 fade-section">
              <div className="legacy-callout-viz">
                <p className="legacy-callout-viz__label">IDC Prediction</p>
                <p className="legacy-callout-viz__text">
                  By 2028, <span className="legacy-callout-viz__accent">70% of software vendors</span> will
                  need to fundamentally restructure their pricing models.
                </p>
                <p className="legacy-callout-viz__source">Source: International Data Corporation (IDC)</p>
              </div>
            </div>

            {/* ─ Companies That Failed to Adapt ─ */}
            <div className="max-w-4xl mx-auto px-6 my-16 fade-section">
              <p className="text-center text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider mb-6" style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}>
                Companies That Failed to Adapt
              </p>
              <div className="adapt-cards">
                <div className="adapt-card stagger-child">
                  <p className="adapt-card__company">Kodak</p>
                  <p className="adapt-card__summary">
                    Invented the digital camera in 1975. Suppressed it.
                  </p>
                  <p className="adapt-card__year">Bankrupt 2012</p>
                </div>
                <div className="adapt-card stagger-child">
                  <p className="adapt-card__company">Blockbuster</p>
                  <p className="adapt-card__summary">
                    9,000 stores, rejected Netflix.
                  </p>
                  <p className="adapt-card__year">Bankrupt 2010</p>
                </div>
                <div className="adapt-card stagger-child">
                  <p className="adapt-card__company">Nokia</p>
                  <p className="adapt-card__summary">
                    40%+ global market share. Missed touchscreens.
                  </p>
                  <p className="adapt-card__year">Sold 2014</p>
                </div>
                <div className="adapt-card stagger-child">
                  <p className="adapt-card__company">Siebel</p>
                  <p className="adapt-card__summary">
                    Created CRM. Failed cloud transition.
                  </p>
                  <p className="adapt-card__year">Acquired by Oracle 2006</p>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  In construction specifically, McKinsey found individual teams routinely build their
                  own digital solutions without coordinating&nbsp;&mdash; creating a proliferation of
                  competing, overlapping tools within a single company. JBKnowledge&apos;s surveys
                  found 65% of respondents use spreadsheets for estimating despite having dedicated
                  estimating software. The off-the-shelf products simply don&apos;t meet actual needs.
                </p>
                <p>
                  Every company has its secret sauce. Every contractor knows a good project from a bad
                  one. Every business has different requirements. For the first time, there&apos;s an
                  accessible pathway to building exactly what it needs&nbsp;&mdash; facilitating its
                  functional processes, its data, and serving its people&nbsp;&mdash; without a
                  software development team or a vendor&apos;s interpretation of &ldquo;what
                  construction companies want.&rdquo;
                </p>
              </div>
            </div>
          </section>

          {/* ─── FUNCTIONAL EXPERIENCE IS THE NEW BOTTLENECK ─── */}
          <section id="functional-experience" className="bg-slate-50 dark:bg-slate-800/50 py-20">
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">The Bottleneck</p>
              <h2 className="article-section-heading mb-8">
                Functional Experience Is the New Bottleneck
              </h2>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  MIT labor economist David Autor argues that AI&apos;s unique opportunity is to
                  &ldquo;extend the relevance, reach, and value of human expertise.&rdquo; That framing
                  matters. Technical execution is being commoditized at a pace that would have been
                  unimaginable five years ago. What&apos;s becoming scarce&nbsp;&mdash; genuinely
                  scarce&nbsp;&mdash; is the domain knowledge that determines what to build and why it
                  actually matters.
                </p>
                <p>
                  Erik Brynjolfsson at Stanford studied over 5,000 workers and found AI increased
                  productivity 14&ndash;15% on average. But the breakdown is what&apos;s interesting:
                  novice workers improved 34%, while experienced workers saw minimal gains. The AI was
                  essentially encoding top performers&apos; best practices and distributing them to everyone
                  else. A study in <em>Management Science</em> made the point explicit&nbsp;&mdash; AI
                  creates the greatest value when domain experts themselves can apply it, not when it gets
                  filtered through an IT specialist who doesn&apos;t know the work.
                </p>
              </div>
            </div>

            {/* ─ Pull Quote: David Autor ─ */}
            <div className="max-w-3xl mx-auto px-6 my-12 fade-section">
              <div className="bottleneck-pull-quote">
                <p className="bottleneck-pull-quote__text">
                  &ldquo;AI&apos;s unique opportunity is to extend the relevance, reach, and value of human expertise.&rdquo;
                </p>
                <p className="bottleneck-pull-quote__attribution">
                  &mdash; David Autor, MIT
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  Here&apos;s where it gets interesting, though. That same Harvard/BCG study found that
                  when consultants applied AI to tasks outside its capability boundary&nbsp;&mdash; things
                  that require real judgment, intuition, or knowing which number to trust when two reports
                  disagree&nbsp;&mdash; they were about 20% less likely to get the right answer than
                  consultants working without AI at all. The tool made sloppy work worse. It exposed people
                  who were mailing it in. Knowing when and where to apply AI was the single biggest
                  differentiator between winning and failure.
                </p>
                <p>
                  That should matter to every construction leader reading this. Knowing how projects
                  fail&nbsp;&mdash; budget overruns, material price escalations, change orders stacking up
                  and eating your margin before anyone flags it&nbsp;&mdash; doesn&apos;t become less
                  important in an AI-enabled world. It becomes more valuable, because for the first time
                  that knowledge can be expressed as fine-tuned tooling rather than shoehorned into a
                  vendor&apos;s template that was built for a generic version of your business.
                </p>
              </div>
            </div>

            {/* ─ Historical Parallel: The Tyranny of Spreadsheets ─ */}
            <div className="max-w-3xl mx-auto px-6 my-16 fade-section">
              <div className="spreadsheet-parallel">
                <p className="spreadsheet-parallel__label">Historical Parallel</p>
                <p className="spreadsheet-parallel__title">The Tyranny of Spreadsheets</p>
                <div className="spreadsheet-parallel__numbers">
                  <div className="spreadsheet-parallel__stat">
                    <p className="spreadsheet-parallel__year">1980</p>
                    <p className="spreadsheet-parallel__value">339,000</p>
                    <p className="spreadsheet-parallel__desc">accountants when VisiCalc launched</p>
                  </div>
                  <div className="spreadsheet-parallel__arrow" aria-hidden="true">→</div>
                  <div className="spreadsheet-parallel__stat">
                    <p className="spreadsheet-parallel__year">2022</p>
                    <p className="spreadsheet-parallel__value">1,400,000</p>
                    <p className="spreadsheet-parallel__desc">accountants</p>
                  </div>
                </div>
                <p className="spreadsheet-parallel__caption">
                  The spreadsheet didn&apos;t replace accountants. It made them more productive and expanded the market.
                </p>
                <p className="spreadsheet-parallel__source">
                  Source: Bureau of Labor Statistics, via Tim Harford / Financial Times
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  The historical parallel is worth sitting with. When VisiCalc launched the first digital
                  spreadsheet in 1980, there were 339,000 accountants in the U.S. By 2022, there were 1.4
                  million. Tim Harford at the <em>Financial Times</em> put it plainly: the spreadsheet
                  didn&apos;t kill the profession. It made accountants more productive and blew the market
                  wide open for what they could do.
                </p>
              </div>
            </div>
          </section>

          {/* ─── READINESS COMES BEFORE TOOLS ─── */}
          <section id="readiness" className="bg-white dark:bg-slate-900 py-20">
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">Readiness</p>
              <h2 className="article-section-heading mb-8">
                Readiness Comes Before Tools
              </h2>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  Most construction companies aren&apos;t positioned to reap the benefits of AI tools yet. The
                  problem isn&apos;t an inability to change or disinterest in finding better ways to
                  work&nbsp;&mdash; every contractor has a story about &ldquo;that one project&rdquo;-turned
                  success story thanks to a game-time judgment call that just might work. The problem is they
                  haven&apos;t laid the foundation yet.
                </p>
                <p>
                  A peer-reviewed study of highway construction and asset management technology implementations
                  found less than 10% of failures result from technical problems. Eighty percent of success
                  depends on addressing people and process issues.
                </p>
              </div>
            </div>

            {/* ─ Callout: Technology Focus Quote ─ */}
            <div className="max-w-3xl mx-auto px-6 my-12 fade-section">
              <div className="readiness-callout">
                <p className="readiness-callout__text">
                  &ldquo;Any attempt to implement technology that focuses solely on technology is likely to fail
                  in the construction industry.&rdquo;
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  Prosci&apos;s research shows organizations with structured change management are 7x more
                  likely to achieve project objectives. A study in the <em>Journal of Information Technology in
                  Construction</em> analyzed 167 technology-adoption cases across AEC firms and identified the
                  top practices for success: change-agent effectiveness, measured benchmarks, realistic
                  timeframes, and communicated benefits. Not better software. Not bigger budgets. People,
                  process, and communication.
                </p>
              </div>
            </div>

            {/* ─ Visual: Readiness Framework — 4-Pillar Graphic ─ */}
            <div className="max-w-4xl mx-auto px-6 my-16 fade-section">
              <div className="readiness-framework">
                <p className="readiness-framework__label">Readiness Framework</p>
                <div className="readiness-framework__pillars">
                  <div className="readiness-pillar stagger-child">
                    <div className="readiness-pillar__icon" aria-hidden="true">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <p className="readiness-pillar__title">Talent</p>
                    <p className="readiness-pillar__question">
                      Do you have domain experts willing to learn new tools&nbsp;&mdash; and leadership willing
                      to invest in them?
                    </p>
                  </div>
                  <div className="readiness-pillar stagger-child">
                    <div className="readiness-pillar__icon" aria-hidden="true">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    </div>
                    <p className="readiness-pillar__title">Process</p>
                    <p className="readiness-pillar__question">
                      Can you automate what you have, or are you automating chaos?
                    </p>
                  </div>
                  <div className="readiness-pillar stagger-child">
                    <div className="readiness-pillar__icon" aria-hidden="true">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                      </svg>
                    </div>
                    <p className="readiness-pillar__title">Data</p>
                    <p className="readiness-pillar__question">
                      Is your data clean, integrated, and accessible&nbsp;&mdash; or siloed and unreliable?
                    </p>
                  </div>
                  <div className="readiness-pillar stagger-child">
                    <div className="readiness-pillar__icon" aria-hidden="true">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="6" cy="6" r="3" />
                        <circle cx="18" cy="6" r="3" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="18" r="3" />
                        <line x1="8.5" y1="7.5" x2="15.5" y2="16.5" />
                        <line x1="15.5" y1="7.5" x2="8.5" y2="16.5" />
                      </svg>
                    </div>
                    <p className="readiness-pillar__title">Integration</p>
                    <p className="readiness-pillar__question">
                      Do your systems talk to each other, or are they islands?
                    </p>
                  </div>
                </div>
                <div className="readiness-framework__foundation">
                  <p>Process before technology. Data before dashboards. People before platforms.</p>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  Before any company can capture value from this technology shift, it needs honest answers to
                  hard questions across four areas:
                </p>
                <p>
                  <strong>Talent.</strong> Domain experts willing to learn new tools, and leadership willing to
                  invest in their development. With 94% of firms struggling to fill positions and mass
                  retirements on the horizon, institutional knowledge is the most valuable and most perishable
                  asset a construction company owns.
                </p>
                <p>
                  <strong>Process.</strong> Automating a broken process produces broken results faster. If an
                  estimating workflow lives in fourteen spreadsheets with no version control, AI won&apos;t fix
                  it. The Carnegie Mellon Capability Maturity Model makes the principle clear: the quality of
                  any system is directly related to the quality of the process behind it.
                </p>
                <p>
                  <strong>Data.</strong> Ninety-six percent of construction data goes unused. Gartner predicts
                  organizations will abandon 60% of AI projects unsupported by AI-ready data. The average
                  construction business uses 11 separate data environments (often in the form of 11 disconnected
                  systems). If data is siloed, duplicated, and unreliable, no tool will produce reliable outputs.
                </p>
                <p>
                  <strong>Integration.</strong> Nearly a third of construction companies report their systems
                  don&apos;t communicate with each other. Disconnected estimating tools, PM platforms, accounting
                  systems, and field apps don&apos;t just leave value on the table&nbsp;&mdash; they actively
                  create the conditions for inefficiency.
                </p>
                <p>
                  AI coding tools are doing the same thing for domain expertise. The difference is that the
                  industries with the widest gap between what people know and what they&apos;ve been able to
                  build with that knowledge stand to win the most&nbsp;&mdash; and by that measure,
                  construction isn&apos;t just in the game. It&apos;s sitting on the biggest opportunity in
                  the room.
                </p>
              </div>
            </div>
          </section>

          {/* ─── WHERE THE VALUE LIVES NOW ─── */}
          <section id="value" className="bg-slate-50 dark:bg-slate-800 py-20">
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">Value</p>
              <h2 className="article-section-heading mb-8">
                Where the Value Lives Now
              </h2>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  The cost of building software is nose diving. Custom applications will proliferate. In the near
                  future, domain experts across every industry will build their own tools fine-tuned to their
                  specific operational processes.
                </p>
                <p>
                  That means the value of software itself&nbsp;&mdash; the code, application, and
                  product&nbsp;&mdash; is in structural decline. Fewer startups will emerge to sell generic solutions
                  at per-seat pricing. The market is already punishing that model.
                </p>
                <p>
                  What&apos;s not in decline: the expertise to know what to build, the operational knowledge to
                  implement without disrupting what works, the ability to assess whether an organization is ready
                  for new technology, and the strategic thinking that turns a compelling demo into measurable ROI.
                </p>
              </div>
            </div>

            {/* ─ Visual: Closing Pull Quote ─ */}
            <div className="max-w-3xl mx-auto px-6 my-16 fade-section">
              <div className="closing-pullquote">
                <p className="closing-pullquote__text">
                  &ldquo;The barrier between knowing what you need and having it built has effectively disappeared.
                  The question is no longer &lsquo;Can we build it?&rsquo; It&apos;s &lsquo;Do we know what to
                  build&nbsp;&mdash; and are we ready to use it?&rsquo;&rdquo;
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  The companies that win in this next era will get the fundamentals right before chasing the fancy
                  new tool. Process before technology. Data before dashboards. People before platforms.
                </p>
                <p>
                  The barrier between knowing what you need and having it built has effectively disappeared. The
                  question is no longer &ldquo;Can we build it?&rdquo; It&apos;s &ldquo;Do we know what to
                  build&nbsp;&mdash; and are we ready to use it?&rdquo;
                </p>
              </div>
            </div>
          </section>

          {/* ─── ABOUT THE AUTHOR ─── */}
          <section id="author" className="py-20">
            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="author-section">
                <p className="section-label mb-3">About the Author</p>
                <div className="author-section__body article-prose">
                  <p>
                    Cain Menard is Director of Consulting &amp; Operations at Automized Solutions.
                    He&apos;s spent his career in the field, in consulting, and now in digital
                    transformation&nbsp;&mdash; helping contractors across construction and
                    infrastructure modernize how they operate. The application referenced in this
                    article is real and live. So is everything else.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── SOURCES & FURTHER READING ─── */}
          <section id="sources" className="bg-slate-50 dark:bg-slate-800 py-20">
            <div className="max-w-2xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">Sources &amp; Further Reading</p>
              <p className="sources-intro">
                The research cited throughout this article draws from peer-reviewed academic studies,
                industry surveys, and tier-one analyst reports. Key sources include:
              </p>

              <div className="sources-list">
                <div className="sources-category">
                  <h3 className="sources-category__title">AI Coding Productivity</h3>
                  <p className="sources-category__items">
                    Peng et al., arXiv 2023 (GitHub Copilot RCT); Dell&apos;Acqua et al., Harvard
                    Business School 2023 (BCG/Harvard &ldquo;Jagged Frontier&rdquo; study); Becker et al.,
                    arXiv 2025 (METR counterpoint study)
                  </p>
                </div>

                <div className="sources-category">
                  <h3 className="sources-category__title">AI &amp; Labor Economics</h3>
                  <p className="sources-category__items">
                    Autor, NBER Working Paper No. 32140, 2024; Brynjolfsson et al., <em>Quarterly
                    Journal of Economics</em>, 2025; Tambe, <em>Management Science</em>, 2025
                  </p>
                </div>

                <div className="sources-category">
                  <h3 className="sources-category__title">Construction Industry Data</h3>
                  <p className="sources-category__items">
                    McKinsey, &ldquo;Delivering on Construction Productivity,&rdquo; 2024; McKinsey,
                    &ldquo;Imagining Construction&apos;s Digital Future,&rdquo; 2016; FMI/Autodesk,
                    &ldquo;Harnessing the Data Advantage,&rdquo; 2020; FMI/PlanGrid,
                    &ldquo;Construction Disconnected,&rdquo; 2018
                  </p>
                </div>

                <div className="sources-category">
                  <h3 className="sources-category__title">Construction Workforce</h3>
                  <p className="sources-category__items">
                    AGC/NCCER 2025 Workforce Survey; HBI Construction Labor Market Report, Fall 2025;
                    JBKnowledge Construction Technology Reports
                  </p>
                </div>

                <div className="sources-category">
                  <h3 className="sources-category__title">Technology Adoption &amp; Change Management</h3>
                  <p className="sources-category__items">
                    Prosci Best Practices in Change Management; NIH/PMC, &ldquo;Assessing Technology
                    Implementation Success for Highway Construction,&rdquo; 2023; Maali et al.,
                    <em> ITcon</em>, 2020
                  </p>
                </div>

                <div className="sources-category">
                  <h3 className="sources-category__title">Market &amp; Investment Data</h3>
                  <p className="sources-category__items">
                    Gartner AI Code Assistant Forecast, 2024; Crunchbase Global VC Report, 2025;
                    IDC, &ldquo;Is SaaS Dead?&rdquo;, 2025
                  </p>
                </div>

                <div className="sources-category">
                  <h3 className="sources-category__title">Historical Parallels</h3>
                  <p className="sources-category__items">
                    P&eacute;rez, <em>Technological Revolutions and Financial Capital</em>, 2002;
                    Harford, <em>Financial Times</em>, 2024
                  </p>
                </div>
              </div>
            </div>
          </section>

          <Footer variant="simple" />
        </div>
      </div>
    </>
  )
}
