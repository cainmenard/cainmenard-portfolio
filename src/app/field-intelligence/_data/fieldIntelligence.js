/**
 * Field Intelligence — verified content and data.
 *
 * Single source of truth for the /field-intelligence route. Every record that
 * carries a number also carries its provenance so the guardrails are enforced
 * by data, not by hand:
 *
 *   world: 'field'   real engagement number, client identifiers scrubbed (field note)
 *          'public'  citeable public/industry statistic (has a real source link)
 *          'sandbox' illustrative / composite input, clearly labeled
 *   projected: true  a forward projection, not an achieved result (stamp PROJECTED)
 *
 * Guardrails honored here: no client/employer names (only Miter and FMI), no em
 * dashes in copy, practitioner voice, PROJECTED stamps, field vs sandbox worlds
 * kept distinct, every claim cited. Spelling: Cain, Miter.
 */

export const ROUTE = {
  path: '/field-intelligence',
  title: 'A Day of Field Intelligence',
  tagline: 'One labor hour, from the jobsite to the income statement, and back.',
  backHref: '/',
  backLabel: 'cainmenard.com',
}

/* ------------------------------------------------------------------ *
 * Citations
 * A lightweight, reusable citation registry. Public stats link out.
 * Engagement numbers carry an honest note (scrubbed data cannot be linked).
 * ------------------------------------------------------------------ */
export const CITATIONS = {
  mckinsey: {
    kind: 'public',
    label: 'McKinsey Global Institute',
    detail:
      'Reinventing construction through a productivity revolution (2017, updated 2024).',
    url: 'https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution',
  },
}

/** Build the standard engagement note for a completed-contracts analysis. */
export const engagementNote = (projectCount) =>
  `From a completed-contracts analysis of ${projectCount} projects. Client identifiers removed. Methodology available on request.`

/* ------------------------------------------------------------------ *
 * Day arc (readability rule)
 * The page holds ONE constant, fully-legible warm off-white base the whole
 * way down — the background never darkens under text. Time of day is carried
 * by a light atmosphere layer only (a top sky wash, a warming accent, and the
 * sun gliding across the rail), driven continuously by --fi-progress so it
 * moves with the scroll instead of snapping. See field-intelligence.css.
 * ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ *
 * Progress device: FIELD -> OFFICE -> JOB COST -> PORTFOLIO -> DECISIONS
 * Closes into a loop at the epilogue.
 * ------------------------------------------------------------------ */
export const RAIL = [
  { id: 'field', short: 'Field' },
  { id: 'office', short: 'Office' },
  { id: 'job-cost', short: 'Job Cost' },
  { id: 'portfolio', short: 'Portfolio' },
  { id: 'decisions', short: 'Decisions' },
]

/* ------------------------------------------------------------------ *
 * Hero
 * ------------------------------------------------------------------ */
export const HERO = {
  eyebrow: 'A capability demonstration',
  title: 'A Day of Field Intelligence',
  standfirst:
    'Follow one labor hour from the jobsite to the income statement, and back around. Five stations, five sets of hands, one hour that decides what the next job costs.',
  scrollCue: 'Begin at 6:15am',
  time: '6:15am',
}

/* ------------------------------------------------------------------ *
 * The five stations (fixed narrative arc)
 * Each: one line of scene-setting, the "my part" claim, a one-line handoff.
 * Interactions carry the argument; this copy stays minimal.
 * ------------------------------------------------------------------ */
