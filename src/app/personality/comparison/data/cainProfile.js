/**
 * Cain Menard's personality profile adapted for comparison.
 *
 * Sources existing data from ../../data.js and reshapes it into the
 * flat comparison-friendly schema defined in the spec.  Fields that
 * the original data.js didn't carry (hornevian group, harmonic group,
 * integration/disintegration points, individual I.D. drive scores, etc.)
 * are filled in here from the spec's "Cain Menard's Profile" section.
 */

import {
  mbtiData,
  discData,
  enneagramData,
  proscanData,
  idDrivesData,
} from '../../data'

const cainProfile = {
  name: 'Cain Menard',

  // ── MBTI ──
  mbti: {
    type: 'ENTJ',
    variant: 'A',
    label: mbtiData.subtitle,                     // "Commander"
    dichotomies: {
      EI: { label: mbtiData.scores.EI.left, code: mbtiData.scores.EI.letter, percentage: mbtiData.scores.EI.value },
      SN: { label: mbtiData.scores.SN.left, code: mbtiData.scores.SN.letter, percentage: mbtiData.scores.SN.value },
      TF: { label: mbtiData.scores.TF.left, code: mbtiData.scores.TF.letter, percentage: mbtiData.scores.TF.value },
      JP: { label: mbtiData.scores.JP.left, code: mbtiData.scores.JP.letter, percentage: mbtiData.scores.JP.value },
      AT: { label: mbtiData.scores.AT.left, code: mbtiData.scores.AT.letter, percentage: mbtiData.scores.AT.value },
    },
    cognitiveStack: mbtiData.cognitiveStack.map(fn => ({
      function: fn.fn,
      role: fn.role,
      label: fn.name,
    })),
  },

  // ── DISC ──
  disc: {
    primary: 'D',
    style: 'D',
    label: 'Producer',
    description: discData.subtitle,               // "High Dominance"
  },

  // ── Enneagram ──
  enneagram: {
    type: enneagramData.type.core,                 // 8
    wing: enneagramData.type.wing,                 // 7
    label: enneagramData.subtitle,                 // "The Maverick"
    triad: 'Gut',
    coreEmotion: 'Anger',
    integrationPoint: enneagramData.arrows.growth.number,   // 2
    disintegrationPoint: enneagramData.arrows.stress.number, // 5
    hornevianGroup: 'Assertive',
    harmonicGroup: 'Reactive',
  },

  // ── Instinctive Drives ──
  instinctiveDrives: {
    verify: idDrivesData.drives.find(d => d.name === 'Verify').score,           // 7
    authenticate: idDrivesData.drives.find(d => d.name === 'Authenticate').score, // 7
    complete: idDrivesData.drives.find(d => d.name === 'Complete').score,         // 3
    improvise: idDrivesData.drives.find(d => d.name === 'Improvise').score,       // 3
    label: idDrivesData.subtitle,                  // "Verify · Authenticate"
  },

  // ── ProScan ──
  proScan: {
    dominance: 'High',
    extroversion: 'High',
    pace: 'Low',
    conformity: 'Low',
    logic: 'Fact',
    energyStyle: [proscanData.energy.style],       // ["Thrust"]
    energyLevel: 'High',
  },
}

export default cainProfile
