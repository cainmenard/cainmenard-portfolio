'use client'

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
  // { title: 'Crawfish Étouffée', description: 'The real deal. No shortcuts.', tags: ['Cajun', 'Seafood'] },
]

// ─── Component ─────────────────────────────────────────
export default function Lagniappe() {
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="py-8 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
            <a href="/" className="text-sm font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-900 transition">← Back to Main</a>
          </div>
        </header>

        {/* ─── ABOUT ME ─── */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <p className="section-label mb-3">Lagniappe</p>
            <h1 className="section-heading text-3xl md:text-4xl mb-4">About Me</h1>
            <p className="text-slate-500 mb-12 max-w-2xl">
              <em>Lagniappe</em> (lan-yap) — Cajun French for "a little something extra."
            </p>

            <div className="text-slate-600 leading-relaxed max-w-2xl space-y-5">
              <p>
                I grew up in Lafayette, Louisiana — the heart of Cajun country — where I picked up
                a deep appreciation for good food, good stories, and figuring things out with whatever
                you've got on hand. That last part hasn't changed much.
              </p>
              <p>
                Outside of work, I'm usually in the kitchen trying to perfect my cajun cooking
                (étouffée is the current obsession), under the hood of my 3rd gen Tacoma or Audi Q5 as a
                certified YouTube mechanic, or behind a drum kit — I've been playing for 20 years,
                with the hearing damage to prove it. I also try to get outdoors as much as possible,
                whether that's hunting, fishing, or just getting out of the house.
              </p>
              <p>
                This page is the stuff that doesn't fit neatly on a resume but makes up a lot of who I am.
                Side projects I've built, dashboards from non-construction work, and eventually, the
                recipes I'm working on getting right.
              </p>
            </div>
          </div>
        </section>

        {/* ─── RECIPES ─── */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <p className="section-label mb-3">From the Kitchen</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-4">Cajun Recipes</h2>
            <p className="text-slate-500 mb-12 max-w-2xl">
              Recipes I've been cooking (and refining) since I could reach the stove.
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
                <p className="text-slate-400 text-sm">Recipes coming soon. Check back — I'm working on getting the roux right first.</p>
              </div>
            )}
          </div>
        </section>

        {/* ─── SIDE PROJECTS ─── */}
        <section className="py-24 bg-slate-50">
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
