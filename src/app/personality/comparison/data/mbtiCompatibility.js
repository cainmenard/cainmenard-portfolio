/**
 * MBTI compatibility scoring between any two 4-letter types.
 *
 * Algorithm (from spec):
 *   baseline 50
 *   +12 S/N match, −5 S/N mismatch (heaviest weight — shared perception is key)
 *   +8  T/F match
 *   +3  E/I match
 *   +3  J/P match
 *   +8  same quadra
 *   +10 dominant functions are a complementary pair (e.g. Te ↔ Ti)
 *   −8  shadow / reversed stack (identical stack in reverse order)
 *
 * Returns { score, tier, sharedFunctions }
 */

import { MBTI_TYPES, FUNCTION_PAIRS } from './mbtiTypes'

// ── Helpers ──

/**
 * True when two functions are an attitude-opposite pair in the same
 * domain (e.g. Te ↔ Ti, Se ↔ Si).
 */
export function areFunctionPair(fnA, fnB) {
  if (!fnA || !fnB) return false
  // Same base letter (T, F, S, N), different attitude (e/i)
  return (
    fnA[0] === fnB[0] &&
    fnA[1] !== fnB[1]
  )
}

/**
 * True when stack B is the exact reverse of stack A
 * (shadow / "unconscious" pairing — high tension).
 */
export function isReversedStack(stackA, stackB) {
  if (stackA.length !== stackB.length) return false
  return stackA.every((fn, i) => fn === stackB[stackB.length - 1 - i])
}

/**
 * Returns cognitive functions that appear in both stacks (regardless of
 * position).  Shared functions ease communication even when types differ.
 */
export function getSharedFunctions(stackA, stackB) {
  return stackA.filter(fn => stackB.includes(fn))
}

// ── Scoring ──

function tierFromScore(score) {
  if (score >= 80) return 'Excellent'
  if (score >= 65) return 'Good'
  if (score >= 50) return 'Moderate'
  return 'Challenging'
}

/**
 * Compute compatibility between two MBTI type codes.
 *
 * @param {string} typeA  Four-letter code, e.g. "ENTJ"
 * @param {string} typeB  Four-letter code, e.g. "INFP"
 * @returns {{ score: number, tier: string, sharedFunctions: string[] }}
 */
export function getMBTICompatibility(typeA, typeB) {
  const a = MBTI_TYPES[typeA]
  const b = MBTI_TYPES[typeB]

  if (!a || !b) {
    return { score: 50, tier: 'Moderate', sharedFunctions: [] }
  }

  let score = 50

  // ── Dichotomy matching ──
  // S/N — most important axis
  if (typeA[1] === typeB[1]) score += 12
  else score -= 5

  // T/F
  if (typeA[2] === typeB[2]) score += 8

  // E/I
  if (typeA[0] === typeB[0]) score += 3

  // J/P
  if (typeA[3] === typeB[3]) score += 3

  // ── Cognitive function analysis ──
  // Same quadra bonus
  if (a.quadra === b.quadra) score += 8

  // Complementary dominant functions (same domain, opposite attitude)
  if (areFunctionPair(a.stack[0], b.stack[0])) score += 10

  // Shadow / reversed stack penalty
  if (isReversedStack(a.stack, b.stack)) score -= 8

  // Clamp to 0-100
  score = Math.min(100, Math.max(0, score))

  return {
    score,
    tier: tierFromScore(score),
    sharedFunctions: getSharedFunctions(a.stack, b.stack),
  }
}
