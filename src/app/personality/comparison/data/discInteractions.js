/**
 * DISC pairing interaction rules for all 10 unique primary-dimension combinations.
 *
 * Interaction advice is symmetric — it describes the dynamic between the two
 * styles rather than being directional from one person's perspective.
 *
 * @typedef {Object} DISCInteraction
 * @property {string} chemistry        - The natural working dynamic
 * @property {string} strengths        - What this pairing does well together
 * @property {string} friction         - The predictable tension points
 * @property {string} communicationTips - Actionable communication guidance
 * @property {string} delegationTips   - Task allocation advice
 */

/**
 * Canonical ordering: D < I < S < C (aligned with DISC model sequence).
 * Keys are always the lower-order letter first, e.g. "DI" not "ID".
 */
const DISC_ORDER = { D: 0, I: 1, S: 2, C: 3 }

/** @type {Record<string, DISCInteraction>} */
const PAIRINGS = {
  // ── D + D ──────────────────────────────────────────────────────────────────
  DD: {
    chemistry: 'High-voltage — both move at speed, both expect to lead. Respect is earned quickly here, but so is conflict.',
    strengths: 'Unmatched urgency and decisiveness. Both drive toward results without needing hand-holding. Can cover enormous ground when pointed at the same goal.',
    friction: 'Power struggles are the primary risk. Both instinctively claim authority; without explicit role division, every decision becomes a contest.',
    communicationTips: 'Divide authority clearly by domain before starting. Address disagreements directly and fast — brief, factual, no hedging. Each should lead with outcomes, not process.',
    delegationTips: 'Assign ownership by vertical: one person owns a complete domain (product, operations, go-to-market) rather than sharing decisions. Check in on results, not methods.',
  },

  // ── D + I ──────────────────────────────────────────────────────────────────
  DI: {
    chemistry: 'Natural pairing — both are fast-paced and action-oriented. D provides strategic direction while I generates enthusiasm and buy-in.',
    strengths: 'High-energy execution. D sets the destination and pace; I rallies people around it. Together they can launch initiatives quickly and sustain team momentum.',
    friction: 'D may dismiss I\'s relationship-building as inefficiency; I may feel D\'s directness is dismissive of people concerns. D\'s urgency can overshadow I\'s collaborative instincts.',
    communicationTips: 'D: acknowledge I\'s relationship investments — they\'re doing influence work that multiplies D\'s results. I: lead with outcomes before people stories when engaging D.',
    delegationTips: 'D owns strategic decisions and final calls. I owns stakeholder communication, team morale, and coalition-building. Neither should do the other\'s job.',
  },

  // ── D + S ──────────────────────────────────────────────────────────────────
  DS: {
    chemistry: 'Maximum pace tension — D moves at sprint speed, S moves at marathon pace. Structurally complementary but requires the most deliberate management of any pairing.',
    strengths: 'D drives change and S sustains it. D opens the door; S builds the systems that make the change stick. Long-term, this is a powerful combination.',
    friction: 'D interprets S\'s measured pace as resistance or incompetence. S reads D\'s urgency as reckless and disrespectful. D announces change; S needs time to process and adapt.',
    communicationTips: 'D: introduce change with rationale and lead time. Ask for S\'s input explicitly — they won\'t offer it unprompted. S: flag capacity limits or concerns proactively; silence reads as agreement.',
    delegationTips: 'D owns initiation and strategic pivots. S owns process, consistency, and reliable execution over time. D should not micro-check S\'s output; S should not own launch decisions.',
  },

  // ── D + C ──────────────────────────────────────────────────────────────────
  DC: {
    chemistry: 'Task-aligned but tempo-mismatched. Both focused on results; they differ sharply on what "done right" means and how fast to get there.',
    strengths: 'D provides drive and C provides rigor. The combination can produce work that is both ambitious and defensible — D pushes scope, C ensures quality.',
    friction: 'D wants speed; C wants accuracy. D sees C\'s thoroughness as overthinking; C sees D\'s pace as setting up for costly errors. C\'s questions can feel like challenges to D\'s authority.',
    communicationTips: 'D: give C clear goals with explicit deadlines, then let them determine method. Frame quality requirements upfront. C: surface concerns with data, not objections — lead with evidence.',
    delegationTips: 'D owns strategic direction and go/no-go decisions. C owns quality standards, methodology, and the detailed execution plan. D should not override C\'s process checks mid-stream.',
  },

  // ── I + I ──────────────────────────────────────────────────────────────────
  II: {
    chemistry: 'Instant rapport — high energy, lots of ideas, and plenty of optimism. Meetings feel fun, but accountability structures can collapse.',
    strengths: 'Creative ideation, culture building, and rallying stakeholders. Two I-styles can generate more enthusiasm and networking reach than almost any other pairing.',
    friction: 'Follow-through is the consistent gap. Both may generate more commitments than either can fulfill. Accountability feels like a buzzkill when you\'re both naturally optimistic.',
    communicationTips: 'Build in explicit accountability check-ins — not because either lacks commitment, but because neither naturally holds the other to timelines. Celebrate completion, not just ideas.',
    delegationTips: 'Assign one person as the "closer" for each initiative — responsible for confirming completion, not just initiating. Bring in external accountability (a D or C) for execution-heavy projects.',
  },

  // ── I + S ──────────────────────────────────────────────────────────────────
  IS: {
    chemistry: 'Warm and collaborative — both are people-focused, both prioritize relationships. One of the most harmonious pairings.',
    strengths: 'Team cohesion, stakeholder care, and building loyal relationships over time. I generates energy and new connections; S deepens and maintains them.',
    friction: 'I\'s constant enthusiasm and change appetite can overwhelm S\'s need for consistency. S may feel I never slows down to appreciate what\'s already working.',
    communicationTips: 'I: signal before changing direction — "here\'s what I\'m thinking, what do you think?" instead of announcing. S: voice concerns sooner rather than absorbing until burnout.',
    delegationTips: 'I owns outreach, pitching, and relationship initiation. S owns relationship maintenance, operational follow-through, and the systems that make promises deliverable.',
  },

  // ── I + C ──────────────────────────────────────────────────────────────────
  IC: {
    chemistry: 'Tension between inspiration and information. I wants to ideate freely; C wants to evaluate rigorously. High potential if both respect what the other brings.',
    strengths: 'I generates creative solutions; C stress-tests them and builds implementation plans. Ideas that survive C\'s analysis have real legs.',
    friction: 'I sees C\'s questions as skepticism or killjoy energy. C sees I\'s brainstorming as noise without supporting data. C\'s pace frustrates I; I\'s ambiguity frustrates C.',
    communicationTips: 'I: give C data alongside ideas — even rough numbers signal that you\'ve thought it through. C: engage I\'s ideas before redirecting to concerns. "Yes, and..." before "But..."',
    delegationTips: 'I owns idea generation, stakeholder engagement, and narrative. C owns feasibility analysis, process design, and quality assurance. Neither should gate the other\'s domain.',
  },

  // ── S + S ──────────────────────────────────────────────────────────────────
  SS: {
    chemistry: 'Highly stable and low-friction. Two S-styles build deep mutual trust through consistent reliability. The most harmonious pairing on paper.',
    strengths: 'Operational excellence, team loyalty, and long-term sustainability. Both deliver on commitments and both genuinely care about the people they serve.',
    friction: 'Innovation stalls and risk-aversion compounds. Neither will naturally push for change or advocate loudly when something is broken. Conflict avoidance can let problems fester.',
    communicationTips: 'Build deliberate "what should we change?" conversations into your rhythm — both need permission to raise concerns without it feeling disruptive. Celebrate initiative-taking explicitly.',
    delegationTips: 'Both are strong executors; assign ownership of change management, new initiatives, or external advocacy to someone else (I or D) rather than expecting either to fill that gap naturally.',
  },

  // ── S + C ──────────────────────────────────────────────────────────────────
  SC: {
    chemistry: 'Methodical and complementary — both prefer deliberate, quality-focused work. Operate at compatible tempos and share a distaste for unnecessary disruption.',
    strengths: 'Thorough, reliable, sustainable execution. S brings relational steadiness; C brings analytical precision. Together they produce work that holds up long-term.',
    friction: 'Decision-making can drag — both are risk-averse and neither naturally breaks deadlocks. Both may avoid conflict past the point where it needs addressing.',
    communicationTips: 'Set explicit decision deadlines together. One person should own the "deciding" role for each project to prevent indefinite deliberation. Both should practice naming disagreements rather than hoping they resolve.',
    delegationTips: 'S owns relationship continuity and team stability. C owns quality standards and systematic process. Both should escalate to a D or I when fast, bold decisions are needed.',
  },

  // ── C + C ──────────────────────────────────────────────────────────────────
  CC: {
    chemistry: 'Intellectual rigor at its peak — both bring deep analytical capability and high standards. Produces exceptional work when pointed in the right direction.',
    strengths: 'Unmatched quality output, thorough analysis, and defensible decisions. Both hold high standards and both will catch what others miss.',
    friction: 'Analysis paralysis is the defining risk. Both need more data before deciding; both resist committing with uncertainty remaining. Together they can loop indefinitely.',
    communicationTips: 'Agree in advance on decision criteria: "When we have X and Y, we decide." Use explicit "good enough" checkpoints. Assign one person to own each final call.',
    delegationTips: 'Divide by domain of expertise — each C should own their analytical domain completely rather than reviewing each other\'s work in recursive loops. Build in external review from a D or I to keep the timeline real.',
  },
}

/**
 * Get the interaction profile for two DISC primary dimensions.
 *
 * Order doesn't matter — getDISCInteraction('I', 'D') returns the same
 * result as getDISCInteraction('D', 'I').
 *
 * @param {'D'|'I'|'S'|'C'} styleA  Primary DISC dimension for person A
 * @param {'D'|'I'|'S'|'C'} styleB  Primary DISC dimension for person B
 * @returns {DISCInteraction|null}
 */
export function getDISCInteraction(styleA, styleB) {
  const orderA = DISC_ORDER[styleA]
  const orderB = DISC_ORDER[styleB]
  if (orderA === undefined || orderB === undefined) return null

  const key = orderA <= orderB
    ? `${styleA}${styleB}`
    : `${styleB}${styleA}`

  return PAIRINGS[key] ?? null
}
