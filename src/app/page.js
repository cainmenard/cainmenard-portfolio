'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// ─── Data ──────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'tableau', label: 'Tableau' },
  { id: 'writing', label: 'Writing' },
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

const PROJECTS = [
  {
    title: 'Student Loan Payoff Tracker',
    description: 'Full-stack web app for optimizing student loan repayment using the Avalanche method. Features CSV import from Aidvantage, payment advisor with optimal allocation calculator, amortization projections, and what-if scenarios.',
    tech: ['Next.js', 'React', 'Supabase', 'Tailwind CSS', 'Recharts'],
    link: 'https://student-loan-tracker-demo.vercel.app',
    github: 'https://github.com/cainmenard/student-loan-tracker-demo',
    type: 'Web Application',
  },
  {
    title: 'Honeymoon Planning',
    description: 'Interactive trip planner for a Croatia & Montenegro honeymoon. Full itinerary builder with day-by-day scheduling, budget tracker with points redemption, research database for restaurants and activities, and a to-do checklist.',
    tech: ['React', 'Next.js', 'CSS'],
    link: '/honeymoon-demo',
    github: null,
    type: 'Web Application',
    status: 'In Development',
  },
  {
    title: 'AWS Data Pipeline & Analytics Platform',
    description: 'Led FMI\'s first end-to-end software implementation for a union association. AWS-hosted pipeline using SQL, Python, DBT, and Apache Airflow feeding Tableau dashboards. Reduced reporting time by 30% with 100% user adoption.',
    tech: ['AWS', 'Python', 'SQL', 'DBT', 'Apache Airflow', 'Tableau'],
    link: null,
    github: null,
    type: 'Data Engineering',
  },
  {
    title: 'Construction Financial Benchmarking Tool',
    description: 'Interactive Tableau dashboard analyzing 500+ completed construction projects across margin performance, direct cost variances, and division/market segment profitability. Used by consulting teams for client engagements.',
    tech: ['Tableau', 'SQL', 'Financial Analysis'],
    link: 'https://public.tableau.com/app/profile/cain.menard/viz/FinancialBenchmarkingAnalysis/ControlPanel',
    github: null,
    type: 'Data Visualization',
  },
]

