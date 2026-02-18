'use client'
import Image from 'next/image'

// ─── Data ──────────────────────────────────────────────
const WEB_APPS = [
  {
    title: 'Student Loan Payoff Tracker',
    description: 'Full-stack web app for optimizing student loan repayment using the Avalanche method. Features CSV import from Aidvantage, payment advisor with optimal allocation calculator, amortization projections, and what-if scenarios.',
    tech: ['Next.js', 'React', 'Supabase', 'Tailwind CSS', 'Recharts'],
    link: 'https://student-loan-tracker-demo.vercel.app',
    github: 'https://github.com/cainmenard/student-loan-tracker-demo',
  },
  {
    title: 'Honeymoon Planning',
    description: 'Interactive trip planner for a Croatia & Montenegro honeymoon. Full itinerary builder with day-by-day scheduling, budget tracker with points redemption, research database for restaurants and activities, and a to-do checklist.',
    tech: ['React', 'Next.js', 'CSS'],
    link: '/honeymoon-demo',
    github: null,
  },
  {
    title: 'Bachelor Trip Planner',
    description: 'Group trip coordination app for planning a bachelor party. Shared itinerary, budget splitting, activity voting, and attendee management.',
    tech: ['React', 'Next.js', 'Supabase'],
    link: '/bachelor-trip-demo.html',
    github: null,
  },
]

const RECIPES = [
  // Placeholder — recipes will be added here
  // { title: 'Gumbo', description: 'Dark roux. The real one.', tags: ['Cajun', 'Soup'] },
]

// Photo grid — replace src paths with your own photos
const PHOTOS = [
  { src: '/lagniappe/photo-1.jpg', alt: 'Add your photo here', caption: '' },
  { src: '/lagniappe/photo-2.jpg', alt: 'Add your photo here', caption: '' },
  { src: '/lagniappe/photo-3.jpg', alt: 'Add your photo here', caption: '' },
  { src: '/lagniappe/photo-4.jpg', alt: 'Add your photo here', caption: '' },
]

// ─── Component ─────────────────────────────────────────
export default function Lagniappe() {
  return (
    <>
      <div className="min-h-screen bg-white">

        {/* ─── HERO BANNER ─── */}
        <div className="relative h-[40vh] min-h-[320px] overflow-hidden">
          {/* 
            Replace /lagniappe/banner.jpg with your Louisiana bayou/swamp photo.
            Recommended: 1600x600+ landscape, cypress trees, Spanish moss, golden hour.
          */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900">
            <img
              src="/lagniappe/banner.jpg"
              alt="Louisiana bayou"
              className="w-full h-full object-cover opacity-60"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="relative h-full flex flex-col justify-end">
            <div className="max-w-4xl mx-auto px-6 pb-10 w-full">
              <a href="/" className="text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white transition mb-4 inline-block">← Back to Main</a>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>Lagniappe</h1>
              <p className="text-white/70 text-lg italic">
                (lan-yap) — Cajun French for "a little something extra."
              </p>
            </div>
          </div>
        </div>

        {/* ─── ABOUT ME ─── */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <p className="section-label mb-3">About Me</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-8">The Rest of the Story</h2>

            <div className="text-slate-600 leading-relaxed max-w-2xl space-y-5">
              <p>
                I grew up in Lafayette, Louisiana — the heart of Cajun country — where I picked up
                a deep appreciation for good food, good stories, and figuring things out with whatever
                you've got on hand. That last part hasn't changed much.
              </p>
              <p>
                I'm marrying Samantha in September 2026. We met while I was earning my MBA at the
                University of Denver, juggling three internships, and somehow still finding weekends
                to go to concerts and snowboard mountains together. She's been along for the ride ever since.
              </p>
              <p>
                Outside of work, I'm on a lifelong mission to perfect my gumbo recipe — I'm building
                a <a href="#recipes" className="font-medium underline decoration-amber-300 underline-offset-2 hover:text-amber-600 transition">recipe collection</a> below
                to document the journey. I'm a certified YouTube mechanic, usually found under the hood
                of my 3rd gen Toyota Tacoma or Audi Q5. I've been playing drums for 20 years, with the
                hearing damage to prove it. And I try to get outside as much as possible — hiking in the
                mountains with Samantha, paddling open canoes down whitewater, kayak fishing in a salt
                marsh, or taking the Tacoma off-road.
              </p>
              <p>
                The information on this page won't be found on my resume, but it makes up a lot of who I am.
              </p>
            </div>

            {/* ─── PHOTO GRID ─── */}
            {/* 
              Add your photos to /public/lagniappe/:
              - photo-1.jpg (e.g., you and Samantha outdoors)
              - photo-2.jpg (e.g., the Tacoma on a trail / off-roading)
              - photo-3.jpg (e.g., behind a drum kit)
              - photo-4.jpg (e.g., cast iron gumbo / cooking)
              
              Recommended: square or 4:3 ratio, at least 600px wide.
              Photos will appear in a 2x2 grid below the about text.
            */}
            <div className="grid grid-cols-2 gap-3 mt-12 max-w-2xl">
              {PHOTOS.map((p, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center"><p class="text-xs text-slate-300">Add photo</p></div>'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── RECIPES ─── */}
        <section id="recipes" className="py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <p className="section-label mb-3">From the Kitchen</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-4">Cajun Recipes</h2>
            <p className="text-slate-500 mb-12 max-w-2xl">
              Recipes I've been cooking and refining since I could reach the stove.
              Mostly Cajun, always from scratch. This section is a work in progress.
            </p>

            {RECIPES.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {RECIPES.map((r, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{r.title}</h3>
                    <p className="text-sm text-slate-500 mb-3">{r.description}</p>
                    {r.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {r.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">{t}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
                <p className="text-2xl mb-2">🍳</p>
                <p className="text-sm font-semibold text-slate-400">Recipes coming soon</p>
                <p className="text-xs text-slate-300 mt-1">Gumbo, étouffée, boudin, and more on the way.</p>
              </div>
            )}
          </div>
        </section>

        {/* ─── SIDE PROJECTS ─── */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <p className="section-label mb-3">Side Projects</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-4">Things I've Built</h2>
            <p className="text-slate-500 mb-12 max-w-2xl">
              Personal projects built to learn new tools or solve real problems.
              Separate from professional work, but they reflect how I think about building things:
              start with a real problem, keep the interface clean, and ship it.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {WEB_APPS.map((app, i) => (
                <div key={i} className="project-card">
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">Web App</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{app.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{app.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {app.tech.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">{t}</span>)}
                    </div>
                    <div className="flex gap-4">
                      {app.link && (app.link.startsWith('/') ?
                        <a href={app.link} className="text-xs font-semibold uppercase tracking-wider hover:underline" style={{ color: 'var(--accent)' }}>View Demo ↗</a> :
                        <a href={app.link} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-wider hover:underline" style={{ color: 'var(--accent)' }}>View Live ↗</a>
                      )}
                      {app.github && <a href={app.github} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-600 hover:underline">GitHub ↗</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer py-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-sm text-slate-400">© {new Date().getFullYear()} Cain Menard · <a href="/" className="hover:text-white transition">Back to Main Site</a></p>
          </div>
        </footer>
      </div>
    </>
  )
}
