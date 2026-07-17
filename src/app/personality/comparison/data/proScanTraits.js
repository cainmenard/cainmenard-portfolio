/**
 * ProScan® trait definitions and comparison rules.
 *
 * ProScan® is a registered trademark of PDP, Inc. This module contains
 * publicly documented trait definitions for educational use only.
 * Official results require certified professional interpretation.
 *
 * Trait levels: "High" | "Mid" | "Low"
 * Logic styles: "Fact" | "Feeling" | "Balanced"
 * Energy styles: "Thrust" | "Allegiance" | "Ste-Nacity"
 *
 * @typedef {Object} TraitLevel
 * @property {string} description  - Behavioral summary at this level
 * @property {string} workStyle    - How this level shows up in work context
 * @property {string} needs        - What this level needs from collaborators
 *
 * @typedef {Object} ProScanTrait
 * @property {string}     name              - Trait name
 * @property {TraitLevel} high              - High level behaviors
 * @property {TraitLevel} mid               - Mid level behaviors
 * @property {TraitLevel} low               - Low level behaviors
 * @property {Object}     interactionRules  - Pairing guidance keyed by level combos
 */

/** @type {Record<string, ProScanTrait>} */
export const PROSCAN_TRAITS = {
  dominance: {
    name: 'Dominance',
    high: {
      description: 'Take-charge, decisive, competitive, and direct. Sets clear expectations and expects them to be met. Comfortable with authority and natural in leadership roles.',
      workStyle: 'Drives projects forward aggressively. Makes decisions independently and expects others to execute. Sets ambitious goals and holds people accountable to results.',
      needs: 'Autonomy and authority commensurate with responsibility. Clear domains. Partners who push back with facts, not feelings.',
    },
    mid: {
      description: 'Balanced assertiveness — can lead when needed but also follows others\' direction comfortably. Appropriately competitive without being domineering.',
      workStyle: 'Adapts between leading and supporting based on context. Neither needs to control nor avoids it.',
      needs: 'Clarity on role expectations. Collaborative environments where leadership is shared appropriately.',
    },
    low: {
      description: 'Agreeable, collaborative, and accommodating. Prefers consensus over unilateral decisions. Avoids direct confrontation and naturally defers to others.',
      workStyle: 'Works best in supportive, collaborative roles. Brings team harmony but may struggle to advocate for their own priorities.',
      needs: 'Clear instructions and permission to push back. Appreciation for collaborative style rather than pressure to be more assertive.',
    },
    interactionRules: {
      'High-High': 'Aligned on assertiveness — direct communication comes naturally and both respect each other\'s directness. Divide authority clearly to prevent power struggles. Respect each other\'s domain.',
      'High-Mid': 'High-D partner should consciously share decision space. Mid partner can bridge to team members who are lower D. Good working balance.',
      'High-Low': 'The high-D partner must actively invite input — the low-D partner will not advocate for themselves without explicit invitation. High-D should soften directness; low-D should practice stating needs.',
      'Mid-Mid': 'Collaborative and balanced. Neither dominates; both are comfortable sharing leadership.',
      'Mid-Low': 'Comfortable dynamic — mid can lead gently and low can support without feeling dominated. Mid should ensure low\'s preferences are heard.',
      'Low-Low': 'Highly collaborative but may struggle to make and own decisions. Need to designate a decision-owner for each project.',
    },
  },

  extroversion: {
    name: 'Extroversion',
    high: {
      description: 'Enthusiastic, persuasive, people-oriented, and highly verbal. Energized by interaction. Builds wide networks naturally and brings infectious energy.',
      workStyle: 'Excels at relationship-building, stakeholder management, and presenting. Generates ideas in real time through conversation. May struggle with isolated, solitary tasks.',
      needs: 'People interaction, collaborative environments, and opportunities to communicate and present. Recognition of relationship investments.',
    },
    mid: {
      description: 'Comfortable in both social and independent contexts. Can be outgoing when needed and focused when required. Neither drains nor thrives specifically on interaction.',
      workStyle: 'Adaptable communicator. Works effectively in teams and independently. Adjusts social engagement level to context.',
      needs: 'Balance of interaction and focused work time. Flexibility to adjust engagement level.',
    },
    low: {
      description: 'Reserved, data-focused, and task-oriented. Prefers depth over breadth in relationships. Energized by independent work and careful analysis.',
      workStyle: 'Excels at focused, analytical, solitary work. May find excessive social demands draining. Communicates precisely but not elaborately.',
      needs: 'Focused work time protected from interruption. Recognition that quiet isn\'t disengagement.',
    },
    interactionRules: {
      'High-High': 'Energizing and naturally connected. Risk: meetings become conversations that overrun, and detail follow-through is nobody\'s natural strength. Assign someone to capture commitments.',
      'High-Mid': 'High-E partner brings social energy; mid adapts without being overwhelmed. Natural balance.',
      'High-Low': 'High-E should give the low-E partner prep time before meetings and switch-tasks rather than spontaneous verbal demands. Low-E should communicate proactively to prevent the high-E partner from filling silence with assumptions.',
      'Mid-Mid': 'Comfortable, adaptable dynamic. Communication is appropriately calibrated to context.',
      'Mid-Low': 'Mid can be the external face while low handles deeper analytical work. Complementary when roles are respected.',
      'Low-Low': 'Efficient and focused — less time in meetings, more in focused execution. Risk: relationship-building and stakeholder management suffers. Ensure someone covers the external face.',
    },
  },

  pace: {
    name: 'Pace / Patience',
    high: {
      description: 'Steady, consistent, change-resistant, and patient. Prefers predictability and builds reliable routines. Processes change carefully and deliberately.',
      workStyle: 'Delivers consistently over time. Excels in stable environments requiring sustained reliability. Needs adequate lead time before adapting to new approaches.',
      needs: 'Advance notice of changes, stable work environments, and appreciation for consistency rather than speed.',
    },
    mid: {
      description: 'Balanced pace — can maintain consistency in stable periods and adapt when urgency demands. Neither restless nor slow to change.',
      workStyle: 'Flexible about tempo. Can sprint when needed and sustain when required. Adapts without significant distress.',
      needs: 'Context for pace requirements. Flexibility to adjust rather than defaulting to either extreme.',
    },
    low: {
      description: 'Urgent, spontaneous, fast-moving, and impatient. Drives change and seeks variety. Processes slowly-paced environments as friction rather than comfort.',
      workStyle: 'Thrives in fast-paced, dynamic environments. Can move quickly across multiple initiatives. May be perceived as impatient by higher-pace teammates.',
      needs: 'Speed, variety, and change. Clear urgency and meaningful challenges to sustain focus.',
    },
    interactionRules: {
      'High-High': 'Comfortable, predictable working rhythm. Both prefer stability and consistency. Risk: slow to adapt when circumstances genuinely require change. Need external push for innovation.',
      'High-Mid': 'Mid partner can bridge between high-pace partner\'s need for consistency and faster-paced team members.',
      'High-Low': 'Maximum pace tension. Low partner must introduce change gradually with rationale and lead time. High partner must communicate capacity limits proactively. Both need to stretch toward the center.',
      'Mid-Mid': 'Comfortable adaptability. Neither extreme creates friction.',
      'Mid-Low': 'Low sets the pace; mid adapts. Mid should communicate when the speed is unsustainable.',
      'Low-Low': 'Fast-moving and change-ready. Risk: sustainable systems and routines are nobody\'s priority. Actively build in consistent practices.',
    },
  },

  conformity: {
    name: 'Conformity',
    high: {
      description: 'Structured, rule-following, quality-conscious, and detail-oriented. Values established procedures and works within defined systems.',
      workStyle: 'Excels at compliance-sensitive, quality-controlled work. Follows processes carefully and holds high standards for accuracy. May struggle with highly ambiguous or rule-light environments.',
      needs: 'Clear guidelines, established procedures, and environments where quality is prioritized over speed.',
    },
    mid: {
      description: 'Balanced between structure and independence. Respects rules that make sense and operates independently when they don\'t. Neither rigidly compliant nor habitually rule-breaking.',
      workStyle: 'Adapts between structured and unstructured contexts. Can follow procedures or operate on principle.',
      needs: 'Rationale for rules and flexibility when circumstances don\'t fit standard procedures.',
    },
    low: {
      description: 'Independent, freedom-seeking, flexible, and unconventional. Operates on principles rather than rules. Chafes at bureaucracy and arbitrary restrictions.',
      workStyle: 'Thrives in autonomy-heavy, creative, or entrepreneurial environments. Innovates outside established norms. May create friction in highly structured organizations.',
      needs: 'Autonomy, clear objectives without prescribed methods, and environments that value independent thinking.',
    },
    interactionRules: {
      'High-High': 'Aligned on structure and process — quality is paramount and both will follow and enforce procedures. Risk: over-processing and resistance to necessary rule-bending. May struggle to adapt quickly.',
      'High-Mid': 'Mid can translate between high-conformity partner\'s procedural needs and more fluid team members.',
      'High-Low': 'Fundamental tension around process vs. autonomy. High-conformity partner needs clear standards followed; low-conformity partner needs freedom to determine method. Agree on constraints upfront; give latitude within them.',
      'Mid-Mid': 'Flexible and context-sensitive. Both can adapt as needed.',
      'Mid-Low': 'Mid handles process requirements; low handles the independent work. Natural division of labor.',
      'Low-Low': 'Highly autonomous and adaptive. Risk: nobody owns compliance, documentation, or process consistency. Assign explicit accountability for quality control.',
    },
  },
}

