'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// ─── Data ──────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'tableau', label: 'Tableau' },
  { id: 'writing', label: 'Writing' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const EXPERIENCE = [
  {
    company: 'Automized Solutions',
    role: 'Director of Consulting & Operations',
    period: 'May 2024 — Present',
    location: 'Atlanta, GA (Remote)',
    bullets: [
      'Lead operational transformation engagements for construction and industrial clients, delivering process optimization and change management strategies that reduced project cycle times by 50%.',
      'Manage cross-functional teams across 14+ business units, conducting stakeholder interviews, process mapping, and gap analyses to develop actionable implementation roadmaps.',
      'Scaled digital operations consulting practice generating 50% year-over-year revenue growth by developing repeatable frameworks for software implementation and infrastructure modernization.',
    ],
  },
  {
    company: 'FMI Corporation',
    role: 'Strategy & Operations Consultant',
    period: 'Dec 2021 — May 2024',
    location: 'Denver, CO → Raleigh, NC',
    bullets: [
      'Delivered performance improvement engagements for heavy civil, highway, and energy clients ($30M–$1.5B revenue), achieving profit increases up to 50% through operational strategy optimization.',
      'Led firm\'s first software and data analytics implementation: built AWS-hosted data pipeline (SQL, Python, Apache Airflow, DBT) reducing reporting time 30% with 100% user adoption.',
      'Presented AI and operational strategy to executive boards, securing $700K in technology investments; recruited and developed analytics team including Chief Data Officer.',
      'Published industry research on AI and data analytics in FMI Quarterly, republished by National Insulation Association and cited by AEC Business.',
    ],
  },
  {
    company: 'Plante Moran',
    role: 'Data Analytics Consultant',
    period: 'Jun 2021 — Dec 2021',
    location: 'Denver, CO',
    bullets: [
      'Built SQL databases and Tableau dashboards for heavy civil contractors to optimize fleet performance and drive profitability. Conceptualized and piloted an AI-driven construction estimating tool.',
    ],
  },
  {
    company: 'Thoroughbred Holdings & Redeux Energy',
    role: 'Strategic Analyst',
    period: 'Nov 2020 — Jun 2021',
    location: 'Denver, CO',
    bullets: [
      'Conducted feasibility studies for mining investments, energy infrastructure, and petrochemical terminal repurposing. Helped scale a utility-scale solar brownfield developer from 2 to 60 employees.',
    ],
  },
  {
    company: 'The Lemoine Company',
    role: 'Project Manager',
    period: 'May 2019 — Sep 2020',
    location: 'Baton Rouge, LA',
    bullets: [
      'Managed $10M commercial construction projects from pre-construction through completion, delivering on-time and under-budget. Negotiated subcontractor contracts up to $2M.',
    ],
  },
  {
    company: 'Excel Group (Excel USA)',
    role: 'Project Engineer',
    period: 'Oct 2017 — Mar 2019',
    location: 'Baton Rouge, LA',
    bullets: [
      'Field-based engineer on a $1B oil and gas refinery mega-project in South Texas. Managed estimating, cost controls, and material procurement for industrial E&I construction up to $50M. Designed relational database tools to streamline procurement workflows.',
    ],
  },
]

const EDUCATION = [
  { degree: 'MBA, Finance & Data Analytics', school: 'University of Denver', year: '2022' },
  { degree: 'Post-Bacc, Construction Management', school: 'Louisiana State University', year: '2021' },
  { degree: 'BAS, Business Administration', school: 'University of Louisiana at Lafayette', year: '2016' },
]


const TABLEAU_DASHBOARDS = [
  {
    title: 'Project Performance Analysis',
    context: 'Built for FMI consulting engagements',
    description: 'Analyzed margin gain/fade trends, cost overruns by category, and productivity benchmarks across divisions and market segments to drive data-informed consulting recommendations for construction contractors.',
    embedUrl: 'https://public.tableau.com/views/ProjectPerformanceAnalysis/AnalysisOverview?:embed=y&:display_count=no&:showVizHome=no',
    link: 'https://public.tableau.com/app/profile/cain.menard/viz/ProjectPerformanceAnalysis/AnalysisOverview',
  },
  {
    title: 'Financial Benchmarking Analysis',
    context: 'Deployed as a standard tool for FMI consulting engagements',
    description: '500+ project analysis across margin performance, direct cost variances by labor, equipment, material, and subcontractor — with profitability breakdowns by division, market segment, and customer for specialty trade contractors.',
    embedUrl: 'https://public.tableau.com/views/FinancialBenchmarkingAnalysis/ControlPanel?:embed=y&:display_count=no&:showVizHome=no',
    link: 'https://public.tableau.com/app/profile/cain.menard/viz/FinancialBenchmarkingAnalysis/ControlPanel',
  },
  {
    title: 'Cognitive & Physical Health Report',
    context: 'Built for a health club client engagement',
    description: 'Client-facing dashboard tracking member wellness metrics including workout history, cognitive assessment trends, and engagement patterns to help the club optimize programming and retention.',
    embedUrl: 'https://public.tableau.com/views/CognitiveandPhysicalHealthReport/ControlPanel?:embed=y&:display_count=no&:showVizHome=no',
    link: 'https://public.tableau.com/app/profile/cain.menard/viz/CognitiveandPhysicalHealthReport/ControlPanel',
  },
]

const PUBLICATIONS = [
  {
    title: 'Artificial Intelligence for Engineering and Construction Firms',
    outlet: 'FMI Quarterly, Second Edition 2023',
    description: 'Feature article demystifying AI for the construction industry — from narrow AI applications to practical tools transforming scheduling, estimating, safety monitoring, and quality control.',
    link: 'https://fmicorp.com/insights/thought-leadership/artificial-intelligence-for-engineering-and-construction-firms',
    callouts: [
      { type: 'Republished by', name: 'National Insulation Association', url: 'https://insulation.org/io/articles/artificial-intelligence-for-engineering-and-construction-firms/' },
      { type: 'Cited in', name: 'AEC Business', url: 'https://aec-business.com/slate-technologies-unveils-next-gen-ai-software-for-enhanced-construction-decision-making/' },
    ],
  },
  {
    title: 'Beyond the Buzz: Harnessing the Power of Data Analytics in Construction',
    outlet: 'FMI Quarterly',
    description: 'Research article on building data infrastructure, analytics maturity, and practical approaches for construction firms to leverage data-driven decision making.',
    link: 'https://fmicorp.com/uploads/media/FMI_Quarterly_DataAnalytics_Final.pdf',
    callouts: [],
  },
  {
    title: '2023 FMI Talent Study Report',
    outlet: 'FMI Corporation',
    description: 'Industry research on workforce trends, talent acquisition, and development strategies in engineering and construction.',
    link: 'https://fmicorp.com/uploads/media/FMI_Talent_Study_Report.pdf',
    callouts: [],
  },
  {
    title: 'US Construction Outlook: New Economy vs. Old Economy',
    outlet: 'Industry Keynote',
    description: 'Recurring keynote on economic forecasts, labor productivity, and technology adoption trends for construction industry executives.',
    link: 'https://www.barnesdennig.com/wp-content/uploads/New-Economy-vs.-Old-Economy-Q1-2023_FINAL.pdf',
    callouts: [
      { type: 'Presented at', name: 'Barnes Dennig', url: 'https://www.barnesdennig.com/wp-content/uploads/New-Economy-vs.-Old-Economy-Q1-2023_FINAL.pdf' },
      { type: 'Presented at', name: 'Meaden & Moore', url: 'https://www.meadenmoore.com/news/meaden-moore-hosts-construction-industry-economic-outlook-presented-by-fmi' },
    ],
  },
]

const SKILLS = {
  'Data & Analytics': ['SQL', 'Python', 'Tableau', 'Power BI', 'Alteryx', 'DBT', 'Apache Airflow', 'Excel (Advanced)'],
  'Cloud & Infrastructure': ['AWS', 'Supabase', 'PostgreSQL', 'MySQL', 'Vercel'],
  'Development': ['JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'Git'],
  'Strategy & Management': ['Change Management (Prosci)', 'Agile / Scrum', 'Financial Modeling', 'Process Optimization', 'Stakeholder Management'],
  'Industry': ['Construction Operations', 'Energy & Infrastructure', 'Digital Transformation', 'Risk Management', 'Preconstruction'],
}

const CERTS = [
  { name: 'Prosci Certified Change Practitioner', badge: '/cert-prosci.png', link: 'https://www.credly.com/badges/9ca3d141-3011-4313-b2e5-c03eb404d097' },
  { name: 'Tableau Desktop Specialist', badge: '/cert-tableau.png', link: 'https://www.credly.com/badges/12d834fb-1df6-4bf2-b342-3668f2d4658a/linked_in_profile' },
  { name: 'PCEP – Certified Python Programmer', badge: '/cert-python.png', link: 'https://www.credly.com/badges/810a015b-36cf-4f36-b120-5677a46a801c' },
  { name: 'Alteryx Foundation Micro-Credential', badge: '/cert-alteryx-foundation.png', link: 'https://www.credly.com/badges/dd9a2e8c-b759-4ceb-b7b7-5a5acf1e0ee2/linked_in_profile' },
  { name: 'Alteryx Server Administration', badge: '/cert-alteryx-server.png', link: 'https://www.credly.com/badges/a5b0e5c9-b866-4572-92ba-19d9fdecd821/linked_in_profile' },
  { name: 'AI For Everyone (DeepLearning.AI)', badge: '/cert-deeplearning.jpeg', link: 'https://www.coursera.org/account/accomplishments/verify/QMYWRC8CVMDS' },
]

// ─── Lazy Tableau Embed ──────────────────────────────
function TableauEmbed({ embedUrl, title }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { rootMargin: '200px' })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="tableau-container">
      {visible ? <iframe src={embedUrl} allowFullScreen title={title} /> : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm text-slate-400">Loading dashboard...</p>
        </div>
      )}
    </div>
  )
}

