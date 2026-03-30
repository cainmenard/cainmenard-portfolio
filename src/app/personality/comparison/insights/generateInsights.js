/**
 * Collaboration Insights Engine
 *
 * Generates 1-8 insight objects from Cain's hardcoded profile and the visitor's
 * entered data. Only produces insights for dimensions where the visitor has
 * supplied the required framework data.
 *
 * @param {Object} visitorProfile
 * @param {string|null}  visitorProfile.mbti        - e.g. 'INTJ'
 * @param {string|null}  visitorProfile.disc        - e.g. 'Di', 'IS'
 * @param {{ type: number|null, wing: number|null }} visitorProfile.enneagram
 * @param {{ verify:number, authenticate:number, complete:number, improvise:number }} visitorProfile.idDrives
 * @param {{ dominance:string|null, extroversion:string|null, pace:string|null,
 *           conformity:string|null, logic:string|null, energy:string[] }} visitorProfile.proScan
 *
 * @returns {Array<{
 *   id: string,
 *   dimension: string,
 *   icon: string,
 *   summary: string,
 *   forVisitor: string,
 *   forCain: string,
 *   alignment: 'high'|'moderate'|'low',
 *   watchOut: string
 * }>}
 */

import cainProfile from '../data/cainProfile'
import { getDISCInteraction } from '../data/discInteractions'
import { getEnneagramPairing } from '../data/enneagramPairings'
import { getMBTICompatibility } from '../data/mbtiCompatibility'
import { getMBTIInteraction } from '../data/mbtiInteractions'
import { compareIDProfiles, getDriveDirection, ID_DRIVES } from '../data/idDrives'
import { getProScanTraitInteraction, getEnergyStyleInteraction } from '../data/proScanTraits'
import { ENNEAGRAM_TYPES } from '../data/enneagramTypes'
import { COLLABORATION_DIMENSIONS } from '../data/crossFramework'

// ── Helpers ────────────────────────────────────────────────────────────────

/** Extract primary DISC letter from a blend code. 'Di' → 'D', 'IS' → 'I' */
function discPrimary(code) {
  if (!code) return null
  return code.charAt(0).toUpperCase()
}

/** True if any I.D. drive has been moved off neutral (5) */
function idEngaged(id) {
  if (!id) return false
  return Object.values(id).some(v => v !== 5)
}

/** True if all four ProScan trait dimensions are set */
function proScanComplete(ps) {
  return !!(ps?.dominance && ps?.extroversion && ps?.pace && ps?.conformity)
}

/**
 * Extract the tip for a given DISC dimension letter from a combined tips string.
 * Format: "D: tip one. I: tip two."
 * Falls back to full text when the letter prefix is not found.
 */
function extractTip(text, letter) {
  if (!text) return ''
  // Split on "LETTER: " boundaries — captures label and its following content
  const parts = text.split(/\b([A-Z]+):\s*/)
  const idx = parts.indexOf(letter)
  if (idx !== -1 && parts[idx + 1]) {
    return parts[idx + 1].trim().replace(/\.$/, '') + '.'
  }
  return text
}

/** Map MBTI compatibility tier to alignment level */
function alignmentFromTier(tier) {
  if (tier === 'Excellent') return 'high'
  if (tier === 'Good') return 'moderate'
  return 'low'
}

/** Return the first complete sentence of a string */
function firstSentence(text) {
  if (!text) return ''
  const m = text.match(/^[^.!?]+[.!?]/)
  return m ? m[0].trim() : text
}

/** Get a dimension definition from COLLABORATION_DIMENSIONS */
function dim(id) {
  return COLLABORATION_DIMENSIONS.find(d => d.id === id)
}

// ── Cain's fixed data (referenced often) ──────────────────────────────────
const CAIN_DISC   = cainProfile.disc.primary           // 'D'
const CAIN_MBTI   = cainProfile.mbti.type              // 'ENTJ'
const CAIN_ENN    = cainProfile.enneagram.type         // 8
const CAIN_ID     = cainProfile.instinctiveDrives      // { verify:7, authenticate:7, complete:3, improvise:3 }
const CAIN_PROSCAN = cainProfile.proScan               // { dominance:'High', energyStyle:['Thrust'], ... }

// ── Dimension builders ────────────────────────────────────────────────────

