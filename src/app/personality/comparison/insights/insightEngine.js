/**
 * Insight Engine — assembles collaboration insights from available assessments.
 *
 * Takes cainProfile + visitorProfile, checks which assessments are present,
 * and progressively builds richer write-ups as more data becomes available.
 *
 * Returns an array of 6 insight objects (one per category). Each object
 * includes:
 *   - id, title, icon, summary
 *   - detail: { narrative, tips, watchOut, basedOn, deepen }
 *   - sourcesUsed: number of frameworks that fed this insight
 *
 * Categories with zero available frameworks return null and are filtered out.
 */

import { ALL_CATEGORIES } from './insightData'
import { getDriveDirection } from '../data/idDrives'

// ── Framework availability checks ────────────────────────────────────────

function hasMBTI(v) {
  return !!v.mbti
}

function hasDISC(v) {
  return !!v.disc
}

function hasEnneagram(v) {
  return !!(v.enneagram?.type)
}

function hasIDDrives(v) {
  if (!v.idDrives) return false
  return Object.values(v.idDrives).some(val => val !== 5)
}

function hasProScan(v) {
  const ps = v.proScan
  return !!(ps?.dominance && ps?.extroversion && ps?.pace && ps?.conformity)
}

// Framework display names
const FRAMEWORK_NAMES = {
  mbti: 'MBTI',
  disc: 'DISC',
  enneagram: 'Enneagram',
  idDrives: 'I.D. Drives',
  proScan: 'ProScan',
}

// Which frameworks each category uses (ordered by priority)
const CATEGORY_FRAMEWORKS = {
  communication: {
    primary: ['disc'],
    secondary: ['mbti', 'enneagram', 'idDrives', 'proScan'],
  },
  decisionMaking: {
    primary: ['mbti'],
    secondary: ['disc', 'enneagram', 'idDrives', 'proScan'],
  },
  pressure: {
    primary: ['enneagram'],
    secondary: ['mbti', 'disc', 'proScan', 'idDrives'],
  },
  bestFromMe: {
    primary: ['disc'],
    secondary: ['mbti', 'enneagram', 'idDrives', 'proScan'],
  },
  leadership: {
    primary: ['disc'],
    secondary: ['mbti', 'enneagram', 'idDrives', 'proScan'],
  },
  blindSpots: {
    primary: ['mbti', 'disc', 'enneagram'],
    secondary: ['idDrives', 'proScan'],
  },
}

// Deepen prompts — what adding each framework would contribute
const DEEPEN_PROMPTS = {
  communication: {
    mbti: 'Add your MBTI type to see how cognitive processing differences affect your communication sync',
    disc: 'Add your DISC style to see pace, directness, and focus-axis dynamics',
    enneagram: 'Add your Enneagram type to see how core fears shape communication triggers',
    idDrives: 'Add your I.D. Drives to see how Verify and Authenticate drives affect information exchange',
    proScan: 'Add your ProScan results to see energy-style effects on communication rhythm',
  },
  decisionMaking: {
    mbti: 'Add your MBTI type to see Thinking/Feeling and Judging/Perceiving decision dynamics',
    disc: 'Add your DISC style to see speed-vs-thoroughness tension in decisions',
    enneagram: 'Add your Enneagram type to see how core fears shape risk perception',
    idDrives: 'Add your I.D. Drives to see Verify and Improvise effects on commitment speed',
    proScan: 'Add your ProScan results to see logic style (Fact vs. Feeling) alignment',
  },
  pressure: {
    mbti: 'Add your MBTI type to see inferior function eruptions under extreme stress',
    disc: 'Add your DISC style to see how your behavioral style shifts under pressure',
    enneagram: 'Add your Enneagram type to see stress arrows and disintegration patterns',
    idDrives: 'Add your I.D. Drives to see how drive intensities shift under stress',
    proScan: 'Add your ProScan results to see energy depletion patterns and pace tension',
  },
  bestFromMe: {
    mbti: 'Add your MBTI type to see temperament-specific needs and delegation preferences',
    disc: 'Add your DISC style to see what management approaches work — and what backfires',
    enneagram: 'Add your Enneagram type to see how core desires shape what motivates and drains you',
    idDrives: 'Add your I.D. Drives to see process, autonomy, and accountability preferences',
    proScan: 'Add your ProScan results to see energy and dominance dynamics',
  },
  leadership: {
    mbti: 'Add your MBTI type to see cognitive function alignment with Cain\'s Te-dominant style',
    disc: 'Add your DISC style to see how Cain\'s directive leadership lands with your behavioral style',
    enneagram: 'Add your Enneagram type to see how 8w7 leadership interacts with your core motivations',
    idDrives: 'Add your I.D. Drives to see how Verify and Authenticate shape the authority dynamic',
    proScan: 'Add your ProScan results to see dominance and energy style dynamics in the leadership relationship',
  },
  blindSpots: {
    mbti: 'Add your MBTI type to see shared inferior function vulnerabilities',
    disc: 'Add your DISC style to see diagonal-opposite blind spot patterns',
    enneagram: 'Add your Enneagram type to see defense mechanism blind spots and growth paths',
    idDrives: 'Add your I.D. Drives to see shared drive blind spots',
    proScan: 'Add your ProScan results to see cross-framework convergence on key weaknesses',
  },
}

