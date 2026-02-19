'use client'
import { useState, useEffect } from 'react'

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
  {
    id: 'gumbo',
    title: "Cain's Chicken, Duck & Sausage Gumbo",
    attribution: "Me — I've been fine-tuning this recipe since I can remember, adjusting every time I cook it",
    tags: ['Cajun', 'Soup', 'Roux'],
    ingredients: [
      '2 chicken thighs',
      '2 chicken breasts',
      'Optional: 1 duck breast (preferably wild)',
      '¼–½ cup grapeseed oil',
      '½ cup all-purpose flour',
      '1.5 yellow onion',
      '1.5 green bell pepper',
      '4 ribs of celery',
      '6–10 cloves garlic',
      '2–3 bay leaves',
      '12 oz amber-style beer or good lager',
      '4 cups chicken stock (preferably that homemade liquid gold)',
      '3–5 cups water',
      "½ lb andouille sausage (preferably Savoie's, Mild)",
      '1 lb kielbasa sausage (optional: buy uncooked, smoke in your Traeger)',
    ],
    notes: [
      'Spicy sausage often makes the gumbo too spicy altogether. Gumbo is typically not super spicy. Can always add hot sauce in your own bowl.',
    ],
    steps: [
      'If smoking your own kielbasa, smoke the sausage at 225°F for about 2 hours.',
      'After starting the sausage, prepare duck breast by scoring the fat cap and placing on wire mesh rack in a metal pan in the Traeger. Only smoke long enough to start browning the duck, maybe half as long as the sausage. You want to keep the duck fat.',
      'Chicken thighs in smoker at 300°F for 20 minutes max (not totally cooked — cooks throughout in gumbo). Alt: Cook in oven at 300°F for 15–20 minutes max.',
      "In that old Magnalite pot, make your roux. Dark dark, yeah, like 80% cacao chocolate. Alt: If no Magnalite, cast iron pot or roaster, or heavy, thick-bottomed stainless steel pot or roaster.",
      "Add the holy trinity: onion, bell pepper, and celery, and stir often until just starting to get soft, but don't forget the pope…",
      'Add your garlic (the pope) towards the end of cooking down the veggies. Garlic takes less time to soften.',
      'Deglaze the pot with ¾ of the beer (savoring the rest), scraping the bottom with a wooden spoon until all the browned bits are released. Stir constantly until it returns to a simmer.',
      "Add the stock and the water… SLOWLY, stirring in a little bit at a time. This helps with mixing the roux with the liquid, and avoids a clumpy finished product. Getting the roux and liquids to mix well can take some finesse, I've learned.",
      "IMPORTANT: Never add the stock cold. The roux and stock will not mix well, and you'll have stringy roux. The only fix is to simmer the gumbo for 5–6 hours, which will reduce gumbo liquid 10–20%. To avoid this, always add stock at room temp. It's not a bad idea to microwave on high for 30 seconds.",
      'Add your seasoning: bay leaves, Slap Ya Momma (or other made-in-Louisiana Cajun seasoning), and grind fresh black pepper until your wrists begin to burn.',
      'Add the chicken and chicken fat. Optional — if using duck: throw away the fat cap from duck breast, add the duck breast and liquid duck fat from the pan.',
      'Bring back to bare simmer.',
      'Simmer on low (1.5–2/10 heat) for minimum of 2–3 hours, or maximum of 6 hours on lowest temperature. Prevent boil, which burns the roux.',
    ],
  },
  {
    id: 'chicken-stock',
    title: 'Chicken Stock Liquid Gold',
    attribution: 'Me',
    tags: ['Base', 'Stock'],
    ingredients: [
      '4 to 8 pounds chicken parts — wings, bones, breasts, and legs',
      '4 quarts water',
      '2 bell peppers',
      '2 large yellow onions, diced',
      '4 large carrots, diced',
      '4 large celery ribs, diced',
      '8 crushed medium cloves garlic',
      'Bay leaves',
      '2 large sprigs parsley',
      '2 packets unflavored gelatin, dissolved in ½ cup cold water (optional)',
    ],
    notes: [
      'Four pounds of chicken per four quarts of water is the minimum for a good stock. Up to eight pounds yields an even richer, deeper stock.',
      'Different parts contribute different amounts of gelatin: breast meat produces a delicious but thin stock, while wings produce slightly less clean flavor with lots of gelatin.',
      'If your stock still looks thin like water even after being fully refrigerated, add the gelatin solution.',
      'Feel free to add other herbs, such as fresh thyme or bay leaves.',
    ],
    steps: [
      'Combine chicken, water, onions, carrots, celery, garlic, and parsley in a large stockpot and bring to a simmer over low heat.',
      'Lower heat, maintaining a very gentle simmer, and cook for 1 hour 30 minutes.',
      'Strain stock through a fine-mesh strainer, let cool, then transfer to containers and refrigerate until completely chilled, about 6 hours.',
      'Skim off and remove any fat and scum on the surface.',
      'Refrigerate for up to 5 days or freeze for up to 6 months.',
      'If stock is thin even after being fully refrigerated, add optional gelatin solution and bring to a boil until fully dissolved, then refrigerate or freeze.',
    ],
  },
  {
    id: 'etouffee',
    title: "Mimi's Shrimp or Crawfish Étouffée",
    attribution: 'My great-grandmother, Vida Lege',
    tags: ['Cajun', 'Seafood'],
    serves: '6',
    ingredients: [
      '½ cup margarine or butter',
      '1½ cups chopped onions',
      '½ cup chopped green pepper',
      '½ cup chopped celery',
      '1 garlic clove, minced (more)',
      '2 tbsp flour, 1 cup water',
      '2 tsp tomato paste (can use ketchup)',
      '1 tbsp Worcestershire sauce',
      '2 lbs shrimp or crawfish',
      '1 tsp salt, ½ tsp pepper',
      '½ to 1 tsp bottled red pepper sauce',
    ],
    notes: [],
    steps: [
      'Melt margarine in dutch oven or microwave — add onions, green pepper, celery, and garlic. Sauté until soft.',
      'Mix flour with water and add to vegetables with tomato paste and Worcestershire sauce. Simmer 15 minutes.',
      'Add shrimp or crawfish, salt and pepper. Simmer additional 15 minutes.',
      'Add pepper sauce (optional) and cook 5 more minutes. Serve over hot rice.',
    ],
  },
  {
    id: 'crab-soup',
    title: "Memaw's Lump Crab Meat Soup",
    attribution: 'My grandmother, Audrey Menard — "Memaw"',
    tags: ['Cajun', 'Seafood', 'Soup'],
    familyNote: '"This soup was a tradition in our home on Xmas Eve or New Years Eve — Bon Appetit." With boiled chicken & made chicken salad (finger sandwiches). Love, Maw Maw',
    ingredients: [
      '1 hen',
      '1 large onion, chopped fine',
      'Seasoning — black pepper, salt to taste',
      '2 stalks celery, chopped fine',
      '1 qt half & half',
      '2 lbs lump crab meat',
      '8 tbsp butter',
      '¾ cup flour',
      '1 gallon chicken stock (made by boiling the hen)',
    ],
    notes: [],
    steps: [
      'Make broth (stock) for soup. Boil hen with enough water to cover — add chopped onion, celery, and seasoning. When hen is tender, remove from pot.',
      'Measure broth — you need 1 gallon (add water if needed). Set aside.',
      'In same pot, make white sauce — stir in ¾ cup flour, gradually add 1 gallon chicken stock. Cook a while on medium heat.',
      "Add half & half and all crab meat. Don't overcook. 15 minutes.",
      'Serve warm. Top each serving with fine chopped parsley and onion top.',
    ],
  },
  {
    id: 'red-beans',
    title: "Mimi's Red Beans and Rice",
    attribution: 'My grandmother, Judy LeBlanc — "Mimi" (adapted from Camellia Brand)',
    tags: ['Cajun', 'Beans', 'Rice'],
    serves: '6–8',
    ingredients: [
      "1 (1-pound) package Camellia's Red Beans",
      '1 pound smoked sausage, sliced',
      '8–10 cups water',
      '¼ stick of butter',
      '2 cups chopped seasoning blend (onions, celery, green bell peppers, parsley flakes)',
      '1 toe garlic, chopped',
      '1 bay leaf',
      'Salt to taste',
      'Pepper to taste',
      'Cajun seasoning to taste',
      'Hot cooked rice',
    ],
    notes: [],
    familyNote: 'Mimi\'s tip: "Remove some beans in a plate and mash to make it creamer!! Makes a lot!! Good cooking!!"',
    steps: [
      'Rinse and sort red kidney beans. (Optional: Soak beans using your preferred method.)',
      'In large heavy pot, cook sliced sausage for 5 minutes.',
      'Add chopped seasoning blend and garlic to cooked sausage, along with ¼ stick butter, and continue to cook until onions turn soft and clear.',
      'Add beans, water, and bay leaf.',
      'Bring to rolling boil for 30 minutes, stirring every 10 minutes.',
      'Reduce heat, simmer for 1–2 hours, stirring occasionally, until beans are desired tenderness.',
      'Add Cajun seasoning plus salt and pepper to taste.',
      'Serve over hot cooked rice.',
    ],
  },
  {
    id: 'potato-salad',
    title: "Mimi's Potato Salad",
    attribution: 'My grandmother, Judy LeBlanc — "Mimi"',
    tags: ['Cajun', 'Side'],
    ingredients: [
      '3 medium red potatoes',
      '6 eggs',
      'Salt (light)',
      '¼ onion (at most)',
      '1 tbsp mustard',
      '⅓ cup mayo',
    ],
    notes: [],
    steps: [
      'Boil potatoes with peelings on — not too mushy.',
      'Boil eggs.',
      'Cool and peel potatoes, chop small or mash. Salt potatoes lightly.',
      'Separate yolk from white. Chop up the whites into the potatoes.',
      'Mash yolks on a plate, grate in ¼ onion, add mustard and mayo. Mix.',
      'Fold yolk mixture into potatoes.',
    ],
  },
  {
    id: 'chowder',
    title: "Mimi's American Chowder",
    attribution: 'My grandmother, Judy LeBlanc — "Mimi"',
    tags: ['Soup', 'Comfort'],
    serves: '8–10',
    ingredients: [
      '1 large onion, chopped',
      '2 tbsp margarine',
      '4 cups chopped potatoes',
      '2 cups water',
      '1 cup celery, chopped',
      '2 tsp salt',
      '¼ tsp pepper',
      '2 cups milk',
      '2 tbsp flour',
      '½ pkg smoked sausage',
      '⅓ lb American cheese, cubed',
    ],
    notes: [],
    steps: [
      'Sauté onion and celery in margarine. Add sausage, potatoes, water, and seasonings.',
      'Cover and simmer 15 minutes or until vegetables are tender.',
      'Gradually add a small amount of milk to flour, stirring until well blended. Add to vegetables.',
      'Add remaining milk. Heat. Add cheese until it melts.',
    ],
  },
  {
    id: 'rice-dressing',
    title: "Mimi's Rice Dressing",
    attribution: 'My great-grandmother — "Mama"',
    tags: ['Cajun', 'Side', 'Rice'],
    serves: '6–8',
    ingredients: [
      '1½ lbs ground beef',
      '¼ cup vegetable oil (less)',
      '¼ cup flour (less)',
      '1 medium onion, chopped',
      '1 bell pepper, chopped',
      '3 cloves garlic, minced',
      '2 stalks celery',
      'Onion tops',
      'Water',
      '1 can cream of mushroom soup',
    ],
    notes: [],
    steps: [
      'Make roux. Brown and stir continuously.',
      'When dark brown, add meat and cook on medium heat until dark. Stir often, breaking up lumps.',
      'After cooked, add onion, celery, bell pepper, and garlic. Cook slowly on medium heat uncovered, stirring often, then cover until completely cooked.',
      'Add water with soup and cook slowly on low for 1 hour 15 minutes, covered.',
      'Before serving, add onion tops and chopped garlic. Mix carefully with rice over double boiler.',
    ],
  },
]