function buildCommunication(v) {
  const vPrimary = discPrimary(v.disc)
  if (!vPrimary) return null

  const discData = getDISCInteraction(CAIN_DISC, vPrimary)
  if (!discData) return null

  // Cain is always D — map visitor primary to alignment
  const ALIGN = { D: 'moderate', I: 'high', S: 'low', C: 'moderate' }

  // Secondary MBTI communication layer (first sentence only)
  let mbtiAddendum = ''
  if (v.mbti) {
    const mbtiData = getMBTIInteraction(CAIN_MBTI, v.mbti)
    if (mbtiData.communication) {
      mbtiAddendum = ' ' + firstSentence(mbtiData.communication)
    }
  }

  const forVisitor = extractTip(discData.communicationTips, vPrimary) || discData.communicationTips
  const forCain    = extractTip(discData.communicationTips, CAIN_DISC) || discData.communicationTips
  const d = dim('communication')

  return {
    id: 'communication',
    dimension: d.label,
    icon: d.icon,
    summary: firstSentence(discData.chemistry) + mbtiAddendum,
    forVisitor,
    forCain,
    alignment: ALIGN[vPrimary] ?? 'moderate',
    watchOut: firstSentence(discData.friction),
  }
}

function buildDecisionMaking(v) {
  if (!v.mbti) return null

  const mbtiData = getMBTIInteraction(CAIN_MBTI, v.mbti)
  const compat   = getMBTICompatibility(CAIN_MBTI, v.mbti)

  // Add Enneagram nuance to the forCain tip when available
  let forCain = mbtiData.decisionMaking
  if (v.enneagram?.type) {
    const ennPairing = getEnneagramPairing(CAIN_ENN, v.enneagram.type)
    if (ennPairing?.communicationRules) {
      forCain = firstSentence(ennPairing.communicationRules)
    }
  }

  const d = dim('decisionMaking')
  return {
    id: 'decisionMaking',
    dimension: d.label,
    icon: d.icon,
    summary: firstSentence(mbtiData.decisionMaking),
    forVisitor: mbtiData.decisionMaking,
    forCain,
    alignment: alignmentFromTier(compat.tier),
    watchOut: firstSentence(mbtiData.conflict),
  }
}

function buildConflict(v) {
  if (!v.enneagram?.type) return null

  const ennPairing = getEnneagramPairing(CAIN_ENN, v.enneagram.type)
  if (!ennPairing) return null

  const visitorType = ENNEAGRAM_TYPES[v.enneagram.type]

  // Alignment from Hornevian group vs. Cain's Assertive style
  const HORNEVIAN_ALIGN = { Assertive: 'low', Compliant: 'moderate', Withdrawn: 'high' }

  let watchOut = firstSentence(ennPairing.frictionPoints)
  if (v.disc) {
    const discData = getDISCInteraction(CAIN_DISC, discPrimary(v.disc))
    if (discData?.friction) {
      watchOut += ' ' + firstSentence(discData.friction)
    }
  }

  const d = dim('conflict')
  return {
    id: 'conflict',
    dimension: d.label,
    icon: d.icon,
    summary: firstSentence(ennPairing.synergies),
    forVisitor: firstSentence(ennPairing.communicationRules),
    forCain: ennPairing.communicationRules,
    alignment: HORNEVIAN_ALIGN[visitorType?.hornevianGroup] ?? 'moderate',
    watchOut,
  }
}

function buildDelegation(v) {
  const vPrimary = discPrimary(v.disc)
  if (!vPrimary) return null

  const discData = getDISCInteraction(CAIN_DISC, vPrimary)
  if (!discData) return null

  // D delegating — most styles work well; other Ds need explicit territory division
  const ALIGN = { D: 'moderate', I: 'high', S: 'high', C: 'moderate' }

  let summary = firstSentence(discData.delegationTips)

  // I.D. Complete drive context: Cain is AVOID (score 3); visitor may differ
  if (idEngaged(v.idDrives)) {
    const cainDir   = getDriveDirection(CAIN_ID.complete)    // 'AVOID'
    const visitorDir = getDriveDirection(v.idDrives.complete)
    const completeDef = ID_DRIVES.complete
    let ruleKey = null

    if (cainDir === visitorDir) {
      if (cainDir === 'USE')   ruleKey = 'bothUse'
      if (cainDir === 'AVOID') ruleKey = 'bothAvoid'
    } else if (
      (cainDir === 'USE' && visitorDir === 'AVOID') ||
      (cainDir === 'AVOID' && visitorDir === 'USE')
    ) {
      ruleKey = 'contrast'
    } else if (cainDir === 'NEUTRAL') {
      ruleKey = visitorDir === 'USE' ? 'neutralPlusUse' : 'neutralPlusAvoid'
    } else {
      ruleKey = cainDir === 'USE' ? 'neutralPlusUse' : 'neutralPlusAvoid'
    }

    if (ruleKey && completeDef.interactionRules[ruleKey]) {
      summary += ' ' + firstSentence(completeDef.interactionRules[ruleKey])
    }
  }

  const d = dim('delegation')
  return {
    id: 'delegation',
    dimension: d.label,
    icon: d.icon,
    summary,
    forVisitor: firstSentence(discData.strengths),
    forCain: discData.delegationTips,
    alignment: ALIGN[vPrimary] ?? 'moderate',
    watchOut: firstSentence(discData.friction),
  }
}