// ── Summary generators ───────────────────────────────────────────────────

function generateSummary(categoryId, basedOn, visitorProfile) {
  const summaries = {
    communication: {
      disc: () => {
        const vp = visitorProfile.disc?.charAt(0)?.toUpperCase()
        const map = {
          D: 'Fast, direct, and task-focused on both sides — efficient but competitive.',
          I: 'Fast pace meets fast pace, but task-focus meets people-focus. Bridge the gap early.',
          S: 'Maximum pace tension — Cain sprints, you sustain. Explicit norms prevent friction.',
          C: 'Both task-focused but at different speeds. Align on "when" before debating "how."',
        }
        return map[vp] || 'Different communication styles that need deliberate bridging.'
      },
      mbti: () => {
        const vi = visitorProfile.mbti?.[0] === 'I'
        return vi
          ? 'Extravert meets introvert — processing speed and channel preferences differ.'
          : 'Both extraverts — fast and external, but watch for airtime competition.'
      },
    },
    decisionMaking: {
      mbti: () => {
        const vt = visitorProfile.mbti?.[2] === 'T'
        const vj = visitorProfile.mbti?.[3] === 'J'
        if (vt && vj) return 'Aligned on logic and closure speed — watch for premature commitment.'
        if (vt) return 'Both logical, but you keep options open longer than Cain prefers.'
        if (vj) return 'Both want fast closure, but you filter through values while Cain filters through logic.'
        return 'Different filters and different tempo — negotiate both before deciding together.'
      },
    },
    pressure: {
      enneagram: () => {
        const vt = visitorProfile.enneagram?.type
        if ([4, 8].includes(vt)) return 'Both Reactive types under stress — intensity amplifies. Create de-escalation protocols.'
        if ([1, 3, 5].includes(vt)) return 'Competency types handle stress differently than Cain\'s reactive style — your calm analysis meets his direct intensity.'
        return 'Different stress patterns — knowing each other\'s warning signs prevents misreading withdrawal as disengagement.'
      },
    },
    bestFromMe: {
      disc: () => {
        const vp = visitorProfile.disc?.charAt(0)?.toUpperCase()
        const map = {
          D: 'Divide domains clearly — two result-drivers need separate lanes.',
          I: 'Give Cain the strategy, you own the people. Mutual respect, different strengths.',
          S: 'You need stability; Cain brings change. Negotiate check-in rhythms that work for both.',
          C: 'You provide quality Cain skips. Set the bar upfront, then own the timeline.',
        }
        return map[vp] || 'Understand what Cain needs — and what backfires.'
      },
    },
    leadership: {
      disc: () => 'Cain leads through direction and decisiveness. Here\'s how that intersects with your style.',
      mbti: () => 'Te-dominant leadership meets your cognitive style. Here\'s what to expect.',
    },
    blindSpots: {
      mbti: () => 'Inferior function blind spots — what you each consistently miss.',
      disc: () => 'DISC diagonal tensions reveal where this pair consistently overlooks key dynamics.',
      enneagram: () => 'Defense mechanisms create blind spots neither of you recognizes without feedback.',
    },
  }

  // Try each basedOn framework until we get a summary
  const catSummaries = summaries[categoryId]
  if (!catSummaries) return 'Personalized collaboration dynamics based on your combined profiles.'

  for (const fw of basedOn) {
    if (catSummaries[fw]) return catSummaries[fw]()
  }

  return 'Personalized collaboration dynamics based on your combined profiles.'
}

