'use client'
import { useState } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'
import TableauEmbed from '@/components/TableauEmbed'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import { useFadeOnScroll } from '@/hooks/useFadeOnScroll'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { NAV_ITEMS } from '@/data/navItems'
import { EXPERIENCE } from '@/data/experience'
import { EDUCATION } from '@/data/education'
import { TABLEAU_DASHBOARDS } from '@/data/tableauDashboards'
import { PUBLICATIONS } from '@/data/publications'
import { SKILLS } from '@/data/skills'
import { CERTS } from '@/data/certifications'
import ComparisonEmbed from '@/components/ComparisonEmbed'
import FieldIntelligencePreview from '@/components/FieldIntelligencePreview'

export default function Home() {
  const activeSection = useSectionObserver()
  const scrolled = useScrollPosition()
  useFadeOnScroll()

  const [mobileNav, setMobileNav] = useState(false)
  const [showAllJobs, setShowAllJobs] = useState(false)

  return (
    <>
      <Nav
        navItems={NAV_ITEMS}
        activeSection={activeSection}
        scrolled={scrolled}
        mobileNav={mobileNav}
        onToggleMobile={() => setMobileNav(!mobileNav)}
        logoHref="#"
        ctaHref="#contact"
        secondaryLinks={[{ href: '/lagniappe', label: 'Lagniappe' }]}
      />
      <MobileNav
        navItems={NAV_ITEMS}
        mobileNav={mobileNav}
        onClose={() => setMobileNav(false)}
        secondaryLinks={[{ href: '/lagniappe', label: 'Lagniappe' }]}
        ctaHref="#contact"
      />

      {/* ─── HERO ─── */}
      <header id="main-content" className="hero-gradient min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 hero-fade-in">
            <p className="section-label mb-4">Operations Strategy &middot; Data Analytics &middot; AI</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)' }}>
              Cain Menard
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-xl">
              Eight years in construction operations and consulting, helping companies grow
              profitability with better processes, data, and AI.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary">See the Work ↓</a>
              <a href="#contact" className="btn-outline">Get in Touch</a>
            </div>
          </div>
          <div className="md:col-span-2 flex justify-center hero-fade-in" style={{ animationDelay: '0.15s' }}>
            <div className="headshot-ring">
              <Image src="/headshot.jpg" alt="Cain Menard" width={280} height={280} className="rounded-full object-cover" priority />
            </div>
          </div>
        </div>
      </header>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <p className="section-label mb-3">About</p>
          <h2 className="section-heading text-3xl md:text-4xl mb-8">Background</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                <p>
                  I started my career on a $1B refinery expansion in South Texas, managing cost controls,
                  estimating, and procurement on up to $50M of work. I then delivered commercial projects
                  up to $10M in scope for a general contractor in Louisiana.
                </p>
              </div>
              <div className="pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                <p>
                  In December 2021 I joined FMI as a strategy and operations consultant. Over two and a half
                  years I advised executive teams at companies from $30M to $6B in revenue on profitability,
                  operations, and market strategy, across construction, infrastructure, renewable energy, and
                  manufacturing. I also helped open a new line of business for the firm: I led its first data
                  analytics and software implementation engagement and delivered it with 100% user adoption
                  and a 30% increase in reporting efficiency.
                </p>
              </div>
              <div>
                <p>
                  At CEI I lead change management and employee adoption on the operations and field side of
                  a 17-company ERP transformation at a publicly traded roofing group, including the training
                  strategy for about 1,500 employees. Before CEI I directed a software, AI, and data analytics
                  implementation firm. I led the full team and ran the business: hiring and firing,
                  performance management, operations strategy, and project delivery, plus every contract
                  from client SOWs to offer letters and exit agreements. Revenue grew 50% year over year
                  across 30+ client engagements.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Education</p>
                {EDUCATION.map(e => (
                  <div key={e.degree} className="mb-3">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{e.degree}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{e.school} &middot; {e.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TABLEAU ─── */}
      <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <p className="section-label mb-3">Projects</p>
          <h2 className="section-heading text-3xl md:text-4xl mb-12">Work Samples</h2>

          {/* ─── FEATURED: Field Intelligence Interactive Case Study ─── */}
          <a href="/field-intelligence" className="featured-project-card featured-project-card--rich block mb-10 stagger-child group text-inherit no-underline">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ background: 'var(--accent)' }}>Featured</span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">Interactive Case Study</span>
            </div>
            <div className="flex items-start gap-4 mb-5">
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex-shrink-0 mt-0.5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400">
                  <path d="M12 2v4" /><path d="M12 18v4" /><path d="m4.93 4.93 2.83 2.83" /><path d="m16.24 16.24 2.83 2.83" /><path d="M2 12h4" /><path d="M18 12h4" /><path d="m4.93 19.07 2.83-2.83" /><path d="m16.24 7.76 2.83-2.83" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Field Intelligence</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                  An interactive case study on where construction companies lose labor dollars between the
                  field and the financial statements, built on data from 500+ completed projects worth $1.7B.
                  It closes with an AI assistant that answers questions from project data and cites its sources.
                </p>
              </div>
            </div>

            {/* Animated "Golden Hour" preview, a miniature of the day-arc story */}
            <FieldIntelligencePreview />

            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-all group-hover:gap-3" style={{ color: 'var(--accent)' }}>
              Explore the Interactive Story
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>

          {/* ─── FEATURED: AI Evolution Case Study ─── */}
          <div className="featured-project-card featured-project-card--rich block mb-10 stagger-child group">
            {/* Top section, links to article */}
            <a href="/ai-evolution" className="block text-inherit no-underline">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ background: 'var(--accent)' }}>Featured</span>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">AI &amp; Construction</span>
              </div>
              <div className="flex items-start gap-4 mb-3">
                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex-shrink-0 mt-0.5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Weeks of Tableau Work, Rebuilt in Hours</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                    How AI turned weeks of dashboard development and a $75-a-month software license into a
                    web app built in hours with no license cost, and what that means for how companies
                    invest in analytics.
                  </p>
                </div>
              </div>
            </a>

            {/* Live before/after embed comparison, stays interactive */}
            <div className="mt-4 mb-5">
              <ComparisonEmbed
                tableauUrl="https://public.tableau.com/views/ProjectPerformanceAnalysis/AnalysisOverview?:embed=y&:display_count=no&:showVizHome=no"
                webAppUrl="https://project-performance-analysis.vercel.app/"
              />
            </div>

            {/* Bottom section, links to article */}
            <a href="/ai-evolution" className="block text-inherit no-underline">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-all group-hover:gap-3" style={{ color: 'var(--accent)' }}>
                Read the Full Article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          </div>

          <div className="space-y-10">
            {TABLEAU_DASHBOARDS.map((d, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden stagger-child">
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{d.title}</h3>
                    {d.context && <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">{d.context}</span>}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{d.description}</p>
                </div>
                <div className="px-6 pb-6 hidden md:block">
                  <ErrorBoundary>
                    <TableauEmbed embedUrl={d.embedUrl} title={d.title} />
                  </ErrorBoundary>
                </div>
                <div className="px-6 pb-4 md:hidden">
                  <a href={d.link} target="_blank" rel="noopener noreferrer"
                    className="block p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center hover:bg-slate-100 dark:hover:bg-slate-750 transition">
                    <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>Open Interactive Dashboard ↗</p>
                  </a>
                </div>
                <div className="px-6 pb-5 border-t border-slate-100 dark:border-slate-800 pt-3 hidden md:block">
                  <a href={d.link} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-semibold uppercase tracking-wider hover:underline" style={{ color: 'var(--accent)' }}>
                    Open Full Dashboard on Tableau Public ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PUBLICATIONS ─── */}
      <section id="writing" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <p className="section-label mb-3">Writing &amp; Speaking</p>
          <h2 className="section-heading text-3xl md:text-4xl mb-12">Published Work</h2>
          <div className="space-y-4">
            {PUBLICATIONS.map((p, i) => (
              <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="pub-card block stagger-child">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{p.title}</h3>
                  <span className="text-xs font-medium text-slate-400">{p.outlet}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-2">{p.description}</p>
                {p.callouts.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.callouts.map((c, j) => (
                      <a key={j} href={c.url} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium hover:bg-amber-100 dark:hover:bg-amber-900/50 transition">
                        {c.type}: {c.name} ↗
                      </a>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <p className="section-label mb-3">Experience</p>
          <h2 className="section-heading text-3xl md:text-4xl mb-12">Career Timeline</h2>
          <div className="space-y-12">
            {(showAllJobs ? EXPERIENCE : EXPERIENCE.slice(0, 2)).map((job, i) => (
              <div key={i} className="relative pl-10 stagger-child">
                {i < (showAllJobs ? EXPERIENCE.length : 2) - 1 && <div className="timeline-line" />}
                <div className="timeline-dot" />
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{job.company}</h3>
                    <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{job.role}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mb-4">{job.period} &middot; {job.location}</p>
                  <ul className="space-y-2">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-slate-300 dark:before:bg-slate-600">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {!showAllJobs && (
            <div className="text-center mt-10">
              <button onClick={() => setShowAllJobs(true)}
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition hover:translate-y-[-1px]"
                style={{ color: 'var(--accent)' }}>
                Show {EXPERIENCE.length - 2} Earlier Roles
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── SKILLS & CERTIFICATIONS ─── */}
      <section id="skills" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <p className="section-label mb-3">Skills &amp; Certifications</p>
          <h2 className="section-heading text-3xl md:text-4xl mb-12">Technical Toolkit</h2>

          <div className="mb-16">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Verified Certifications</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {CERTS.map(c => (
                <a key={c.name} href={c.link} target="_blank" rel="noopener noreferrer"
                  className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col items-center text-center hover:border-amber-300 dark:hover:border-amber-500 hover:shadow-md transition-all duration-200 stagger-child">
                  <div className="w-16 h-16 mb-3 flex items-center justify-center">
                    <Image src={c.badge} alt={c.name} width={64} height={64} className="w-full h-full object-contain rounded-lg" loading="lazy" />
                  </div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition leading-tight">{c.name}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map(s => <span key={s} className="skill-tag stagger-child">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <div className="max-w-2xl mx-auto text-center">
            <p className="section-label mb-3">Contact</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-10">Let&apos;s Talk</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="mailto:info@cainmenard.com" className="btn-outline">info@cainmenard.com</a>
              <a href="https://linkedin.com/in/cainmenard" target="_blank" rel="noopener noreferrer" className="btn-outline">LinkedIn ↗</a>
            </div>
            <p className="text-sm text-slate-400">Atlanta, GA</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
