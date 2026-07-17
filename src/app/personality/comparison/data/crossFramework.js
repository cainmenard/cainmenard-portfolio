/**
 * Cross-framework correlation map and collaboration dimension definitions.
 *
 * Two responsibilities:
 *  1. CORRELATION MAP — which MBTI types, Enneagram types, and I.D. patterns
 *     are statistically common for each DISC primary style. Used to surface
 *     "likely overlaps" when only partial profiles are entered.
 *
 *  2. COLLABORATION DIMENSIONS — the 8 dimensions used by the insights engine,
 *     each specifying which frameworks are primary/secondary, what to analyze,
 *     and how to generate the synthesis.
 */

// ═══════════════════════════════════════════════════════════════
// CROSS-FRAMEWORK CORRELATION MAP
// ═══════════════════════════════════════════════════════════════

/**
 * For each DISC primary dimension, the most commonly associated MBTI types,
 * Enneagram types, and I.D. drive tendencies.
 *
 * These are probabilistic associations, not deterministic mappings.
 * A person can be any DISC style with any MBTI or Enneagram type.
 *
 * @type {Record<string, {
 *   commonMBTI: string[],
 *   commonEnneagram: number[],
 *   commonID: Record<string, 'high'|'low'|'neutral'>,
 *   description: string,
 * }>}
 */
export const DISC_CORRELATIONS = {
  DISC_D: {
    commonMBTI: ['ENTJ', 'ESTJ', 'ENFJ', 'ESTP'],
    commonEnneagram: [1, 3, 7, 8],
    commonID: { verify: 'high', authenticate: 'high', complete: 'neutral', improvise: 'neutral' },
    description: 'High D profiles tend toward assertive MBTI types with extraverted judging functions (Te or Fe as dominant/auxiliary). Enneagram types are typically from the Assertive Hornevian group (3, 7, 8) plus the principled 1.',
  },
  DISC_I: {
    commonMBTI: ['ENFP', 'ESFP', 'ENTP', 'ENFJ'],
    commonEnneagram: [2, 3, 7],
    commonID: { improvise: 'high', authenticate: 'high', complete: 'low', verify: 'neutral' },
    description: 'High I profiles tend toward extraverted feeling/intuitive types. Enneagram types cluster in the Heart center (2, 3) and Head-optimistic (7). High Improvise and Authenticate drives align with I\'s spontaneous, relational style.',
  },
  DISC_S: {
    commonMBTI: ['ISFJ', 'ISTJ', 'INFP', 'ISFP'],
    commonEnneagram: [2, 6, 9],
    commonID: { complete: 'high', improvise: 'low', authenticate: 'neutral', verify: 'neutral' },
    description: 'High S profiles tend toward introverted, patient MBTI types with sensing or feeling auxiliaries. Enneagram types cluster around loyalty and security (6, 9) and helpfulness (2). High Complete reflects S\'s need for reliable routines.',
  },
  DISC_C: {
    commonMBTI: ['INTJ', 'ISTJ', 'INTP', 'ISTP'],
    commonEnneagram: [1, 5, 6],
    commonID: { verify: 'high', complete: 'high', improvise: 'low', authenticate: 'neutral' },
    description: 'High C profiles tend toward introverted, analytical MBTI types with thinking functions dominant. Enneagram types cluster in analytical and quality-focused archetypes (1, 5, 6). High Verify and Complete drives align with C\'s precision-first approach.',
  },
}

/**
 * MBTI temperament groups and their DISC alignment tendencies.
 * Secondary reference for cross-framework inference.
 *
 * @type {Record<string, { commonDISC: string[], note: string }>}
 */
export const MBTI_DISC_OVERLAP = {
  NT: {
    commonDISC: ['D', 'C', 'DC'],
    note: 'Rationals (NT) tend toward task-focused DISC styles — D when primarily leadership-oriented, C when primarily analytical, DC when both.',
  },
  NF: {
    commonDISC: ['I', 'IS', 'DI'],
    note: 'Idealists (NF) tend toward people-oriented DISC styles — I for the expressive types, IS for the supportive, DI for the charismatic leaders.',
  },
  SP: {
    commonDISC: ['D', 'I', 'DI'],
    note: 'Artisans (SP) tend toward fast-paced DISC styles — D for the pragmatic action-takers, I for the spontaneous performers.',
  },
  SJ: {
    commonDISC: ['S', 'C', 'SC'],
    note: 'Guardians (SJ) tend toward steady, structured DISC styles — S for the loyal team members, C for the quality-focused analysts.',
  },
}

// ═══════════════════════════════════════════════════════════════
// 8 COLLABORATION DIMENSIONS
// ═══════════════════════════════════════════════════════════════

/**
 * The 8 collaboration dimensions analyzed in the insights engine.
 *
 * Each dimension specifies:
 *  - id:                Machine-readable key
 *  - label:             Display name
 *  - primaryFramework:  Framework providing the dominant signal
 *  - secondaryFramework: Framework providing supporting signal
 *  - whatToAnalyze:     What the engine should examine
 *  - synthesisHint:     How to combine primary and secondary signals into output
 *
 * @type {Array<{
 *   id: string,
 *   label: string,
 *   icon: string,
 *   primaryFramework: string,
 *   secondaryFramework: string,
 *   whatToAnalyze: string,
 *   synthesisHint: string,
 * }>}
 */