/**
 * Logic style definitions.
 * In ProScan, logic style describes how a person processes decisions.
 *
 * @type {Record<string, { label: string, description: string, decisionProcess: string, workingWith: string }>}
 */
export const PROSCAN_LOGIC_STYLES = {
  Fact: {
    label: 'Fact-Based',
    description: 'Relies on objective data, evidence, and verifiable information to make decisions. Seeks supporting documentation and prefers analytical process over gut instinct.',
    decisionProcess: 'Gathers data, evaluates options systematically, and reaches conclusions through logical analysis.',
    workingWith: 'Provide data, evidence, and reasoned arguments. Avoid purely intuitive recommendations without supporting rationale.',
  },
  Feeling: {
    label: 'Feeling-Based (Instinctive)',
    description: 'Responds instinctively — makes initial automatic conclusions based on inner sense. Trusts gut over data. Decisions feel right before they can be fully articulated.',
    decisionProcess: 'Forms an immediate instinctive conclusion, then may or may not backfill supporting logic.',
    workingWith: 'Present the overall gestalt before the detail. Don\'t expect them to change a gut conclusion with data alone — address the underlying instinct.',
  },
  Balanced: {
    label: 'Balanced',
    description: 'Uses both factual analysis and instinctive sense depending on context. Comfortable with either approach.',
    decisionProcess: 'Adapts between systematic and instinctive decision-making based on the nature of the problem.',
    workingWith: 'Flexible — read the situation to determine whether data or intuition framing will land better.',
  },
}

