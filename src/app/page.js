'use client'
import { useState } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'
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
import { allAssessments } from '@/app/personality/data'

// Contact lives in the nav as the "Get in Touch" button, so it is not repeated as a link.
const HOME_NAV = NAV_ITEMS.filter(item => item.id !== 'contact')

// Experience is shown in two groups: consulting years and field years.
const EXPERIENCE_GROUPS = [
  { label: '2020 – Present', jobs: EXPERIENCE.slice(0, 5), offset: 0 },
  { label: '2017 – 2020', jobs: EXPERIENCE.slice(5), offset: 5 },
]

// Personal pages, linked from the nav and from their own homepage section.
const EXTRA_PAGES = [
  { href: '/lagniappe', label: 'Lagniappe' },
  { href: '/personality', label: 'Personality' },
]

const DASHBOARD_IMAGES = {
  'Project Performance Analysis': '/work/project-performance-analysis.jpg',
  'Financial Benchmarking Analysis': '/work/financial-benchmarking.jpg',
}

function Arrow({ dir = 'right' }) {
  const d = dir === 'down' ? '↓' : dir === 'out' ? '↗' : '→'
  return <span aria-hidden="true" className="ed-arrow">{d}</span>
}

function SectionHead({ num, label, title }) {
  return (
    <>
      <p className="ed-eyebrow mb-3">{num} / {label}</p>
      <h2 className="ed-h2 mb-9">{title}</h2>
    </>
  )
}

