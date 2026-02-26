'use client'
import { useState } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'
import RecipeCard from '@/components/RecipeCard'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { LAGNIAPPE_NAV } from '@/data/navItems'
import { RECIPES } from '@/data/recipes'
import { WEB_APPS } from '@/data/webApps'

const PHOTOS = [
  { src: '/lagniappe/photo-1.jpg', alt: 'Cain and Samantha on a mountain hike' },
  { src: '/lagniappe/photo-2.jpg', alt: 'Traveling together in Europe' },
  { src: '/lagniappe/photo-3.jpg', alt: 'Outdoor adventure in the mountains' },
  { src: '/lagniappe/photo-4.jpg', alt: 'Louisiana bayou country landscape' },
]

export default function Lagniappe() {
  const activeSection = useSectionObserver()
  const scrolled = useScrollPosition()
  const [mobileNav, setMobileNav] = useState(false)

  return (
    <>
      <Nav
        navItems={LAGNIAPPE_NAV}
        activeSection={activeSection}
        scrolled={scrolled}
        mobileNav={mobileNav}
        onToggleMobile={() => setMobileNav(!mobileNav)}
        logoHref="/"
        secondaryLink={{ href: '/', label: 'Main Site' }}
      />
      <MobileNav
        navItems={LAGNIAPPE_NAV}
        mobileNav={mobileNav}
        onClose={() => setMobileNav(false)}
        secondaryLink={{ href: '/', label: 'Main Site' }}
      />

      <div className="min-h-screen bg-white dark:bg-slate-900">

        {/* ─── HERO BANNER ─── */}
        <div className="relative h-[40vh] min-h-[320px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900">
            <Image
              src="/lagniappe/banner.jpg"
              alt="Louisiana bayou"
              fill
              sizes="100vw"
              className="object-cover opacity-60"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          <div className="relative h-full flex flex-col justify-end">
            <div className="max-w-4xl mx-auto px-6 pb-10 w-full">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>Lagniappe</h1>
              <p className="text-white/70 text-lg italic">
                (lan-yap) — Cajun French for &quot;a little something extra.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* ─── ABOUT ME ─── */}
        <section id="about" className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <p className="section-label mb-3">About Me</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-8">The Rest of the Story</h2>

            <div className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl space-y-5">
              <p>
                I grew up in Lafayette, Louisiana — the heart of Cajun country — where I picked up
                a deep appreciation for good food, good stories, and figuring things out with whatever
                you&apos;ve got on hand. That last part hasn&apos;t changed much.
              </p>
              <p>
                I&apos;m marrying Samantha in September 2026. We met while I was earning my MBA at the
                University of Denver, juggling three internships, and somehow still finding weekends
                to go to concerts and snowboard mountains together. She&apos;s been along for the ride ever since.
              </p>
              <p>
                I love to travel. My senior year at UL Lafayette, I was approved to graduate several
                weeks early — so instead of walking at Commencement, I boarded a flight to India.
                I spent time in Kolkata volunteering with the Missionaries of Charity, working in
                homes for the homeless, disabled, and dying, and spending Christmas with children
                living in the streets. From there, I trekked to Mount Everest Base Camp, where I
                took a photo in my cap and gown at 17,598 feet. The story was picked up
                by{' '}
                <a
                  href="https://www.klfy.com/local/ul-lafayette-student-skips-graduation-heads-to-india-for-missionary-work-instead/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline decoration-amber-300 underline-offset-2 hover:text-amber-600 transition"
                >
                  a local news station in Lafayette
                </a>{' '}
                — my five minutes of fame.
              </p>
              <p>
                Outside of work, I&apos;m on a lifelong mission to perfect my gumbo recipe — I&apos;m building
                a{' '}
                <a href="#recipes" className="font-medium underline decoration-amber-300 underline-offset-2 hover:text-amber-600 transition">
                  recipe collection
                </a>{' '}
                below to document the journey. I&apos;m a certified YouTube mechanic, usually found under
                the hood of my 3rd gen Toyota Tacoma or Audi Q5. I&apos;ve been playing drums for 20
                years, with the hearing damage to prove it. And I try to get outside as much as
                possible — hiking in the mountains with Samantha, paddling open canoes down
                whitewater, kayak fishing in a salt marsh, or taking the Tacoma off-road.
              </p>
              <p>
                The information on this page won&apos;t be found on my resume, but it makes up a lot of who I am.
              </p>
            </div>

            {/* ─── PHOTO GRID ─── */}
            <div className="grid grid-cols-2 gap-3 mt-12 max-w-2xl">
              {PHOTOS.map((p, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 400px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DEV PROJECTS ─── */}
        <section id="dev-projects" className="py-24 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-4xl mx-auto px-6">
            <p className="section-label mb-3">Dev Projects</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-4">Personal Builds</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-2xl">
              Personal projects built to learn new tools or solve real problems.
              Separate from professional work, but they reflect how I think about building things:
              start with a real problem, keep the interface clean, and ship it.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {WEB_APPS.map((app, i) => (
                <div key={i} className="project-card stagger-child">
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">Web App</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{app.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{app.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {app.tech.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-medium">{t}</span>)}
                    </div>
                    <div className="flex gap-4">
                      {app.link && (app.link.startsWith('/') ?
                        <a href={app.link} className="text-xs font-semibold uppercase tracking-wider hover:underline" style={{ color: 'var(--accent)' }}>View Demo ↗</a> :
                        <a href={app.link} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-wider hover:underline" style={{ color: 'var(--accent)' }}>View Live ↗</a>
                      )}
                      {app.github && <a href={app.github} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:underline">GitHub ↗</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── RECIPES ─── */}
        <section id="recipes" className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-6">
            <p className="section-label mb-3">From the Kitchen</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-4">Cajun Recipes</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-2xl">
              Recipes I&apos;ve been cooking and refining since I could reach the stove.
              Mostly Cajun, always from scratch. Some are mine, some have been passed
              down through generations of Menard and Bernard women who never wrote anything down
              quite the same way twice.
            </p>

            <div className="space-y-4">
              {RECIPES.map(r => <RecipeCard key={r.id} recipe={r} />)}
            </div>
          </div>
        </section>

        <Footer variant="simple" />
      </div>
    </>
  )
}