/**
 * Energy style definitions.
 * Energy style describes how a person generates and sustains working energy.
 *
 * @type {Record<string, { label: string, description: string, peakContext: string, drainContext: string }>}
 */
export const PROSCAN_ENERGY_STYLES = {
  Thrust: {
    label: 'Thrust',
    description: 'Rocket-launch style — highly inner-directed, self-starting, and intense. Generates bursts of high-energy effort from internal motivation. Zone 5 Thrust represents maximum capacity.',
    peakContext: 'New challenges, high-stakes initiatives, competitive environments. Energized by significance and achievement.',
    drainContext: 'Routine, bureaucracy, and low-impact work. Energy drops when there\'s no meaningful challenge.',
  },
  Allegiance: {
    label: 'Allegiance',
    description: 'Dedicated follow-through style — energized by commitment to people and causes. Sustains long-term effort through loyalty and deep investment in the mission.',
    peakContext: 'Long-term relationships, mission-driven work, and environments where their contribution builds something lasting.',
    drainContext: 'Constant change of direction, lack of stability, and environments where commitment is treated as optional.',
  },
  'Ste-Nacity': {
    label: 'Ste-Nacity',
    description: 'Persistent determination style — stays the course under pressure through steady, consistent effort. Neither sprint nor marathon — a sustainable, grinding forward momentum.',
    peakContext: 'Complex, long-duration challenges that require sustained focus and refusal to give up.',
    drainContext: 'Environments that don\'t reward persistence — where quick pivots matter more than sustained commitment.',
  },
}

/**
 * Interaction rule for comparing two ProScan trait levels.
 *
 * @param {string} traitName  One of: 'dominance' | 'extroversion' | 'pace' | 'conformity'
 * @param {'High'|'Mid'|'Low'} levelA
 * @param {'High'|'Mid'|'Low'} levelB
 * @returns {string}  Interaction guidance
 */
export function getProScanTraitInteraction(traitName, levelA, levelB) {
  const trait = PROSCAN_TRAITS[traitName]
  if (!trait) return ''

  const levels = ['High', 'Mid', 'Low']
  const iA = levels.indexOf(levelA)
  const iB = levels.indexOf(levelB)

  // Build canonical key (lower index first)
  const orderedA = iA <= iB ? levelA : levelB
  const orderedB = iA <= iB ? levelB : levelA
  const key = `${orderedA}-${orderedB}`

  return trait.interactionRules[key] ?? ''
}

/**
 * Interaction rule for comparing energy styles.
 *
 * @param {string[]} stylesA  Array of energy style strings for person A
 * @param {string[]} stylesB  Array of energy style strings for person B
 * @returns {string}
 */
export function getEnergyStyleInteraction(stylesA, stylesB) {
  const sharedStyles = stylesA.filter(s => stylesB.includes(s))
  const allStyles = [...new Set([...stylesA, ...stylesB])]

  if (sharedStyles.length > 0) {
    return `Matching energy style${sharedStyles.length > 1 ? 's' : ''} (${sharedStyles.join(', ')}) — similar work rhythms mean momentum builds naturally. Both experience the same peaks and troughs; coordinate to avoid simultaneous energy drops on critical deliverables.`
  }

  if (allStyles.includes('Thrust') && allStyles.includes('Allegiance')) {
    return 'Thrust vs. Allegiance: the Thrust partner generates intense bursts of momentum; the Allegiance partner provides sustained commitment through the full arc. Coordinate handoff points — Thrust launches, Allegiance carries it through.'
  }

  if (allStyles.includes('Thrust') && allStyles.includes('Ste-Nacity')) {
    return 'Thrust vs. Ste-Nacity: high-intensity bursts meet persistent grinding. Thrust partner opens new initiatives with force; Ste-Nacity partner ensures they\'re completed. Explicitly agree on who\'s responsible for what phase.'
  }

  if (allStyles.includes('Allegiance') && allStyles.includes('Ste-Nacity')) {
    return 'Allegiance vs. Ste-Nacity: both are sustained-effort styles — neither gives up easily. Shared endurance but different motivations (people-loyalty vs. task-persistence). Leverage complementary staying power.'
  }

  return 'Different energy styles — coordinate work rhythms explicitly and identify who drives initiation vs. who sustains execution.'
}