export const STATIONS = [
  {
    id: 'field',
    label: 'Field',
    time: '6:15am',
    kicker: 'Station 1',
    title: 'One hour, twelve businesses, five ways to record it.',
    scene:
      'A crew leader clocks in. The same hour is about to be written down five different ways, and one of them travels by FedEx.',
    myPart:
      'I sat in the interviews and ran the current-state analysis across 12 businesses. I ran the vendor selection. I am building the training and adoption program now.',
    handoff: 'The hour gets approved. Now it has to survive the plumbing.',
    cast: 'the crew leader who logs it',
  },
  {
    id: 'office',
    label: 'Office',
    time: '8:30am',
    kicker: 'Station 2',
    title: 'The hour has to survive the plumbing.',
    scene:
      'The timecard is approved. Approved does not mean counted. Between here and the books sit seven systems and a lot of re-keying.',
    myPart:
      'I designed the data flows and the approval routing. Five flows, seven systems, one middleware layer.',
    handoff: 'The hour posts to a cost code. Now the job has to tell the truth about it.',
    cast: 'the payroll clerk who reconciles it',
  },
  {
    id: 'job-cost',
    label: 'Job Cost',
    time: '11:30am',
    kicker: 'Station 3',
    title: 'The 90% cliff.',
    scene:
      'The hour lands on a budget line. Most jobs look fine, flat, and on track, right up until the number falls off a cliff near the end.',
    myPart:
      "I built the job-cost and earned-value dashboards on the client's ERP data. I ran the time studies with a clipboard.",
    handoff: 'One job can raise the question. It takes the whole book to answer it.',
    cast: 'the PM whose budget absorbs it',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    time: '1:00pm',
    kicker: 'Station 4',
    title: 'The estimating leak.',
    scene:
      'Estimating says the field blew the labor. The field says the estimate was fantasy. The completed jobs are the only arbitrator, and they usually split the bill.',
    myPart:
      'I ran the completed-contracts analyses on all three books. I built the selectivity model. I rebuilt the analytics as the deployed app.',
    handoff: 'Now you know what the data decides. Monday, you have to decide with it.',
    cast: 'the estimator who should have predicted it',
  },
  {
    id: 'decisions',
    label: 'Decisions',
    time: '2:00pm',
    kicker: 'Station 5',
    title: "Monday's docket.",
    scene:
      'Three invitations to bid are sitting in the inbox. For the first time, you can answer them with the whole day behind you.',
    myPart: 'I ran the adoption program. I shipped the agent.',
    handoff: 'Then I build the tool that sits on top of all of it.',
    cast: 'the owner who prices the next one off it',
  },
]

/* ------------------------------------------------------------------ *
 * Finale, epilogue, colophon
 * ------------------------------------------------------------------ */
export const FINALE = {
  kicker: 'Then I build the tool',
  title: 'An AI layer, grounded and modest.',
  body:
    'After the whole pipe is built, an agent sits on top of it. Grounded on live program data, read-only at the connector, a source link on every answer. The value is trust and retrieval, not oracle answers.',
  proof: {
    world: 'field',
    text: 'Its first backlog report surfaced 36 overdue items on day one, the oldest 84 days past date.',
  },
  constraints: [
    'Grounded on live program data',
    'Read-only at the connector',
    'A source link on every answer',
  ],
  agentDemo: {
    q: 'What is overdue in the program right now?',
    a: '36 open items are past their date. The oldest is 84 days past.',
    source: 'Program tracker, read-only',
  },
  tieback:
    'This is the answer to that 16% missing-information slice, the crew waiting on the office.',
}

export const EPILOGUE = {
  time: '6:15am, the next morning',
  title: 'The second dawn.',
  body:
    'Same foreman, new job. A calibrated lookahead. A digital punch. The correction that used to take two weeks now takes a day. The map closes the loop.',
  closingLine: 'The tool that wins the jobsite is the one the foreman opens twice.',
}

export const COLOPHON = {
  lede: 'This page is a scale model. The real versions run every day.',
  items: [
    {
      title: 'A program knowledge base',
      body:
        'A 16-company program knowledge base. 53 tables, 9,724 rows migrated from Coda into a linked Obsidian vault operated with Claude Code, with meetings writing themselves in through a Circleback to Vercel to GitHub Actions pipeline.',
    },
    {
      title: 'A grounded agent',
      body: 'An AI agent grounded on live program data, with a source link on every answer.',
    },
    {
      title: 'The deployed analytics app',
      body: 'A React analytics app that reads a CSV and returns the whole estimate-versus-actual story.',
    },
    {
      title: 'This page',
      body: 'Built with Claude Code. The argument for why that build speed matters is one link away.',
      href: '/ai-evolution',
      linkLabel: 'Read the case study',
    },
  ],
}

export const CONTACT = {
  name: 'Cain Menard',
  site: 'cainmenard.com',
  siteHref: 'https://cainmenard.com',
  email: 'cainmenard@gmail.com',
  phone: '(337) 654-2304',
  phoneHref: 'tel:+13376542304',
  github: 'github.com/cainmenard',
  githubHref: 'https://github.com/cainmenard',
}

