'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import SideNav from '@/components/SideNav'
import Footer from '@/components/Footer'
import ShareButtons from '@/components/ShareButtons'
import ReadingProgressBar from '@/components/ReadingProgressBar'
import { useFadeOnScroll } from '@/hooks/useFadeOnScroll'

const TABLEAU_URL = 'https://public.tableau.com/views/ProjectPerformanceAnalysis/AnalysisOverview?:embed=y&:display_count=no&:showVizHome=no'
const WEBAPP_URL = 'https://project-performance-analysis.vercel.app'

const SECTIONS = [
  { id: 'the-shift', label: 'The Shift' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'the-numbers', label: 'The Numbers' },
  { id: 'untapped-builders', label: 'The Builders' },
  { id: 'industry-productivity', label: 'The Industry' },
  { id: 'legacy-software', label: 'Legacy Software' },
  { id: 'functional-experience', label: 'The Bottleneck' },
  { id: 'readiness', label: 'Readiness' },
  { id: 'value', label: 'Value' },
]

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
      <ReadingProgressBar />
      <SideNav sections={SECTIONS} />

      {/* ─── Back to Home ─── */}
      <a
        href="/"
        className="back-to-home"
        aria-label="Back to home page"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Home
      </a>

      <article className="min-h-screen article-page">

        {/* ─── BREADCRUMB ─── */}
        <nav aria-label="Breadcrumb" className="breadcrumb-nav">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/#projects">Case Studies</a>
            </li>
            <li className="breadcrumb-item breadcrumb-item--current" aria-current="page">
              Weeks of Tableau Work, Rebuilt in Hours
            </li>
          </ol>
        </nav>

        {/* ─── HERO ─── */}
        <header className="bg-white dark:bg-slate-900 pt-16 pb-14">
          <div className="max-w-3xl mx-auto px-6 hero-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <span className="article-tag">Case Study</span>
              <span className="article-tag">AI &amp; Construction</span>
            </div>
            <h1 className="article-headline mb-6">
              Weeks of Tableau Work,{' '}
              <br className="hidden sm:block" />
              Rebuilt in Hours
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl">
              A project performance dashboard that took weeks
              in Tableau, on a $75-a-month license, got rebuilt as a live React app in hours, for nothing.
            </p>
            <div className="flex items-center gap-3 pb-8 border-b border-slate-200 dark:border-slate-700">
              <Image src="/headshot.jpg" alt="Cain Menard" width={44} height={44} className="rounded-full" priority />
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>Cain Menard</p>
                <p className="text-xs text-slate-400">Operations Strategy, Data Analytics &amp; AI &nbsp;&middot;&nbsp; 9 min read</p>
              </div>
              <ShareButtons className="share-buttons--hero" />
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

          {/* ─── KEY TAKEAWAYS ─── */}
          <section className="bg-white dark:bg-slate-900 pb-4">
            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="key-takeaways">
                <div className="key-takeaways__header">
                  <svg className="key-takeaways__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
                  </svg>
                  <h2 className="key-takeaways__title">The short version</h2>
                </div>
                <ul className="key-takeaways__list">
                  <li>A Tableau dashboard that took weeks got rebuilt as a deployed React app in hours, at no hosting cost</li>
                  <li>The bottleneck moved from writing code to knowing what to build</li>
                  <li>Construction productivity grew 10% between 2000 and 2022. Manufacturing grew 90%</li>
                  <li>96% of construction data goes unused, and the industry is the second-least digitized in the country</li>
                  <li>Under 10% of technology implementation failures are technical</li>
                  <li>Structured change management makes a project 7x more likely to hit its objectives</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ─── THE SHIFT ─── */}
          <section id="the-shift" className="bg-slate-50 dark:bg-slate-800 py-20">
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">The Shift</p>
              <h2 className="article-section-heading mb-8">
                From Weeks to Hours: How AI Changes the Cost of Analytics
              </h2>
            </div>
            <div className="max-w-2xl mx-auto px-6">
              <div className="article-prose fade-section">
                <p>
                  A completed project performance dashboard built over several weeks or months three years
                  ago (data modeling, formulas, iterative design, testing, troubleshooting, and revisions)
                  can be rebuilt as a full production web application in just hours today. 5 dashboard
                  views, interactive charts, KPI cards, cross-dimensional filters, executive insights, and
                  strategic recommendations. Deployed for free. No license, no login, no IT department involved,
                  using Claude Code as an AI pair-programmer and Wispr Flow for voice-to-code.
                </p>
                <p>
                  I built the application by describing its requirements verbally to AI development tools
                  (Claude Code and Wispr Flow) and refining the output in real time.
                </p>
              </div>
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
                  Same analytical goal, same domain expertise, and a build process with almost nothing
                  in common. Both tools below are live. Click through and use them.
                </p>
              </div>

              {/* ─ Toggle, visible below the dual breakpoint only ─ */}
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
                      <iframe src={TABLEAU_URL} title="Original Tableau Dashboard, fully interactive" className="comparison-panel__iframe" loading="lazy" />
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
                      <iframe src={WEBAPP_URL} title="AI-Built React Web App, fully interactive" className="comparison-panel__iframe" loading="lazy" />
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
                  GitHub&apos;s controlled experiment found developers using AI coding tools
                  completed tasks 55.8% faster.<a href="https://arxiv.org/abs/2302.06590" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>1</sup></a>
                  {' '}Harvard and BCG tested 758 consultants and found AI users produced
                  40% higher-quality output while finishing 25% faster.<a href="https://www.hbs.edu/faculty/Pages/item.aspx?num=64700" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>2</sup></a>
                  {' '}A Google principal engineer gave Claude Code a three-paragraph problem description and received a working result in one
                  hour that matched what her team had spent a year building.<a href="https://the-decoder.com/google-engineer-says-claude-code-built-in-one-hour-what-her-team-spent-a-year-on/" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>3</sup></a>
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  Google now generates roughly half its new code with AI.<a href="https://www.computerweekly.com/news/366638839/Half-of-Googles-software-development-now-AI-generated" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>4</sup></a>
                  {' '}Over 90% of Fortune 100 companies have deployed GitHub Copilot.<a href="https://techcrunch.com/2025/07/30/github-copilot-crosses-20-million-all-time-users/" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>5</sup></a>
                  {' '}Gartner projects 90% of software engineers will use AI code assistants by 2028, up from under 14% in early 2024.<a href="https://www.gartner.com/en/newsroom/press-releases/2025-07-01-gartner-identifies-the-top-strategic-trends-in-software-engineering-for-2025-and-beyond" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>6</sup></a>
                  {' '}The AI code tools market is valued at $7.4 billion and heading toward $25-30 billion by 2030.<a href="https://www.grandviewresearch.com/industry-analysis/ai-code-tools-market-report" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>7</sup></a>
                </p>
              </div>
            </div>
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="article-callout">
                For balance: a rigorous 2025 METR study found experienced open-source developers were
                actually 19% slower with AI tools on complex maintenance tasks<a href="https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>8</sup></a>, while believing they
                were 20% faster. AI excels at building new things from domain knowledge. It struggles with
                maintaining complex legacy codebases. Which half of the work you point it at decides
                whether you get the 55.8% or the 19%.
              </p>
            </div>
            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  An MIT study found that 95% of 52 organizations reported no return on their generative AI investments.<a href="https://www.axios.com/2025/08/21/ai-wall-street-big-tech" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>9</sup></a>
                </p>
              </div>
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
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  Superintendents, project managers, and estimators are the people who actually understand how projects make or lose money. Which cost
                  drivers eat margins. Which reports are just busy work nobody reads. Which leading indicators
                  flag trouble six weeks before it shows up in the financials. That&apos;s fifteen, twenty,
                  thirty years of hard-earned knowledge that no software developer in Silicon Valley is going
                  to replicate.
                </p>
                <p>
                  In my 2023 <em>FMI Quarterly</em> article,{' '}
                  <a href="https://fmicorp.com/insights/thought-leadership/artificial-intelligence-for-engineering-and-construction-firms" target="_blank" rel="noopener noreferrer">&ldquo;Artificial Intelligence for Engineering and Construction Firms,&rdquo;</a>{' '}
                  I argued that software developers should be upskilling and adapting their work to serve the
                  construction industry, not the other way around. I still believe that.
                </p>
                <p>
                  Until now, the IT department (if the company even had one) occupied a small, dark corner
                  of the office. JBKnowledge found fewer than half of construction companies have a single
                  dedicated IT employee.<a href="https://jbknowledge.com/construction-technology-report" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>10</sup></a> One company in my current program still sends paper timecards
                  to headquarters by FedEx each week. Multi-million-dollar projects managed
                  with the same information tools available in 1985.
                </p>
                <p>
                  Meanwhile, those same companies are struggling to hire younger talent born into a
                  digital-first world. Gen Z participation in construction more than doubled between 2019 and
                  2023.<a href="https://www.agc.org/news/2025/01/15/agc-nccer-2025-workforce-survey" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>11</sup></a> But 41% of the pre-2020 workforce is expected to retire by 2031.<a href="https://www.agc.org/news/2025/01/15/agc-nccer-2025-workforce-survey" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>11</sup></a> There&apos;s a ticking
                  clock on the institutional knowledge in your people&apos;s heads, and no clear mechanism to
                  capture it before it walks out the door.
                </p>
              </div>
            </div>
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="article-callout">
                Those same superintendents who&apos;ve never written a line of code may become your most
                prolific software builders. Building custom applications
                is becoming as simple as describing what you need out loud, the way you&apos;d explain it to
                a colleague.
              </p>
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
                <p className="prod-chart__title">Productivity Growth, 2000-2022</p>
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
                  <span className="prod-chart__decline-text">2020-2022: Construction productivity declined 8%</span>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  Construction is the second-least digitized major industry in the United States.<a href="https://www.mckinsey.com/capabilities/operations/our-insights/imagining-constructions-digital-future" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>12</sup></a> Most companies
                  spend less than 1% of revenue on IT.<a href="https://www.mckinsey.com/capabilities/operations/our-insights/imagining-constructions-digital-future" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>12</sup></a> For comparison, automotive and aerospace spend 3-5%.
                  Construction underspends cross-industry IT averages by 60-70%.
                </p>
                <p>
                  The tools that do get implemented rarely deliver. Over 70% of ERP implementations
                  fail to meet their original business objectives.<a href="https://www.mckinsey.com/capabilities/operations/our-insights/delivering-on-construction-productivity" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>13</sup></a> The industry hemorrhages an estimated $177
                  billion a year to operational inefficiencies.<a href="https://www.mckinsey.com/capabilities/operations/our-insights/delivering-on-construction-productivity" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>13</sup></a> In 2020, poor data management alone cost the
                  construction industry $1.84 trillion globally, and only 55% of companies even have
                  a formal data plan.<a href="https://www.autodesk.com/resources/harnessing-the-data-advantage-in-construction" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>14</sup></a> Ninety-six percent of the data generated on construction projects goes
                  completely unused.<a href="https://www.autodesk.com/resources/harnessing-the-data-advantage-in-construction" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>14</sup></a> Field teams lose nearly two full working days every week (14+
                  hours) just searching for project information<a href="https://www.construction.com/toolkit/reports/construction-disconnected" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>15</sup></a> and dealing with problems that
                  shouldn&apos;t exist.
                </p>
                <p>
                  The tools exist. They were specified by people who have never coded a change order.
                  The people who understand the
                  work best (who know exactly what dashboard they wish they had, which reports are
                  useless, which metrics actually predict when a job is going sideways) have always
                  been the furthest from the tools that could help them. They&apos;ve never had a way to turn
                  that knowledge into software without a six-figure budget and a year-long timeline.
                </p>
                <p>
                  The AI-in-construction market sits at $3.9 billion today, projected to
                  hit $22.7 billion by 2032.<a href="https://www.fortunebusinessinsights.com/ai-in-construction-market-109848" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>16</sup></a> Even Procore (the biggest construction management
                  platform in the market) launched an Agent Builder that lets construction
                  professionals customize AI workflows without writing a single line of code. The AGC&apos;s 2025
                  Workforce Survey shows 44% of firms already expect AI and robotics to improve job quality and
                  productivity.<a href="https://www.agc.org/news/2025/01/15/agc-nccer-2025-workforce-survey" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>11</sup></a>
                </p>
              </div>
            </div>
            <div className="max-w-3xl mx-auto px-6 fade-section">
              <p className="article-callout">
                The industry that&apos;s historically been last to adopt technology may have the most to gain
                from what&apos;s happening right now. The gap between what construction professionals know and
                what they&apos;ve been able to build with that knowledge is wider here than anywhere else.
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
                  In construction specifically, McKinsey found individual teams routinely build their
                  own digital solutions without coordinating<a href="https://www.mckinsey.com/capabilities/operations/our-insights/imagining-constructions-digital-future" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>12</sup></a>, creating a proliferation of
                  competing, overlapping tools within a single company. JBKnowledge&apos;s surveys
                  found 65% of respondents use spreadsheets for estimating<a href="https://jbknowledge.com/construction-technology-report" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>10</sup></a> despite having dedicated
                  estimating software. The off-the-shelf products simply don&apos;t meet actual needs.
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
                  &ldquo;extend the relevance, reach, and value of human expertise.&rdquo;<a href="https://www.nber.org/papers/w32140" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>17</sup></a> That framing
                  matters. Technical execution is being commoditized at a pace that would have been
                  unimaginable five years ago. The scarce resource is now the domain expertise
                  that determines what to build.
                </p>
                <p>
                  Erik Brynjolfsson at Stanford studied over 5,000 workers and found AI increased
                  productivity 14-15% on average.<a href="https://academic.oup.com/qje/article-abstract/139/3/1823/7612832" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>18</sup></a> But the breakdown is what&apos;s interesting:
                  novice workers improved 34%, while experienced workers saw minimal gains. The AI was
                  essentially encoding top performers&apos; best practices and distributing them to everyone
                  else. A study in <em>Management Science</em> made the point explicit, AI
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
                  David Autor, MIT<a href="https://www.nber.org/papers/w32140" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>17</sup></a>
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  That same Harvard/BCG study found that
                  when consultants applied AI to tasks outside its capability boundary, things
                  that require real judgment, intuition, or knowing which number to trust when two reports
                  disagree, they were about 20% less likely to get the right answer<a href="https://www.hbs.edu/faculty/Pages/item.aspx?num=64700" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>2</sup></a> than
                  consultants working without AI at all.
                </p>
                <p>
                  Knowing how projects fail (budget overruns, material price escalations, change orders
                  stacking up and eating your margin before anyone flags it) is the judgment that study
                  was measuring. For the first time that knowledge can be built into the tooling itself,
                  rather than shoehorned into a vendor&apos;s template written for a generic version of
                  your business.
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
                  <a href="https://timharford.com/2024/01/what-does-history-tell-us-about-the-impact-of-ai-on-jobs/" target="_blank" rel="noopener noreferrer" className="cite-num">Source: Bureau of Labor Statistics, via Tim Harford / Financial Times</a>
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  When VisiCalc launched the first digital
                  spreadsheet in 1980, there were 339,000 accountants in the U.S. By 2022, there were 1.4
                  million.<a href="https://timharford.com/2024/01/what-does-history-tell-us-about-the-impact-of-ai-on-jobs/" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>19</sup></a> Tim Harford at the <em>Financial Times</em> put it plainly: the spreadsheet
                  didn&apos;t kill the profession. It made accountants more productive.
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
                  Most construction companies aren&apos;t positioned to reap the benefits of AI tools yet. Most
                  contractors have not yet built the foundation new technology requires: the right talent,
                  sound processes, reliable data, and integrated systems.
                </p>
                <p>
                  A peer-reviewed study of highway construction and asset management technology implementations
                  found less than 10% of failures result from technical problems. Eighty percent of success
                  depends on addressing people and process issues.<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10571839/" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>20</sup></a>
                </p>
              </div>
            </div>

            {/* ─ Callout: Technology Focus Quote ─ */}
            <div className="max-w-3xl mx-auto px-6 my-12 fade-section">
              <div className="readiness-callout">
                <p className="readiness-callout__text">
                  &ldquo;Any attempt to implement technology that focuses solely on technology is likely to fail
                  in the construction industry.&rdquo;<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10571839/" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>20</sup></a>
                </p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 fade-section">
              <div className="article-prose">
                <p>
                  Prosci&apos;s research shows organizations with structured change management are 7x more
                  likely to achieve project objectives.<a href="https://www.prosci.com/blog/change-management-best-practices" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>21</sup></a> A study in the <em>Journal of Information Technology in
                  Construction</em> analyzed 167 technology-adoption cases across AEC firms<a href="https://www.itcon.org/paper/2020/17" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>22</sup></a> and identified the
                  top practices for success: change-agent effectiveness, measured benchmarks, realistic
                  timeframes, and communicated benefits. Better software and bigger budgets did not
                  make the list.
                </p>
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
                  invest in their development. With 94% of firms struggling to fill positions<a href="https://www.agc.org/news/2025/01/15/agc-nccer-2025-workforce-survey" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>11</sup></a> and mass
                  retirements on the horizon, institutional knowledge is the most valuable and most perishable
                  asset a construction company owns.
                </p>
                <p>
                  <strong>Process.</strong> Automating a broken process produces broken results faster. If an
                  estimating workflow lives in fourteen spreadsheets with no version control, AI won&apos;t fix
                  it. The Carnegie Mellon Capability Maturity Model<a href="https://en.wikipedia.org/wiki/Capability_Maturity_Model" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>23</sup></a> makes the principle clear: the quality of
                  any system is directly related to the quality of the process behind it.
                </p>
                <p>
                  <strong>Data.</strong> Ninety-six percent of construction data goes unused.<a href="https://www.autodesk.com/resources/harnessing-the-data-advantage-in-construction" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>14</sup></a> Gartner predicts
                  organizations will abandon 60% of AI projects unsupported by AI-ready data.<a href="https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>24</sup></a> The average
                  construction business uses 11 separate data environments<a href="https://www.autodesk.com/resources/harnessing-the-data-advantage-in-construction" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>14</sup></a> (often in the form of 11 disconnected
                  systems). If data is siloed, duplicated, and unreliable, no tool will produce reliable outputs.
                </p>
                <p>
                  <strong>Integration.</strong> Nearly a third of construction companies report their systems
                  don&apos;t communicate with each other.<a href="https://www.construction.com/toolkit/reports/construction-disconnected" target="_blank" rel="noopener noreferrer" className="cite-num"><sup>15</sup></a> Disconnected estimating tools, PM platforms, accounting
                  systems, and field apps don&apos;t just leave value on the table, they actively
                  create the conditions for inefficiency.
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
                  The cost of building software is declining rapidly. Custom applications will proliferate. In the near
                  future, domain experts across every industry will build their own tools fine-tuned to their
                  specific operational processes.
                </p>
                <p>
                  That means the value of software itself (the code, application, and
                  product) is in structural decline. Fewer startups will emerge to sell generic solutions
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
                  build, and are we ready to use it?&rsquo;&rdquo;
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
                    Cain Menard helps companies improve margins and operating performance through
                    process redesign, data analytics, and AI. The application referenced in this
                    article is live at{' '}
                    <a href={WEBAPP_URL} target="_blank" rel="noopener noreferrer">project-performance-analysis.vercel.app</a>.
                  </p>
                </div>
                <ShareButtons className="share-buttons--footer" />
              </div>
            </div>
          </section>

          {/* ─── CONTACT ─── */}
          <section id="contact" className="pb-16">
            <div className="max-w-2xl mx-auto px-6 flex flex-wrap justify-center gap-4">
              <a href="mailto:info@cainmenard.com" className="btn-outline">info@cainmenard.com</a>
              <a href="https://linkedin.com/in/cainmenard" target="_blank" rel="noopener noreferrer" className="btn-outline">LinkedIn ↗</a>
            </div>
          </section>

          <Footer variant="simple" />
        </div>
      </article>
    </>
  )
}