// ─── Component ─────────────────────────────────────────
export default function Home() {
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  // Scroll observer for fade-in + nav highlight
  useEffect(() => {
    const fadeEls = document.querySelectorAll('.fade-section')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    fadeEls.forEach(el => obs.observe(el))

    const sectionEls = document.querySelectorAll('section[id]')
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
    }, { threshold: 0.15, rootMargin: '-80px 0px -50% 0px' })
    sectionEls.forEach(el => navObs.observe(el))

    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => { obs.disconnect(); navObs.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <>
      {/* ─── NAV ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-glass shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="text-lg font-bold tracking-tight" style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>CM</a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <a key={item.id} href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}>
                {item.label}
              </a>
            ))}
          </div>
          <a href="mailto:cainmenard@gmail.com" className="btn-primary text-xs py-2 px-5 hidden md:inline-flex">Get in Touch</a>
          <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden p-2 -mr-2" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileNav ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {mobileNav && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-6 md:hidden" onClick={() => setMobileNav(false)}>
          {NAV_ITEMS.map(item => (
            <a key={item.id} href={`#${item.id}`}
              className="text-xl font-semibold text-slate-800 hover:text-amber-600 transition"
              onClick={() => setMobileNav(false)}>
              {item.label}
            </a>
          ))}
          <a href="mailto:cainmenard@gmail.com" className="btn-primary mt-4" onClick={() => setMobileNav(false)}>Get in Touch</a>
        </div>
      )}

      {/* ─── HERO ─── */}
      <header className="hero-gradient min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <p className="section-label mb-4">Digital Operations Leader</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)' }}>
              Cain Menard
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              I started working on a $1B E&amp;I project in a South Texas refinery. Since then, I've helped
              contractors and developers from $10M to $1.5B in revenue improve profitability, built enterprise
              data platforms from scratch, trained 500+ managers, and delivered keynotes on economic forecasts,
              technology, and labor productivity to hundreds of business owners and executives across the country.
              My clients span specialty trades, general contractors, infrastructure, energy, and banking.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#tableau" className="btn-primary">View My Work ↓</a>
              <a href="#contact" className="btn-outline">Get in Touch</a>
            </div>
            <div className="flex gap-8 mt-10 pt-8 border-t border-slate-200">
              <div><p className="text-2xl font-bold" style={{ color: 'var(--navy)' }}>8+</p><p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Years Experience</p></div>
              <div><p className="text-2xl font-bold" style={{ color: 'var(--navy)' }}>50%</p><p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Profit Improvement</p></div>
              <div><p className="text-2xl font-bold" style={{ color: 'var(--navy)' }}>100%</p><p className="text-xs text-slate-500 font-medium uppercase tracking-wider">User Adoption</p></div>
            </div>
          </div>
          <div className="md:col-span-2 flex justify-center">
            <div className="headshot-ring">
              <img src="/headshot.jpg" alt="Cain Menard" />
            </div>
          </div>
        </div>
      </header>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <p className="section-label mb-3">About</p>
          <h2 className="section-heading text-3xl md:text-4xl mb-8">Background</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-5 text-slate-600 leading-relaxed">
              <p>
                My career started in the field — managing project controls on a $1B industrial refinery
                in South Texas, then running commercial construction projects as a GC project manager
                across K-12 education, food &amp; beverage, and industrial warehouses. At every stop, I saw
                the same thing: contractors running complex, high-stakes operations on manual processes,
                disconnected spreadsheets, and software that nobody actually wanted to use.
              </p>
              <p>
                That pattern led me to consulting at a 70-year-old boutique construction consultancy with
                a gold-standard reputation in the industry. I spent three years advising contractors from
                $30M to $1.5B in revenue — improving profitability by up to 50% through operational assessments,
                financial benchmarking, and productivity improvement programs. I also built something the firm
                had never done before: a full software and data analytics implementation, from scoping and
                selling the engagement to building an AWS-hosted data pipeline and training users on-site
                in Honolulu. It shipped with 100% adoption because I built it around how people actually
                work, not how a vendor thinks they should.
              </p>
              <p>
                Today I'm the Director of Consulting &amp; Operations at Automized, a PE-backed technology
                startup helping specialty trade contractors — from roofing and concrete to HVAC and
                excavation — bring the best out of their digital systems. I built our digital operations
                consulting practice from scratch: interviewing stakeholders, mapping workflows, evaluating
                software against real requirements weighted by the people who'll use it, and managing
                implementations through go-live. The through-line across my career has always been the
                same: technology should serve the people in the organization, not the other way around.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Education</p>
                {EDUCATION.map(e => (
                  <div key={e.degree} className="mb-3">
                    <p className="text-sm font-semibold text-slate-800">{e.degree}</p>
                    <p className="text-xs text-slate-500">{e.school} · {e.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TABLEAU ─── */}
      <section id="tableau" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <p className="section-label mb-3">Tableau Gallery</p>
          <h2 className="section-heading text-3xl md:text-4xl mb-4">Data Visualizations</h2>
          <p className="text-slate-500 mb-12 max-w-2xl">Interactive dashboards built for real consulting engagements. Best viewed on desktop — or click through to explore the full version on Tableau Public.</p>
          <div className="space-y-10">
            {TABLEAU_DASHBOARDS.map((d, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{d.title}</h3>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500">{d.context}</span>
                  </div>
                  <p className="text-sm text-slate-500">{d.description}</p>
                </div>
                {/* Desktop: lazy-loaded embed */}
                <div className="px-6 pb-6 hidden md:block">
                  <TableauEmbed embedUrl={d.embedUrl} title={d.title} />
                </div>
                {/* Mobile: link card instead of embed */}
                <div className="px-6 pb-4 md:hidden">
                  <a href={d.link} target="_blank" rel="noopener noreferrer"
                    className="block p-4 rounded-lg bg-slate-50 border border-slate-200 text-center hover:bg-slate-100 transition">
                    <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>Open Interactive Dashboard ↗</p>
                    <p className="text-xs text-slate-400 mt-1">Best experienced on desktop</p>
                  </a>
                </div>
                <div className="px-6 pb-5 border-t border-slate-100 pt-3 hidden md:block">
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
      <section id="writing" className="py-24">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <p className="section-label mb-3">Writing & Speaking</p>
          <h2 className="section-heading text-3xl md:text-4xl mb-12">Published Work</h2>
          <div className="space-y-4">
            {PUBLICATIONS.map((p, i) => (
              <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="pub-card block">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                  <span className="text-xs font-medium text-slate-400">{p.outlet}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-2">{p.description}</p>
                {p.callouts.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.callouts.map((c, j) => (
                      <a key={j} href={c.url} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-medium hover:bg-amber-100 transition">
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
      <section id="experience" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <p className="section-label mb-3">Experience</p>
          <h2 className="section-heading text-3xl md:text-4xl mb-12">Career Timeline</h2>
          <div className="space-y-12">
            {EXPERIENCE.map((job, i) => (
              <div key={i} className="relative pl-10">
                {i < EXPERIENCE.length - 1 && <div className="timeline-line" />}
                <div className="timeline-dot" />
                <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-1">
                    <h3 className="text-lg font-bold text-slate-900">{job.company}</h3>
                    <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{job.role}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mb-4">{job.period} · {job.location}</p>
                  <ul className="space-y-2">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="text-sm text-slate-600 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-slate-300">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SKILLS & CERTIFICATIONS ─── */}
      <section id="skills" className="py-24">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <p className="section-label mb-3">Skills & Certifications</p>
          <h2 className="section-heading text-3xl md:text-4xl mb-4">Technical Toolkit</h2>
          <p className="text-slate-500 mb-12 max-w-2xl">
            My work sits at the intersection of operations consulting and technical implementation.
            These are the tools and credentials behind the work you see above.
          </p>

          {/* Certifications */}
          <div className="mb-16">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Verified Certifications</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {CERTS.map(c => (
                <a key={c.name} href={c.link} target="_blank" rel="noopener noreferrer"
                  className="group bg-white rounded-xl border border-slate-200 p-4 flex flex-col items-center text-center hover:border-amber-300 hover:shadow-md transition-all duration-200">
                  <div className="w-16 h-16 mb-3 flex items-center justify-center">
                    <img src={c.badge} alt={c.name} className="w-full h-full object-contain rounded-lg" />
                  </div>
                  <p className="text-xs font-medium text-slate-700 group-hover:text-amber-600 transition leading-tight">{c.name}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <div className="max-w-2xl mx-auto text-center">
            <p className="section-label mb-3">Contact</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-6">Let's Talk</h2>
            <p className="text-slate-500 mb-10 leading-relaxed">
              Whether you're a contractor trying to figure out why you're leaving money on the table,
              a firm looking to modernize operations, or just someone who wants to talk shop —
              I'm always up for a conversation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a href="mailto:cainmenard@gmail.com" className="btn-primary">
                cainmenard@gmail.com
              </a>
              <a href="https://linkedin.com/in/cainmenard" target="_blank" rel="noopener noreferrer" className="btn-outline">
                LinkedIn ↗
              </a>
              <a href="https://github.com/cainmenard" target="_blank" rel="noopener noreferrer" className="btn-outline">
                GitHub ↗
              </a>
            </div>
            <p className="text-sm text-slate-400">(337) 654-2304 · Atlanta, GA</p>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© {new Date().getFullYear()} Cain Menard. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://linkedin.com/in/cainmenard" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition">LinkedIn</a>
            <a href="https://github.com/cainmenard" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition">GitHub</a>
            <a href="mailto:cainmenard@gmail.com" className="text-sm text-slate-400 hover:text-white transition">Email</a>
            <a href="/lagniappe" className="text-sm text-slate-400 hover:text-white transition">Lagniappe</a>
          </div>
        </div>
      </footer>
    </>
  )
}