/* ================================================================== *
 * STATION DATASETS
 * Populated up front where the brief specifies exact numbers, so later
 * build phases render from data instead of transcribing under pressure.
 * ================================================================== */

/* --- Station 1: Field --- */
export const CAPTURE_METHODS = [
  { id: 'gps', label: 'GPS self-clock', digital: 0.9 },
  { id: 'foreman', label: 'Foreman-entered mobile', digital: 0.7 },
  { id: 'four', label: 'Four methods at once', digital: 0.45 },
  { id: 'paper-keyed', label: 'Paper, then keyed', digital: 0.25 },
  { id: 'email', label: 'Emailed weekly by a part-timer', digital: 0.1 },
]

export const FIELD_FACTS = [
  {
    world: 'field',
    stat: '1,800',
    unit: 'entries a month',
    text: 'At one business, about 20 foremen key roughly 1,800 entries a month for 100+ crew. The foreman is the system of record and the single point of failure.',
  },
  {
    world: 'field',
    stat: '3,100',
    unit: 'entries a month',
    text: 'One $90M business runs four capture methods at once, about 3,100 entries a month across 150 field workers, reconciled by hand.',
  },
  {
    world: 'field',
    stat: '75%+',
    unit: 'Spanish-only',
    text: 'More than 75% of about 800 workers at the largest business speak only Spanish. That is a go or no-go design constraint, not a localization ticket.',
  },
]

export const FEDEX_PUNCHLINE = {
  world: 'field',
  text: 'The most financially mature business on the platform, the cleanest financials of the sixteen, batches paper timecards and FedExes them to corporate every week.',
  beats: [
    'Roughly half of daily timecards need a fix.',
    'Paper surfaces the error about two weeks later.',
    "Corrections are made in the employee's favor only.",
  ],
}

/**
 * The twelve businesses on the platform, placed on a manual (0) to digital (1)
 * axis by how their field hour is captured. A few carry real, scrubbed field
 * notes; the rest are generic tokens with no invented numbers. `lane` spreads
 * tokens vertically so neighbors do not overlap. The cleanest-financials
 * business (fedex + highlight) sits on the manual side: that inversion is the
 * point.
 */
export const BUSINESSES = [
  { id: 'b1', method: 'gps', digital: 0.93, lane: 0 },
  { id: 'b2', method: 'gps', digital: 0.86, lane: 2 },
  {
    id: 'b3',
    method: 'foreman',
    digital: 0.75,
    lane: 0,
    world: 'field',
    label: 'Foreman-entered mobile',
    stat: '1,800 / mo',
    note: 'About 20 foremen key roughly 1,800 entries a month for 100+ crew. The foreman is the system of record and the single point of failure.',
  },
  { id: 'b4', method: 'foreman', digital: 0.69, lane: 2 },
  { id: 'b5', method: 'foreman', digital: 0.63, lane: 1 },
  {
    id: 'b6',
    method: 'four',
    digital: 0.48,
    lane: 0,
    world: 'field',
    label: 'Four methods at once',
    stat: '3,100 / mo',
    note: 'A $90M business runs four capture methods at once, about 3,100 entries a month across 150 field workers, reconciled by hand.',
  },
  { id: 'b7', method: 'four', digital: 0.42, lane: 2 },
  {
    id: 'b8',
    method: 'paper-keyed',
    digital: 0.3,
    lane: 1,
    world: 'field',
    label: 'Paper, then keyed',
    stat: '150 / wk',
    note: 'Another business re-keys about 150 payroll lines a week.',
  },
  {
    id: 'b9',
    method: 'paper-keyed',
    digital: 0.24,
    lane: 0,
    world: 'field',
    fedex: true,
    highlight: true,
    label: 'Cleanest financials of the sixteen',
    stat: 'FedEx, weekly',
    note: 'The most financially mature business on the platform batches paper timecards and FedExes them to corporate every week. Roughly half of daily timecards need a fix, and the paper surfaces the error about two weeks later.',
  },
  { id: 'b10', method: 'paper-keyed', digital: 0.19, lane: 2 },
  {
    id: 'b11',
    method: 'email',
    digital: 0.11,
    lane: 1,
    world: 'field',
    label: 'Emailed weekly',
    stat: 'Part-timer',
    note: 'At one business, a part-time person emails the hours in once a week.',
  },
  { id: 'b12', method: 'email', digital: 0.07, lane: 0 },
]

