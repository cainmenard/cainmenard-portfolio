/**
 * The grounded-retrieval engine behind the finale console.
 *
 * This is deliberately NOT a language model. It is a small deterministic
 * query interpreter over the program tracker: it parses a question into
 * FACETS (filters) + an OPERATION (count, sum, rank, group, list), runs that
 * query against the rows, and hands back the exact refs it used so the view
 * can cite them.
 *
 * The point is coverage without an LLM. Because filters compose, the space of
 * answerable questions is filters × operations, not a fixed list of intents —
 * "overdue mechanical change orders waiting on the GC", "how much is tied up
 * in overdue items", "break the backlog down by book" all resolve from the
 * same grammar. Every answer carries `cites`; a question that cannot point at
 * rows returns the honest decline instead.
 */

/* ---- facet vocabulary: synonyms → canonical value ---- */
const BOOKS = {
  Mechanical: ['mechanical', 'mech', 'hvac', 'plumbing', 'piping'],
  Civil: ['civil', 'sitework', 'site work', 'earthwork', 'grading'],
  Concrete: ['concrete', 'rebar', 'structural', 'foundation'],
  Solar: ['solar', 'pv', 'photovoltaic', 'panel', 'inverter'],
  Electrical: ['electrical', 'electric', 'elec', 'power'],
}
const PARTIES = {
  Office: ['office', 'accounting', 'back office', 'estimating'],
  GC: ['gc', 'general contractor', 'the general'],
  Architect: ['architect', 'design team', 'engineer', 'a/e', 'aor', 'designer'],
  Vendor: ['vendor', 'supplier', 'manufacturer', 'fabricator', 'procurement'],
  PM: ['pm', 'project manager', 'project management'],
  Field: ['field', 'crew', 'foreman', 'jobsite', 'the guys'],
}
const TYPES = {
  RFI: ['rfi', 'rfis', 'question'],
  Submittal: ['submittal', 'submittals', 'shop drawing', 'shop drawings'],
  'Change order': ['change order', 'change orders', 'co ', 'cos', 'extra', 'extras'],
  Inspection: ['inspection', 'inspections', 'inspect', 'walk', 'punch'],
  Material: ['material', 'materials', 'delivery', 'deliveries', 'long lead', 'procure', 'order'],
  Closeout: ['closeout', 'close out', 'close-out', 'retention', 'retainage', 'o&m'],
  'Pay app': ['pay app', 'pay apps', 'pay application', 'payment', 'invoice', 'billing'],
  Report: ['report', 'reports', 'projection', 'manpower'],
}
const STATUSES = {
  overdue: ['overdue', 'late', 'past due', 'past their date', 'past date', 'behind', 'delinquent', 'backlog'],
  soon: ['due soon', 'this week', 'upcoming', 'coming up', 'next few', 'due within', 'coming'],
  open: ['open', 'outstanding', 'active', 'pending', 'still out'],
  done: ['done', 'closed', 'complete', 'completed', 'finished', 'resolved', 'wrapped'],
}

// Singular / plural forms for the answer sentence.
const TYPE_PLURAL = {
  RFI: 'RFIs',
  Submittal: 'submittals',
  'Change order': 'change orders',
  Inspection: 'inspections',
  Material: 'material items',
  Closeout: 'closeout items',
  'Pay app': 'pay apps',
  Report: 'reports',
}
const TYPE_SINGULAR = {
  RFI: 'RFI',
  Submittal: 'submittal',
  'Change order': 'change order',
  Inspection: 'inspection',
  Material: 'material item',
  Closeout: 'closeout item',
  'Pay app': 'pay app',
  Report: 'report',
}
const nounFor = (type, n) =>
  type ? (n === 1 ? TYPE_SINGULAR[type] : TYPE_PLURAL[type]) : n === 1 ? 'item' : 'items'
// "an RFI" vs "a change order"
const typePhrase = (type) => (type === 'RFI' ? 'an RFI' : `a ${TYPE_SINGULAR[type].toLowerCase()}`)

const JUDGMENT = [
  'should', 'predict', 'forecast', 'will we', 'will it', 'going to', 'recommend',
  'worth it', 'profit', 'opinion', 'guess', 'blame', 'fault', "who's to blame",
  'best', 'better to', 'weather', 'hire', 'fire ', 'do you think', 'what if we',
]

const OFFICE_SIDE = ['Office', 'GC', 'Architect', 'Vendor']

const has = (q, words) => words.some((w) => q.includes(w))
const findFacet = (q, dict) => {
  for (const [canon, syns] of Object.entries(dict)) {
    if (syns.some((s) => q.includes(s))) return canon
  }
  return null
}

const money = (n) =>
  n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : `$${Math.round(n / 1000)}k`

/* ---- row predicates ---- */
const isOverdue = (r) => !r.done && r.dueIn < 0
const isSoon = (r) => !r.done && r.dueIn >= 0 && r.dueIn <= 7
const isOpen = (r) => !r.done
const daysPast = (r) => (r.dueIn < 0 ? -r.dueIn : 0)