export const COLLABORATION_DIMENSIONS = [
  {
    id: 'communication',
    label: 'Communication Style',
    icon: '💬',
    primaryFramework: 'DISC',
    secondaryFramework: 'MBTI (E/I, T/F)',
    whatToAnalyze: 'Pace, directness, detail level, and emotional tone of preferred communication',
    synthesisHint: 'Lead with DISC pace (fast D/I vs. moderate S/C), then layer MBTI E/I processing differences and T/F emotional filter. Surface: does information need to be bottom-line-first or contextual? Direct or diplomatic? Verbal or written?',
  },
  {
    id: 'decisionMaking',
    label: 'Decision-Making',
    icon: '🧠',
    primaryFramework: 'MBTI (T/F, J/P)',
    secondaryFramework: 'Enneagram',
    whatToAnalyze: 'Analytical vs. values-based orientation, decision speed, need for consensus',
    synthesisHint: 'MBTI T/F determines the primary filter (logic vs. values); J/P determines speed and closure need. Enneagram adds motivation layer — is the decision-making influenced by need to be right (1), avoid harm (6), or maintain control (8)?',
  },
  {
    id: 'conflict',
    label: 'Conflict Resolution',
    icon: '⚡',
    primaryFramework: 'Enneagram',
    secondaryFramework: 'DISC',
    whatToAnalyze: 'Core conflict triggers, defense mechanisms, and de-escalation paths',
    synthesisHint: 'Enneagram identifies the deep trigger (core fear being activated) and the stress arrow behavior. DISC adds the surface style: D engages directly, I smooths over it, S avoids it, C retreats to analysis. Both layers needed for full picture.',
  },
  {
    id: 'delegation',
    label: 'Delegation',
    icon: '📋',
    primaryFramework: 'DISC',
    secondaryFramework: 'I.D. (Complete drive)',
    whatToAnalyze: 'Information needs, supervision tolerance, check-in frequency preference, task ownership style',
    synthesisHint: 'DISC determines supervision expectation: D needs minimal check-ins; S needs regular check-ins for security; C needs clear quality criteria. I.D. Complete drive modifies this — high Complete needs complete briefings; low Complete needs just the goal.',
  },
  {
    id: 'feedback',
    label: 'Feedback Reception',
    icon: '🔄',
    primaryFramework: 'DISC + Enneagram',
    secondaryFramework: 'MBTI (T/F)',
    whatToAnalyze: 'Preferred delivery format, emotional sensitivity to criticism, specificity requirement',
    synthesisHint: 'DISC determines directness tolerance (D: very high, C: high if analytical, S: low, I: medium). Enneagram identifies the wound activated by certain feedback: 2 hears "you\'re not needed," 3 hears "you failed," 8 hears "you\'re weak." MBTI T/F determines framing.',
  },
  {
    id: 'leadership',
    label: 'Leadership Dynamic',
    icon: '⚡',
    primaryFramework: 'MBTI + ProScan',
    secondaryFramework: 'I.D. (Verify drive)',
    whatToAnalyze: 'Natural authority style, energy patterns, information-before-action tendency',
    synthesisHint: 'MBTI dominant function determines authority style (Te: organizing/directing, Fe: inspiring/consensus, Se: adapting/opportunistic). ProScan energy style adds sustainability: Thrust launches, Allegiance sustains. High Verify adds the analytical gate before action.',
  },
  {
    id: 'stress',
    label: 'Stress Responses',
    icon: '🔥',
    primaryFramework: 'Enneagram',
    secondaryFramework: 'ProScan (3 perspectives)',
    whatToAnalyze: 'Deterioration patterns, warning signs, and what support is needed under pressure',
    synthesisHint: 'Enneagram stress arrows reveal WHERE each person goes (which type they disintegrate toward). ProScan backup behavior fills in the surface-level stress expression. Together: the arrow explains the motivation, the backup explains the behavior.',
  },
  {
    id: 'motivation',
    label: 'Motivational Drivers',
    icon: '🚀',
    primaryFramework: 'I.D.',
    secondaryFramework: 'Enneagram (core desires)',
    whatToAnalyze: 'What energizes and drains, intrinsic vs. extrinsic motivation, need for challenge',
    synthesisHint: 'I.D. drives show behavioral motivators (Verify = needs to understand why; Authenticate = needs genuine involvement; Complete = needs closure; Improvise = needs opportunity). Enneagram core desire provides the deeper existential layer underneath the behavioral pattern.',
  },
]

/**
 * Get a single collaboration dimension by id.
 *
 * @param {string} id
 * @returns {Object|undefined}
 */
export function getCollaborationDimension(id) {
  return COLLABORATION_DIMENSIONS.find(d => d.id === id)
}

/**
 * Get DISC correlations for a given primary style.
 *
 * @param {'D'|'I'|'S'|'C'} discPrimary
 * @returns {Object|undefined}
 */
export function getDISCCorrelation(discPrimary) {
  return DISC_CORRELATIONS[`DISC_${discPrimary}`]
}

/**
 * Given a partial profile, infer likely complementary framework values.
 * Useful for surfacing "if you're DISC_D, you might also be..." suggestions.
 *
 * @param {{ discPrimary?: string, mbtiTemperament?: string }} partialProfile
 * @returns {{ likelyMBTI: string[], likelyEnneagram: number[], note: string }}
 */
export function inferLikelyTypes(partialProfile) {
  if (partialProfile.discPrimary) {
    const corr = getDISCCorrelation(partialProfile.discPrimary)
    if (corr) {
      return {
        likelyMBTI: corr.commonMBTI,
        likelyEnneagram: corr.commonEnneagram,
        note: corr.description,
      }
    }
  }

  if (partialProfile.mbtiTemperament) {
    const overlap = MBTI_DISC_OVERLAP[partialProfile.mbtiTemperament]
    if (overlap) {
      return {
        likelyMBTI: [],
        likelyEnneagram: [],
        note: overlap.note,
      }
    }
  }

  return { likelyMBTI: [], likelyEnneagram: [], note: '' }
}
