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

          {/* ─── THE NUMBERS BEHIND THE SHIFT ─── */}
          <section id="the-numbers" className="bg-slate-50 dark:bg-slate-800 py-20">
            <div className="max-w-2xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">The Evidence</p>
              <h2 className="article-section-heading mb-8">
                The Numbers Behind the Shift
              </h2>
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
                <p className="article-callout">
                  For balance: a rigorous 2025 METR study found experienced open-source developers were
                  actually 19% slower with AI tools on complex maintenance tasks — while believing they
                  were 20% faster. AI excels at building new things from domain knowledge. It struggles with
                  maintaining complex legacy codebases. That distinction matters significantly for how
                  companies should think about adoption.
                </p>
              </div>
            </div>
          </section>

          {/* ─── CONSTRUCTION PROFESSIONALS ─── */}
          <section id="untapped-builders" className="bg-white dark:bg-slate-900 py-20">
            <div className="max-w-2xl mx-auto px-6 fade-section">
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
                <p className="article-callout">
                  Here&apos;s the shift most people miss: those same superintendents who&apos;ve never written a
                  line of code may become your most prolific software builders. Building custom applications
                  is becoming as simple as describing what you need out loud, the way you&apos;d explain it to
                  a colleague.
                </p>
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

          {/* ─── MORE CONTENT COMING SOON ─── */}

          <Footer variant="simple" />
        </div>
      </div>
    </>
  )
}
