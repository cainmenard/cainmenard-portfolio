'use client'
import { useState } from 'react'
import { MBTI_TYPES, TEMPERAMENTS } from '../data/mbtiTypes'
import MBTIQuiz from './MBTIQuiz'

const TEMPERAMENT_ORDER = ['NT', 'NF', 'SP', 'SJ']

const ROLE_ABBR = ['dom', 'aux', 'ter', 'inf']

const STACK_COLORS = [
  'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400',
  'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
  'bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400',
  'bg-slate-100 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500',
]

export default function MBTISelector({ value, onChange }) {
  const [mode, setMode] = useState('select')

  const grouped = TEMPERAMENT_ORDER.reduce((acc, t) => {
    acc[t] = Object.values(MBTI_TYPES).filter(type => type.temperament === t)
    return acc
  }, {})

  const selected = value ? MBTI_TYPES[value] : null

  function handleModeChange(m) {
    setMode(m)
    onChange(null)
  }

  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
        MBTI Type
      </label>

      {/* Mode tab toggle */}
      <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 text-[11px] mb-2">
        {[['select', 'Select'], ['quiz', 'Take Quiz']].map(([m, label]) => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={`flex-1 py-1.5 font-medium transition-colors ${
              mode === m
                ? 'bg-amber-400 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === 'select' ? (
        <>
          <select
            value={value || ''}
            onChange={e => onChange(e.target.value || null)}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="">Select a type…</option>
            {TEMPERAMENT_ORDER.map(t => (
              <optgroup key={t} label={`${t} — ${TEMPERAMENTS[t].label}`}>
                {grouped[t].map(type => (
                  <option key={type.code} value={type.code}>
                    {type.code} — {type.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          {selected && (
            <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 animate-fadeUp">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-0.5">
                {selected.label}
                <span className="font-normal text-slate-400 dark:text-slate-500 ml-1">
                  · {TEMPERAMENTS[selected.temperament].label}
                </span>
              </p>
              <p className="text-[11px] text-slate-400 mb-2">{selected.description}</p>

              {/* Cognitive stack pills */}
              <div className="flex flex-wrap gap-1">
                {selected.stack.map((fn, i) => (
                  <span
                    key={fn}
                    className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${STACK_COLORS[i]}`}
                  >
                    {fn}
                    <span className="font-normal ml-1 text-[10px] opacity-70">
                      {ROLE_ABBR[i]}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <MBTIQuiz
          onChange={(code) => {
            onChange(code)
            setMode('select')
          }}
        />
      )}
    </div>
  )
}
