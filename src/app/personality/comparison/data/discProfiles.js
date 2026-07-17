/**
 * All 16 DISC blend positions for the circle visualization and selector UI.
 *
 * Positions are ordered clockwise starting at 12 o'clock (pure D).
 * Each entry carries visual placement data plus behavioral context.
 *
 * @typedef {Object} DISCProfile
 * @property {string}      code                  - Short blend code (e.g. "DI")
 * @property {number}      angle                 - Degrees clockwise from 12 o'clock
 * @property {string}      primary               - Primary DISC dimension (D | I | S | C)
 * @property {string|null} secondary             - Secondary dimension, or null for pure styles
 * @property {string}      label                 - Human-readable style name
 * @property {string}      description           - 1-2 sentence behavioral summary
 * @property {string}      communicationPrefs    - How this style prefers to communicate
 * @property {string}      needsFromOthers       - What this style needs from collaborators
 */

/** @type {DISCProfile[]} */
export const DISC_PROFILES = [
  {
    code: 'D',
    angle: 0,
    primary: 'D',
    secondary: null,
    label: 'Dominant',
    description: 'Driven by results, challenges, and direct authority. Makes decisions fast, expects others to keep pace, and will steamroll obstacles.',
    communicationPrefs: 'Be direct, concise, and lead with the bottom line. Skip pleasantries and unnecessary context.',
    needsFromOthers: 'Respect for their authority, clear deliverables, and partners who push back with facts rather than feelings.',
  },
  {
    code: 'Di',
    angle: 22.5,
    primary: 'D',
    secondary: 'I',
    label: 'Driver',
    description: 'Results-focused with enough charisma to bring people along. Pushes hard toward goals but makes it feel exciting rather than punishing.',
    communicationPrefs: 'Bold, energetic, outcomes-focused. Appreciate acknowledgment of their accomplishments.',
    needsFromOthers: 'Buy-in from the team and authority to execute without excessive check-ins.',
  },
  {
    code: 'DI',
    angle: 45,
    primary: 'D',
    secondary: 'I',
    label: 'Inspirational',
    description: 'Combines competitive drive with people magnetism. Thrives in roles that demand both leadership presence and rallying the crowd.',
    communicationPrefs: 'Energetic and enthusiastic — they respond well to praise and big-vision framing.',
    needsFromOthers: 'Public recognition, freedom to operate, and collaborators who handle details they skip.',
  },
  {
    code: 'Id',
    angle: 67.5,
    primary: 'I',
    secondary: 'D',
    label: 'Influencer',
    description: 'People-first with a competitive streak. Persuades more than directs, but will push when necessary to achieve goals they believe in.',
    communicationPrefs: 'Warm, story-driven, and collaborative. Want to feel heard before they act.',
    needsFromOthers: 'Enthusiasm for their ideas, visible support, and someone to follow through on execution.',
  },
  {
    code: 'I',
    angle: 90,
    primary: 'I',
    secondary: null,
    label: 'Influential',
    description: 'Optimistic, talkative, and energized by social interaction. Sells ideas, builds relationships easily, and keeps morale high.',
    communicationPrefs: 'Casual, upbeat, story-oriented. Prefer conversation over written briefs.',
    needsFromOthers: 'Opportunities to collaborate, positive environments, and partners who manage follow-through.',
  },
  {
    code: 'Is',
    angle: 112.5,
    primary: 'I',
    secondary: 'S',
    label: 'Supportive',
    description: 'Warm and encouraging with a stabilizing effect on teams. Builds broad, deep networks through genuine care for others.',
    communicationPrefs: 'Conversational and personal. Appreciate check-ins and relationship-building before business.',
    needsFromOthers: 'Collaborative atmosphere, patience with their inclusive process, and appreciation for relationship investment.',
  },
  {
    code: 'IS',
    angle: 135,
    primary: 'I',
    secondary: 'S',
    label: 'Harmonizer',
    description: 'The social glue of any team. Focuses on maintaining group morale and keeping everyone feeling included and heard.',
    communicationPrefs: 'Diplomatic and people-aware. Appreciate being consulted before decisions affect the group.',
    needsFromOthers: 'Stable environments, clear expectations, and partners who avoid unnecessary conflict.',
  },
  {
    code: 'Si',
    angle: 157.5,
    primary: 'S',
    secondary: 'I',
    label: 'Counselor',
    description: 'Patient listener with genuine warmth. Often the person others come to first — trusted advisor who builds loyalty through consistency.',
    communicationPrefs: 'Calm, unhurried, personal. Prefers one-on-one over group settings.',
    needsFromOthers: 'Advance notice of changes, genuine appreciation, and partners who don\'t confuse patience for passivity.',
  },
  {
    code: 'S',
    angle: 180,
    primary: 'S',
    secondary: null,
    label: 'Steady',
    description: 'The backbone of execution. Reliable, patient, and resistant to unnecessary disruption. Delivers consistently over time.',
    communicationPrefs: 'Clear, structured, and unhurried. Prefer written communication to unexpected verbal demands.',
    needsFromOthers: 'Predictability, advance notice, and explicit appreciation — their contributions are often invisible until missing.',
  },
  {
    code: 'Sc',
    angle: 202.5,
    primary: 'S',
    secondary: 'C',
    label: 'Stabilizer',
    description: 'Methodical and dependable with strong analytical tendencies. Ensures work is completed correctly and sustainably.',
    communicationPrefs: 'Precise and patient. Prefer factual exchanges over emotional or abstract discussions.',
    needsFromOthers: 'Clear goals, sufficient time for thorough execution, and stability to plan carefully.',
  },
  {
    code: 'SC',
    angle: 225,
    primary: 'S',
    secondary: 'C',
    label: 'Coordinator',
    description: 'Systematic and thorough with excellent process discipline. Keeps operations running smoothly through documentation and follow-through.',
    communicationPrefs: 'Written, detailed, and logically organized. Appreciate context and rationale with requests.',
    needsFromOthers: 'Detailed briefs, reasonable timelines, and partners who respect established systems.',
  },
  {
    code: 'Cs',
    angle: 247.5,
    primary: 'C',
    secondary: 'S',
    label: 'Analyst',
    description: 'Precise, data-driven, and methodical. Excels at quality control, research, and evaluating complex information systematically.',
    communicationPrefs: 'Fact-based, specific, evidence-backed. Avoid hyperbole and unsupported claims.',
    needsFromOthers: 'Access to complete data, time to analyze thoroughly, and freedom from rushed or arbitrary decisions.',
  },
  {
    code: 'C',
    angle: 270,
    primary: 'C',
    secondary: null,
    label: 'Conscientious',
    description: 'The quality standard of any team. Demands accuracy, follows protocols, and delivers work that holds up under scrutiny.',
    communicationPrefs: 'Written, structured, and logical. Questions before acting are not stalling — they\'re due diligence.',
    needsFromOthers: 'Clear standards, time to do things right, and partners who treat quality as non-negotiable.',
  },
  {
    code: 'Cd',
    angle: 292.5,
    primary: 'C',
    secondary: 'D',
    label: 'Challenger',
    description: 'Analytical with teeth — holds high standards and will push back when work falls short. Rigorous and direct.',
    communicationPrefs: 'Data-forward but won\'t mince words about gaps. Appreciate directness in return.',
    needsFromOthers: 'Clear objectives with latitude to determine the right method, and respect for their critical analysis.',
  },
  {
    code: 'CD',
    angle: 315,
    primary: 'C',
    secondary: 'D',
    label: 'Objective',
    description: 'Strategic precision — combines analytical rigor with decisive action. Builds systems that produce measurable results.',
    communicationPrefs: 'Efficient and data-rich. Lead with metrics and logical rationale.',
    needsFromOthers: 'Authority commensurate with responsibility and partners who can execute the detailed plans they produce.',
  },
  {
    code: 'Dc',
    angle: 337.5,
    primary: 'D',
    secondary: 'C',
    label: 'Architect',
    description: 'Builds and drives — combines strategic vision with enough precision to execute plans correctly. High standards and high velocity.',
    communicationPrefs: 'Direct, results-focused, and data-informed. Appreciate efficiency over relationship-building in work contexts.',
    needsFromOthers: 'Clear authority, quality inputs, and partners who won\'t slow them down with unnecessary process.',
  },
]

