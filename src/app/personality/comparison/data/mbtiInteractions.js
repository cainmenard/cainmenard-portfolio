/**
 * Dynamic MBTI interaction descriptions for any two type codes.
 *
 * Returns actionable, function-theory-specific guidance across five
 * collaboration dimensions:  communication, decisionMaking, leadership,
 * conflict, delegation.
 *
 * All copy is generated at call-time from type metadata — no 256-entry
 * lookup table required.
 */

import { MBTI_TYPES, FUNCTION_PAIRS } from './mbtiTypes'
import { areFunctionPair, getSharedFunctions } from './mbtiCompatibility'

// ── Cognitive-function labels (for readable output) ──

const FN_LABELS = {
  Te: 'Extraverted Thinking',
  Ti: 'Introverted Thinking',
  Fe: 'Extraverted Feeling',
  Fi: 'Introverted Feeling',
  Se: 'Extraverted Sensing',
  Si: 'Introverted Sensing',
  Ne: 'Extraverted Intuition',
  Ni: 'Introverted Intuition',
}

const FN_SHORT = {
  Te: 'logical efficiency',
  Ti: 'internal logical analysis',
  Fe: 'group harmony and emotional consensus',
  Fi: 'personal values and authenticity',
  Se: 'concrete, real-time action',
  Si: 'past experience and reliable procedures',
  Ne: 'brainstorming possibilities',
  Ni: 'long-range strategic vision',
}

const ROLE_LABELS = ['dominant', 'auxiliary', 'tertiary', 'inferior']

// ── Small helpers ──

function dominant(type) { return type.stack[0] }
function auxiliary(type) { return type.stack[1] }
function inferior(type) { return type.stack[3] }

function isJudging(fn) { return ['Te', 'Ti', 'Fe', 'Fi'].includes(fn) }
function isPerceiving(fn) { return ['Se', 'Si', 'Ne', 'Ni'].includes(fn) }
function isExtraverted(fn) { return fn[1] === 'e' }
function isThinking(fn) { return fn[0] === 'T' }
function isFeeling(fn) { return fn[0] === 'F' }
function isSensing(fn) { return fn[0] === 'S' }
function isIntuitive(fn) { return fn[0] === 'N' }

function stackPosition(type, fn) {
  const idx = type.stack.indexOf(fn)
  return idx >= 0 ? ROLE_LABELS[idx] : null
}

function letterMatch(codeA, codeB, index) {
  return codeA[index] === codeB[index]
}

// ── Dimension generators ──

function buildCommunication(a, b) {
  const parts = []
  const domA = dominant(a)
  const domB = dominant(b)

  // E/I dynamics
  if (letterMatch(a.code, b.code, 0)) {
    const isE = a.code[0] === 'E'
    parts.push(
      isE
        ? 'Both extraverts — conversations will be fast-paced and externally processed. Take turns holding the floor; neither should dominate airtime.'
        : 'Both introverts — allow processing time before expecting responses. Written communication may flow more naturally than rapid-fire verbal exchanges.'
    )
  } else {
    const eType = a.code[0] === 'E' ? a : b
    const iType = a.code[0] === 'E' ? b : a
    parts.push(
      `${eType.code} processes by talking out loud while ${iType.code} processes internally first. ${eType.code} should pause and explicitly invite ${iType.code}'s input rather than filling silence.`
    )
  }

  // Thinking vs Feeling communication filter
  if (isThinking(domA) && isFeeling(domB)) {
    parts.push(
      `${a.code}'s ${domA}-led approach prioritizes ${FN_SHORT[domA]} — frame messages in logical terms but open with how the decision affects people, since ${b.code} leads with ${FN_SHORT[domB]}.`
    )
  } else if (isFeeling(domA) && isThinking(domB)) {
    parts.push(
      `${a.code} leads with ${FN_SHORT[domA]} while ${b.code} leads with ${FN_SHORT[domB]}. Present the human impact first, then back it up with data and logical reasoning.`
    )
  } else if (isThinking(domA) && isThinking(domB)) {
    parts.push(
      `Both lead with thinking functions — direct, logical communication will land well. Watch for emotional undertones neither of you naturally voices.`
    )
  } else {
    parts.push(
      `Both lead with feeling functions — emotional attunement is natural. Be explicit about logical trade-offs that neither may want to raise.`
    )
  }

  // S/N perception gap
  if (!letterMatch(a.code, b.code, 1)) {
    const sType = a.code[1] === 'S' ? a : b
    const nType = a.code[1] === 'S' ? b : a
    parts.push(
      `${nType.code} speaks in abstractions and future possibilities; ${sType.code} wants specifics and proven examples. Bridge the gap: lead with the big picture, then ground it in concrete details.`
    )
  }

  return parts.join(' ')
}