function statusPred(status) {
  if (status === 'overdue') return isOverdue
  if (status === 'soon') return isSoon
  if (status === 'done') return (r) => !!r.done
  if (status === 'open') return isOpen
  return () => true
}

/* ---- phrase the applied filters back to the reader (pluralized by count) ---- */
function describe(f, n = 2) {
  const statusWord =
    f.status === 'overdue' ? 'overdue'
    : f.status === 'soon' ? 'due-this-week'
    : f.status === 'done' ? 'closed'
    : f.status === 'open' ? 'open'
    : ''
  const noun = nounFor(f.type, n)
  let phrase = [statusWord, f.book, noun].filter(Boolean).join(' ')
  if (f.party) phrase += ` waiting on ${f.party === 'Office' ? 'the office' : f.party}`
  if (f.overDays) phrase += ` more than ${f.overDays} days past due`
  return phrase || (n === 1 ? 'item' : 'items')
}

function applyFilters(rows, f) {
  let out = rows
  if (f.status) out = out.filter(statusPred(f.status))
  if (f.book) out = out.filter((r) => r.book === f.book)
  if (f.party) out = out.filter((r) => r.waitingOn === f.party)
  if (f.type) out = out.filter((r) => r.type === f.type)
  if (f.overDays) out = out.filter((r) => daysPast(r) > f.overDays)
  return out
}

const refsOf = (list) => list.map((r) => r.ref)

/* Compact status breakdown used when no explicit status filter is set. */
function statusMix(list) {
  const od = list.filter(isOverdue).length
  const sn = list.filter(isSoon).length
  const dn = list.filter((r) => r.done).length
  const bits = []
  if (od) bits.push(`${od} overdue`)
  if (sn) bits.push(`${sn} due this week`)
  const later = list.filter((r) => isOpen(r) && !isOverdue(r) && !isSoon(r)).length
  if (later) bits.push(`${later} further out`)
  if (dn) bits.push(`${dn} closed`)
  return bits.join(', ')
}

/**
 * answer(query, tracker) → { kind, text, cites }
 *   kind: 'answer' | 'declined' | 'unknown'
 *   cites: tracker refs the answer was computed from
 */