/**
 * Lookup a single DISC profile by its blend code.
 * @param {string} code  e.g. "D", "DI", "Sc"
 * @returns {DISCProfile|undefined}
 */
export function getDISCProfile(code) {
  return DISC_PROFILES.find(p => p.code === code)
}

/**
 * Get all profiles whose primary dimension matches.
 * @param {'D'|'I'|'S'|'C'} primary
 * @returns {DISCProfile[]}
 */
export function getProfilesByPrimary(primary) {
  return DISC_PROFILES.filter(p => p.primary === primary)
}

/**
 * The four pure-style profiles used as quadrant anchors.
 * Ordered D → I → S → C (clockwise starting top).
 */
export const DISC_QUADRANTS = {
  D: { label: 'Dominance', color: '#b91c1c', lightColor: '#fef2f2', focus: 'Task + Fast-paced',    description: 'Direct, decisive, competitive, results-oriented' },
  I: { label: 'Influence',  color: '#d97706', lightColor: '#fffbeb', focus: 'People + Fast-paced',  description: 'Enthusiastic, persuasive, optimistic, collaborative' },
  S: { label: 'Steadiness', color: '#15803d', lightColor: '#f0fdf4', focus: 'People + Moderate',    description: 'Patient, reliable, team-oriented, consistent' },
  C: { label: 'Conscientiousness', color: '#1d4ed8', lightColor: '#eff6ff', focus: 'Task + Moderate', description: 'Analytical, precise, systematic, quality-focused' },
}