/** The animated shipment: how a paper hour reaches the books, and how late. */
export const FEDEX_STAGES = [
  { id: 'written', when: 'Monday', title: 'Timecard written', text: 'A crew leader fills out paper timecards on the jobsite.' },
  { id: 'error', when: 'Same day', title: 'Half need a fix', text: 'Roughly half of daily timecards carry an error nobody has caught yet.' },
  { id: 'shipped', when: 'Friday', title: 'Batched and FedExed', text: 'A week of paper is boxed and shipped to corporate.' },
  { id: 'surfaced', when: 'About two weeks later', title: 'The error surfaces', text: 'Payroll finds the mistake once the paper is finally keyed.' },
  { id: 'corrected', when: 'The correction', title: "In the employee's favor only", text: 'The fix is made in the employee’s favor, and never clawed back.' },
]

export const INDUSTRY_FRAME = {
  world: 'public',
  stat: '0.4% vs 3%',
  text: 'Construction labor productivity has grown about 0.4% a year since 2000, against about 3% in manufacturing.',
  citation: 'mckinsey',
}

export const VENDOR_GAUNTLET = {
  world: 'field',
  window: 'October 2025 to March 2026',
  summary:
    'Six field-time platforms, cut to two, then Miter. Both finalists failed piecework (unequal split allocations across cost codes). The runner-up quoted $10-15K just to scope it. The winner could not calculate it either.',
  solution:
    'Solved in the middleware: total dollars divided by hours equals the rate per cost code.',
  dna: [
    { label: 'Runner-up', value: '41 of 2,060 customers in construction (2%)' },
    { label: 'Winner (Miter)', value: 'about 30 customers at 1,000+ employees, all construction' },
  ],
  gate: 'Will a foreman with wet gloves at 6:15am open this a second time?',
  honestLabel: 'Selected with broad support, runner-up validated against.',
}

export const TRAINING_ARC = {
  world: 'field',
  failure:
    'Train everyone hits 83% completion and fails. Five of 40 proficient.',
  worked: [
    'A named owner per process, seven processes.',
    'A monthly trained-versus-proficient matrix.',
    'Process scorecards and an action plan recut about nine times over two years.',
  ],
  belief: '93% see the problem. About 20% believe the fix.',
  instrument:
    'Adoption is instrumented, not surveyed. Timecard correction rate, corrections per paychecks processed per week, with 90% clean entry in 90 days as the goal.',
  terminology: 'Field Trainer Network',
  projected: true,
  goLive: 'Go-live September 2026',
}

/* --- Station 2: Office --- */
export const PIPELINE = {
  world: 'field',
  frame: 'Five data flows connect seven systems through one middleware layer.',
  before: 'Before the build, only 2 of 10 integrations were automated.',
  prompt: 'Approved does not mean counted. Click the hand-off where you think the hour dies.',
  // The stages the approved hour has to survive, left to right.
  stages: [
    { id: 'approved', label: 'Approved timecard' },
    { id: 'payroll', label: 'Payroll' },
    { id: 'erp', label: 'Job cost (ERP)' },
    { id: 'books', label: 'The books' },
    { id: 'budget', label: 'Budget vs actual' },
  ],
  // One clickable point per pipe, in order between the stages above. Two are the
  // real leaks; the rest are hand-offs that are not where the hour dies.
  points: [
    {
      id: 'queue',
      leak: true,
      title: 'The approval queue',
      detail: 'The hour waits here while corrections chase every paycheck cycle. Approved is not counted.',
    },
    {
      id: 'rekey',
      leak: true,
      title: 'Manual re-keying',
      detail: 'One business re-keys about 150 payroll lines a week at this hand-off, by hand.',
    },
    { id: 'd1', leak: false, miss: 'A hand-off, but not where the hour dies.' },
    { id: 'd2', leak: false, miss: 'A hand-off, but not where the hour dies.' },
  ],
  trigger:
    'The future state runs on one trigger. The minute a timecard is approved, the hour posts to its cost code and budget-versus-actual updates the same day, not at month-end.',
  triggerShort:
    'The minute a timecard is approved, the hour posts to its cost code and budget-versus-actual updates the same day.',
  budgetBadge: 'Updated today',
  honest:
    'An integration does not fix a bad punch. It delivers the bad punch faster. So the correction workflow and the approval deadline are the real design work. One deadline moved to noon Monday, with a second round for the Tuesday stragglers.',
}