const PHOTOS = [
  { src: '/lagniappe/photo-1.jpg', alt: 'Photo' },
  { src: '/lagniappe/photo-2.jpg', alt: 'Photo' },
  { src: '/lagniappe/photo-3.jpg', alt: 'Photo' },
  { src: '/lagniappe/photo-4.jpg', alt: 'Photo' },
]

// ─── Recipe Card ───────────────────────────────────────
function RecipeCard({ recipe }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full text-left p-6 hover:bg-slate-50 transition">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{recipe.title}</h3>
            <p className="text-xs text-slate-400 italic">From the kitchen of: {recipe.attribution}</p>
            {recipe.serves && <p className="text-xs text-slate-400 mt-1">Serves {recipe.serves}</p>}
          </div>
          <span className="text-slate-300 text-xl mt-1 shrink-0">{open ? '−' : '+'}</span>
        </div>
        {!open && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {recipe.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">{t}</span>)}
          </div>
        )}
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-slate-100 pt-4 space-y-5">
          <div className="flex flex-wrap gap-1.5">
            {recipe.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">{t}</span>)}
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Ingredients</p>
            <ul className="space-y-1.5">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="text-sm text-slate-600 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-amber-300">
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {recipe.notes && recipe.notes.length > 0 && (
            <div className="bg-amber-50 rounded-lg p-4 space-y-2">
              {recipe.notes.map((n, i) => (
                <p key={i} className="text-xs text-amber-800 leading-relaxed">{n}</p>
              ))}
            </div>
          )}

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Instructions</p>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i} className="text-sm text-slate-600 leading-relaxed pl-7 relative">
                  <span className="absolute left-0 top-0 text-xs font-bold text-amber-500 w-5">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {recipe.familyNote && (
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-xs text-slate-500 italic leading-relaxed">★ {recipe.familyNote}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Page Component ────────────────────────────────────
const LAGNIAPPE_NAV = [
  { id: 'about', label: 'About' },
  { id: 'dev-projects', label: 'Dev Projects' },
  { id: 'recipes', label: 'Recipes' },
]

export default function Lagniappe() {
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    const sectionEls = document.querySelectorAll('section[id]')
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
    }, { threshold: 0.15, rootMargin: '-80px 0px -50% 0px' })
    sectionEls.forEach(el => navObs.observe(el))

    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => { navObs.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <>
      {/* ─── NAV ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-glass shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="/" className="text-lg font-bold tracking-tight" style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>CM</a>
          <div className="hidden md:flex items-center gap-8">
            {LAGNIAPPE_NAV.map(item => (
              <a key={item.id} href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}>
                {item.label}
              </a>
            ))}
            <span className="w-px h-4 bg-slate-200"></span>
            <a href="/" className="nav-link text-slate-400 hover:text-amber-600" style={{ borderBottom: 'none' }}>Main Site</a>
          </div>
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
          {LAGNIAPPE_NAV.map(item => (
            <a key={item.id} href={`#${item.id}`}
              className="text-xl font-semibold text-slate-800 hover:text-amber-600 transition"
              onClick={() => setMobileNav(false)}>
              {item.label}
            </a>
          ))}
          <span className="w-12 h-px bg-slate-200"></span>
          <a href="/" className="text-lg font-medium text-slate-400 hover:text-amber-600 transition" onClick={() => setMobileNav(false)}>Main Site</a>
        </div>
      )}

      <div className="min-h-screen bg-white">

        {/* ─── HERO BANNER ─── */}
        <div className="relative h-[40vh] min-h-[320px] overflow-hidden">
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

            <div className="text-slate-600 leading-relaxed max-w-2xl space-y-5">
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

        {/* ─── DEV PROJECTS ─── */}
        <section id="dev-projects" className="py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <p className="section-label mb-3">Dev Projects</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-4">Personal Builds</h2>
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

        {/* ─── RECIPES ─── */}
        <section id="recipes" className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <p className="section-label mb-3">From the Kitchen</p>
            <h2 className="section-heading text-3xl md:text-4xl mb-4">Cajun Recipes</h2>
            <p className="text-slate-500 mb-12 max-w-2xl">
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

        {/* Footer */}
        <footer className="footer py-10">
          <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© {new Date().getFullYear()} Cain Menard. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/" className="text-sm text-slate-400 hover:text-white transition">Main Site</a>
              <a href="https://linkedin.com/in/cainmenard" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition">LinkedIn</a>
              <a href="https://github.com/cainmenard" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition">GitHub</a>
              <a href="mailto:cainmenard@gmail.com" className="text-sm text-slate-400 hover:text-white transition">Email</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
