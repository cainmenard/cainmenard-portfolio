'use client'
import { useState } from 'react'
import { DISC_PROFILES, DISC_QUADRANTS } from '../data/discProfiles'
import DISCQuiz from './DISCQuiz'

/**
 * Infer the closest DISC blend code from raw dimension scores.
 * Only adjacent blends exist on the DISC circle — opposite pairs (D-S, I-C)
 * fall back to the dominant pure style.
 */
function inferDISCCode(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const [primary, pScore] = sorted[0]
  const [secondary, sScore] = sorted[1]
  const gap = pScore - sScore

  if (gap >= 30) return primary

  // Try both case variants; uppercase secondary = stronger influence
  const equalCode = `${primary}${secondary}`          // e.g. 'DI'
  const lowerCode = `${primary}${secondary.toLowerCase()}` // e.g. 'Di'

  const targetCode = gap < 15 ? equalCode : lowerCode
  const exists = DISC_PROFILES.find(p => p.code === targetCode)

  if (exists) return targetCode

  // Opposite dimension (non-adjacent) — fall back to pure primary
  return primary
}

function AdvancedDISC({ onChange }) {
  const [scores, setScores] = useState({ D: 50, I: 50, S: 50, C: 50 })
  const [detectedCode, setDetectedCode] = useState(null)

  const update = (dim, val) => {
    const next = { ...scores, [dim]: Number(val) }
    setScores(next)
    const code = inferDISCCode(next)
    setDetectedCode(code)
    onChange(code)
  }

  const detected = detectedCode ? DISC_PROFILES.find(p => p.code === detectedCode) : null

  return (
    <div className="space-y-3">
      {['D', 'I', 'S', 'C'].map(dim => (
        <div key={dim}>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-bold text-slate-600 dark:text-slate-300">
              {dim} — {DISC_QUADRANTS[dim].label}
            </span>
            <span className="text-slate-400 font-mono">{scores[dim]}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={scores[dim]}
            onChange={e => update(dim, e.target.value)}
            className="w-full h-2 rounded-full accent-amber-500"
          />
        </div>
      ))}

      {detected && (
        <p className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">
          Detected: {detected.code} — {detected.label}
        </p>
      )}
      <p className="text-[11px] text-slate-400 leading-snug">
        Adjust sliders to match your relative strengths. Adjacent dimensions determine your blend style.
      </p>
    </div>
  )
}

export default function DISCSelector({ value, onChange }) {
  const [mode, setMode] = useState('simple')

  const handleModeChange = (m) => {
    setMode(m)
    onChange(null)
  }

  const selected = value ? DISC_PROFILES.find(p => p.code === value) : null

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          DISC Style
        </label>
        <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 text-[11px]">
          {['simple', 'advanced', 'quiz'].map(m => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`px-2.5 py-1 capitalize transition-colors ${
                mode === m
                  ? 'bg-amber-400 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {mode === 'simple' && (
        <select
          value={value || ''}
          onChange={e => onChange(e.target.value || null)}
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        >
          <option value="">Select a style…</option>
          {['D', 'I', 'S', 'C'].map(primary => (
            <optgroup key={primary} label={`${primary} — ${DISC_QUADRANTS[primary].label}`}>
              {DISC_PROFILES.filter(p => p.primary === primary).map(p => (
                <option key={p.code} value={p.code}>
                  {p.code} — {p.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      )}

      {mode === 'advanced' && <AdvancedDISC onChange={onChange} />}

      {mode === 'quiz' && (
        <DISCQuiz
          onChange={(code) => {
            onChange(code)
            setMode('simple')
          }}
        />
      )}

      {selected && (
        <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 animate-fadeUp">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
            {selected.label}
          </p>
          <p className="text-[11px] text-slate-400 leading-snug">{selected.description}</p>
        </div>
      )}
    </div>
  )
}
