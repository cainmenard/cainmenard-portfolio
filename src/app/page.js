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

export default function Home() {
  const activeSection = useSectionObserver()
  const scrolled = useScrollPosition()
  useFadeOnScroll()

  const [mobileNav, setMobileNav] = useState(false)
  const [formStatus, setFormStatus] = useState('idle')
  const [showAllJobs, setShowAllJobs] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mgollvll', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.target),
      })
      if (res.ok) { setFormStatus('sent'); e.target.reset() }
      else { setFormStatus('error') }
    } catch { setFormStatus('error') }
  }

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
        secondaryLink={{ href: '/lagniappe', label: 'Lagniappe' }}
      />
      <MobileNav
        navItems={NAV_ITEMS}
        mobileNav={mobileNav}
        onClose={() => setMobileNav(false)}
        secondaryLink={{ href: '/lagniappe', label: 'Lagniappe' }}
        ctaHref="#contact"
      />

      {/* ─── HERO ─── */}
      <header className="hero-gradient min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 hero-fade-in">
            <p className="section-label mb-4">Digital Operations Leader</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)' }}>
              Cain Menard
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-xl">
              I started working on a $1B E&amp;I project in a South Texas refinery. Since then, I&apos;ve spent
              my career helping companies across construction, energy, and infrastructure modernize
              how they operate — through consulting, data analytics, and technology.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#projects" className="btn-primary">View My Work ↓</a>
              <a href="#contact" className="btn-outline">Get in Touch</a>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 dark:border-slate-700 mb-8">
              <div>
                <p className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>500+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mt-1">Managers Trained</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>50%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mt-1">YoY Revenue Growth</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>$1.5B</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mt-1">Client Revenue Served</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Specialty Trades', 'General Contractors', 'Infrastructure', 'Energy', 'Banking'].map(s => (
                <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-medium">{s}</span>
              ))}
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
                  My career started in the field — managing project controls on a $1B industrial refinery
                  in South Texas, then running commercial construction projects as a GC project manager
                  across K-12 education, food &amp; beverage, and industrial warehouses. At every stop, I saw
                  the same thing: contractors running complex, high-stakes operations on manual processes,
                  disconnected spreadsheets, and software that nobody actually wanted to use.
                </p>
              </div>
              <div className="pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                <p>
                  That pattern led me to consulting at a 70-year-old boutique construction consultancy with
                  a gold-standard reputation in the industry. I spent three years advising contractors from
                  $30M to $1.5B in revenue — improving profitability through operational assessments,
                  financial benchmarking, and productivity improvement programs. I also built something the firm
                  had never done before: a full software and data analytics implementation, from scoping and
                  selling the engagement to building an AWS-hosted data pipeline and training users on-site
                  in Honolulu.
                </p>
              </div>
              <div>
                <p>
                  Today I&apos;m the Director of Consulting &amp; Operations at Automized, a PE-backed technology
                  startup helping specialty trade contractors — from roofing and concrete to HVAC and
                  excavation — bring the best out of their digital systems. I built our digital operations
                  consulting practice from scratch: interviewing stakeholders, mapping workflows, evaluating
                  software against real requirements weighted by the people who&apos;ll use it, and managing
                  implementations through go-live. The through-line across my career has always been the
                  same: technology should serve the people in the organization, not the other way around.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">At a Glance</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>8+</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Years in construction &amp; infrastructure</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>$1B+</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Largest project managed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>3</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Published industry articles</p>
                  </div>
                </div>
              </div>
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
          <h2 className="section-heading text-3xl md:text-4xl mb-4">Work Samples</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-2xl">Interactive dashboards and data tools built for real consulting engagements. Click through to explore the full version on Tableau Public.</p>

          {/* ─── FEATURED: AI Evolution Case Study ─── */}
          <a href="/ai-evolution" className="featured-project-card block mb-10 stagger-child">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ background: 'var(--accent)' }}>Featured</span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">Case Study</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">From Tableau Dashboard to AI-Built Web App</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5 max-w-2xl">
              I spent months building a project performance dashboard in Tableau for consulting clients.
              Then I rebuilt it as a deployed React application in hours — using Claude Code and Wispr Flow voice-to-code.
              Same analysis. Radically different process.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-lg mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Before</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">Months</p>
                <p className="text-xs text-slate-400">Tableau Desktop</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--accent)' }}>After</p>
                <p className="text-lg font-bold" style={{ color: 'var(--accent)' }}>Hours</p>
                <p className="text-xs text-slate-400">AI + Voice-to-Code</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-green-500 mb-1">Result</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">Deployed</p>
                <p className="text-xs text-slate-400">React + Vercel</p>
              </div>
            </div>
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
              Read the Full Story &rarr;
            </span>
          </a>

          <div className="space-y-10">
            {TABLEAU_DASHBOARDS.map((d, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden stagger-child">
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{d.title}</h3>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">{d.context}</span>
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
                    <p className="text-xs text-slate-400 mt-1">Best experienced on desktop</p>
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
          <h2 className="section-heading text-3xl md:text-4xl mb-4">Technical Toolkit</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-2xl">
            My work sits at the intersection of operations consulting and technical implementation.
            These are the tools and credentials behind the work you see above.
          </p>

          <div className="mb-16">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Verified Certifications</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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
            <h2 className="section-heading text-3xl md:text-4xl mb-6">Let&apos;s Talk</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
              Whether you&apos;re a contractor trying to figure out why you&apos;re leaving money on the table,
              a firm looking to modernize operations, or just someone who wants to talk shop —
              I&apos;m always up for a conversation.
            </p>
          </div>

          <div className="max-w-lg mx-auto mb-12">
            {formStatus === 'sent' ? (
              <div className="text-center py-8">
                <p className="text-2xl mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)' }}>Message sent.</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Name</label>
                    <input type="text" id="name" name="name" required
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
                    <input type="email" id="email" name="email" required
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition" placeholder="you@company.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Message</label>
                  <textarea id="message" name="message" rows={4} required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition resize-none" placeholder="What's on your mind?" />
                </div>
                <button type="submit" disabled={formStatus === 'sending'} className="btn-primary w-full justify-center">
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {formStatus === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Try emailing me directly.</p>}
              </form>
            )}
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a href="mailto:cainmenard@gmail.com" className="btn-outline">cainmenard@gmail.com</a>
              <a href="https://linkedin.com/in/cainmenard" target="_blank" rel="noopener noreferrer" className="btn-outline">LinkedIn ↗</a>
              <a href="https://github.com/cainmenard" target="_blank" rel="noopener noreferrer" className="btn-outline">GitHub ↗</a>
            </div>
            <p className="text-sm text-slate-400">(337) 654-2304 &middot; Atlanta, GA</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