function buildDecisionMaking(a, b) {
  const parts = []
  const domA = dominant(a)
  const domB = dominant(b)

  // T/F alignment
  if (letterMatch(a.code, b.code, 2)) {
    const isT = a.code[2] === 'T'
    parts.push(
      isT
        ? 'Both prioritize logical analysis in decisions — you\'ll align quickly on data-driven choices. Actively consider the human impact that neither naturally foregrounds.'
        : 'Both prioritize values and people impact — you\'ll agree on what matters but may avoid uncomfortable logical trade-offs. Assign one person to play devil\'s advocate on the numbers.'
    )
  } else {
    const tType = a.code[2] === 'T' ? a : b
    const fType = a.code[2] === 'T' ? b : a
    parts.push(
      `${tType.code} reaches decisions through ${FN_SHORT[dominant(tType)]}, while ${fType.code} filters through ${FN_SHORT[dominant(fType)]}. Neither is wrong — ${tType.code} should acknowledge the values dimension, and ${fType.code} should engage with the logical framework.`
    )
  }

  // J/P tempo
  if (letterMatch(a.code, b.code, 3)) {
    const isJ = a.code[3] === 'J'
    parts.push(
      isJ
        ? 'Both Judging types — decisions will close quickly. Guard against premature closure; schedule a brief "what are we missing?" check before finalizing.'
        : 'Both Perceiving types — decisions stay open for a long time. Set explicit deadlines and "good enough" checkpoints to avoid analysis paralysis.'
    )
  } else {
    const jType = a.code[3] === 'J' ? a : b
    const pType = a.code[3] === 'J' ? b : a
    parts.push(
      `${jType.code} wants to decide and move on; ${pType.code} wants to gather more input. Agree on a decision timeline upfront — ${jType.code} gets closure, ${pType.code} gets exploration time.`
    )
  }

  return parts.join(' ')
}

function buildLeadership(a, b) {
  const parts = []
  const domA = dominant(a)
  const domB = dominant(b)

  // Same quadra = natural working partnership
  if (a.quadra === b.quadra) {
    parts.push(
      `Same quadra (${a.quadra}) — you share valued cognitive functions, creating an intuitive working rhythm. Leadership can rotate based on the task rather than personality dominance.`
    )
  }

  // Te-dominant leadership patterns
  if (domA === 'Te') {
    parts.push(
      `${a.code} naturally takes charge through organizing systems, assigning tasks, and measuring results.`
    )
  } else if (domA === 'Fe') {
    parts.push(
      `${a.code} leads by building consensus and reading the room's emotional temperature.`
    )
  } else if (isPerceiving(domA)) {
    parts.push(
      `${a.code} leads through ${FN_SHORT[domA]} — providing information and options rather than directives.`
    )
  }

  // Complementary or clashing dominants
  if (areFunctionPair(domA, domB)) {
    parts.push(
      `Your dominant functions (${domA}/${domB}) are complementary opposites — ${FN_LABELS[domA]} and ${FN_LABELS[domB]}. This creates a powerful check-and-balance when you respect each other's domain.`
    )
  } else if (domA === domB) {
    parts.push(
      `You share the same dominant function (${domA}). Leadership clarity requires explicit role definition — otherwise you'll compete for the same cognitive space.`
    )
  }

  // E/I leadership dynamic
  if (!letterMatch(a.code, b.code, 0)) {
    const eType = a.code[0] === 'E' ? a : b
    const iType = a.code[0] === 'E' ? b : a
    parts.push(
      `${eType.code} will naturally hold more visible leadership presence; actively ensure ${iType.code}'s strategic contributions are heard and credited.`
    )
  }

  return parts.join(' ')
}

