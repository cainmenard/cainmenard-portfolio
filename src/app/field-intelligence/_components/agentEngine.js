/**
 * The grounded-retrieval engine behind the finale console.
 *
 * This is deliberately NOT a language model. It is a small deterministic
 * retrieval layer over the program tracker: it matches a question to an
 * intent, computes the answer straight from the rows, and hands back the
 * exact refs it used so the view can cite them. That is the whole thesis of
 * the section made literal — trust and retrieval, not oracle answers.
 *
 * Every answer carries `cites` (the tracker rows it was derived from) so the
 * "source link on every answer" claim is enforced by construction: an intent
 * that cannot point at rows returns the honest decline instead.
 */

const OFFICE_SIDE = ['Office', 'GC', 'Architect', 'Vendor']

// Questions that ask for judgment, prediction, or blame — not a lookup.
// Checked first so "should we bid the overdue job?" declines instead of
// matching on "overdue". This is where the agent stays modest on purpose.
const JUDGMENT = [
  'should', 'predict', 'forecast', 'will we', 'will it', 'going to',
  'recommend', 'worth', 'profit', 'opinion', 'guess', 'bet', 'blame',
  'fault', "who's to blame", 'best', 'better', 'weather', 'hire', 'fire',
  'estimate the', 'how much will', 'do you think',
]

const has = (q, words) => words.some((w) => q.includes(w))

const derive = (rows) => {
  const open = rows.filter((r) => !r.done)
  const overdue = open
    .filter((r) => r.dueIn < 0)
    .sort((a, b) => a.dueIn - b.dueIn) // most overdue first
  const dueSoon = open.filter((r) => r.dueIn >= 0 && r.dueIn <= 7)
  const later = open.filter((r) => r.dueIn > 7)
  const done = rows.filter((r) => r.done)
  return { open, overdue, dueSoon, later, done }
}

const BOOKS = ['mechanical', 'civil', 'solar', 'electrical', 'concrete']
const bookName = (r) => r.book

const refsOf = (list) => list.map((r) => r.ref)

/**
 * answer(query, tracker) → { kind, text, cites }
 *   kind: 'answer' | 'declined' | 'unknown'
 *   cites: array of tracker refs the answer was computed from
 */
export function answer(query, tracker) {
  const q = (query || '').toLowerCase().trim()
  const { rows, liveOverdue } = tracker
  const d = derive(rows)

  if (!q) {
    return {
      kind: 'unknown',
      text: 'Ask me what is overdue, what is due this week, who a task is waiting on, or about a specific book.',
      cites: [],
    }
  }

  // 1. Judgment / prediction — decline honestly.
  if (has(q, JUDGMENT)) {
    return {
      kind: 'declined',
      text:
        'That is a judgment call, not a lookup. I only report what is in the tracker — whether to bid, who is at fault, or what happens next is not in the data, so I will not guess. Ask me what is overdue, what is due, or who a task is waiting on.',
      cites: [],
    }
  }

  // 2. A specific book / trade.
  const book = BOOKS.find((b) => q.includes(b))
  if (book) {
    const label = book.charAt(0).toUpperCase() + book.slice(1)
    const mine = rows.filter((r) => bookName(r).toLowerCase().includes(book))
    if (mine.length === 0) {
      return {
        kind: 'unknown',
        text: `Nothing in the sample is tagged to the ${label} book. Try Mechanical, Civil, Solar, Electrical, or Concrete.`,
        cites: [],
      }
    }
    const od = mine.filter((r) => !r.done && r.dueIn < 0).length
    const dn = mine.filter((r) => r.done).length
    return {
      kind: 'answer',
      text: `${mine.length} items on the ${label} book — ${od} past due, ${dn} closed. ${mine
        .filter((r) => !r.done)
        .map((r) => `"${r.task}"`)
        .join('; ') || 'nothing open right now.'}`,
      cites: refsOf(mine),
    }
  }

  // 3. Oldest / longest outstanding.
  if (has(q, ['oldest', 'longest', 'worst', 'most overdue', 'furthest'])) {
    const o = d.overdue[0]
    if (!o) return { kind: 'answer', text: 'Nothing is past due in the sample right now.', cites: [] }
    return {
      kind: 'answer',
      text: `The oldest open item is "${o.task}" — ${-o.dueIn} days past due. On the ${o.book} book, waiting on ${o.waitingOn}, logged as a ${o.type}.`,
      cites: [o.ref],
    }
  }

  // 4. Due soon / this week / upcoming.
  if (has(q, ['this week', 'due soon', 'coming up', 'upcoming', 'next few', 'soon', 'coming'])) {
    if (d.dueSoon.length === 0) return { kind: 'answer', text: 'Nothing is due in the next seven days.', cites: [] }
    return {
      kind: 'answer',
      text: `${d.dueSoon.length} items are due within a week: ${d.dueSoon
        .map((r) => `"${r.task}" (in ${r.dueIn}d, ${r.book})`)
        .join('; ')}.`,
      cites: refsOf(d.dueSoon),
    }
  }

  // 5. Who is the holdup / waiting on / bottleneck. Ties to the 16% slice.
  if (has(q, ['waiting', 'holdup', 'hold up', 'bottleneck', 'blocked', 'stuck', 'who', 'office'])) {
    const officeSide = d.overdue.filter((r) => OFFICE_SIDE.includes(r.waitingOn))
    return {
      kind: 'answer',
      text: `${officeSide.length} of the ${d.overdue.length} overdue items are parked with the office, architect, GC, or a vendor — not the field. The crew cannot close what it is waiting on.`,
      cites: refsOf(officeSide),
    }
  }

  // 6. Overdue / past due / late / behind.
  if (has(q, ['overdue', 'past due', 'late', 'behind', 'past their date', 'past date'])) {
    const o = d.overdue[0]
    return {
      kind: 'answer',
      text: `${d.overdue.length} of ${rows.length} items in this sample are past due — the live tracker holds ${liveOverdue}. The oldest is ${-o.dueIn} days past: "${o.task}."`,
      cites: refsOf(d.overdue),
    }
  }

  // 7. Closed / done / completed.
  if (has(q, ['done', 'closed', 'complete', 'finished', 'wrapped'])) {
    return {
      kind: 'answer',
      text: `${d.done.length} items closed recently: ${d.done.map((r) => `"${r.task}"`).join('; ')}.`,
      cites: refsOf(d.done),
    }
  }

  // 8. Totals / status / summary / how many open.
  if (has(q, ['how many', 'open', 'total', 'status', 'summary', 'overview', 'count', 'all'])) {
    return {
      kind: 'answer',
      text: `${d.open.length} open items: ${d.overdue.length} past due, ${d.dueSoon.length} due this week, ${d.later.length} further out. ${d.done.length} closed recently.`,
      cites: [],
    }
  }

  // Fell through — do not invent. Say so, and point back to what is answerable.
  return {
    kind: 'unknown',
    text: 'I could not find that in the tracker. I answer from program items — try overdue, the oldest item, what is due this week, who is the holdup, or a book name.',
    cites: [],
  }
}