// ── Main engine ──────────────────────────────────────────────────────────

/**
 * Generate all 6 collaboration insights based on available visitor data.
 *
 * @param {Object} visitorProfile  The visitor's entered assessment data
 * @returns {Array<Object|null>}  6 insight objects; nulls for categories with no data
 */
export default function buildAllInsights(visitorProfile) {
  if (!visitorProfile) return []

  // Which frameworks are available?
  const available = {
    mbti: hasMBTI(visitorProfile),
    disc: hasDISC(visitorProfile),
    enneagram: hasEnneagram(visitorProfile),
    idDrives: hasIDDrives(visitorProfile),
    proScan: hasProScan(visitorProfile),
  }

  const results = ALL_CATEGORIES.map(category => {
    const catId = category.id
    const frameworks = CATEGORY_FRAMEWORKS[catId]
    if (!frameworks) return null

    // Determine which frameworks we can call for this category
    const allFrameworks = [...frameworks.primary, ...frameworks.secondary]
    const activeFrameworks = allFrameworks.filter(fw => available[fw])

    if (activeFrameworks.length === 0) return null

    // Assemble the insight from each available framework
    let fullNarrative = ''
    const allTips = []
    let primaryWatchOut = null
    const basedOn = []

    for (const fw of activeFrameworks) {
      const generator = category[fw]
      if (!generator) continue

      // Pass the appropriate data slice
      let result = null
      try {
        if (fw === 'mbti') result = generator(visitorProfile.mbti)
        else if (fw === 'disc') result = generator(visitorProfile.disc)
        else if (fw === 'enneagram') result = generator(visitorProfile.enneagram)
        else if (fw === 'idDrives') result = generator(visitorProfile.idDrives)
        else if (fw === 'proScan') result = generator(visitorProfile.proScan)
      } catch {
        // Skip frameworks that error
        continue
      }

      if (!result || !result.narrative) continue

      fullNarrative += result.narrative + ' '
      basedOn.push(fw)

      if (result.tips?.length > 0) {
        allTips.push(...result.tips)
      }

      if (result.watchOut && !primaryWatchOut) {
        primaryWatchOut = result.watchOut
      }
    }

    if (!fullNarrative.trim()) return null

    // Find which frameworks would deepen this insight
    const missingFrameworks = allFrameworks.filter(fw => !available[fw])
    const deepenPrompts = DEEPEN_PROMPTS[catId]
    let deepen = null
    if (deepenPrompts && missingFrameworks.length > 0) {
      // Pick the most impactful missing framework (first primary, then secondary)
      const first = missingFrameworks[0]
      deepen = deepenPrompts[first] || null
    }

    // Deduplicate tips by role
    const visitorTips = allTips.filter(t => t.for === 'visitor')
    const cainTips = allTips.filter(t => t.for === 'cain')
    const dedupedTips = [
      ...visitorTips.slice(0, 3),
      ...cainTips.slice(0, 2),
    ]

    const summary = generateSummary(catId, basedOn, visitorProfile)

    return {
      id: catId,
      title: category.title,
      icon: category.icon,
      summary,
      sourcesUsed: basedOn.length,
      detail: {
        narrative: fullNarrative.trim(),
        tips: dedupedTips,
        watchOut: primaryWatchOut,
        basedOn,
        deepen,
      },
    }
  })

  return results.filter(Boolean)
}
