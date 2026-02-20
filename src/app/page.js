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
        <div className="max-w-[72rem] mx-auto px-6 py-20 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3 hero-fade-in">
            <p className="section-label mb-4">Digital Operations Leader</p>
            <h1 className="text-[2.78rem] md:text-[3.33rem] font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              Cain Menard
            </h1>
            <p className="serif-text text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              I started working on a $1B E&amp;I project in a South Texas refinery. Since then, I&apos;ve spent
              my career helping companies across construction, energy, and infrastructure modernize
              how they operate — through consulting, data analytics, and technology.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#projects" className="btn-primary">View My Work ↓</a>
              <a href="#contact" className="btn-outline">Get in Touch</a>
            </div>
            {/* ─── Stat Component ─── */}
            <div className="grid grid-cols-3 gap-6 pt-8 mb-8" style={{ borderTop: '1px solid var(--divider)' }}>
              <div>
                <p className="text-[1.78rem] md:text-[2.22rem] font-bold" style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>500+</p>
                <p className="text-[0.69rem] font-semibold uppercase tracking-wider mt-1" style={{ color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>Managers Trained</p>
              </div>
              <div>
                <p className="text-[1.78rem] md:text-[2.22rem] font-bold" style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>50%</p>
                <p className="text-[0.69rem] font-semibold uppercase tracking-wider mt-1" style={{ color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>YoY Revenue Growth</p>
              </div>
              <div>
                <p className="text-[1.78rem] md:text-[2.22rem] font-bold" style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>$1.5B</p>
                <p className="text-[0.69rem] font-semibold uppercase tracking-wider mt-1" style={{ color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>Client Revenue Served</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Specialty Trades', 'General Contractors', 'Infrastructure', 'Energy', 'Banking'].map(s => (
                <span key={s} className="text-[0.72rem] px-3 py-1.5 rounded-full font-medium" style={{ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)', border: '1px solid var(--divider)' }}>{s}</span>
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
      <section id="about" className="section-spacing" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-[72rem] mx-auto px-6 fade-section">
          <p className="section-label mb-3">About</p>
          <h2 className="section-heading text-[1.67rem] md:text-[2.22rem] mb-4">Background</h2>
          <p className="serif-text mb-10 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            From the field to the boardroom — a career built on closing the gap between how companies operate and how they could.
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <div className="pb-6 mb-6" style={{ borderBottom: '1px solid var(--divider)' }}>
                <p>
                  My career started in the field — managing project controls on a $1B industrial refinery
                  in South Texas, then running commercial construction projects as a GC project manager
                  across K-12 education, food &amp; beverage, and industrial warehouses. At every stop, I saw
                  the same thing: contractors running complex, high-stakes operations on manual processes,
                  disconnected spreadsheets, and software that nobody actually wanted to use.
                </p>
              </div>
              <div className="pb-6 mb-6" style={{ borderBottom: '1px solid var(--divider)' }}>
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
              <div className="rounded-xl p-5" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--divider)', boxShadow: 'var(--shadow-sm)' }}>
                <p className="eyebrow mb-4" style={{ color: 'var(--text-tertiary)', fontSize: '0.67rem' }}>At a Glance</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-[1.33rem] font-bold" style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>8+</p>
                    <p className="text-[0.69rem]" style={{ color: 'var(--text-tertiary)' }}>Years in construction &amp; infrastructure</p>
                  </div>
                  <div>
                    <p className="text-[1.33rem] font-bold" style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>$1B+</p>
                    <p className="text-[0.69rem]" style={{ color: 'var(--text-tertiary)' }}>Largest project managed</p>
                  </div>
                  <div>
                    <p className="text-[1.33rem] font-bold" style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>3</p>
                    <p className="text-[0.69rem]" style={{ color: 'var(--text-tertiary)' }}>Published industry articles</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="eyebrow mb-3" style={{ color: 'var(--text-tertiary)', fontSize: '0.67rem' }}>Education</p>
                {EDUCATION.map(e => (
                  <div key={e.degree} className="mb-3">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{e.degree}</p>
                    <p className="text-[0.69rem]" style={{ color: 'var(--text-tertiary)' }}>{e.school} &middot; {e.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TABLEAU ─── */}
      <section id="projects" className="section-spacing" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-[72rem] mx-auto px-6 fade-section">
          <p className="section-label mb-3">Projects</p>
          <h2 className="section-heading text-[1.67rem] md:text-[2.22rem] mb-4">Work Samples</h2>
          <p className="serif-text mb-12 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>Interactive dashboards and data tools built for real consulting engagements. Click through to explore the full version on Tableau Public.</p>
          <div className="space-y-10">
            {TABLEAU_DASHBOARDS.map((d, i) => (
              <div key={i} className="rounded-xl overflow-hidden stagger-child" style={{ background: 'var(--bg-primary)', border: '1px solid var(--divider)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{d.title}</h3>
                    <span className="text-[0.69rem] font-medium px-2.5 py-0.5 rounded-full" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)' }}>{d.context}</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{d.description}</p>
                </div>
                <div className="px-6 pb-6 hidden md:block">
                  <ErrorBoundary>
                    <TableauEmbed embedUrl={d.embedUrl} title={d.title} />
                  </ErrorBoundary>
                </div>
                <div className="px-6 pb-4 md:hidden">
                  <a href={d.link} target="_blank" rel="noopener noreferrer"
                    className="block p-4 rounded-lg text-center transition-colors" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--divider)' }}>
                    <p className="text-sm font-semibold" style={{ color: 'var(--accent-blue)' }}>Open Interactive Dashboard ↗</p>
                    <p className="text-[0.69rem] mt-1" style={{ color: 'var(--text-tertiary)' }}>Best experienced on desktop</p>
                  </a>
                </div>
                <div className="px-6 pb-5 pt-3 hidden md:block" style={{ borderTop: '1px solid var(--divider)' }}>
                  <a href={d.link} target="_blank" rel="noopener noreferrer"
                    className="text-[0.69rem] font-semibold uppercase tracking-wider hover:underline" style={{ color: 'var(--accent-blue)', letterSpacing: '0.05em' }}>
                    Open Full Dashboard on Tableau Public ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PUBLICATIONS ─── */}
      <section id="writing" className="section-spacing" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-[72rem] mx-auto px-6 fade-section">
          <p className="section-label mb-3">Writing &amp; Speaking</p>
          <h2 className="section-heading text-[1.67rem] md:text-[2.22rem] mb-4">Published Work</h2>
          <p className="serif-text mb-12 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>Industry articles and speaking engagements on construction operations, technology adoption, and workforce development.</p>
          <div className="space-y-4">
            {PUBLICATIONS.map((p, i) => (
              <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="pub-card block stagger-child">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
                  <span className="text-[0.69rem] font-medium" style={{ color: 'var(--text-tertiary)' }}>{p.outlet}</span>
                </div>
                <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>{p.description}</p>
                {p.callouts.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.callouts.map((c, j) => (
                      <a key={j} href={c.url} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[0.69rem] px-2.5 py-1 rounded-full font-medium transition-colors"
                        style={{ background: 'rgba(43, 89, 69, 0.08)', color: 'var(--accent-green)' }}>
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
      <section id="experience" className="section-spacing" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-[72rem] mx-auto px-6 fade-section">
          <p className="section-label mb-3">Experience</p>
          <h2 className="section-heading text-[1.67rem] md:text-[2.22rem] mb-4">Career Timeline</h2>
          <p className="serif-text mb-12 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>From project controls to consulting leadership — a progression built on solving operational problems with technology.</p>
          <div className="space-y-12">
            {(showAllJobs ? EXPERIENCE : EXPERIENCE.slice(0, 2)).map((job, i) => (
              <div key={i} className="relative pl-10 stagger-child">
                {i < (showAllJobs ? EXPERIENCE.length : 2) - 1 && <div className="timeline-line" />}
                <div className="timeline-dot" />
                <div className="rounded-xl p-6 md:p-8" style={{ background: 'var(--bg-primary)', border: '1px solid var(--divider)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-1">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{job.company}</h3>
                    <span className="text-sm font-medium" style={{ color: 'var(--accent-blue)' }}>{job.role}</span>
                  </div>
                  <p className="text-[0.69rem] font-medium mb-4" style={{ color: 'var(--text-tertiary)' }}>{job.period} &middot; {job.location}</p>
                  <ul className="space-y-2">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="text-sm leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full" style={{ color: 'var(--text-secondary)' }}>
                        <span className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full" style={{ background: 'var(--bg-tertiary)' }}></span>
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
                style={{ color: 'var(--accent-blue)', letterSpacing: '0.05em' }}>
                Show {EXPERIENCE.length - 2} Earlier Roles
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── SKILLS & CERTIFICATIONS ─── */}
      <section id="skills" className="section-spacing" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-[72rem] mx-auto px-6 fade-section">
          <p className="section-label mb-3">Skills &amp; Certifications</p>
          <h2 className="section-heading text-[1.67rem] md:text-[2.22rem] mb-4">Technical Toolkit</h2>
          <p className="serif-text mb-12 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            My work sits at the intersection of operations consulting and technical implementation.
            These are the tools and credentials behind the work you see above.
          </p>

          <div className="mb-16">
            <p className="eyebrow mb-6" style={{ color: 'var(--text-tertiary)', fontSize: '0.67rem' }}>Verified Certifications</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {CERTS.map(c => (
                <a key={c.name} href={c.link} target="_blank" rel="noopener noreferrer"
                  className="group rounded-xl p-4 flex flex-col items-center text-center transition-all duration-200 stagger-child"
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--divider)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="w-16 h-16 mb-3 flex items-center justify-center">
                    <Image src={c.badge} alt={c.name} width={64} height={64} className="w-full h-full object-contain rounded-lg" loading="lazy" />
                  </div>
                  <p className="text-[0.69rem] font-medium leading-tight transition" style={{ color: 'var(--text-secondary)' }}>{c.name}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category}>
                <p className="eyebrow mb-3" style={{ color: 'var(--text-tertiary)', fontSize: '0.67rem' }}>{category}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map(s => <span key={s} className="skill-tag stagger-child">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="section-spacing" style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-[72rem] mx-auto px-6 fade-section">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow-on-dark mb-3">Contact</p>
            <h2 className="text-[1.67rem] md:text-[2.22rem] font-bold mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', color: 'var(--text-on-dark)' }}>Let&apos;s Talk</h2>
            <p className="serif-text mb-10 leading-relaxed" style={{ color: 'var(--text-on-dark-tertiary)' }}>
              Whether you&apos;re a contractor trying to figure out why you&apos;re leaving money on the table,
              a firm looking to modernize operations, or just someone who wants to talk shop —
              I&apos;m always up for a conversation.
            </p>
          </div>

          <div className="max-w-lg mx-auto mb-12">
            {formStatus === 'sent' ? (
              <div className="text-center py-8">
                <p className="text-[1.33rem] mb-2 font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-on-dark)' }}>Message sent.</p>
                <p className="text-sm" style={{ color: 'var(--text-on-dark-tertiary)' }}>I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-[0.69rem] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-on-dark-tertiary)', letterSpacing: '0.05em' }}>Name</label>
                    <input type="text" id="name" name="name" required
                      className="form-input" style={{ background: 'var(--bg-dark-surface)', borderColor: 'rgba(255,255,255,0.1)', color: 'var(--text-on-dark)' }} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[0.69rem] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-on-dark-tertiary)', letterSpacing: '0.05em' }}>Email</label>
                    <input type="email" id="email" name="email" required
                      className="form-input" style={{ background: 'var(--bg-dark-surface)', borderColor: 'rgba(255,255,255,0.1)', color: 'var(--text-on-dark)' }} placeholder="you@company.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-[0.69rem] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-on-dark-tertiary)', letterSpacing: '0.05em' }}>Message</label>
                  <textarea id="message" name="message" rows={4} required
                    className="form-input resize-none" style={{ background: 'var(--bg-dark-surface)', borderColor: 'rgba(255,255,255,0.1)', color: 'var(--text-on-dark)' }} placeholder="What's on your mind?" />
                </div>
                <button type="submit" disabled={formStatus === 'sending'} className="btn-primary w-full justify-center">
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {formStatus === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Try emailing me directly.</p>}
              </form>
            )}
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a href="mailto:cainmenard@gmail.com" className="btn-outline" style={{ color: 'var(--text-on-dark)', borderColor: 'rgba(255,255,255,0.15)' }}>cainmenard@gmail.com</a>
              <a href="https://linkedin.com/in/cainmenard" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ color: 'var(--text-on-dark)', borderColor: 'rgba(255,255,255,0.15)' }}>LinkedIn ↗</a>
              <a href="https://github.com/cainmenard" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ color: 'var(--text-on-dark)', borderColor: 'rgba(255,255,255,0.15)' }}>GitHub ↗</a>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-on-dark-tertiary)' }}>(337) 654-2304 &middot; Atlanta, GA</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