function buildFeedback(v) {
  const hasDisc = !!v.disc
  const hasEnn  = !!v.enneagram?.type
  if (!hasDisc && !hasEnn) return null

  let summary    = 'Cain (Enneagram 8) delivers and expects direct, unvarnished feedback — cushioning reads as condescension.'
  let forVisitor = 'Lead with the specific behavior to change, not a broad judgment. Outcomes-first framing lands better with Cain than a relational preamble.'
  let forCain    = 'Frame feedback around shared goals, not personal shortcomings. Build psychological safety before the message will land.'
  let watchOut   = 'Mismatched directness levels cause the message to be lost — too blunt or too soft both fail.'
  let alignment  = 'moderate'

  if (hasDisc) {
    const vPrimary = discPrimary(v.disc)
    const discData = getDISCInteraction(CAIN_DISC, vPrimary)
    if (discData) {
      forVisitor = extractTip(discData.communicationTips, vPrimary) || discData.communicationTips
      forCain    = extractTip(discData.communicationTips, CAIN_DISC) || discData.communicationTips
      watchOut   = firstSentence(discData.friction)
      const DISC_ALIGN = { D: 'high', I: 'moderate', S: 'low', C: 'high' }
      alignment = DISC_ALIGN[vPrimary] ?? 'moderate'
    }
  }

  if (hasEnn) {
    const visitorType = ENNEAGRAM_TYPES[v.enneagram.type]
    if (!hasDisc) {
      // Derive alignment from Enneagram harmonicGroup alone
      const ENN_ALIGN = { Competency: 'high', 'Positive Outlook': 'moderate', Reactive: 'low' }
      alignment = ENN_ALIGN[visitorType?.harmonicGroup] ?? 'moderate'
    }
    if (visitorType?.coreFear) {
      watchOut = (watchOut ? watchOut + ' ' : '') +
        `Feedback touching ${visitorType.name}'s core fear ("${firstSentence(visitorType.coreFear)}") causes shutdown, not growth.`
    }
  }

  const d = dim('feedback')
  return {
    id: 'feedback',
    dimension: d.label,
    icon: d.icon,
    summary,
    forVisitor,
    forCain,
    alignment,
    watchOut,
  }
}

function buildLeadership(v) {
  if (!v.mbti) return null

  const mbtiData = getMBTIInteraction(CAIN_MBTI, v.mbti)
  const compat   = getMBTICompatibility(CAIN_MBTI, v.mbti)

  let summary    = firstSentence(mbtiData.leadership)
  let forVisitor = mbtiData.leadership
  let watchOut   = firstSentence(mbtiData.conflict)

  // Shared functions add useful framing
  if (compat.sharedFunctions.length > 0) {
    summary = `Shared cognitive functions (${compat.sharedFunctions.join(', ')}) create natural alignment in how you both process and lead. ` + firstSentence(mbtiData.leadership)
  }

  // ProScan enrichment when complete
  if (proScanComplete(v.proScan)) {
    const domNote = getProScanTraitInteraction('dominance', CAIN_PROSCAN.dominance, v.proScan.dominance)
    if (domNote) watchOut = firstSentence(domNote)

    const energyNote = getEnergyStyleInteraction(CAIN_PROSCAN.energyStyle, v.proScan.energy)
    if (energyNote) forVisitor = firstSentence(energyNote)
  }

  const d = dim('leadership')
  return {
    id: 'leadership',
    dimension: d.label,
    icon: d.icon,
    summary,
    forVisitor,
    forCain: firstSentence(mbtiData.leadership),
    alignment: alignmentFromTier(compat.tier),
    watchOut,
  }
}

