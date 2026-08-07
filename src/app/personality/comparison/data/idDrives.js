/**
 * Instinctive Drives (I.D.) system — four drives, each scored 1-9.
 *
 * Scale meaning:
 *   USE   (6-9): actively driven by this need
 *   AVOID (1-4): actively avoids engaging this drive
 *   NEUTRAL (5): balanced; uses situationally
 *
 * @typedef {Object} DriveDefinition
 * @property {string}   name               - Drive name
 * @property {string}   description        - Core behavioral description
 * @property {string}   useTraits          - Behaviors when score is 6-9
 * @property {string}   avoidTraits        - Behaviors when score is 1-4
 * @property {string}   neutralDescription - Behavior at score 5
 * @property {Object}   interactionRules   - What happens with various counterpart drives
 * @property {string}   interactionRules.bothUse        - Both people high (6-9)
 * @property {string}   interactionRules.bothAvoid      - Both people low (1-4)
 * @property {string}   interactionRules.contrast       - One high, one low
 * @property {string}   interactionRules.neutralPlusUse - One neutral, one high
 * @property {string}   interactionRules.neutralPlusAvoid - One neutral, one low
 */

/** @type {Record<string, DriveDefinition>} */
export const ID_DRIVES = {
  verify: {
    name: 'Verify',
    description: 'The drive to evaluate, compare, and understand the "why" before acting. People who USE Verify are natural problem-solvers who seek feedback and see improvements before they see successes.',
    useTraits: 'Thoroughly analytical — needs to understand the rationale before committing. Evaluates multiple options before deciding. Gives and actively seeks detailed feedback. Spots what\'s missing before what\'s present. Natural quality-checker and critical thinker.',
    avoidTraits: 'Takes things at face value; acts on instinct without extended evaluation. Trusts gut over data. Moves quickly without completing full analysis. Can miss details that Verify-USE people would catch immediately.',
    neutralDescription: 'Evaluates selectively — applies analytical rigor when the stakes justify it, but doesn\'t need to understand the full "why" for every decision.',
    interactionRules: {
      bothUse: 'Shared analytical depth — decisions are thoroughly examined and risks are surfaced before commitment. Watch for decision paralysis when both need to understand everything before acting.',
      bothAvoid: 'Both move on instinct and speed. Decisions can be made quickly and confidently but gaps in analysis may surface downstream. Actively schedule time to review assumptions.',
      contrast: 'The Verify-USE partner provides analytical rigor that the Verify-AVOID partner lacks; the AVOID partner provides speed and decisiveness that keeps the USE partner from over-analyzing. Natural complementarity, but tension around timelines.',
      neutralPlusUse: 'The neutral partner can adapt to the USE partner\'s need for analysis without being overwhelmed by it. Moderate flexibility — can slow down or speed up depending on context.',
      neutralPlusAvoid: 'Moderate flexibility. The neutral partner can provide light evaluation that the AVOID partner will accept, without imposing the full analytical process.',
    },
  },

  authenticate: {
    name: 'Authenticate',
    description: 'The drive for genuine congruency — being personally, hands-on involved and communicating openly and literally. People who USE Authenticate need tangible proof and build trust through direct personal engagement.',
    useTraits: 'Hands-on and personally involved — must experience it to trust it. Communicates directly and literally; means what they say and expects others to do the same. Builds trust through physical presence and genuine connection. Loyal to the spoken word. Insists on personal accountability.',
    avoidTraits: 'Delegates easily and comfortably. Abstract and indirect communication is natural. Can maintain trust through systems and structures rather than personal involvement. Comfortable with distance and representation.',
    neutralDescription: 'Situationally involved — can operate effectively through both direct engagement and delegation depending on what the context calls for.',
    interactionRules: {
      bothUse: 'Deep mutual trust built through direct, hands-on engagement. Communication is literal and clear. Watch for over-involvement in each other\'s domains — both need to be personally invested in everything.',
      bothAvoid: 'Efficient and delegation-friendly. Both comfortable with abstraction and systems. Relationships may lack personal depth — deliberate investment in genuine connection is needed.',
      contrast: 'The Authenticate-USE partner needs personal involvement and direct communication; the AVOID partner needs autonomy and indirect engagement. Key friction: USE reads AVOID\'s distance as dismissal; AVOID reads USE\'s involvement as micromanagement.',
      neutralPlusUse: 'The neutral partner can provide enough personal engagement to satisfy the USE partner\'s need for connection without feeling constrained by it.',
      neutralPlusAvoid: 'The neutral partner won\'t push the AVOID partner toward unwanted personal involvement. Comfortable working relationship but may stay surface-level.',
    },
  },

  complete: {
    name: 'Complete',
    description: 'The drive for structure, wholeness, and follow-through on every detail. People who USE Complete are systematic and organized, anticipate contingencies, and need things finished before moving on.',
    useTraits: 'Needs clear processes, systems, and completion. Anticipates what could go wrong and plans for it. High attention to detail and follow-through. Closure-seeking — unfinished tasks create real discomfort. Consistent, reliable, and routine-oriented.',
    avoidTraits: 'Views tasks as goal-achieved rather than fully-complete. Spontaneous and flexible about process. Moves on when the essential is done, even if the periphery is unfinished. Goal-focused over process-focused.',
    neutralDescription: 'Balanced structure — uses systems when they\'re clearly useful but doesn\'t require them. Can close out tasks without full peripheral completion.',
    interactionRules: {
      bothUse: 'Shared need for structure and completion creates reliable, thorough execution. Risk: over-engineering processes and creating more system than the work requires. May resist necessary pivots.',
      bothAvoid: 'Both are flexible, goal-focused, and process-light. Execution is fast and adaptive. Risk: things fall through the cracks when neither is tracking details. Important details may be "good enough"-ed into problems.',
      contrast: 'The Complete-USE partner ensures thoroughness and nothing falls through the cracks; the AVOID partner ensures the team doesn\'t gold-plate or process-obsess. Complementary in theory — in practice, USE can feel AVOID is sloppy and AVOID can feel USE is obsessive.',
      neutralPlusUse: 'The neutral partner can honor the USE partner\'s need for structure without being driven by the same need. Can bridge between the USE partner and AVOID team members.',
      neutralPlusAvoid: 'The neutral partner won\'t create the structural burden the AVOID partner resists. Execution remains relatively fluid.',
    },
  },

  improvise: {
    name: 'Improvise',
    description: 'The drive to take risks, seize opportunities, and commit quickly. People who USE Improvise are comfortable with uncertainty and are naturally self-promoting and opportunity-aware.',
    useTraits: 'Risk-comfortable and opportunity-seeking. Makes quick commitments and adjusts as they go. Self-promoting and confident in pitching ideas. Comfortable with uncertainty. Thrives in ambiguous, fast-moving environments.',
    avoidTraits: 'Needs certainty and preparation before committing. Prefers proven methods over uncharted approaches. Consistent and composed rather than improvisational. Takes time to think through implications before acting.',
    neutralDescription: 'Moderate risk comfort — can operate opportunistically when needed but prefers some degree of preparation and certainty.',
    interactionRules: {
      bothUse: 'Fast-moving, opportunity-driven team. Decisions are made quickly and the team adapts well to changing conditions. Risk: overcommitment to unvetted opportunities, insufficient preparation before launching.',
      bothAvoid: 'Thorough, careful, and consistent. Both need certainty before committing; both prefer proven methods. Risk: slow to seize real opportunities, may appear hesitant in competitive situations.',
      contrast: 'The Improvise-USE partner brings speed and boldness; the AVOID partner brings preparation and certainty. Excellent complementarity when the relationship is understood: USE scouts opportunities, AVOID validates them before commitment.',
      neutralPlusUse: 'The neutral partner can match the USE partner\'s opportunistic pace when needed without being driven by the same urgency. Provides grounding without completely slowing down.',
      neutralPlusAvoid: 'The neutral partner won\'t push the AVOID partner toward uncomfortable risk-taking. Moderate speed with reasonable preparation.',
    },
  },
}

