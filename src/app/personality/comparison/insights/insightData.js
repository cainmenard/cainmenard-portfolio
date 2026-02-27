/**
 * Raw content templates and rules for the 6 collaboration insight categories.
 *
 * Each category has content blocks keyed by framework. The insight engine
 * assembles them progressively based on which assessments the visitor has
 * completed — every additional framework adds sentences, never replaces.
 *
 * Content is written as functions that receive the visitor + Cain profile
 * data and return strings. This keeps the templates dynamic and type-aware.
 */

import { MBTI_TYPES } from '../data/mbtiTypes'
import { ENNEAGRAM_TYPES } from '../data/enneagramTypes'
import { getDISCProfile, DISC_QUADRANTS } from '../data/discProfiles'
import { getDISCInteraction } from '../data/discInteractions'
import { getMBTIInteraction } from '../data/mbtiInteractions'
import { getMBTICompatibility } from '../data/mbtiCompatibility'
import { getEnneagramPairing } from '../data/enneagramPairings'
import { getDriveDirection, ID_DRIVES, compareIDProfiles } from '../data/idDrives'
import {
  getProScanTraitInteraction,
  getEnergyStyleInteraction,
  PROSCAN_TRAITS,
  PROSCAN_LOGIC_STYLES,
  PROSCAN_ENERGY_STYLES,
} from '../data/proScanTraits'

// ── Cain's fixed values ───────────────────────────────────────────────────
const CAIN = {
  mbti: 'ENTJ',
  disc: 'D',
  ennType: 8,
  ennWing: 7,
  id: { verify: 7, authenticate: 7, complete: 3, improvise: 3 },
  proScan: {
    dominance: 'High', extroversion: 'High',
    pace: 'Low', conformity: 'Low',
    logic: 'Fact', energy: ['Thrust'],
  },
}

// ── Helpers ───────────────────────────────────────────────────────────────

function discPrimary(code) {
  if (!code) return null
  return code.charAt(0).toUpperCase()
}

function mbtiType(code) {
  return MBTI_TYPES[code] || null
}

function ennType(num) {
  return ENNEAGRAM_TYPES[String(num)] || null
}

function isThinkingDom(code) {
  const t = mbtiType(code)
  return t && (t.stack[0][0] === 'T')
}

function isFeelingDom(code) {
  const t = mbtiType(code)
  return t && (t.stack[0][0] === 'F')
}

function isIntuitiveDom(code) {
  const t = mbtiType(code)
  return t && (t.stack[0][0] === 'N')
}

function isSensingDom(code) {
  const t = mbtiType(code)
  return t && (t.stack[0][0] === 'S')
}

function dominantFn(code) {
  const t = mbtiType(code)
  return t ? t.stack[0] : null
}

function inferiorFn(code) {
  const t = mbtiType(code)
  return t ? t.stack[3] : null
}

