/**
 * All 9 Enneagram types with triad, motivation, arrow movements,
 * group memberships, and both wing variants.
 *
 * Circle positions (from spec): Type 9 at top (0°/360°), then clockwise
 * at 40° increments. Angle formula: (typeNumber * 40 - 90) degrees.
 *
 * @typedef {Object} WingVariant
 * @property {string} label       - Common name (e.g. "The Maverick")
 * @property {string} description - 1-2 sentence summary of the variant
 *
 * @typedef {Object} EnneagramType
 * @property {number}            type               - 1-9
 * @property {string}            name               - Official type name
 * @property {'Gut'|'Heart'|'Head'} triad           - Instinctual center
 * @property {string}            coreEmotion        - Primary emotional driver
 * @property {string}            coreFear           - What this type fundamentally fears
 * @property {string}            coreDesire         - What this type fundamentally wants
 * @property {number}            integrationPoint   - Type number under growth
 * @property {number}            disintegrationPoint - Type number under stress
 * @property {string}            hornevianGroup     - Assertive | Compliant | Withdrawn
 * @property {string}            harmonicGroup      - Competency | Positive Outlook | Reactive
 * @property {number[]}          wings              - Adjacent type numbers
 * @property {Record<string, WingVariant>} wingVariants - Keyed by wing number string
 * @property {number}            circleAngle        - Degrees for circle chart placement
 */

/** @type {Record<string, EnneagramType>} */
export const ENNEAGRAM_TYPES = {
  1: {
    type: 1,
    name: 'The Reformer',
    triad: 'Gut',
    coreEmotion: 'Anger (internalized as resentment)',
    coreFear: 'Being corrupt, defective, or wrong',
    coreDesire: 'To be good, virtuous, and have integrity',
    integrationPoint: 7,
    disintegrationPoint: 4,
    hornevianGroup: 'Compliant',
    harmonicGroup: 'Competency',
    wings: [9, 2],
    wingVariants: {
      '9': {
        label: 'The Idealist',
        description: 'More reserved and philosophical. Principles matter deeply but are held with less visible intensity. Seeks to improve systems quietly.',
      },
      '2': {
        label: 'The Advocate',
        description: 'Combines high standards with genuine care for people. Reforming impulse is more interpersonal — helping others improve is part of being good.',
      },
    },
    circleAngle: -50, // (1 * 40) - 90 = -50 → use CSS: (360 - 50) = 310°
  },
  2: {
    type: 2,
    name: 'The Helper',
    triad: 'Heart',
    coreEmotion: 'Shame (redirected outward as pride)',
    coreFear: 'Being unwanted, unloved, or dispensable',
    coreDesire: 'To be loved and to feel needed',
    integrationPoint: 4,
    disintegrationPoint: 8,
    hornevianGroup: 'Compliant',
    harmonicGroup: 'Positive Outlook',
    wings: [1, 3],
    wingVariants: {
      '1': {
        label: 'The Servant',
        description: 'Principled in their giving — serves according to what\'s right, not just what others want. Can be judgmental when help isn\'t received as intended.',
      },
      '3': {
        label: 'The Host',
        description: 'More outward and achievement-oriented. Uses social connections to create opportunities — the person who knows everyone and facilitates everything.',
      },
    },
    circleAngle: -10, // (2 * 40) - 90
  },
  3: {
    type: 3,
    name: 'The Achiever',
    triad: 'Heart',
    coreEmotion: 'Shame (masked by image and success)',
    coreFear: 'Being worthless, a failure, or inherently without value',
    coreDesire: 'To be valuable, admired, and successful',
    integrationPoint: 6,
    disintegrationPoint: 9,
    hornevianGroup: 'Assertive',
    harmonicGroup: 'Competency',
    wings: [2, 4],
    wingVariants: {
      '2': {
        label: 'The Charmer',
        description: 'Success with warmth — achieves goals through relationships and likability. More collaborative and genuinely people-oriented than the pure 3.',
      },
      '4': {
        label: 'The Professional',
        description: 'Goal-driven but authenticity-seeking. The tension between achieving and being real creates a more introspective, intense version of the 3.',
      },
    },
    circleAngle: 30, // (3 * 40) - 90
  },
  4: {
    type: 4,
    name: 'The Individualist',
    triad: 'Heart',
    coreEmotion: 'Shame (amplified as longing and envy)',
    coreFear: 'Having no identity, being insignificant, or ordinary',
    coreDesire: 'To be unique, authentic, and fully themselves',
    integrationPoint: 1,
    disintegrationPoint: 2,
    hornevianGroup: 'Withdrawn',
    harmonicGroup: 'Reactive',
    wings: [3, 5],
    wingVariants: {
      '3': {
        label: 'The Aristocrat',
        description: 'More driven and achievement-oriented while still valuing uniqueness. Creative ambition paired with a desire for recognition and success.',
      },
      '5': {
        label: 'The Bohemian',
        description: 'More introspective and intellectually oriented. Creates from deep inner exploration; may withdraw further into their rich inner world.',
      },
    },
    circleAngle: 70, // (4 * 40) - 90
  },
  5: {
    type: 5,
    name: 'The Investigator',
    triad: 'Head',
    coreEmotion: 'Fear (managed by withdrawing and hoarding knowledge)',
    coreFear: 'Being useless, incompetent, or overwhelmed by the world',
    coreDesire: 'To be capable, competent, and self-sufficient',
    integrationPoint: 8,
    disintegrationPoint: 7,
    hornevianGroup: 'Withdrawn',
    harmonicGroup: 'Competency',
    wings: [4, 6],
    wingVariants: {
      '4': {
        label: 'The Iconoclast',
        description: 'Blends analytical depth with creative vision and emotional intensity. More introspective and aesthetically driven than the pure 5.',
      },
      '6': {
        label: 'The Problem-Solver',
        description: 'Channels expertise toward practical troubleshooting and team reliability. More engaged and collaborative — knowledge exists to be applied.',
      },
    },
    circleAngle: 110, // (5 * 40) - 90
  },
  6: {
    type: 6,
    name: 'The Loyalist',
    triad: 'Head',
    coreEmotion: 'Fear (managed through vigilance and seeking support)',
    coreFear: 'Being without support, guidance, or security',
    coreDesire: 'To have security, support, and certainty',
    integrationPoint: 9,
    disintegrationPoint: 3,
    hornevianGroup: 'Compliant',
    harmonicGroup: 'Reactive',
    wings: [5, 7],
    wingVariants: {
      '5': {
        label: 'The Defender',
        description: 'More analytical and self-reliant. Prepares thoroughly through research and contingency planning. Questioning instinct is strong — trust is earned slowly.',
      },
      '7': {
        label: 'The Buddy',
        description: 'More outgoing and optimistic. Counterphobic tendencies — faces fears directly. Uses humor and activity to manage anxiety.',
      },
    },
    circleAngle: 150, // (6 * 40) - 90
  },
  7: {
    type: 7,
    name: 'The Enthusiast',
    triad: 'Head',
    coreEmotion: 'Fear (avoided through stimulation and positive reframing)',
    coreFear: 'Being deprived, in pain, or missing out',
    coreDesire: 'To be satisfied, content, and free',
    integrationPoint: 5,
    disintegrationPoint: 1,
    hornevianGroup: 'Assertive',
    harmonicGroup: 'Positive Outlook',
    wings: [6, 8],
    wingVariants: {
      '6': {
        label: 'The Entertainer',
        description: 'More relational and collaborative. Fun-loving energy directed toward connecting people and building community. Anxiety shows more visibly.',
      },
      '8': {
        label: 'The Realist',
        description: 'Bolder, more assertive, and more willing to push for what they want. Energy is more directed — not just experiencing life but conquering it.',
      },
    },
    circleAngle: 190, // (7 * 40) - 90
  },
  8: {
    type: 8,
    name: 'The Challenger',
    triad: 'Gut',
    coreEmotion: 'Anger (expressed directly and immediately)',
    coreFear: 'Being controlled, violated, or vulnerable',
    coreDesire: 'To protect themselves and remain self-directed',
    integrationPoint: 2,
    disintegrationPoint: 5,
    hornevianGroup: 'Assertive',
    harmonicGroup: 'Reactive',
    wings: [7, 9],
    wingVariants: {
      '7': {
        label: 'The Maverick',
        description: 'Extroverted, charismatic, and entrepreneurial. The 7 wing adds playfulness and big-picture vision. Anger burns hot and fast then moves on. Works hard and plays hard.',
      },
      '9': {
        label: 'The Bear',
        description: 'More steady and patient, but equally immovable when provoked. The 9 wing softens the edge — builds quietly and leads through calm presence rather than overt force.',
      },
    },
    circleAngle: 230, // (8 * 40) - 90
  },
  9: {
    type: 9,
    name: 'The Peacemaker',
    triad: 'Gut',
    coreEmotion: 'Anger (repressed and numbed)',
    coreFear: 'Loss, fragmentation, or conflict that destroys connection',
    coreDesire: 'Inner peace, harmony, and wholeness',
    integrationPoint: 3,
    disintegrationPoint: 6,
    hornevianGroup: 'Withdrawn',
    harmonicGroup: 'Positive Outlook',
    wings: [8, 1],
    wingVariants: {
      '8': {
        label: 'The Referee',
        description: 'More assertive and action-oriented. Can access anger and stand ground when necessary. The 8 wing provides directness that cuts through the 9\'s usual diffuseness.',
      },
      '1': {
        label: 'The Dreamer',
        description: 'More principled and idealistic. The 1 wing adds structure and an ethical compass. More likely to have clear opinions — held quietly but consistently.',
      },
    },
    circleAngle: 270, // (9 * 40) - 90 → top of circle (use 270° or -90°)
  },
}