export function answer(query, tracker) {
  const q = (query || '').toLowerCase().trim()
  const { rows } = tracker

  if (!q) return capabilities(rows)

  // 1. Judgment / prediction — decline honestly, cite nothing.
  if (has(q, JUDGMENT)) {
    return {
      kind: 'declined',
      text:
        'That is a judgment call, not a lookup. I report what is in the tracker — whether to bid, who is at fault, or what happens next is not in the data, so I will not guess. Ask me to filter, total, or rank the program items instead.',
      cites: [],
    }
  }

  // 2. Parse facets.
  const overMatch = q.match(/(?:over|more than|older than|past)\s+(\d+)\s*days?/)
  const f = {
    book: findFacet(q, BOOKS),
    party: findFacet(q, PARTIES),
    type: findFacet(q, TYPES),
    status: findFacet(q, STATUSES),
    overDays: overMatch ? Number(overMatch[1]) : null,
  }
  if (f.overDays && !f.status) f.status = 'overdue'

  // 3. Special narrative op: the holdup / bottleneck (ties to the 16% slice).
  if (!f.party && has(q, ['holdup', 'hold up', 'bottleneck', 'blocked', 'stuck', 'waiting on'])) {
    const overdue = rows.filter(isOverdue)
    const officeSide = overdue.filter((r) => OFFICE_SIDE.includes(r.waitingOn))
    return {
      kind: 'answer',
      text: `${officeSide.length} of the ${overdue.length} overdue items are parked with the office, architect, GC, or a vendor — not the field. The crew cannot close what it is waiting on.`,
      cites: refsOf(officeSide),
    }
  }

  const subset = applyFilters(rows, f)
  const hasFilter = f.book || f.party || f.type || f.status || f.overDays
  const label = (n = subset.length) => describe(f, n)

  // Operation detection.
  const wantsMoney = has(q, ['how much', 'dollar', 'money', 'value', 'worth', 'tied up', 'total value', '$', 'cost'])
  const wantsCount = has(q, ['how many', 'count', 'number of', 'how much of'])
  const groupDim =
    has(q, ['by book', 'per book', 'each book', 'by trade', 'which book']) ? 'book'
    : has(q, ['by who', 'by owner', 'by party', 'by whom', 'who owns', 'who has', 'by person']) ? 'waitingOn'
    : has(q, ['by type', 'by category', 'by kind']) ? 'type'
    : has(q, ['by status', 'by stage']) ? 'status'
    : has(q, ['breakdown', 'break down', 'break the', 'break it']) ? (f.book ? 'waitingOn' : 'book')
    : null
  const wantsOldest = has(q, ['oldest', 'longest', 'most overdue', 'furthest behind', 'worst offender', 'worst'])
  const wantsNewest = has(q, ['newest', 'most recent', 'latest', 'soonest', 'next due', 'due next'])
  const wantsBiggest = has(q, ['biggest', 'largest', 'highest', 'most expensive', 'top ', 'priciest'])

  // 4. Group-by.
  if (groupDim) {
    const base = hasFilter ? subset : rows
    const groups = {}
    base.forEach((r) => {
      const k = groupDim === 'status'
        ? (isOverdue(r) ? 'overdue' : isSoon(r) ? 'due this week' : r.done ? 'closed' : 'open')
        : r[groupDim]
      ;(groups[k] ||= []).push(r)
    })
    const parts = Object.entries(groups).sort((a, b) => b[1].length - a[1].length)
    const dimName = groupDim === 'waitingOn' ? 'party' : groupDim
    const head = hasFilter ? label(base.length)[0].toUpperCase() + label(base.length).slice(1) : 'All items'
    return {
      kind: 'answer',
      text: `${head} by ${dimName}: ${parts
        .map(([k, list]) => `${k} ${list.length}`)
        .join(', ')}.`,
      cites: refsOf(base),
    }
  }

  // 5. Money aggregate.
  if (wantsMoney) {
    const valued = subset.filter((r) => r.amount)
    if (valued.length === 0) {
      return { kind: 'answer', text: `None of the ${label()} carry a tracked dollar value.`, cites: refsOf(subset) }
    }
    const sum = valued.reduce((s, r) => s + r.amount, 0)
    return {
      kind: 'answer',
      text: `${money(sum)} is tied up across ${valued.length} ${label(valued.length)} that carry a value${f.status === 'overdue' || f.overDays ? ' — money the office is sitting on' : ''}.`,
      cites: refsOf(valued),
    }
  }

  // 6. Ranking / superlatives.
  if (wantsBiggest) {
    const valued = (hasFilter ? subset : rows).filter((r) => r.amount)
    if (!valued.length) return { kind: 'answer', text: `Nothing in ${hasFilter ? label() : 'the tracker'} carries a dollar value.`, cites: [] }
    const top = valued.sort((a, b) => b.amount - a.amount)[0]
    return {
      kind: 'answer',
      text: `The largest is "${top.task}" at ${money(top.amount)} — ${top.book} book, ${top.done ? 'now closed' : top.dueIn < 0 ? `${-top.dueIn} days past due` : `due in ${top.dueIn} days`}, waiting on ${top.waitingOn}.`,
      cites: [top.ref],
    }
  }
  if (wantsOldest) {
    const pool = (hasFilter ? subset : rows).filter(isOverdue).sort((a, b) => a.dueIn - b.dueIn)
    if (!pool.length) return { kind: 'answer', text: `Nothing ${hasFilter ? `in ${label()} ` : ''}is past due.`, cites: [] }
    const o = pool[0]
    return {
      kind: 'answer',
      text: `The oldest is "${o.task}" — ${-o.dueIn} days past due. ${o.book} book, waiting on ${o.waitingOn}, logged as ${typePhrase(o.type)}.`,
      cites: [o.ref],
    }
  }
  if (wantsNewest) {
    const pool = (hasFilter ? subset : rows).filter(isOpen).sort((a, b) => a.dueIn - b.dueIn)
    const next = pool.filter((r) => r.dueIn >= 0)[0] || pool[pool.length - 1]
    if (!next) return { kind: 'answer', text: 'Nothing is coming due.', cites: [] }
    return {
      kind: 'answer',
      text: `Next up is "${next.task}" — ${next.dueIn <= 0 ? `${-next.dueIn} days past due` : `due in ${next.dueIn} days`}, ${next.book} book, waiting on ${next.waitingOn}.`,
      cites: [next.ref],
    }
  }

  // 7. Count.
  if (wantsCount && hasFilter) {
    const mix = statusMix(subset)
    const tail = mix && !f.status ? ` — ${mix}.` : '.'
    return {
      kind: 'answer',
      text: `${subset.length} ${label()}${tail}`,
      cites: refsOf(subset),
    }
  }

  // 8. Plain filter / list.
  if (hasFilter) {
    if (subset.length === 0) {
      return { kind: 'answer', text: `Nothing in the tracker matches ${label()}. Try loosening one filter.`, cites: [] }
    }
    const shown = subset.slice(0, 4).map((r) => `"${r.task}"`).join('; ')
    const more = subset.length > 4 ? `, and ${subset.length - 4} more` : ''
    const head = `${subset.length} ${label()}${!f.status ? ` (${statusMix(subset)})` : ''}: `
    return { kind: 'answer', text: `${head}${shown}${more}.`, cites: refsOf(subset) }
  }

  // 9. Whole-program summary when they ask broadly.
  if (has(q, ['how many', 'summary', 'overview', 'status', 'everything', 'all items', 'total', 'the program'])) {
    return {
      kind: 'answer',
      text: `${rows.length} items in the tracker: ${statusMix(rows)}.`,
      cites: [],
    }
  }

  // 10. Fell through — do not invent. Show the axes instead of a dead end.
  return capabilities(rows)
}

function capabilities(rows) {
  const od = rows.filter(isOverdue).length
  return {
    kind: 'unknown',
    text: `I read the program tracker — ${rows.length} items across five books, ${od} of them overdue. Ask me to filter (a book, who it is waiting on, a type, or a status), total up dollars, or rank by oldest or biggest — and you can stack those together.`,
    cites: [],
  }
}
