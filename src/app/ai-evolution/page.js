'use client'
import { useState, useRef, useEffect } from 'react'
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

  const iframeContainerRef = useRef(null)
  const [iframeScale, setIframeScale] = useState(1)

  useEffect(() => {
    const el = iframeContainerRef.current
    if (!el) return
    const updateScale = () => {
      const width = el.clientWidth
      setIframeScale(width / 1440)
    }
    const observer = new ResizeObserver(updateScale)
    observer.observe(el)
    updateScale()
    return () => observer.disconnect()
  }, [])

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
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">By Cain Menard</span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">For construction &amp; consulting executives</span>
            </div>
            <h1 className="section-heading text-4xl md:text-5xl lg:text-6xl mb-6">
              The Tool Changed.<br className="hidden sm:block" /> The Expertise Didn&apos;t.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
              I spent months building a project performance dashboard in Tableau. Then I rebuilt it — all of it — as
              a production web application in hours using AI and voice-to-code. No dev team, no licensing fees, no
              platform constraints. Just domain expertise and a conversation with a machine.
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
              Same analytical thinking, applied with different tools — and a radically different timeline.
              This isn&apos;t theoretical. It&apos;s a side-by-side look at what actually happened.
            </p>

            <div className="evolution-timeline">

              {/* Phase 1: Tableau */}
              <div className="evolution-phase">
                <div className="evolution-phase-marker evolution-phase-marker--tableau" />
                <div className="evolution-phase-content">
                  <p className="evolution-phase-label">Phase 1 — Months</p>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">The Tableau Era</h3>
                  <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 space-y-3">
                    <p>
                      Built as part of real consulting engagements, this Tableau dashboard required weeks of data
                      modeling, calculated fields, parameter actions, and iterative design. Each revision
                      meant re-publishing to Tableau Public. The analysis was solid — but the process was
                      slow, the tool ran $75/month per seat, and the audience was limited to people comfortable
                      navigating Tableau&apos;s interface.
                    </p>
                    <p>
                      This is the reality most consulting firms and construction companies know well. McKinsey
                      found that construction companies spend less than 1% of revenue on IT — less than a third
                      of what comparable industries invest. So when a useful dashboard does get built, it tends
                      to live on one person&apos;s desktop, locked behind a license most stakeholders don&apos;t have.
                    </p>
                  </div>
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
                  <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 space-y-3">
                    <p>
                      Using Claude Code as an AI pair-programmer and Wispr Flow for voice-to-code,
                      I rebuilt the entire analysis as a standalone web application. No drag-and-drop
                      interface — just a conversation. I described what I wanted, refined it in real
                      time, and watched production-quality React code materialize from spoken ideas.
                      Wispr Flow turned stream-of-consciousness thinking — the messy, nonlinear way
                      you actually think through project performance problems — into structured prompts
                      that Claude Code executed with precision.
                    </p>
                    <p>
                      This isn&apos;t as unusual as it sounds anymore. A Google principal engineer recently
                      reported that Claude Code reproduced in one hour what her team had spent a year
                      building. GitHub&apos;s own controlled study found that developers using AI coding tools
                      completed tasks 55.8% faster. And a Harvard/BCG study of 758 consultants showed AI
                      users producing 40% higher-quality output while finishing 25% faster. The speed is
                      real — but the quality holding up is what makes this a paradigm shift, not just a shortcut.
                    </p>
                  </div>
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
                  <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 space-y-3">
                    <p>
                      A multi-page React + TypeScript application with five dashboard views, interactive
                      Recharts visualizations (bar, scatter, pie, radar), KPI cards, CSV upload with
                      auto-parsing, cross-dimensional filters, AI-generated executive insights, strategic
                      recommendations, and full dark mode — deployed to Vercel at zero cost. Anyone with a
                      browser can use it. No license, no login, no limitations.
                    </p>
                    <p>
                      For context: Google now generates roughly half of its new code with AI. Over 90% of
                      Fortune 100 companies have deployed GitHub Copilot. The AI code tools market is growing
                      at 25%+ annually and is expected to reach $25–30 billion by 2030. This isn&apos;t
                      early-adopter territory anymore — it&apos;s where the industry is heading.
                    </p>
                  </div>
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
              Same analytical depth as the Tableau version. Different delivery mechanism entirely.
            </p>

            {/* Desktop: iframe */}
            <div className="hidden md:block">
              <div
                className="webapp-iframe-container"
                ref={iframeContainerRef}
                style={{ height: `${900 * iframeScale}px` }}
              >
                <iframe
                  src={WEBAPP_URL}
                  title="Project Performance Analysis Web App"
                  loading="lazy"
                  allow="clipboard-read; clipboard-write"
                  style={{
                    width: '1440px',
                    height: '900px',
                    transform: `scale(${iframeScale})`,
                    transformOrigin: 'top left',
                  }}
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
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">$75/mo license per seat</span>
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
                <div className="comparison-row">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Ownership</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Vendor-dependent</span>
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
                  <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>Unlimited — it&apos;s your code</span>
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
                <div className="comparison-row">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Ownership</span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>You own every line</span>
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
                  So let me be direct about something: this isn&apos;t a story about replacing Tableau. Tableau is
                  excellent software, and I&apos;d still recommend it in plenty of contexts. This is a story about what
                  happens when the barrier between knowing what you need and having it built effectively disappears.
                </p>
                <p>
                  Andrej Karpathy — co-founder of OpenAI, former head of AI at Tesla — put it simply:
                  &ldquo;The hottest new programming language is English.&rdquo; He&apos;s not being cute. With tools
                  like Wispr Flow, I didn&apos;t type prompts — I spoke them. Stream of consciousness. Brain dump.
                  The messy, nonlinear way people actually think through problems. Wispr Flow captured it, structured
                  it, and fed it to Claude Code, which turned it into production React components in real time.
                </p>
                <p>
                  The result isn&apos;t just faster. It&apos;s a fundamentally different creative process. Instead
                  of wrestling with a tool&apos;s interface constraints, I was having a conversation about what I
                  wanted to exist. And then it existed. That&apos;s a shift worth paying attention to — not because
                  the technology is impressive (it is), but because of what it means for who gets to build things.
                </p>
                <p>
                  Gartner now projects that 90% of software engineers will use AI code assistants by 2028, up from
                  under 14% in early 2024. McKinsey found that generative AI adoption is outpacing SaaS — reaching
                  in one year the market share that took SaaS four years. Jensen Huang, NVIDIA&apos;s CEO, said it
                  bluntly at the World Government Summit: &ldquo;Everybody in the world is now a programmer.&rdquo;
                </p>
                <p>
                  That&apos;s either a threat or an opportunity, depending on what you do with it.
                </p>
              </div>
            </div>

            {/* For the Industry */}
            <div className="pb-12 mb-12 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">For Construction &amp; Infrastructure</h3>
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                <p>
                  Here&apos;s where this gets personal, and where I think the real story is for the people reading this.
                </p>
                <p>
                  Construction and infrastructure have been slow to adopt technology. Not because people don&apos;t
                  see the value — but because the tools have never met them where they are. And the data backs
                  this up in stark terms.
                </p>
                <p>
                  McKinsey&apos;s research shows that construction productivity grew only 10% between 2000 and 2022.
                  Manufacturing grew 90% over the same period. Construction is the second-least digitized major
                  industry in the United States, and companies in this space historically spend less than 1% of
                  revenue on IT — compared to 3–5% in industries like automotive and aerospace. JBKnowledge&apos;s
                  annual survey found that fewer than half of construction companies even have a dedicated IT employee.
                </p>
                <p>
                  That&apos;s not a technology problem. That&apos;s a fit problem. Enterprise platforms are expensive,
                  rigid, and require IT departments to implement and maintain. ERP implementations fail to meet business
                  objectives over 70% of the time (Gartner/Panorama Consulting). Construction firms lose an estimated
                  $177 billion annually to operational inefficiencies, with companies spending 60–80% of their IT
                  budgets just maintaining legacy systems. Meanwhile, 88% of spreadsheets contain significant errors,
                  and nearly a third of construction companies report that their software systems don&apos;t even
                  integrate with each other.
                </p>
                <p>
                  So the people who understand the problems best — project managers, estimators, operations leaders,
                  company owners — have historically been the furthest from the tools that could actually help them.
                  They know exactly what dashboard they wish they had. They know which reports are useless and which
                  metrics actually predict margin erosion. They&apos;ve just never had a way to translate that knowledge
                  into software without a six-figure implementation budget and a twelve-month timeline.
                </p>
                <p>
                  AI changes that equation. Not in theory — in practice. A PM who understands cost drivers and earned
                  value can now describe the analytics tool they need and build it. Not as a prototype. Not as a
                  mockup. As a deployed application their team can use this week. The AGC&apos;s 2025 Workforce Survey
                  shows that 44% of construction firms already expect AI and robotics to improve job quality and make
                  workers more productive. But here&apos;s the thing most people miss: the firms that will benefit most
                  aren&apos;t the ones hiring AI specialists. They&apos;re the ones that figure out how to put AI tools
                  in the hands of their existing domain experts.
                </p>
                <p>
                  With 94% of construction firms struggling to fill open positions and 41% of the pre-2020 workforce
                  expected to retire by 2031, the industry can&apos;t afford to wait for a new generation of tech-native
                  workers. The knowledge that matters is in the heads of the people already on the job — and for the
                  first time, there&apos;s a practical way to turn that knowledge into scalable, deployable tools
                  without a computer science degree.
                </p>
              </div>
            </div>

            {/* The Bigger Picture */}
            <div className="pb-12 mb-12 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">The Bigger Picture</h3>
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                <p>
                  We&apos;re entering an era where the bottleneck is domain expertise, not technical skill. And
                  there&apos;s serious academic and economic research backing this up — not just Silicon Valley hype.
                </p>
                <p>
                  David Autor, one of the most cited labor economists in the world (MIT), argues that AI&apos;s unique
                  opportunity is to &ldquo;extend the relevance, reach, and value of human expertise.&rdquo; His point
                  is that technical execution — the <em>how</em> — is rapidly being commoditized. What remains scarce
                  and valuable is the domain knowledge that tells you <em>what</em> to build and <em>why</em> it matters.
                  In a follow-up paper presented as the Schumpeter Lecture at the European Economic Association (the
                  field&apos;s highest honor), Autor formalized how AI simultaneously automates routine expert tasks
                  while amplifying the value of genuine expertise. The net effect isn&apos;t replacement — it&apos;s leverage.
                </p>
                <p>
                  Erik Brynjolfsson at Stanford found something similar in practice. Studying over 5,000 workers,
                  his research showed that AI assistance increased productivity by 14–15% on average — but the gains
                  were dramatically uneven. Novice workers improved by 34%. Experienced workers saw minimal change.
                  The AI was effectively encoding and distributing the best practices of top performers. For domain
                  experts, the implication is clear: AI doesn&apos;t make your 15 years of experience obsolete. It
                  makes that experience deployable at a scale you couldn&apos;t reach before.
                </p>
                <p>
                  A study published in <em>Management Science</em> (a top-tier business journal) made this explicit:
                  AI creates the greatest value when domain experts themselves can apply it — not when it&apos;s
                  mediated through IT specialists. The researchers specifically connected this to the rise of natural
                  language and no-code tools as the mechanism that unlocks this shift.
                </p>
                <p>
                  The Harvard/BCG study I mentioned earlier has an important wrinkle that&apos;s worth pausing on.
                  Yes, AI users produced 40% better work. But when consultants applied AI to tasks outside its
                  capability boundary — tasks requiring deep judgment — they were 19 percentage points less likely
                  to get the right answer than those working without AI. The tool made mediocre work better and
                  careless work worse. Domain judgment about when and where to apply AI turned out to be the single
                  biggest differentiator.
                </p>
                <p>
                  That finding matters for construction. Every calculated field in that Tableau dashboard reflected
                  hard-won knowledge about how projects actually fail: labor hours that creep, materials that spike,
                  change orders that compound. That knowledge didn&apos;t go away when I switched tools. It became
                  more powerful — because I could express it as a custom application instead of conforming it to a
                  platform&apos;s constraints.
                </p>
                <p>
                  The World Economic Forum projects a net gain of 78 million jobs globally by 2030 as AI reshapes
                  the labor market (170 million created, 92 million displaced). PwC found that productivity growth
                  in AI-exposed industries has nearly quadrupled since 2022. And Tim Harford at the <em>Financial
                  Times</em> drew what I think is the sharpest historical parallel: when the digital spreadsheet
                  launched in 1980, there were 339,000 accountants in the U.S. By 2022, there were 1.4 million.
                  The spreadsheet didn&apos;t replace accountants — it made them more productive and expanded the
                  market for what they could do.
                </p>
                <p>
                  AI coding tools are doing the same thing for domain expertise across every industry. But the
                  industries with the widest gap between domain knowledge and technical capability — construction,
                  infrastructure, specialty trades — have the most to gain.
                </p>
                <p>
                  The people who will thrive in this next era aren&apos;t the ones who can code the fastest.
                  They&apos;re the ones who understand their domain deeply enough to know what to build. And for
                  the first time, that&apos;s enough.
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