export const OFFICE_DRAWERS = [
  {
    id: 'one-way-door',
    title: 'The one-way door',
    body:
      'Corrections happen in the system of record only. Two systems that both accept edits disagree by Friday, and payroll disagreements become wage-and-hour problems.',
  },
  {
    id: 'piecework',
    title: 'The piecework splitter',
    body: 'A middleware rate breakout. Total dollars divided by hours gives the rate per cost code.',
  },
  {
    id: 'compliance',
    title: 'The compliance counter',
    world: 'field',
    body:
      'For a California roofer, violation detection wired into the timekeeping backend cut exposure from about 180 hours a week to about 24, roughly an 87% cut, surfaced before payroll closes.',
  },
]

/* --- Station 3: Job Cost --- */
export const CLIFF = {
  world: 'field',
  quiet: 'Flat, flat, flat, then a cliff at about 90% complete.',
  honest: 'The weekly reforecast bends early and lands soft.',
  marker: 'Close-out fires at 80% of labor hours consumed, before the cliff.',
  // Two forecasts of the same job. x = percent complete, y = projected margin.
  // The quiet one holds near the bid margin, then falls off a cliff near 90%;
  // the honest weekly reforecast bends early and lands soft. Values are shaped
  // to the story (bids around 14, the quiet forecast lands near the 1.8 the
  // crew-rate catch projected), not a specific job's ledger.
  chart: {
    yMax: 16,
    bidMargin: 14,
    markerX: 80,
    markerLabel: 'Close-out fires here',
    markerSub: '80% of labor hours',
    cliffX: 90,
    quiet: [
      { x: 0, y: 14 }, { x: 25, y: 14 }, { x: 50, y: 13.9 }, { x: 70, y: 13.8 },
      { x: 82, y: 13.5 }, { x: 88, y: 12.8 }, { x: 92, y: 8.5 }, { x: 96, y: 4.3 }, { x: 100, y: 1.8 },
    ],
    honest: [
      { x: 0, y: 14 }, { x: 15, y: 12.9 }, { x: 35, y: 11.3 }, { x: 55, y: 10 },
      { x: 72, y: 9.1 }, { x: 85, y: 8.6 }, { x: 100, y: 8.4 },
    ],
    quietLabel: 'The quiet forecast',
    honestLabel: 'The honest weekly reforecast',
  },
  crewRate: {
    world: 'field',
    actual: 71.46,
    estimated: 61.18,
    hotPct: 17,
    marginProjected: 1.8,
    marginBid: 14,
    caught:
      'Weekly earned-value reporting caught a composite crew rate running $71.46 actual against $61.18 estimated, about 17% hot, with projected margin compressing toward 1.8% on a book that bids around 14, while the job was still open.',
  },
}

export const STOPWATCH = {
  world: 'field',
  segments: [
    { id: 'direct', label: 'Direct install', pct: 43 },
    { id: 'support', label: 'Support work', pct: 42 },
    { id: 'lost', label: 'Recoverable lost time', pct: 14 },
  ],
  lostCauses: [
    { id: 'offtask', label: 'Off-task', note: 'Leads the lost time.' },
    { id: 'material', label: 'Material handling', pct: 17, note: 'Fixable from a desk.' },
    { id: 'missing', label: 'Missing information from office or GC', pct: 16, note: 'The software problem the finale pays off.', tieToFinale: true },
  ],
  line: 'The crew was not slow. The crew was waiting.',
}

/* --- Station 4: Portfolio (centerpiece) --- */
export const PORTFOLIO_FRAME = {
  totalProjects: 532,
  totalValue: '$1.75B',
  intro:
    'A completed-contracts analysis separates systematic bias from execution noise. Three books, 532 projects, about $1.75B.',
}