const TABLEAU_DASHBOARDS = [
  {
    title: 'Project Performance Analysis',
    description: 'Comprehensive analysis of construction project performance metrics including margin gain/fade, cost overruns, and productivity benchmarks.',
    embedUrl: 'https://public.tableau.com/views/ProjectPerformanceAnalysis/AnalysisOverview?:embed=y&:display_count=no&:showVizHome=no',
    link: 'https://public.tableau.com/app/profile/cain.menard/viz/ProjectPerformanceAnalysis/AnalysisOverview',
  },
  {
    title: 'Financial Benchmarking Analysis',
    description: 'Financial benchmarking dashboard for a specialty trade contractor analyzing 500+ projects, margin variances by division, market segment, and customer.',
    embedUrl: 'https://public.tableau.com/views/FinancialBenchmarkingAnalysis/ControlPanel?:embed=y&:display_count=no&:showVizHome=no',
    link: 'https://public.tableau.com/app/profile/cain.menard/viz/FinancialBenchmarkingAnalysis/ControlPanel',
  },
  {
    title: 'Cognitive & Physical Health Report',
    description: 'Health and wellness tracking dashboard with workout history, cognitive assessment trends, and client engagement metrics.',
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
    republished: [
      { name: 'National Insulation Association', url: 'https://insulation.org/io/articles/artificial-intelligence-for-engineering-and-construction-firms/' },
      { name: 'AEC Business (cited)', url: 'https://aec-business.com/slate-technologies-unveils-next-gen-ai-software-for-enhanced-construction-decision-making/' },
    ],
  },
  {
    title: 'Beyond the Buzz: Harnessing the Power of Data Analytics in Construction',
    outlet: 'FMI Quarterly',
    description: 'Research article on building data infrastructure, analytics maturity, and practical approaches for construction firms to leverage data-driven decision making.',
    link: 'https://fmicorp.com/uploads/media/FMI_Quarterly_DataAnalytics_Final.pdf',
    republished: [],
  },
  {
    title: '2023 FMI Talent Study Report',
    outlet: 'FMI Corporation',
    description: 'Industry research on workforce trends, talent acquisition, and development strategies in engineering and construction.',
    link: 'https://fmicorp.com/uploads/media/FMI_Talent_Study_Report.pdf',
    republished: [],
  },
  {
    title: 'US Construction Outlook: New Economy vs. Old Economy',
    outlet: 'Industry Association Keynote (Barnes Dennig / Meaden & Moore)',
    description: 'Recurring keynote on economic forecasts, labor productivity, and technology adoption trends for construction industry executives.',
    link: 'https://www.barnesdennig.com/wp-content/uploads/New-Economy-vs.-Old-Economy-Q1-2023_FINAL.pdf',
    republished: [
      { name: 'Meaden & Moore', url: 'https://www.meadenmoore.com/news/meaden-moore-hosts-construction-industry-economic-outlook-presented-by-fmi' },
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
  'Prosci Certified Change Practitioner',
  'Tableau Desktop Specialist',
  'PCEP – Certified Python Programmer',
  'Azure Data Fundamentals',
  'Alteryx Designer Core',
  'S&P Capital IQ',
  'AI For Everyone (DeepLearning.AI)',
]

// ─── Component ─────────────────────────────────────────
export default function Home() {
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)

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
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <header className="hero-gradient min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <p className="section-label mb-4">Strategy & Operations Consultant</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)' }}>
              Cain Menard
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              I help organizations in construction, energy, and infrastructure work smarter and faster with
              digital technology, data analytics, and operational strategy. 8+ years of field-to-boardroom
              experience turning complex problems into measurable results.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary">View My Work ↓</a>
              <a href="#contact" className="btn-outline">Get in Touch</a>
            </div>
            <div className="flex gap-8 mt-10 pt-8 border-t border-slate-200">
              <div><p className="text-2xl font-bold" style={{ color: 'var(--navy)' }}>8+</p><p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Years Experience</p></div>
              <div><p className="text-2xl font-bold" style={{ color: 'var(--navy)' }}>$1.5B</p><p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Client Revenue</p></div>
              <div><p className="text-2xl font-bold" style={{ color: 'var(--navy)' }}>500+</p><p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Managers Trained</p></div>
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
                I started my career in the field — managing industrial electrical and instrumentation work
                on a $1B oil refinery in South Texas, then running $10M commercial builds in Baton Rouge.
                That hands-on experience gave me a visceral understanding of how construction actually works,
                which became my edge when I moved into consulting.
              </p>
              <p>
                At FMI Corporation, I combined that field perspective with finance and analytics to help
                $30M–$1.5B contractors improve margins, modernize operations, and adopt technology. I led the
                firm's first data infrastructure project, built analytics tools that became company standards,
                and published research on AI and data analytics that was republished nationally.
              </p>
              <p>
                Now as Director of Consulting & Operations at Automized Solutions, I lead teams delivering
                digital transformation for construction, banking, real estate, and law firms — cutting manual
                work in half, shortening project timelines, and building systems that actually get adopted.
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
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Certifications</p>
                <div className="space-y-1.5">
                  {CERTS.map(c => (
                    <p key={c} className="text-xs text-slate-600">{c}</p>
                  ))}
                </div>
              </div>
            </div>
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

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="py-24">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <p className="section-label mb-3">Projects</p>
          <h2 className="section-heading text-3xl md:text-4xl mb-12">Selected Work</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
              <div key={i} className="project-card">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">{p.type}</span>
                    {p.status && <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">{p.status}</span>}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tech.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">{t}</span>)}
                  </div>
                  <div className="flex gap-4">
                    {p.link && (p.link.startsWith('/') ? 
                      <a href={p.link} className="text-xs font-semibold uppercase tracking-wider hover:underline" style={{ color: 'var(--accent)' }}>View Demo ↗</a> :
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-wider hover:underline" style={{ color: 'var(--accent)' }}>View Live ↗</a>
                    )}
                    {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-600 hover:underline">GitHub ↗</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TABLEAU ─── */}
      <section id="tableau" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <p className="section-label mb-3">Tableau Gallery</p>
          <h2 className="section-heading text-3xl md:text-4xl mb-4">Data Visualizations</h2>
          <p className="text-slate-500 mb-12 max-w-2xl">Interactive Tableau dashboards built for consulting engagements and personal projects. Click any dashboard to explore the full interactive version.</p>
          <div className="space-y-10">
            {TABLEAU_DASHBOARDS.map((d, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-6 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{d.title}</h3>
                  <p className="text-sm text-slate-500">{d.description}</p>
                </div>
                <div className="px-6 pb-6">
                  <div className="tableau-container">
                    <iframe
                      src={d.embedUrl}
                      allowFullScreen
                      title={d.title}
                    />
                  </div>
                </div>
                <div className="px-6 pb-5 border-t border-slate-100 pt-3">
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
                {p.republished.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {p.republished.map((r, j) => (
                      <span key={j} className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">
                        {r.name}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <p className="section-label mb-3">Skills & Technologies</p>
          <h2 className="section-heading text-3xl md:text-4xl mb-12">Technical Toolkit</h2>
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
      <section id="contact" className="py-24">
        <div className="max-w-6xl mx-auto px-6 fade-section">
          <div className="max-w-2xl mx-auto text-center">
            <p className="section-label mb-3">Contact</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-6">Let's Connect</h2>
            <p className="text-slate-500 mb-10 leading-relaxed">
              Interested in digital transformation, data analytics, or operational strategy for your organization?
              I'm always open to discussing new opportunities and ideas.
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
          </div>
        </div>
      </footer>
    </>
  )
}