/**
 * Classify a raw I.D. score into USE / AVOID / NEUTRAL.
 *
 * @param {number} score  1-9
 * @returns {'USE'|'AVOID'|'NEUTRAL'}
 */
export function getDriveDirection(score) {
  if (score >= 6) return 'USE'
  if (score <= 4) return 'AVOID'
  return 'NEUTRAL'
}

/**
 * Compare two I.D. profiles and return per-drive insights.
 *
 * @param {Object} profileA  { verify, authenticate, complete, improvise } — scores 1-9
 * @param {Object} profileB  { verify, authenticate, complete, improvise } — scores 1-9
 * @returns {Record<string, { alignment: 'matched'|'complementary'|'partial', note: string, dirA: string, dirB: string }>}
 */
export function compareIDProfiles(profileA, profileB) {
  const drives = ['verify', 'authenticate', 'complete', 'improvise']
  const results = {}

  drives.forEach(drive => {
    const a = profileA[drive]
    const b = profileB[drive]
    const dirA = getDriveDirection(a)
    const dirB = getDriveDirection(b)
    const def = ID_DRIVES[drive]

    let alignment, note

    if (dirA === dirB) {
      alignment = 'matched'
      if (dirA === 'USE') note = def.interactionRules.bothUse
      else if (dirA === 'AVOID') note = def.interactionRules.bothAvoid
      else note = `Both are neutral on ${def.name} — situational and flexible.`
    } else if (
      (dirA === 'USE' && dirB === 'AVOID') ||
      (dirA === 'AVOID' && dirB === 'USE')
    ) {
      alignment = 'complementary'
      note = def.interactionRules.contrast
    } else if (dirA === 'NEUTRAL' && dirB === 'USE') {
      alignment = 'partial'
      note = def.interactionRules.neutralPlusUse
    } else if (dirA === 'USE' && dirB === 'NEUTRAL') {
      alignment = 'partial'
      note = def.interactionRules.neutralPlusUse
    } else if (dirA === 'NEUTRAL' && dirB === 'AVOID') {
      alignment = 'partial'
      note = def.interactionRules.neutralPlusAvoid
    } else {
      alignment = 'partial'
      note = def.interactionRules.neutralPlusAvoid
    }

    results[drive] = { alignment, note, dirA, dirB, scoreA: a, scoreB: b }
  })

  return results
}