export const FORENSIC_BOOKS = [
  {
    id: 'mechanical',
    world: 'field',
    name: 'a San Diego mechanical contractor',
    projects: 126,
    value: '$85.9M',
    marginEst: 14.28,
    marginActual: 9.82,
    headline: 'Labor overran 25%.',
    detail: 'Margin 14.28% estimated to 9.82% actual. Labor overran 25%, $17.28M bid against $21.60M spent.',
    bars: [
      { code: 'Labor', variancePct: 25, kind: 'predict' },
    ],
  },
  {
    id: 'water',
    world: 'field',
    name: 'a national water-infrastructure design-builder',
    projects: 367,
    value: '$630M',
    headline: 'Same company, same product, nine-point swing by seat.',
    detail:
      'Margin gained 4.18 points as a subcontractor and faded 4.85 as a GC, the same company on the same product. Materials came in 10.4% under while equipment ran 11.3% over.',
    seat: { sub: 4.18, gc: -4.85 },
    bars: [
      { code: 'Materials', variancePct: -10.4, kind: 'quote' },
      { code: 'Equipment', variancePct: 11.3, kind: 'predict' },
    ],
  },
  {
    id: 'epc',
    world: 'field',
    name: 'a utility-scale solar and wind EPC',
    projects: 39,
    value: '$1.03B',
    headline: 'A harmless-looking average hiding a $5.7M loss.',
    detail:
      'Aggregate fade a harmless-looking 0.6 points, but project outcomes ran from a 68% fade to a 28% gain. Equipment 20.8% over estimate ($22.1M). The largest customer, five projects and about $190M revenue, posted a $5.7M net loss with direct costs 48.6% over.',
    bars: [
      { code: 'Equipment', variancePct: 20.8, kind: 'predict' },
    ],
    worstCustomer: {
      projects: 5,
      revenue: '$190M',
      netLoss: '$5.7M',
      directOverPct: 48.6,
    },
  },
]

/**
 * The utility-scale EPC book, used for the would-you-sign / scatter reveal.
 * The revenue-weighted aggregate fade is a harmless-looking 0.6 points, but the
 * project-level outcomes run from a 68-point fade to a 28-point gain. The count
 * and the range are from the analysis; the individual points illustrate the
 * spread (a simple count skews below the revenue-weighted aggregate because the
 * smaller projects faded harder). Five points are the largest customer.
 */
export const EPC_SCATTER = {
  world: 'field',
  projects: 39,
  aggregate: 0.6,
  worstFade: 68,
  bestGain: 28,
  note: 'Count and range are from the analysis. Individual points illustrate the spread; the aggregate is revenue-weighted.',
  points: [
    { v: 28 }, { v: 24 }, { v: 19 }, { v: 16 }, { v: 13 }, { v: 11 }, { v: 10 }, { v: 9 },
    { v: 8 }, { v: 7 }, { v: 6 }, { v: 5 }, { v: 4 }, { v: 3 }, { v: 2 }, { v: 2 }, { v: 1 },
    { v: 1 }, { v: 0 }, { v: 0 }, { v: -1 }, { v: -1 }, { v: -2 }, { v: -3 }, { v: -4 },
    { v: -5 }, { v: -6 }, { v: -7 }, { v: -8 }, { v: -10 }, { v: -12 }, { v: -15 }, { v: -19 },
    { v: -24 }, { v: -30, worst: true }, { v: -37, worst: true }, { v: -45, worst: true },
    { v: -54, worst: true }, { v: -68, worst: true },
  ],
  worstCustomer: {
    projects: 5,
    revenue: '$190M',
    netLoss: '$5.7M',
    directOverPct: 48.6,
    line: 'The average hides the business you just bought.',
  },
}

export const REPEATED_SHAPE =
  'What you quote (materials, subs) holds or comes under. What you predict (labor, equipment) runs over. Quotes hold, predictions lose.'

export const BID_REBUILD = {
  world: 'sandbox',
  note: 'These bid figures are sandbox composites built off the real $61.18 to $71.46 crew-rate factor.',
  oldBid: 324900,
  calibratedBid: 352400,
  actualCost: 327500,
  captions: {
    oldBid: 'Won the job, below actual cost.',
    calibratedBid: 'Priced from the book, recalibrated with the measured factors.',
    actualCost: 'What it actually took.',
  },
}