export default function Home() {
  const activeSection = useSectionObserver()
  const scrolled = useScrollPosition()
  useFadeOnScroll()

  const [mobileNav, setMobileNav] = useState(false)
  const [openJob, setOpenJob] = useState(0)

  return (
    <div className="ed">
      <Nav
        navItems={HOME_NAV}
        activeSection={activeSection}
        scrolled={scrolled}
        mobileNav={mobileNav}
        onToggleMobile={() => setMobileNav(!mobileNav)}
        logoHref="#"
        ctaHref="#contact"
        secondaryLinks={EXTRA_PAGES}
      />
      <MobileNav
        navItems={NAV_ITEMS}
        activeSection={activeSection}
        mobileNav={mobileNav}
        onClose={() => setMobileNav(false)}
        secondaryLinks={EXTRA_PAGES}
        ctaHref="#contact"
      />

      {/* ─── HERO ─── */}
      <header id="main-content" className="pt-20">
        <div className="ed-wrap pt-16 md:pt-24 pb-20 flex flex-col md:flex-row gap-12 md:gap-16 md:items-stretch">
          <div className="flex-1 min-w-0 flex flex-col justify-center hero-fade-in">
            <p className="ed-eyebrow ed-eyebrow--rule mb-8">Operations Strategy · Data Analytics · AI</p>
            <h1 className="ed-display">Cain Menard</h1>
            <p className="ed-lede mt-8">
              Eight years in construction operations and consulting,{' '}
              <em>helping companies grow profitability with better processes, data, and AI.</em>
            </p>
            <div className="mt-11 flex flex-wrap items-center gap-7">
              <a href="#projects" className="ed-btn ed-btn--ink">See the Work <Arrow dir="down" /></a>
              <a href="#contact" className="ed-link">Get in Touch</a>
            </div>
          </div>
          <figure className="md:w-[38%] max-w-[420px] w-full flex flex-col hero-fade-in" style={{ animationDelay: '0.15s' }}>
            <div className="relative w-full aspect-[4/5] md:aspect-auto md:flex-1 md:min-h-[460px] overflow-hidden rounded-sm">
              <Image
                src="/headshot.jpg"
                alt="Cain Menard"
                fill
                sizes="(min-width: 768px) 420px, 100vw"
                className="object-cover"
                style={{ objectPosition: '50% 15%', filter: 'saturate(0.85)' }}
                priority
              />
            </div>
            <figcaption className="ed-caption mt-3.5 pt-3">Atlanta, GA</figcaption>
          </figure>
        </div>
      </header>

      {/* ─── ABOUT ─── */}
      <section id="about" className="pt-16 md:pt-20">
        <div className="ed-wrap fade-section">
          <SectionHead num="01" label="About" title="Background" />
          <div className="ed-rule-top pt-9 flex flex-col lg:flex-row gap-14 lg:gap-16">
            <div className="flex-1 min-w-0 flex flex-col gap-10">
              <div className="ed-para">
                <div className="ed-note" aria-hidden="true"><span className="ed-note__fig">$1B</span><span className="ed-note__cap">refinery expansion</span></div>
                <p className="ed-para__text ed-para__text--lead">
                  I started my career on a $1B refinery expansion in South Texas, managing cost controls,
                  estimating, and procurement on up to $50M of work. I then delivered commercial projects
                  up to $10M in scope for a general contractor in Louisiana.
                </p>
              </div>
              <div className="ed-para">
                <div className="ed-note" aria-hidden="true"><span className="ed-note__fig">$30M–$6B</span><span className="ed-note__cap">in revenue</span></div>
                <p className="ed-para__text">
                  In December 2021 I joined FMI as a strategy and operations consultant. Over two and a half
                  years I advised executive teams at companies from $30M to $6B in revenue on profitability,
                  operations, and market strategy, across construction, infrastructure, renewable energy, and
                  manufacturing. I also helped open a new line of business for the firm: I led its first data
                  analytics and software implementation engagement and delivered it with 100% user adoption
                  and a 30% increase in reporting efficiency.
                </p>
              </div>
              <div className="ed-para">
                <div className="ed-note" aria-hidden="true"><span className="ed-note__fig">1,500</span><span className="ed-note__cap">employees</span></div>
                <p className="ed-para__text">
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
            <div className="lg:w-[300px] flex-shrink-0">
              <p className="ed-eyebrow mb-4">Education</p>
              {EDUCATION.map((e, i) => (
                <div key={e.degree} className={`py-4 ed-line-top ${i === EDUCATION.length - 1 ? 'ed-line-bottom' : ''}`}>
                  <p className="ed-serif text-[20px] leading-snug ed-ink">{e.degree}</p>
                  <p className="text-sm ed-muted">{e.school} · {e.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="ed-band mt-28 md:mt-32">
        <div className="ed-wrap py-24 md:py-28 fade-section">
          <SectionHead num="02" label="Projects" title="Work Samples" />

          {/* Featured: Field Intelligence */}
          <a href="/field-intelligence" className="ed-card ed-card--feature stagger-child">
            <div className="ed-card__media ed-card__media--feature">
              <Image src="/work/field-intelligence.jpg" alt="Opening screen of the Field Intelligence case study" fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" style={{ objectPosition: '0% 30%' }} />
            </div>
            <div className="ed-card__body ed-card__body--feature">
              <span className="ed-kicker">Featured · Interactive Case Study</span>
              <span className="ed-serif text-[30px] md:text-[36px] leading-tight ed-ink">Field Intelligence</span>
              <span className="text-base">
                An interactive case study on where construction companies lose labor dollars between the
                field and the financial statements, built on data from 500+ completed projects worth $1.7B.
                It closes with an AI assistant that answers questions from project data and cites its sources.
              </span>
              <span className="ed-card__foot">Explore the Interactive Story <Arrow /></span>
            </div>
          </a>

          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            <a href="/ai-evolution" className="ed-card stagger-child">
              <div className="ed-card__media">
                <Image src="/work/tableau-vs-react.jpg" alt="The Tableau original beside the React web app rebuild" fill sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="ed-card__body">
                <span className="ed-kicker">Featured · AI &amp; Construction</span>
                <span className="ed-serif text-[25px] leading-tight ed-ink">Weeks of Tableau Work, Rebuilt in Hours</span>
                <span className="text-[15px]">
                  How AI turned weeks of dashboard development and a $75-a-month software license into a
                  web app built in hours with no license cost, and what that means for how companies
                  invest in analytics.
                </span>
                <span className="ed-card__foot ed-card__foot--plain">Read the Full Article <Arrow /></span>
              </div>
            </a>

            {TABLEAU_DASHBOARDS.map(d => (
              <a key={d.title} href={d.link} target="_blank" rel="noopener noreferrer" className="ed-card stagger-child">
                <div className="ed-card__media">
                  <Image src={DASHBOARD_IMAGES[d.title]} alt={`${d.title} dashboard`} fill sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" className="object-cover" style={{ objectPosition: '50% 0%' }} />
                </div>
                <div className="ed-card__body">
                  <span className="ed-kicker">{d.context || 'Tableau'}</span>
                  <span className="ed-serif text-[25px] leading-tight ed-ink">{d.title}</span>
                  <span className="text-[15px]">{d.description}</span>
                  <span className="ed-card__foot ed-card__foot--plain">Open on Tableau Public <Arrow dir="out" /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WRITING ─── */}
      <section id="writing" className="pt-28 md:pt-32">
        <div className="ed-wrap fade-section">
          <SectionHead num="03" label="Writing & Speaking" title="Published Work" />
          <div className="ed-rule-top">
            {PUBLICATIONS.map(p => (
              <div key={p.title} className="ed-row grid gap-x-8 gap-y-2 md:grid-cols-3 py-7 stagger-child">
                <span className="ed-mono-sm ed-muted">{p.outlet}</span>
                <div className="md:col-span-2">
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="ed-serif text-[22px] md:text-[24px] leading-snug ed-ink ed-hover-link">
                    {p.title} <Arrow dir="out" />
                  </a>
                  <p className="text-[15px] mt-1.5">{p.description}</p>
                  {p.callouts.length > 0 && (
                    <p className="text-sm ed-muted mt-2">
                      {p.callouts.map((c, j) => (
                        <span key={c.name}>
                          {j > 0 && ' · '}
                          {c.type} <a href={c.url} target="_blank" rel="noopener noreferrer" className="ed-link ed-link--quiet">{c.name} ↗</a>
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="pt-28 md:pt-32">
        <div className="ed-wrap fade-section">
          <SectionHead num="04" label="Experience" title="Career Timeline" />
          {EXPERIENCE_GROUPS.map((group, g) => (
            <div key={group.label} className={g > 0 ? 'mt-14' : ''}>
              <div className="flex items-center gap-4 pb-3">
                <span className="ed-eyebrow ed-accent">{group.label}</span>
                <span className="flex-1 h-px ed-line-fill" aria-hidden="true" />
              </div>
              <div className="ed-rule-top">
                {group.jobs.map((job, i) => {
                  const idx = group.offset + i
                  const open = openJob === idx
                  return (
                    <div key={job.company} className="ed-line-bottom">
                      <button
                        type="button"
                        onClick={() => setOpenJob(open ? -1 : idx)}
                        aria-expanded={open}
                        className="ed-row w-full flex flex-wrap items-center gap-x-8 gap-y-2 py-6 px-0 md:px-4 text-left"
                      >
                        <span className="ed-mono-sm ed-muted md:w-[200px] flex-shrink-0">{job.period}</span>
                        <span className="flex-1 min-w-[240px]">
                          <span className="block ed-serif text-[22px] md:text-[23px] ed-ink">{job.company}</span>
                          <span className="block text-[15px]">{job.role}</span>
                        </span>
                        <span className="text-sm ed-muted hidden sm:inline">{job.location}</span>
                        <span className="ed-toggle" aria-hidden="true">{open ? '−' : '+'}</span>
                      </button>
                      {open && (
                        <ul className="pb-7 md:pl-[248px] md:pr-16 flex flex-col gap-3 animate-fadeUp">
                          {job.bullets.map(b => (
                            <li key={b} className="ed-bullet text-base leading-relaxed">{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="pt-28 md:pt-32 pb-28 md:pb-32">
        <div className="ed-wrap fade-section">
          <SectionHead num="05" label="Skills & Certifications" title="Technical Toolkit" />
          <div className="ed-rule-top pt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="ed-eyebrow mb-4">Verified Certifications</p>
              <div className="flex flex-col gap-2 text-[15px]">
                {CERTS.map(c => (
                  <a key={c.name} href={c.link} target="_blank" rel="noopener noreferrer" className="ed-link ed-link--ink self-start">{c.name} ↗</a>
                ))}
              </div>
            </div>
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category}>
                <p className="ed-eyebrow mb-4">{category}</p>
                <ul className="text-[15px] leading-[1.9] ed-ink">
                  {items.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEYOND WORK: Lagniappe + Personality ─── */}
      <section id="beyond" className="ed-band pb-28 md:pb-32">
        <div className="ed-wrap pt-24 md:pt-28 fade-section">
          <SectionHead num="06" label="Off the Clock" title="A Little Something Extra" />
          <div className="grid gap-6 md:grid-cols-2">
            <a href="/lagniappe" className="ed-card stagger-child">
              <div className="ed-card__media ed-card__media--wide">
                <Image src="/lagniappe/banner.jpg" alt="Cypress trees at sunset on a Louisiana bayou" fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" style={{ objectPosition: '50% 60%' }} />
              </div>
              <div className="ed-card__body">
                <span className="ed-kicker">Lagniappe</span>
                <span className="ed-serif text-[28px] leading-tight ed-ink">The Rest of the Story</span>
                <span className="text-[15px]">(lan-yap), Cajun French for &quot;a little something extra.&quot;</span>
                <span className="ed-card__foot">Visit Lagniappe <Arrow /></span>
              </div>
            </a>
            <a href="/personality" className="ed-card stagger-child">
              <div className="ed-card__media ed-card__media--wide ed-profile" aria-hidden="true">
                <div className="ed-profile__grid">
                  {allAssessments.map(a => (
                    <div key={a.name} className="ed-profile__cell">
                      <span className="ed-profile__name">{a.name}</span>
                      <span className="ed-profile__value">{a.headline}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ed-card__body">
                <span className="ed-kicker">Personality Profile</span>
                <span className="ed-serif text-[28px] leading-tight ed-ink">How I Operate</span>
                <span className="text-[15px]">
                  My results from six workplace assessments (Myers-Briggs, DISC, Enneagram, ProScan, Big Five,
                  and Instinctive Drives), with notes on how I lead, communicate, and make decisions.
                </span>
                <span className="ed-card__foot">Explore the Profile <Arrow /></span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ─── CONTACT (flows into the footer as one navy block) ─── */}
      <section id="contact" className="ed-navy">
        <div className="ed-wrap pt-28 pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-12 fade-section">
          <div>
            <p className="ed-eyebrow ed-eyebrow--on-navy mb-5">07 / Contact</p>
            <h2 className="ed-serif text-[56px] md:text-[96px] leading-none tracking-tight text-white">Let&apos;s Talk</h2>
            <p className="ed-eyebrow ed-eyebrow--on-navy mt-5">Atlanta, GA</p>
          </div>
          <div className="flex flex-col gap-2.5 md:w-[320px]">
            <a href="mailto:info@cainmenard.com" className="ed-btn ed-btn--white justify-between">info@cainmenard.com <Arrow /></a>
            <a href="https://linkedin.com/in/cainmenard" target="_blank" rel="noopener noreferrer" className="ed-btn ed-btn--ghost justify-between">LinkedIn <Arrow dir="out" /></a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