function buildStress(v) {
  if (!v.enneagram?.type) return null

  const ennPairing  = getEnneagramPairing(CAIN_ENN, v.enneagram.type)
  if (!ennPairing) return null

  const visitorType = ENNEAGRAM_TYPES[v.enneagram.type]
  const cainType    = ENNEAGRAM_TYPES[CAIN_ENN]

  // Complementary triads handle stress better together; same Reactive group amplifies it
  let alignment = 'moderate'
  if (visitorType?.triad === 'Head') {
    alignment = 'high'  // Gut + Head = complementary stress expressions
  } else if (visitorType?.harmonicGroup === 'Reactive' && cainType?.harmonicGroup === 'Reactive') {
    alignment = 'low'   // Both Reactive = escalating conflict under pressure
  }

  let watchOut = firstSentence(ennPairing.underStressTogether)
  if (proScanComplete(v.proScan)) {
    const paceNote = getProScanTraitInteraction('pace', CAIN_PROSCAN.pace, v.proScan.pace)
    if (paceNote) watchOut += ' ' + firstSentence(paceNote)
  }

  const stressTarget = visitorType?.disintegrationPoint
  const forVisitor = stressTarget
    ? `Under pressure you may shift toward Type ${stressTarget} behaviors. ` + firstSentence(ennPairing.underStressTogether)
    : firstSentence(ennPairing.underStressTogether)

  const d = dim('stress')
  return {
    id: 'stress',
    dimension: d.label,
    icon: d.icon,
    summary: firstSentence(ennPairing.underStressTogether),
    forVisitor,
    forCain: firstSentence(ennPairing.growthTogether),
    alignment,
    watchOut,
  }
}

function buildMotivation(v) {
  if (!idEngaged(v.idDrives)) return null

  const comparison = compareIDProfiles(CAIN_ID, v.idDrives)
  const drives     = ['verify', 'authenticate', 'complete', 'improvise']

  const matched       = drives.filter(d => comparison[d].alignment === 'matched')
  const complementary = drives.filter(d => comparison[d].alignment === 'complementary')

  // Alignment from match count
  let alignment
  if (matched.length >= 3)       alignment = 'high'
  else if (matched.length >= 2)  alignment = 'moderate'
  else                           alignment = 'low'

  // Build summary: lead with contrasting drives (most interesting), then Enneagram layer
  const contrastNotes = complementary
    .slice(0, 2)
    .map(d => `${ID_DRIVES[d].name}: ${firstSentence(comparison[d].note)}`)

  let summary = contrastNotes.length > 0
    ? contrastNotes.join(' ')
    : `Both profiles align on ${matched.map(d => ID_DRIVES[d].name).join(' and ')}.`

  if (v.enneagram?.type) {
    const visitorType = ENNEAGRAM_TYPES[v.enneagram.type]
    if (visitorType?.coreDesire) {
      summary += ` Underlying desire: ${firstSentence(visitorType.coreDesire)}`
    }
  }

  // forVisitor: most contrasting drive, or first matched
  const forVisitor = complementary.length > 0
    ? firstSentence(comparison[complementary[0]].note)
    : matched.length > 0
    ? firstSentence(comparison[matched[0]].note)
    : firstSentence(comparison[drives[0]].note)

  // forCain: second contrasting drive, or first matched
  const forCain = complementary.length > 1
    ? firstSentence(comparison[complementary[1]].note)
    : matched.length > 0
    ? firstSentence(comparison[matched[0]].note)
    : firstSentence(comparison[drives[0]].note)

  const watchOut = complementary.length > 0
    ? firstSentence(comparison[complementary[0]].note)
    : 'Motivation styles are well matched — alignment is natural.'

  const d = dim('motivation')
  return {
    id: 'motivation',
    dimension: d.label,
    icon: d.icon,
    summary,
    forVisitor,
    forCain,
    alignment,
    watchOut,
  }
}

// ── Main export ────────────────────────────────────────────────────────────

/**
 * Generate collaboration insights for a visitor profile.
 * Returns only the dimensions for which the visitor has entered relevant data.
 */
export default function generateInsights(visitorProfile) {
  if (!visitorProfile) return []

  return [
    buildCommunication(visitorProfile),
    buildDecisionMaking(visitorProfile),
    buildConflict(visitorProfile),
    buildDelegation(visitorProfile),
    buildFeedback(visitorProfile),
    buildLeadership(visitorProfile),
    buildStress(visitorProfile),
    buildMotivation(visitorProfile),
  ].filter(Boolean)
}