export const LOOP_MECHANICS = {
  factTable: 'A 3,731-row estimate-versus-actual fact table, joined by cost code, with about 20 projects excluded on documented data-quality logic.',
  segment: 'Segment by customer, delivery method, project type, and size. Separate bias (repeats across a segment) from noise (one-off).',
  reblend: 'Re-blend the composite crew rate to the crews actually fielded.',
  gate: 'A 21-factor bid go/no-go. 69+ bid it, 50 to 69 needs executive approval, below 50 walk.',
}

export const OBJECTIONS = [
  {
    id: 'scope',
    title: 'Is this just scope leakage?',
    body: 'The fix included change-order discipline. Every open change order closes before demobilization.',
  },
  {
    id: 'inflation',
    title: 'Is this just inflation?',
    body: 'Escalation explains the level, not the concentration. K-12 work fading 6.1% while college work gained 3.6% in the same years survives the macro story.',
  },
]

export const GUIDED_EMBED = {
  url: 'https://project-performance-analysis.vercel.app/',
  label: 'Real deployed tool, sample data',
  note: 'The tool ships 147 sample project records. Its demo dataset is illustrative and is never cited as real client numbers.',
  missions: [
    { id: 'customer', title: 'Find the losing customer', look: 'Sort customers by margin fade. One profile loses money on repeat.' },
    { id: 'category', title: 'Find the leaking cost category', look: 'Compare estimate to actual by category. Watch equipment and labor.' },
    { id: 'segment', title: 'Watch fade by segment', look: 'Cut by delivery method and project type. The average hides the outliers.' },
  ],
}

/* --- Station 5: Decisions --- */
export const DOCKET = [
  {
    id: 'losing-customer',
    tag: 'Invitation to bid',
    situation: 'It comes from the customer profile that loses money.',
    question: 'What do you do?',
    options: [
      { id: 'fire', label: 'Fire the customer' },
      { id: 'bid', label: 'Bid it as usual' },
      { id: 'reprice', label: 'Reprice, or decline the loss types', best: true },
    ],
    answer:
      'You rarely fire your biggest customer. You reprice the risk, or decline the specific job types where the losses live.',
  },
  {
    id: 'industrial-fade',
    tag: 'A segment fades',
    situation: 'Industrial work faded 13% across three jobs.',
    question: 'Do you stop bidding it?',
    options: [
      { id: 'noblanket', label: 'Blanket no-bid on industrial' },
      { id: 'all', label: 'Keep bidding it all' },
      { id: 'band', label: 'Route it to executive approval', best: true },
    ],
    answer:
      "Not a blanket no-bid. The selectivity model's executive-approval band. It is capacity-aware bidding: the model scores number of bidders and PM availability.",
  },
  {
    id: 'labor-over',
    tag: 'Labor ran hot',
    situation: 'Labor ran 25% over on the book.',
    question: 'Raise rates or fix planning?',
    options: [
      { id: 'rates', label: 'Raise the rates' },
      { id: 'planning', label: 'Fix the planning' },
      { id: 'both', label: 'Both', best: true },
    ],
    answer: 'Both. Raise the rates and fix planning, because the data split the bill.',
  },
]

export const MECHANISM_CARDS = [
  {
    id: 'pricing',
    title: 'Pricing follows labor risk',
    body: 'A dual-overhead-rate method, heavier markup on self-perform labor, lighter on quoted materials and subs. An FMI method Cain applies, not authored.',
  },
  { id: 'reprice', title: 'Customer cuts drive repricing', body: 'Customer-level cuts drive repricing before exit.' },
  { id: 'seat', title: 'The seat swing prices the GC role', body: 'The nine-point margin swing between subcontractor and GC prices the role.' },
  { id: 'planning', title: 'Variance in labor aims the budget', body: 'Variance concentrated in labor aims the improvement budget at pre-job planning.' },
  { id: 'wip', title: 'WIP discipline protects margin', body: 'WIP discipline plus the 80%-of-labor-hours close-out protects end-of-job margin and retention.' },
  { id: 'orgchart', title: 'The org chart is a bidding constraint', body: 'PM availability is a scored bid factor, so the org chart is a bidding constraint.' },
]