const FN_LABELS = {
  Te: 'Extraverted Thinking', Ti: 'Introverted Thinking',
  Fe: 'Extraverted Feeling', Fi: 'Introverted Feeling',
  Se: 'Extraverted Sensing', Si: 'Introverted Sensing',
  Ne: 'Extraverted Intuition', Ni: 'Introverted Intuition',
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY 1: HOW WE COMMUNICATE
// ═══════════════════════════════════════════════════════════════════════════

export const communicationData = {
  id: 'communication',
  title: 'How We Communicate',
  icon: '💬',

  disc(visitorDisc) {
    const vp = discPrimary(visitorDisc)
    const interaction = getDISCInteraction(CAIN.disc, vp)
    if (!interaction) return null

    const vProfile = getDISCProfile(visitorDisc)
    const paceMap = { D: 'fast', I: 'fast', S: 'moderate', C: 'moderate' }
    const focusMap = { D: 'task-focused', I: 'people-focused', S: 'people-focused', C: 'task-focused' }
    const directMap = { D: 'very direct', I: 'enthusiastic and persuasive', S: 'diplomatic and gentle', C: 'precise and evidence-based' }

    const vPace = paceMap[vp] || 'moderate'
    const vFocus = focusMap[vp] || 'balanced'
    const vDirect = directMap[vp] || 'moderate'

    let narrative = `Cain communicates at high speed, bottom-line-first, and task-oriented — classic D style. Your ${vProfile?.label || vp} style is ${vDirect}, ${vPace}-paced, and ${vFocus}. `

    if (vp === 'D') {
      narrative += 'Two D-styles create rapid, efficient exchanges but can turn into verbal arm-wrestling. Neither will volunteer context the other needs — you both assume shared understanding faster than you should.'
    } else if (vp === 'I') {
      narrative += 'Your people-first enthusiasm meets Cain\'s results-first directness. Conversations will be fast and energetic, but you\'ll want relational warm-up that Cain skips. Lead with the outcome, then weave in the people story — he\'ll stay engaged longer.'
    } else if (vp === 'S') {
      narrative += 'This is the highest-tension communication pairing on the DISC model. Cain\'s rapid-fire, change-first delivery will feel overwhelming. You need processing time, context, and advance notice — none of which Cain provides by default. You\'ll need to explicitly ask for what you need.'
    } else if (vp === 'C') {
      narrative += 'Both task-focused, but at different speeds. Cain leads with conclusions; you lead with evidence. His "just do it" collides with your "let me verify that first." Frame your analysis as supporting the goal, not questioning the decision.'
    }

    const tips = []
    tips.push({
      for: 'visitor',
      tip: interaction.communicationTips || 'Match Cain\'s directness level — hedging or excessive preamble will lose his attention.',
    })
    tips.push({
      for: 'cain',
      tip: vp === 'S'
        ? 'Slow down. Give advance notice before shifting direction. Ask explicitly for input — silence doesn\'t mean agreement.'
        : vp === 'C'
        ? 'Give the goal and deadline upfront, then let them determine the method. Don\'t rush their analysis.'
        : vp === 'I'
        ? 'Acknowledge their relational investments — they\'re doing influence work that multiplies your results.'
        : 'Divide airtime deliberately — two D-styles default to competing for the floor.',
    })

    return {
      narrative,
      tips,
      watchOut: interaction.friction ? interaction.friction.split('.').slice(0, 2).join('.') + '.' : null,
    }
  },

  mbti(visitorMBTI) {
    const interaction = getMBTIInteraction(CAIN.mbti, visitorMBTI)
    if (!interaction.communication || interaction.communication.startsWith('Select')) return null

    const vType = mbtiType(visitorMBTI)
    const vDom = dominantFn(visitorMBTI)
    let addendum = ''

    if (visitorMBTI[0] === 'I') {
      addendum += `As an introvert working with Cain's extraverted style, you'll need protected processing time. Cain thinks by talking — he'll fill silences with more input unless you signal "I'm processing, not disengaged." `
    } else {
      addendum += `Both extraverts — conversations will be fast and externally processed. The risk is that neither of you pauses to reflect before committing to a direction. `
    }

    if (visitorMBTI[1] === 'S') {
      addendum += `Your Sensing preference means you communicate in specifics and examples. Cain's Intuitive style leads with abstractions and strategy. Bridge the gap: ask him to ground big-picture statements in concrete next steps.`
    } else if (visitorMBTI[1] === 'N' && visitorMBTI !== 'ENTJ') {
      addendum += `You both communicate in patterns and possibilities, which creates natural rapport on strategic topics. The gap is in execution detail — neither of you will naturally surface the "how" without deliberate effort.`
    }

    return {
      narrative: addendum,
      tips: [
        { for: 'visitor', tip: interaction.communication.split('.').slice(0, 2).join('.') + '.' },
      ],
      watchOut: null,
    }
  },

  enneagram(visitorEnn) {
    const vType = ennType(visitorEnn.type)
    if (!vType) return null

    const pairing = getEnneagramPairing(CAIN.ennType, visitorEnn.type)
    let addendum = ''

    if (vType.harmonicGroup === 'Reactive') {
      addendum += `Both of you are in the Reactive harmonic group — you respond to problems with emotional directness. Communication will be intense and authentic, but conflicts can escalate fast because neither reflexively de-escalates. `
    } else if (vType.harmonicGroup === 'Competency') {
      addendum += `Your Competency approach (solve the problem systematically) meets Cain's Reactive approach (address it directly and emotionally). You may find his emotional intensity disproportionate; he may find your analytical detachment dismissive. `
    } else {
      addendum += `Your Positive Outlook tendency (reframe, find the silver lining) meets Cain's Reactive tendency (name the problem directly). He may interpret your optimism as avoidance; you may experience his directness as unnecessarily negative. `
    }

    if (vType.coreFear) {
      addendum += `When communication touches your core fear (${vType.coreFear.toLowerCase()}), you'll shut down or become defensive. Cain's blunt style can accidentally trigger this — he'll need to watch for it.`
    }

    return {
      narrative: addendum,
      tips: pairing ? [{ for: 'visitor', tip: pairing.communicationRules.split('.').slice(0, 2).join('.') + '.' }] : [],
      watchOut: null,
    }
  },

  idDrives(visitorID) {
    const comparison = compareIDProfiles(CAIN.id, visitorID)
    let addendum = ''

    const vVerifyDir = getDriveDirection(visitorID.verify)
    const vAuthDir = getDriveDirection(visitorID.authenticate)
    const vCompleteDir = getDriveDirection(visitorID.complete)

    if (vVerifyDir === 'USE') {
      addendum += `You both USE Verify — you'll want the "why" behind every message, and so does Cain. Conversations will be thorough and analytical. The risk: both of you interrogate before accepting, which can slow momentum. `
    } else if (vVerifyDir === 'AVOID') {
      addendum += `Cain's high Verify drive means he questions everything — not out of distrust, but thoroughness. Your lower Verify means you absorb information faster and may feel cross-examined. Expect "why?" as his default response, and don't take it personally. `
    }

    if (vAuthDir === 'USE') {
      addendum += `Both high Authenticate — communication will be literal, direct, and hands-on. What's said is meant. This creates exceptional clarity but zero tolerance for spin or abstraction.`
    } else if (vAuthDir === 'AVOID') {
      addendum += `Cain needs tangible, literal, face-to-face communication. Your preference for abstraction or delegation will read as disengagement to him. When it matters, show up in person or on video — emails won't carry the weight he needs.`
    }

    if (vCompleteDir === 'USE') {
      addendum += ` You need structured agendas and clear follow-up items. Cain (low Complete) will resist rigid meeting formats. Compromise: set the structure, but keep it light — bullet-point agendas, not detailed templates.`
    }

    return {
      narrative: addendum,
      tips: [],
      watchOut: null,
    }
  },

  proScan(visitorPS) {
    let addendum = ''
    const eInteraction = getEnergyStyleInteraction(CAIN.proScan.energy, visitorPS.energy || [])

    if (visitorPS.extroversion === 'Low') {
      addendum += `Cain's high extroversion means rapid, verbal, spontaneous communication. Your lower extroversion needs preparation time and written channels. Request agendas before meetings and follow up with written summaries. `
    } else if (visitorPS.extroversion === 'High') {
      addendum += `Both highly extroverted — meetings will be energetic and verbal-heavy. Assign someone to capture commitments; neither of you will naturally slow down to document agreements. `
    }

    if (visitorPS.energy?.length > 0) {
      addendum += eInteraction
    }

    return { narrative: addendum, tips: [], watchOut: null }
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY 2: HOW WE MAKE DECISIONS
// ═══════════════════════════════════════════════════════════════════════════

export const decisionMakingData = {
  id: 'decisionMaking',
  title: 'How We Make Decisions',
  icon: '🧠',

  mbti(visitorMBTI) {
    const interaction = getMBTIInteraction(CAIN.mbti, visitorMBTI)
    const compat = getMBTICompatibility(CAIN.mbti, visitorMBTI)
    if (!interaction.decisionMaking) return null

    const vType = mbtiType(visitorMBTI)
    let narrative = ''

    // T/F axis
    if (visitorMBTI[2] === 'T') {
      narrative += `Both Thinking types — you'll align quickly on data-driven decisions and logical trade-offs. The blind spot is the human dimension: neither of you naturally asks "how does this affect the people involved?" Actively assign one person to advocate for the relational impact. `
    } else {
      narrative += `Your Feeling preference means decisions filter through values and people impact first. Cain's Thinking preference filters through logical efficiency. Neither is wrong — but you'll need to translate between frames. Present the human case in outcome terms ("if we do X, people will do Y, which costs Z") to land with his Te-dominant processing. `
    }

    // J/P axis
    if (visitorMBTI[3] === 'P') {
      narrative += `Cain's Judging preference wants to decide and execute. Your Perceiving preference wants to gather more input and keep options open. This is a key tension: agree on decision timelines upfront — Cain gets closure, you get exploration time. Without this, he'll feel you're stalling and you'll feel railroaded.`
    } else {
      narrative += `Both Judging types — decisions close quickly. This is efficient but risky: you may both commit before sufficient exploration. Build in a brief "what are we missing?" check before finalizing any significant decision.`
    }

    const watchOut = visitorMBTI[2] !== CAIN.mbti[2] || visitorMBTI[3] !== CAIN.mbti[3]
      ? interaction.conflict?.split('.').slice(0, 2).join('.') + '.'
      : 'Aligned decision styles can create blind spots — challenge each other\'s assumptions, especially when you agree too quickly.'

    return {
      narrative,
      tips: [
        { for: 'visitor', tip: interaction.decisionMaking.split('.').slice(0, 2).join('.') + '.' },
        { for: 'cain', tip: visitorMBTI[2] === 'F'
          ? 'Acknowledge the values dimension before presenting the logical case. A 10-second nod to the human impact opens the analytical door.'
          : visitorMBTI[3] === 'P'
          ? 'Set explicit decision deadlines but allow exploration until the deadline. Don\'t close early just because you\'re ready.'
          : 'Match your directness — this person processes decisions the same way you do. Focus on surfacing blind spots, not translating.'
        },
      ],
      watchOut,
    }
  },

  disc(visitorDisc) {
    const vp = discPrimary(visitorDisc)
    const interaction = getDISCInteraction(CAIN.disc, vp)
    if (!interaction) return null

    let addendum = ''
    if (vp === 'D') {
      addendum += 'Two D-styles reach decisions fast but may compete for the final call. Pre-assign decision authority by domain — otherwise every choice becomes a contest. '
    } else if (vp === 'I') {
      addendum += 'Cain decides based on strategic outcomes; you factor in team enthusiasm and buy-in. His unilateral tendencies will frustrate your collaborative instinct. Push for stakeholder check-ins, but accept that not every decision needs consensus. '
    } else if (vp === 'S') {
      addendum += 'Cain decides fast and moves on. You need time to process, weigh impact, and build certainty. Without explicit structure, he\'ll interpret your deliberation as resistance. Ask for a specific window: "Give me until 3pm to think this through." '
    } else if (vp === 'C') {
      addendum += 'You need data before deciding; Cain decides and adjusts. His "good enough, ship it" mentality collides with your "let me verify that" instinct. Frame your analysis as risk reduction for the goal, not a challenge to his speed. '
    }

    return {
      narrative: addendum,
      tips: [{ for: 'visitor', tip: interaction.delegationTips.split('.').slice(0, 2).join('.') + '.' }],
      watchOut: null,
    }
  },

  enneagram(visitorEnn) {
    const vType = ennType(visitorEnn.type)
    if (!vType) return null

    const pairing = getEnneagramPairing(CAIN.ennType, visitorEnn.type)
    let addendum = ''

    // Core fear shapes risk perception
    addendum += `Your core fear (${vType.coreFear.toLowerCase()}) shapes what feels "risky" in decisions. Cain's core fear (being controlled or vulnerable) means he resists decisions that reduce his autonomy. `

    if (visitorEnn.type === 1) {
      addendum += 'You need the decision to be "right." Cain needs it to be "effective." These overlap more than you think — frame ethics as long-term effectiveness and he\'ll engage.'
    } else if (visitorEnn.type === 6) {
      addendum += 'Your worst-case thinking is actually valuable to Cain — he tends to underestimate risk. Present concerns as "if X then Y" contingencies rather than general worry, and he\'ll incorporate them.'
    } else if ([3, 7, 8].includes(visitorEnn.type)) {
      addendum += 'Both assertive types — decisions will be fast and confident. The risk is overcommitment without adequate due diligence. Deliberately slow down on decisions with large blast radius.'
    }

    return {
      narrative: addendum,
      tips: pairing ? [{ for: 'visitor', tip: pairing.communicationRules.split('.').slice(0, 2).join('.') + '.' }] : [],
      watchOut: pairing ? pairing.frictionPoints.split('.').slice(0, 2).join('.') + '.' : null,
    }
  },

  idDrives(visitorID) {
    let addendum = ''
    const vVerifyDir = getDriveDirection(visitorID.verify)
    const vImproviseDir = getDriveDirection(visitorID.improvise)

    if (vVerifyDir === 'USE') {
      addendum += 'You both need to understand "why" before committing — decisions will be thoroughly analyzed. The trap: both of you can over-analyze to the point of paralysis. Set explicit "decide by" dates. '
    } else if (vVerifyDir === 'AVOID') {
      addendum += 'Cain\'s high Verify means he interrogates every option. Your low Verify means you trust your gut and move fast. You\'ll make faster initial calls, but Cain will challenge them with "have you considered X?" This isn\'t distrust — it\'s how he processes. '
    }

    if (vImproviseDir === 'USE') {
      addendum += 'Your high Improvise drive means you\'re comfortable committing under uncertainty. Cain\'s low Improvise means he needs more certainty before locking in. You\'ll need to slow your commitment speed to match his need for validation.'
    } else if (vImproviseDir === 'AVOID') {
      addendum += 'Neither of you commits quickly under uncertainty — both want proven approaches over untested ones. This creates cautious, defensible decisions but may mean missed opportunities when speed matters.'
    }

    return { narrative: addendum, tips: [], watchOut: null }
  },

  proScan(visitorPS) {
    let addendum = ''
    const vLogic = visitorPS.logic

    if (vLogic === 'Fact' && CAIN.proScan.logic === 'Fact') {
      addendum += 'Both fact-based decision makers. Debates will be evidence-driven and productive — but beware of treating data as truth when it\'s actually assumption. Challenge each other\'s data sources. '
    } else if (vLogic === 'Feeling') {
      addendum += 'You reach conclusions instinctively and backfill the logic. Cain reaches conclusions through systematic data analysis. When you disagree, his first question will be "show me the data" — which won\'t capture your genuine insight. Translate your gut reads into hypothesis format: "I think X because of Y pattern." '
    } else if (vLogic === 'Balanced') {
      addendum += 'Your balanced logic style lets you flex between data and instinct depending on context. Cain\'s fact-based approach is more rigid — lead with evidence when engaging his decisions, and save the intuitive layer for when data is genuinely absent. '
    }

    return { narrative: addendum, tips: [], watchOut: null }
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY 3: HOW WE HANDLE PRESSURE
// ═══════════════════════════════════════════════════════════════════════════

export const pressureData = {
  id: 'pressure',
  title: 'How We Handle Pressure',
  icon: '🔥',

  enneagram(visitorEnn) {
    const vType = ennType(visitorEnn.type)
    if (!vType) return null

    const cainType = ennType(CAIN.ennType)
    const pairing = getEnneagramPairing(CAIN.ennType, visitorEnn.type)

    let narrative = `Under stress, Cain (8w7) disintegrates toward Type 5 — he withdraws, becomes secretive, hoards information, and over-analyzes from isolation. The normally direct, open communicator goes quiet. This is his warning sign. `

    const vStressTarget = vType.disintegrationPoint
    const vStressType = ennType(vStressTarget)
    narrative += `Under stress, you (Type ${visitorEnn.type}) disintegrate toward Type ${vStressTarget} (${vStressType?.name || ''}) — ${getStressDescription(visitorEnn.type)}. `

    if (pairing?.underStressTogether) {
      narrative += pairing.underStressTogether
    }

    const tips = []
    tips.push({
      for: 'visitor',
      tip: `Watch for Cain going quiet — it means stress, not disinterest. Give him space to regroup, then re-engage with a direct question: "What do you need right now?" He won't ask for help, but he'll respond to a concrete offer.`,
    })
    tips.push({
      for: 'cain',
      tip: `Watch for this person shifting toward Type ${vStressTarget} behaviors. ${getStressTip(visitorEnn.type)}`,
    })

    return {
      narrative,
      tips,
      watchOut: pairing?.underStressTogether?.split('.').slice(0, 2).join('.') + '.' || null,
    }
  },

  mbti(visitorMBTI) {
    const vInferior = inferiorFn(visitorMBTI)
    const cainInferior = inferiorFn(CAIN.mbti) // Fi

    let addendum = `Cain's inferior function is ${FN_LABELS['Fi']} (Fi) — under extreme stress, his normally controlled emotional world erupts. Expect uncharacteristic emotional reactions, defensiveness about personal values, or withdrawal into "no one understands me" territory. `

    if (vInferior) {
      addendum += `Your inferior function is ${FN_LABELS[vInferior]} (${vInferior}). Under stress, this is where you break down — ${getInferiorStress(vInferior)}. `
    }

    const vDom = dominantFn(visitorMBTI)
    if (vDom === cainInferior) {
      addendum += `Your dominant ${vDom} directly targets Cain's inferior function. Your natural operating mode can feel like an attack on his weakest point — moderate your intensity during high-pressure moments.`
    }

    const cainDom = dominantFn(CAIN.mbti) // Te
    if (cainDom === vInferior) {
      addendum += `Cain's dominant Te directly targets your inferior ${vInferior}. His normal directness and efficiency demands can feel crushing under pressure. Name this dynamic to defuse it: "Your Te is hitting my blind spot right now."`
    }

    return { narrative: addendum, tips: [], watchOut: null }
  },

  disc(visitorDisc) {
    const vp = discPrimary(visitorDisc)
    let addendum = ''

    const stressMap = {
      D: 'becomes autocratic and dismissive — steamrolls input, makes unilateral calls, and burns relationships for speed',
      I: 'becomes scattered and impulsive — generates noise without signal, over-promises, and loses the thread of follow-through',
      S: 'withdraws and shuts down — stops communicating, absorbs quietly, and passive-resistance emerges as delayed compliance',
      C: 'becomes hypercritical and rigid — every detail is scrutinized, no solution is good enough, and perfect becomes the enemy of done',
    }

    addendum += `Under pressure, your ${vp}-style ${stressMap[vp] || 'shifts behaviors'}. Cain's D-style under stress becomes autocratic and dismissive. `

    if (vp === 'D') {
      addendum += 'Two stressed D-styles create a power vacuum — both try to take control, neither yields. Pre-establish an escalation protocol for crunch moments.'
    } else if (vp === 'S') {
      addendum += 'The D-S pressure dynamic is particularly dangerous: the more Cain pushes, the more you withdraw, which triggers him to push harder. This escalation-withdrawal loop requires conscious intervention from both sides.'
    }

    return { narrative: addendum, tips: [], watchOut: null }
  },

  proScan(visitorPS) {
    let addendum = ''

    if (visitorPS.pace === 'High') {
      addendum += 'Your high-pace preference means stress slows you to a crawl while Cain\'s low-pace preference means stress accelerates his already fast tempo. Under pressure, the pace gap widens dramatically. '
    }

    const eInteraction = getEnergyStyleInteraction(CAIN.proScan.energy, visitorPS.energy || [])
    if (eInteraction) {
      addendum += `Energy dynamics under pressure: ${eInteraction} `
    }

    if (visitorPS.conformity === 'High') {
      addendum += 'Under stress, your high conformity means you\'ll cling to process and rules. Cain\'s low conformity means he\'ll throw out the playbook. Agree in advance on which procedures are non-negotiable during crunch vs. which can flex.'
    }

    return { narrative: addendum, tips: [], watchOut: null }
  },

  idDrives(visitorID) {
    let addendum = ''

    if (getDriveDirection(visitorID.verify) === 'USE') {
      addendum += 'Under stress, your high Verify drive shifts from productive analysis to paralysis-by-analysis — you need to understand everything before moving, which stalls the team. '
    }
    if (getDriveDirection(visitorID.authenticate) === 'USE') {
      addendum += 'Cain\'s high Authenticate under stress becomes micromanagement — he needs to be personally involved in everything, which bottlenecks decision-making. If you also USE Authenticate, you\'ll both crowd into the same space. '
    }
    if (getDriveDirection(visitorID.complete) === 'USE') {
      addendum += 'Your need for structure intensifies under stress. Cain\'s low Complete means he abandons process faster. When the pressure is on, your process-needs and his speed-needs will collide. '
    }

    return { narrative: addendum, tips: [], watchOut: null }
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY 4: HOW TO GET THE BEST FROM ME
// ═══════════════════════════════════════════════════════════════════════════

export const bestFromMeData = {
  id: 'bestFromMe',
  title: 'How to Get the Best From Me',
  icon: '⚡',

  disc(visitorDisc) {
    const vp = discPrimary(visitorDisc)
    const interaction = getDISCInteraction(CAIN.disc, vp)
    if (!interaction) return null

    let narrative = 'Cain operates best with high autonomy, clear goals, and minimal process overhead. Give him the objective and the deadline — not the method. Check in on results, not activity. '

    if (vp === 'D') {
      narrative += 'You need the same: autonomy and clear domain ownership. The key to making this work is explicit territory division — each person owns a complete vertical. Overlap creates competition, not collaboration.'
    } else if (vp === 'I') {
      narrative += 'You thrive on recognition, social energy, and collaborative environments. Cain delivers recognition through trust (giving you harder problems, not applause). Ask explicitly for acknowledgment when you need it — he respects the directness.'
    } else if (vp === 'S') {
      narrative += 'You need stability, predictability, and advance notice of changes. Cain changes direction fast and expects instant adaptation. Negotiate a standing check-in rhythm that gives you early warning of shifts — he\'ll respect the structure if it doesn\'t slow him down.'
    } else if (vp === 'C') {
      narrative += 'You need clear quality standards, sufficient time, and methodical process. Cain provides the goal and expects fast turnaround. Negotiate: clarify the quality bar upfront ("is this a 90% solution or a 99% solution?"), then own the timeline yourself.'
    }

    const backfire = {
      D: 'What backfires: micromanaging Cain, questioning his authority publicly, or making unilateral decisions in his domain. He\'ll respond with escalation, not compliance.',
      I: 'What backfires: treating Cain like he needs to be "managed" with relational touch. He reads excessive warmth-before-business as time-wasting. Lead with the ask, add warmth after.',
      S: 'What backfires: expecting Cain to provide emotional support or detailed context unprompted. He assumes you have what you need until you say otherwise. Speak up before you hit capacity.',
      C: 'What backfires: presenting Cain with problems without proposed solutions, or asking for extended analysis timelines on urgent matters. Lead with your recommendation, then the supporting evidence.',
    }

    return {
      narrative,
      tips: [
        { for: 'visitor', tip: backfire[vp] || 'Don\'t micromanage Cain. Give him the objective and stay out of his method.' },
        { for: 'cain', tip: interaction.delegationTips.split('.').slice(0, 2).join('.') + '.' },
      ],
      watchOut: interaction.friction.split('.').slice(0, 2).join('.') + '.',
    }
  },

  mbti(visitorMBTI) {
    const vType = mbtiType(visitorMBTI)
    if (!vType) return null

    let addendum = ''
    if (vType.temperament === 'NT') {
      addendum += 'You need your competence respected — Cain gets this instinctively because he operates the same way. The fastest way to earn his trust is demonstrated capability, not credentials or rapport. '
    } else if (vType.temperament === 'NF') {
      addendum += 'You need your values acknowledged and your contribution to feel meaningful. Cain respects values but processes through logic first. Frame your impact in outcomes terms to earn his engagement, then bring him to the meaning layer. '
    } else if (vType.temperament === 'SJ') {
      addendum += 'You need structure, clear expectations, and respect for established processes. Cain disrupts structures. Negotiate which processes are sacred vs. which he can bypass — having this conversation once prevents repeated friction. '
    } else if (vType.temperament === 'SP') {
      addendum += 'You need freedom, tactical variety, and hands-on engagement. Cain provides this naturally — he delegates outcomes, not process. You\'ll have the latitude you need as long as results come through. '
    }

    const interaction = getMBTIInteraction(CAIN.mbti, visitorMBTI)
    addendum += interaction.delegation ? ' ' + interaction.delegation.split('.').slice(0, 3).join('.') + '.' : ''

    return { narrative: addendum, tips: [], watchOut: null }
  },

  enneagram(visitorEnn) {
    const vType = ennType(visitorEnn.type)
    if (!vType) return null

    let addendum = ''
    addendum += `Your core desire is ${vType.coreDesire.toLowerCase()}. Cain's core desire is to protect himself and remain self-directed. `

    const desireMap = {
      1: 'To get the best from Cain, align requests with what\'s effective, not what\'s "correct." He respects principles but responds to outcomes.',
      2: 'Cain won\'t ask for help or acknowledge dependence. Don\'t mistake self-sufficiency for not needing you. The best thing you can do is deliver results that make his life easier without asking for gratitude.',
      3: 'Cain respects achievement but sees through performance. Be real about setbacks — he\'ll trust your wins more when he\'s seen you own your losses.',
      4: 'Cain won\'t naturally validate your uniqueness — it\'s not his language. But he deeply respects authenticity. Be direct about what you need; he\'ll respect the honesty more than the emotional delivery.',
      5: 'Give Cain your analysis when he asks, but don\'t wait to be asked about critical findings. He assumes you\'ll surface what matters. Hoarding insight feels like betrayal to an 8.',
      6: 'Your worst-case scenarios are genuinely valuable to Cain. Frame them as risk intelligence, not anxiety. He\'ll use them if they\'re delivered as data.',
      7: 'Cain channels your energy best when it\'s focused. Bring three ideas, recommend one. He\'ll engage with a clear recommendation faster than a brainstorm.',
      8: 'Two 8s: divide domains completely. What Cain needs from you is your full authority in your lane and zero interference in his.',
      9: 'Cain needs you to state preferences, push back on bad ideas, and stop absorbing. Your peacemaking instinct is valuable — but only when you actually voice the peace terms.',
    }

    addendum += desireMap[visitorEnn.type] || ''

    return { narrative: addendum, tips: [], watchOut: null }
  },

  idDrives(visitorID) {
    let addendum = ''

    if (getDriveDirection(visitorID.complete) === 'USE') {
      addendum += 'Cain\'s low Complete means he won\'t enforce rigid processes on you, but he also won\'t create them. If you need structure, build it yourself — he\'ll respect it as long as it doesn\'t slow him down. '
    } else if (getDriveDirection(visitorID.complete) === 'AVOID') {
      addendum += 'Neither of you is process-driven — things will move fast and flexibly. The risk: no one tracks the details. Explicitly assign follow-through ownership per project or things fall through the cracks. '
    }

    if (getDriveDirection(visitorID.verify) === 'USE') {
      addendum += 'You need the "why" behind every ask. Cain respects this because he\'s the same way. Give him the same courtesy: explain your reasoning, don\'t just deliver conclusions. '
    }

    if (getDriveDirection(visitorID.authenticate) === 'AVOID') {
      addendum += 'Cain\'s high Authenticate means he\'s hands-on and expects personal accountability. Your comfort with delegation and abstraction may feel detached to him. On high-stakes items, demonstrate personal investment even if you prefer to delegate. '
    }

    return { narrative: addendum, tips: [], watchOut: null }
  },

  proScan(visitorPS) {
    let addendum = ''

    if (visitorPS.energy?.includes('Thrust')) {
      addendum += 'Both Thrust energy styles — you both ignite fast on new challenges and need to hand off the sustaining work. Pair with Allegiance-style teammates for projects requiring long-term follow-through. '
    } else if (visitorPS.energy?.includes('Allegiance')) {
      addendum += 'Your Allegiance energy sustains what Cain\'s Thrust energy initiates. This is a powerful handoff: he launches, you carry through. Make the transition points explicit. '
    } else if (visitorPS.energy?.includes('Ste-Nacity')) {
      addendum += 'Your persistent Ste-Nacity meets Cain\'s burst-style Thrust. You\'ll outlast him on grinding tasks; he\'ll outpace you on launches. Coordinate: he opens, you close. '
    }

    if (visitorPS.dominance === 'Low') {
      addendum += 'Cain\'s high dominance requires you to actively invite yourself into decisions. He won\'t exclude you intentionally — he just assumes silence means agreement.'
    }

    return { narrative: addendum, tips: [], watchOut: null }
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY 5: HOW I LEAD
// ═══════════════════════════════════════════════════════════════════════════

export const leadershipData = {
  id: 'leadership',
  title: 'How I Lead',
  icon: '🚀',

  disc(visitorDisc) {
    const vp = discPrimary(visitorDisc)
    const interaction = getDISCInteraction(CAIN.disc, vp)
    if (!interaction) return null

    let narrative = 'Cain leads through direction and decisiveness — he sets the destination, expects competence, and measures results. He delegates outcomes, not tasks. If you need detailed instructions, ask for them explicitly — he assumes capability. '

    if (vp === 'D') {
      narrative += 'As another D-style, you\'ll challenge his leadership instinctively. This is productive when domain-separated and destructive when overlapping. He leads best when you lead your own domain visibly.'
    } else if (vp === 'I') {
      narrative += 'You\'ll experience his leadership as clear but sometimes cold. He values your people skills but won\'t always say so. Your role is to translate his strategic direction into team enthusiasm — he provides the "what," you provide the "how it feels."'
    } else if (vp === 'S') {
      narrative += 'His leadership pace will feel relentless. He doesn\'t intend to overwhelm — he genuinely doesn\'t notice that not everyone moves at sprint speed. Establish check-in rhythms that let you surface capacity concerns before they become crises.'
    } else if (vp === 'C') {
      narrative += 'You\'ll provide the quality checks he naturally skips. He respects this — but only when it doesn\'t stall the timeline. Learn to flag critical risks fast and let minor imperfections ship. He\'ll trust your judgment more when you differentiate between the two.'
    }

    return {
      narrative,
      tips: [
        { for: 'visitor', tip: interaction.communicationTips.split('.').slice(0, 2).join('.') + '.' },
      ],
      watchOut: interaction.friction.split('.').slice(0, 2).join('.') + '.',
    }
  },

  mbti(visitorMBTI) {
    const interaction = getMBTIInteraction(CAIN.mbti, visitorMBTI)
    const compat = getMBTICompatibility(CAIN.mbti, visitorMBTI)
    if (!interaction.leadership) return null

    let addendum = 'Cain\'s Te-dominant style means he leads by organizing systems, assigning accountability, and tracking measurable outcomes. He expects you to own your domain completely — bring problems with proposed solutions, not just flags. '

    if (compat.sharedFunctions?.length >= 2) {
      addendum += `You share ${compat.sharedFunctions.join(', ')} cognitive functions — leadership dynamics will feel intuitive because you process information through similar channels. `
    }

    if (visitorMBTI[0] === 'I') {
      addendum += 'His extraverted leadership style may overshadow your contributions. He needs to actively ensure your strategic input is heard and credited — it won\'t happen naturally.'
    }

    return {
      narrative: addendum,
      tips: [{ for: 'visitor', tip: interaction.leadership.split('.').slice(0, 2).join('.') + '.' }],
      watchOut: null,
    }
  },

  enneagram(visitorEnn) {
    const vType = ennType(visitorEnn.type)
    if (!vType) return null

    const pairing = getEnneagramPairing(CAIN.ennType, visitorEnn.type)

    let addendum = 'As an 8w7, Cain leads by imparting strength — he challenges people to rise, protects the team fiercely, and creates his own path when none exists. The 7-wing adds charisma, big-picture vision, and work-hard-play-hard energy. '

    if (vType.hornevianGroup === 'Assertive') {
      addendum += 'You\'re also in the Assertive Hornevian group — you move toward people and situations to get needs met. Two assertive styles create dynamic, high-energy leadership but compete for influence. Explicit role separation is essential.'
    } else if (vType.hornevianGroup === 'Compliant') {
      addendum += 'Your Compliant Hornevian style means you adapt to expectations and seek to serve the group. Cain\'s assertive style will set the tone — your role is to ground his intensity with reliability and process. Don\'t mistake compliance for weakness; your contribution is the structural backbone.'
    } else {
      addendum += 'Your Withdrawn Hornevian style means you process internally before engaging. Cain\'s assertive leadership won\'t naturally wait for your input — you\'ll need to claim your space. Schedule structured check-ins where your reflective contributions are specifically invited.'
    }

    return {
      narrative: addendum,
      tips: pairing ? [{ for: 'visitor', tip: pairing.synergies.split('.').slice(0, 2).join('.') + '.' }] : [],
      watchOut: pairing ? pairing.frictionPoints.split('.').slice(0, 2).join('.') + '.' : null,
    }
  },

  idDrives(visitorID) {
    let addendum = 'Cain\'s leadership is shaped by high Verify (questions everything — thoroughness, not distrust), high Authenticate (insists on personal involvement and literal accountability), and low Complete (won\'t micromanage your process or enforce rigid structure). '

    if (getDriveDirection(visitorID.verify) === 'AVOID') {
      addendum += 'Your low Verify means you\'ll accept direction faster than Cain expects. He\'ll still explain the "why" — that\'s how he builds trust. Engage with his reasoning even when you\'d rather just execute. '
    }

    if (getDriveDirection(visitorID.authenticate) === 'AVOID') {
      addendum += 'Cain\'s high Authenticate means he leads with physical presence and personal accountability. Your preference for delegation and abstraction will be noticed — on key initiatives, show up in person. '
    }

    if (getDriveDirection(visitorID.improvise) === 'USE') {
      addendum += 'Your high Improvise creates a leadership dynamic Cain values — you\'ll scout opportunities and take initiative. He provides the strategic container; you push the boundaries within it.'
    }

    return { narrative: addendum, tips: [], watchOut: null }
  },

  proScan(visitorPS) {
    let addendum = ''

    const domInteraction = getProScanTraitInteraction('dominance', CAIN.proScan.dominance, visitorPS.dominance)
    if (domInteraction) {
      addendum += domInteraction + ' '
    }

    const eInteraction = getEnergyStyleInteraction(CAIN.proScan.energy, visitorPS.energy || [])
    if (eInteraction) {
      addendum += `Leadership energy: ${eInteraction}`
    }

    return { narrative: addendum, tips: [], watchOut: null }
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY 6: OUR BLIND SPOTS
// ═══════════════════════════════════════════════════════════════════════════

export const blindSpotsData = {
  id: 'blindSpots',
  title: 'Our Blind Spots',
  icon: '🔍',

  mbti(visitorMBTI) {
    const vType = mbtiType(visitorMBTI)
    if (!vType) return null

    const cainType = mbtiType(CAIN.mbti)
    const cainInf = inferiorFn(CAIN.mbti)
    const vInf = inferiorFn(visitorMBTI)

    let narrative = `Cain's inferior function is ${FN_LABELS[cainInf]} (${cainInf}) — he has genuine blind spots around personal values articulation, emotional self-awareness, and understanding what matters to him beyond effectiveness. He can be emotionally tone-deaf in ways he doesn't recognize. `

    if (vInf) {
      narrative += `Your inferior function is ${FN_LABELS[vInf]} (${vInf}) — ${getInferiorBlindSpot(vInf)}. `
    }

    if (cainInf === vInf) {
      narrative += 'You share the same inferior function — this is a significant shared blind spot. Neither of you will naturally catch what the other misses in this domain. Bring in a third perspective for decisions that require this function.'
    } else if (vType.stack.includes(cainInf)) {
      const pos = vType.stack.indexOf(cainInf)
      if (pos <= 1) {
        narrative += `Your ${['dominant', 'auxiliary'][pos]} ${cainInf} covers Cain's blind spot. You see what he misses in this domain — use this consciously and bring it to his attention when it matters.`
      }
    }

    return { narrative, tips: [], watchOut: null }
  },

  disc(visitorDisc) {
    const vp = discPrimary(visitorDisc)
    let narrative = ''

    // Cain's D blind spots
    narrative += 'Cain\'s D-style has consistent blind spots: impatience that dismisses valid concerns, directness that damages relationships, speed that creates errors, and a genuine inability to see when others need more time or context. He underestimates the cost of his pace on people. '

    const blindMap = {
      D: 'Two D-styles share the same blind spot pattern — neither naturally attends to relationship maintenance, emotional impact, or the patience required for sustainable change. You amplify each other\'s impatience. Bring in S or C perspectives for balance.',
      I: 'Your I-style blind spot is follow-through and detail execution. Combined with Cain\'s D-style blind spot of relational damage, the pair can launch ambitiously and fail on both people management and execution detail. Assign explicit ownership for both.',
      S: 'Your S-style blind spot is initiative and confrontation avoidance. Combined with Cain\'s pace blindness, the pair\'s failure mode is: Cain charges ahead, you don\'t push back, resentment builds silently, and the relationship erodes without either of you naming why.',
      C: 'Your C-style blind spot is decisiveness under ambiguity. Combined with Cain\'s quality-checking blind spot, the pair can oscillate between reckless speed and analysis paralysis with nothing in between. Define "good enough" criteria before starting.',
    }

    narrative += blindMap[vp] || ''

    return {
      narrative,
      tips: [
        { for: 'visitor', tip: 'Name Cain\'s blind spots directly — he responds to directness, not hints. "You just talked over three people" will land better than gradually disengaging.' },
        { for: 'cain', tip: vp === 'S'
          ? 'Your biggest blind spot with this person: interpreting their patience as agreement. Check explicitly: "Are you good with this, or processing?"'
          : vp === 'C'
          ? 'Your biggest blind spot with this person: dismissing their analysis as overthinking. When they raise concerns, they\'ve usually found something real.'
          : vp === 'I'
          ? 'Your biggest blind spot with this person: undervaluing their relationship work. The connections they build are infrastructure you depend on.'
          : 'Your biggest blind spot with this person: assuming shared understanding faster than it exists. Two D-styles assume too much and verify too little.'
        },
      ],
      watchOut: 'The most dangerous blind spot is the one both of you share — neither will see it coming.',
    }
  },

  enneagram(visitorEnn) {
    const vType = ennType(visitorEnn.type)
    if (!vType) return null

    const cainType = ennType(CAIN.ennType)
    const pairing = getEnneagramPairing(CAIN.ennType, visitorEnn.type)

    let narrative = 'Cain\'s 8 blind spots: vulnerability avoidance that prevents genuine intimacy, intensity that intimidates people who then won\'t give him honest feedback, and a belief that he can power through anything — including situations that require surrender or patience. He mistakes control for safety. '

    const ennBlindMap = {
      1: 'Your Type 1 blind spot: believing there\'s one "right" way. Combined with Cain\'s Type 8 conviction that he\'s always right, this pair can deadlock on principle. The actual blind spot is that you\'re both wrong about something neither will admit.',
      2: 'Your Type 2 blind spot: giving to receive. You may not realize you\'re keeping score until the resentment erupts. Cain won\'t notice because he doesn\'t operate transactionally — your unspoken expectations will blindside both of you.',
      3: 'Your Type 3 blind spot: image management. Cain will see through it immediately and lose trust. The pair\'s blind spot: both confuse achievement with self-worth, and neither stops to ask "is this actually what matters?"',
      4: 'Your Type 4 blind spot: believing your emotional experience is more real or deep than others\'. Cain\'s emotional life is volcanic — he just doesn\'t perform it. The pair\'s blind spot: both claim emotional authenticity while missing each other\'s genuine experience.',
      5: 'Your Type 5 blind spot: withdrawing when engagement is most needed. Cain\'s stress arrow points to 5 — under pressure, he joins you in withdrawal. The pair\'s blind spot: both retreat simultaneously, and no one re-initiates.',
      6: 'Your Type 6 blind spot: worst-case thinking that paralyzes. Cain\'s blind spot is the opposite: dismissing downside risk. The pair\'s complementary blind spots are actually useful IF you both listen — your risk awareness and his bias-to-action balance naturally.',
      7: 'Your Type 7 blind spot: reframing difficulty into opportunity before actually processing the difficulty. Cain (8w7) shares this 7-wing tendency. The pair\'s blind spot: both rush past the painful truth to get to the next move, missing signals that require sitting with discomfort.',
      8: 'Two 8s share the same blind spots: vulnerability avoidance, intensity as default, and the belief that more force solves more problems. Neither will model the vulnerability the other needs to see. This is the pair\'s biggest risk.',
      9: 'Your Type 9 blind spot: self-erasure. You merge with Cain\'s strong preferences and lose your own. He won\'t notice because your compliance looks like agreement. The pair\'s most dangerous blind spot: your buried anger and his expressed anger never meeting honestly.',
    }

    narrative += ennBlindMap[visitorEnn.type] || ''

    return {
      narrative,
      tips: pairing ? [{ for: 'visitor', tip: pairing.growthTogether.split('.').slice(0, 2).join('.') + '.' }] : [],
      watchOut: pairing?.frictionPoints?.split('.').slice(0, 2).join('.') + '.' || null,
    }
  },

  idDrives(visitorID) {
    const comparison = compareIDProfiles(CAIN.id, visitorID)
    const matched = Object.keys(comparison).filter(d => comparison[d].alignment === 'matched')
    let addendum = ''

    if (matched.length >= 3) {
      addendum += 'Highly matched I.D. profiles create powerful alignment — and shared blind spots. Where you both USE the same drive, neither compensates for the other\'s excess. Where you both AVOID, neither fills the gap. '
    }

    const drives = ['verify', 'authenticate', 'complete', 'improvise']
    drives.forEach(d => {
      if (comparison[d].alignment === 'matched' && comparison[d].dirA === 'USE') {
        const blindMap = {
          verify: 'Both high Verify: you\'ll both analyze endlessly. The shared blind spot is action bias — neither of you will say "good enough, ship it."',
          authenticate: 'Both high Authenticate: you\'ll both insist on personal involvement. The shared blind spot is delegation — important work that neither touches gets neglected.',
          complete: 'Both high Complete: you\'ll both demand structure. The shared blind spot is adaptability — when circumstances change, neither of you pivots easily.',
          improvise: 'Both high Improvise: you\'ll both seize opportunities. The shared blind spot is due diligence — exciting commitments get made before the analysis is done.',
        }
        addendum += (blindMap[d] || '') + ' '
      } else if (comparison[d].alignment === 'matched' && comparison[d].dirA === 'AVOID') {
        const blindMap = {
          verify: 'Both low Verify: neither of you naturally stress-tests assumptions. Decisions get made fast but may be poorly examined.',
          authenticate: 'Both low Authenticate: important work can be delegated until nobody owns it personally.',
          complete: 'Both low Complete: neither tracks details or follows through systematically. Things fall through cracks that neither notices.',
          improvise: 'Both low Improvise: neither of you takes bold risks. Opportunities pass while you both wait for certainty.',
        }
        addendum += (blindMap[d] || '') + ' '
      }
    })

    return { narrative: addendum, tips: [], watchOut: null }
  },

  proScan(visitorPS) {
    let addendum = ''

    // Cross-framework convergence — Cain's consistent weakness
    addendum += 'Cross-framework convergence on Cain\'s biggest blind spot: impatience and emotional distance. His DISC D, MBTI ENTJ, Enneagram 8, low Pace, and low Conformity ALL point to the same weakness — he moves too fast for most people and doesn\'t realize the relational cost. This isn\'t a soft signal; it\'s the loudest pattern in his entire profile. '

    if (visitorPS.pace === 'High') {
      addendum += 'Your high Pace means you naturally slow things down. This is Cain\'s most needed corrective — but only if you actively voice it. Silent patience reads as agreement.'
    }

    if (visitorPS.conformity === 'High') {
      addendum += ' Your high Conformity provides the structural discipline Cain lacks. His blind spot is process — not because he\'s lazy, but because he genuinely believes most process is unnecessary overhead. Some of it is. Some of it isn\'t. Your job: distinguish which.'
    }

    return { narrative: addendum, tips: [], watchOut: null }
  },
}

// ── Stress description helpers ────────────────────────────────────────────

function getStressDescription(type) {
  const map = {
    1: 'you become moody, irrational, and hypersensitive to criticism — the inner critic turns outward as dramatic self-pity',
    2: 'you become aggressive, controlling, and resentful — the normally generous impulse turns possessive and score-keeping',
    3: 'you disengage and go through the motions — productivity continues but authenticity vanishes, you become numb',
    4: 'you become clingy, over-involved in others\' feelings, and lose your boundaries — the need to be loved overrides the need to be authentic',
    5: 'you become scattered, impulsive, and overextended — the normally focused energy sprays across too many distractions',
    6: 'you become performative and status-conscious — projecting confidence you don\'t feel while the internal alarm stays on',
    7: 'you become hypercritical, rigid, and perfectionistic — the normally joyful energy turns into harsh self-judgment and fault-finding',
    8: 'you withdraw, become secretive, and over-analyze — the normally direct communicator goes quiet and strategic',
    9: 'you become anxious, suspicious, and worst-case-focused — the normally peaceful disposition gives way to paranoia and reactivity',
  }
  return map[type] || 'your behavior shifts under pressure'
}

function getStressTip(type) {
  const map = {
    1: 'When they become moody and dramatic, resist fixing it. Acknowledge the emotion before offering solutions.',
    2: 'When they become controlling, they need to hear "I value you for who you are, not what you give me."',
    3: 'When they disengage, don\'t push for more output. Ask: "How are you actually doing?" They won\'t offer it.',
    4: 'When they become clingy and needy, set gentle boundaries without rejecting them. They need presence, not merger.',
    5: 'When they become scattered and overcommitting, help them narrow focus. They need one clear priority.',
    6: 'When they become performative, they\'re terrified underneath. Offer concrete support, not reassurance.',
    7: 'When they become hypercritical, their joy has been exhausted. Reduce demands and let them recover.',
    8: 'When they withdraw into secrecy, give space but don\'t disappear. A direct check-in cuts through.',
    9: 'When they become anxious and suspicious, their repressed anger is surfacing. Help them name what\'s actually wrong.',
  }
  return map[type] || 'Recognize the behavior shift and adjust your approach.'
}

function getInferiorStress(fn) {
  const map = {
    Te: 'harsh, blunt efficiency demands replace your usual nuance — you become crudely controlling when overwhelmed',
    Ti: 'obsessive internal logic loops replace your usual warmth — you withdraw into analysis that feels cold to others',
    Fe: 'explosive people-pleasing or guilt-tripping replaces your usual composure — you become emotionally manipulative',
    Fi: 'uncharacteristic emotional outbursts replace your usual logic — deep personal hurt erupts without warning',
    Se: 'reckless sensory indulgence replaces your usual foresight — impulsive decisions, overeating, overexertion',
    Si: 'rigid adherence to past methods replaces your usual innovation — you cling to "how it was done before"',
    Ne: 'catastrophic possibility-generation replaces your usual reliability — worst-case scenarios multiply endlessly',
    Ni: 'paranoid pattern-reading replaces your usual pragmatism — you see conspiracies and hidden meanings everywhere',
  }
  return map[fn] || 'your weakest function takes over in unhealthy ways'
}

function getInferiorBlindSpot(fn) {
  const map = {
    Te: 'you struggle with systematic efficiency, objective measurement, and direct organizational authority',
    Ti: 'you struggle with internal logical consistency, detached analysis, and independent critical reasoning',
    Fe: 'you struggle with reading group emotional dynamics, building consensus, and maintaining social harmony',
    Fi: 'you struggle with articulating personal values, recognizing your own emotional needs, and authentic self-expression',
    Se: 'you struggle with present-moment awareness, physical environment details, and spontaneous real-time action',
    Si: 'you struggle with routine maintenance, detailed record-keeping, and learning from past experience',
    Ne: 'you struggle with generating alternative possibilities, brainstorming broadly, and seeing multiple interpretations',
    Ni: 'you struggle with long-range strategic vision, seeing convergent patterns, and trusting abstract intuition',
  }
  return map[fn] || 'this function represents your most significant developmental area'
}

// ── Master category registry ──────────────────────────────────────────────

export const ALL_CATEGORIES = [
  communicationData,
  decisionMakingData,
  pressureData,
  bestFromMeData,
  leadershipData,
  blindSpotsData,
]
