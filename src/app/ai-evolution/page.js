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

export default function AIEvolution() {
  const activeSection = useSectionObserver()
  const scrolled = useScrollPosition()
  useFadeOnScroll()
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
              Remember that GEICO commercial? A couple of well-groomed cavemen sitting in a nice
              restaurant, visibly offended that GEICO just told the world their website was
              &ldquo;so easy, a caveman could do it.&rdquo;
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
                The joke worked because everybody assumed some people just aren&apos;t the tech type.
                Smart, sure — just not <em>that kind</em> of smart.
              </p>
              <p>
                That assumption defined how the construction industry thought about technology for
                two decades. The field guys build things. The tech guys build software. And never
                the twain shall meet.
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

          {/* ─── VISUAL COMPARISON ─── */}
          <section className="bg-white dark:bg-slate-900 py-20">
            <div className="max-w-5xl mx-auto px-6 fade-section">
              <div className="grid md:grid-cols-2 gap-10">
                {/* Left: Tableau Dashboard */}
                <div>
                  <div className="aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                    <iframe
                      src={TABLEAU_URL}
                      title="Original Tableau Dashboard"
                      className="w-full h-full border-0 pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-4 text-sm text-slate-400 text-center leading-relaxed">
                    Weeks of development · Platform-constrained · Requires Tableau literacy
                  </p>
                </div>
                {/* Right: React Web App */}
                <div>
                  <div className="aspect-video rounded-lg overflow-hidden border-2 border-amber-400 dark:border-amber-500 bg-slate-100 dark:bg-slate-800">
                    <iframe
                      src={WEBAPP_URL}
                      title="React Web Application"
                      className="w-full h-full border-0 pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-4 text-sm font-medium text-center leading-relaxed" style={{ color: 'var(--accent)' }}>
                    Hours of development · $0 hosting · Unlimited customization · Anyone with a browser
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── COMPARISON ─── */}
          <section id="comparison" className="bg-slate-50 dark:bg-slate-800 py-20">
            <div className="max-w-4xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">Side by Side</p>
              <h2 className="article-section-heading mb-4">What Changed</h2>
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
          <section id="perspective" className="bg-white dark:bg-slate-900 py-20">
            <div className="max-w-2xl mx-auto px-6 fade-section">
              <p className="section-label mb-3">Perspective</p>
              <h2 className="article-section-heading mb-16">What This Means</h2>

              {/* The Speed of Change */}
              <div className="article-subsection">
                <h3 className="article-subheading">The Speed of Change</h3>
                <div className="article-prose">
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
              <div className="article-subsection">
                <h3 className="article-subheading">For Construction &amp; Infrastructure</h3>
                <div className="article-prose">
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
              <div className="article-subsection">
                <h3 className="article-subheading">The Bigger Picture</h3>
                <div className="article-prose">
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
              <div className="flex flex-wrap gap-4 pt-8">
                <a href="/" className="btn-primary">Back to Portfolio</a>
                <a href="/#projects" className="btn-outline">View All Projects</a>
              </div>
            </div>
          </section>

          <Footer variant="simple" />
        </div>
      </div>
    </>
  )
}