function buildConflict(a, b) {
  const parts = []
  const infA = inferior(a)
  const infB = inferior(b)
  const domA = dominant(a)
  const domB = dominant(b)

  // Inferior function triggers — the primary source of stress
  parts.push(
    `${a.code}'s blind spot is ${FN_LABELS[infA]} (${ROLE_LABELS[3]}) — conflict escalates when they're forced to operate in that space.`
  )

  // When one's dominant attacks the other's inferior
  if (domA === infB) {
    parts.push(
      `${a.code}'s natural ${domA} strength directly targets ${b.code}'s weakest function. Be conscious that your normal operating mode can feel like an attack — dial back intensity and explain your reasoning.`
    )
  }
  if (domB === infA) {
    parts.push(
      `${b.code}'s natural ${domB} strength hits ${a.code}'s inferior function. ${a.code} may feel criticized or inadequate without understanding why — name the dynamic to defuse it.`
    )
  }

  // T/F conflict style
  if (!letterMatch(a.code, b.code, 2)) {
    const tType = a.code[2] === 'T' ? a : b
    const fType = a.code[2] === 'T' ? b : a
    parts.push(
      `In conflict, ${tType.code} detaches to analyze while ${fType.code} engages emotionally. ${tType.code}: acknowledge feelings before problem-solving. ${fType.code}: know that analytical distance isn't dismissal.`
    )
  }

  // S/N misperception in conflict
  if (!letterMatch(a.code, b.code, 1)) {
    parts.push(
      'S/N mismatch amplifies conflict — one focuses on "what actually happened" (facts) while the other focuses on "what it means" (implications). Validate both lenses before seeking resolution.'
    )
  }

  return parts.join(' ')
}

function buildDelegation(a, b) {
  const parts = []
  const domA = dominant(a)
  const auxA = auxiliary(a)
  const domB = dominant(b)
  const auxB = auxiliary(b)

  // Dominant function = strongest contribution
  parts.push(
    `${a.code} excels at tasks requiring ${FN_SHORT[domA]} (${domA}) and ${FN_SHORT[auxA]} (${auxA}).`
  )
  parts.push(
    `${b.code} excels at tasks requiring ${FN_SHORT[domB]} (${domB}) and ${FN_SHORT[auxB]} (${auxB}).`
  )

  // Complementary delegation
  const shared = getSharedFunctions(a.stack, b.stack)
  if (shared.length === 0) {
    parts.push(
      'No shared cognitive functions — you cover completely different ground. Delegate by domain: each person owns the tasks that match their stack, with brief handoff syncs to stay aligned.'
    )
  } else if (shared.length >= 3) {
    parts.push(
      `You share ${shared.length} cognitive functions (${shared.join(', ')}), so many tasks feel natural to both of you. Delegate by preference and current bandwidth rather than capability.`
    )
  }

  // Sensing vs Intuition task split
  if (!letterMatch(a.code, b.code, 1)) {
    const sType = a.code[1] === 'S' ? a : b
    const nType = a.code[1] === 'S' ? b : a
    parts.push(
      `For execution-heavy detail work, lean on ${sType.code}'s sensing strength. For strategic planning, brainstorming, and future-state design, lean on ${nType.code}'s intuitive strength.`
    )
  }

  // J/P task management
  if (!letterMatch(a.code, b.code, 3)) {
    const jType = a.code[3] === 'J' ? a : b
    const pType = a.code[3] === 'J' ? b : a
    parts.push(
      `${jType.code} should own project timelines and milestone tracking. ${pType.code} should own exploratory research and contingency planning where open-ended thinking is an asset.`
    )
  }

  return parts.join(' ')
}

// ── Public API ──

/**
 * Generate a full interaction profile for two MBTI types.
 *
 * @param {string} typeA  Four-letter MBTI code
 * @param {string} typeB  Four-letter MBTI code
 * @returns {{
 *   communication: string,
 *   decisionMaking: string,
 *   leadership: string,
 *   conflict: string,
 *   delegation: string,
 * }}
 */
export function getMBTIInteraction(typeA, typeB) {
  const a = MBTI_TYPES[typeA]
  const b = MBTI_TYPES[typeB]

  if (!a || !b) {
    return {
      communication: 'Select valid MBTI types to see interaction insights.',
      decisionMaking: '',
      leadership: '',
      conflict: '',
      delegation: '',
    }
  }

  return {
    communication: buildCommunication(a, b),
    decisionMaking: buildDecisionMaking(a, b),
    leadership: buildLeadership(a, b),
    conflict: buildConflict(a, b),
    delegation: buildDelegation(a, b),
  }
}