/**
 * Triad groupings with circle arc positioning for the visualization.
 */
export const ENNEAGRAM_TRIADS = {
  Gut: {
    types: [8, 9, 1],
    color: '#15803d',
    lightColor: '#f0fdf4',
    label: 'Gut / Body Center',
    coreEmotion: 'Anger',
    description: 'Instinct-driven. Processes experience through the body and gut feelings. Core emotion is anger — expressed (8), repressed (9), or redirected (1).',
  },
  Heart: {
    types: [2, 3, 4],
    color: '#b91c1c',
    lightColor: '#fef2f2',
    label: 'Heart / Feeling Center',
    coreEmotion: 'Shame',
    description: 'Image-driven. Processes experience through emotions and relationships. Core emotion is shame — redirected (2), masked (3), or amplified (4).',
  },
  Head: {
    types: [5, 6, 7],
    color: '#1d4ed8',
    lightColor: '#eff6ff',
    label: 'Head / Thinking Center',
    coreEmotion: 'Fear',
    description: 'Strategy-driven. Processes experience through analysis and planning. Core emotion is fear — hoarded against (5), vigilantly managed (6), or escaped (7).',
  },
}

/**
 * Get a type by number (1-9).
 * @param {number|string} type
 * @returns {EnneagramType|undefined}
 */
export function getEnneagramType(type) {
  return ENNEAGRAM_TYPES[String(type)]
}
