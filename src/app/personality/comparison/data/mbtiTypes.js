/**
 * All 16 MBTI types with cognitive function stacks, quadra, temperament,
 * label, and a one-sentence description.
 *
 * Quadra groupings follow Model-A Socionics mapping:
 *   Alpha (Fe-Si / Ne-Ti): ENTP, INTP, ESFJ, ISFJ
 *   Beta  (Fe-Ni / Se-Ti): ENFJ, INFJ, ESTP, ISTP
 *   Gamma (Te-Ni / Se-Fi): ENTJ, INTJ, ESFP, ISFP
 *   Delta (Te-Si / Ne-Fi): ENFP, INFP, ESTJ, ISTJ
 */

export const MBTI_TYPES = {
  // ─── Gamma Quadra ───
  ENTJ: {
    code: 'ENTJ',
    stack: ['Te', 'Ni', 'Se', 'Fi'],
    quadra: 'Gamma',
    temperament: 'NT',
    label: 'Commander',
    description: 'Bold strategic leader who organizes people and resources toward ambitious, long-range goals.',
  },
  INTJ: {
    code: 'INTJ',
    stack: ['Ni', 'Te', 'Fi', 'Se'],
    quadra: 'Gamma',
    temperament: 'NT',
    label: 'Architect',
    description: 'Independent mastermind who builds complex internal models and executes them with precision.',
  },
  ESFP: {
    code: 'ESFP',
    stack: ['Se', 'Fi', 'Te', 'Ni'],
    quadra: 'Gamma',
    temperament: 'SP',
    label: 'Entertainer',
    description: 'Spontaneous, energetic performer who lives in the moment and motivates through sheer enthusiasm.',
  },
  ISFP: {
    code: 'ISFP',
    stack: ['Fi', 'Se', 'Ni', 'Te'],
    quadra: 'Gamma',
    temperament: 'SP',
    label: 'Adventurer',
    description: 'Quiet, values-driven artist who explores the world through aesthetics and personal meaning.',
  },

  // ─── Alpha Quadra ───
  ENTP: {
    code: 'ENTP',
    stack: ['Ne', 'Ti', 'Fe', 'Si'],
    quadra: 'Alpha',
    temperament: 'NT',
    label: 'Debater',
    description: 'Quick-witted innovator who thrives on intellectual sparring and exploring every possible angle.',
  },
  INTP: {
    code: 'INTP',
    stack: ['Ti', 'Ne', 'Si', 'Fe'],
    quadra: 'Alpha',
    temperament: 'NT',
    label: 'Logician',
    description: 'Analytical thinker who pursues internal logical consistency and novel theoretical frameworks.',
  },
  ESFJ: {
    code: 'ESFJ',
    stack: ['Fe', 'Si', 'Ne', 'Ti'],
    quadra: 'Alpha',
    temperament: 'SJ',
    label: 'Consul',
    description: 'Warm, organized caretaker who creates harmony and upholds traditions within their community.',
  },
  ISFJ: {
    code: 'ISFJ',
    stack: ['Si', 'Fe', 'Ti', 'Ne'],
    quadra: 'Alpha',
    temperament: 'SJ',
    label: 'Defender',
    description: 'Quiet protector with an exceptional memory for details and a deep sense of duty to others.',
  },

  // ─── Beta Quadra ───
  ENFJ: {
    code: 'ENFJ',
    stack: ['Fe', 'Ni', 'Se', 'Ti'],
    quadra: 'Beta',
    temperament: 'NF',
    label: 'Protagonist',
    description: 'Charismatic mentor who inspires collective action through empathy and a compelling vision.',
  },
  INFJ: {
    code: 'INFJ',
    stack: ['Ni', 'Fe', 'Ti', 'Se'],
    quadra: 'Beta',
    temperament: 'NF',
    label: 'Advocate',
    description: 'Insightful idealist guided by deep convictions and a vision of how the world should be.',
  },
  ESTP: {
    code: 'ESTP',
    stack: ['Se', 'Ti', 'Fe', 'Ni'],
    quadra: 'Beta',
    temperament: 'SP',
    label: 'Entrepreneur',
    description: 'Action-oriented pragmatist who reads situations instantly and thrives under pressure.',
  },
  ISTP: {
    code: 'ISTP',
    stack: ['Ti', 'Se', 'Ni', 'Fe'],
    quadra: 'Beta',
    temperament: 'SP',
    label: 'Virtuoso',
    description: 'Hands-on troubleshooter who deconstructs systems to understand how they work.',
  },

  // ─── Delta Quadra ───
  ENFP: {
    code: 'ENFP',
    stack: ['Ne', 'Fi', 'Te', 'Si'],
    quadra: 'Delta',
    temperament: 'NF',
    label: 'Campaigner',
    description: 'Enthusiastic explorer who connects ideas and people through infectious curiosity and warmth.',
  },
  INFP: {
    code: 'INFP',
    stack: ['Fi', 'Ne', 'Si', 'Te'],
    quadra: 'Delta',
    temperament: 'NF',
    label: 'Mediator',
    description: 'Thoughtful idealist driven by deep personal values and a desire for authenticity.',
  },
  ESTJ: {
    code: 'ESTJ',
    stack: ['Te', 'Si', 'Ne', 'Fi'],
    quadra: 'Delta',
    temperament: 'SJ',
    label: 'Executive',
    description: 'Organized, tradition-respecting leader who builds reliable systems and holds people accountable.',
  },
  ISTJ: {
    code: 'ISTJ',
    stack: ['Si', 'Te', 'Fi', 'Ne'],
    quadra: 'Delta',
    temperament: 'SJ',
    label: 'Logistician',
    description: 'Dependable, methodical worker who values facts, accuracy, and proven procedures.',
  },
}

/**
 * The 8 cognitive functions, grouped into pairs.
 * Each introverted function mirrors an extraverted one.
 */
export const FUNCTION_PAIRS = {
  Te: 'Fi',
  Fi: 'Te',
  Ti: 'Fe',
  Fe: 'Ti',
  Se: 'Ni',
  Ni: 'Se',
  Ne: 'Si',
  Si: 'Ne',
}

/**
 * Keirsey temperament descriptions — used for wheel chart quadrant labels.
 */
export const TEMPERAMENTS = {
  NT: { label: 'Rationals', focus: 'Strategic, competence-seeking, big-picture' },
  NF: { label: 'Idealists', focus: 'Empathic, identity-seeking, meaning-driven' },
  SP: { label: 'Artisans', focus: 'Tactical, sensation-seeking, action-oriented' },
  SJ: { label: 'Guardians', focus: 'Logistical, security-seeking, tradition-oriented' },
}
