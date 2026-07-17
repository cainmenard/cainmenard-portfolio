'use client'
import { useState } from 'react'
import { ID_DRIVES, getDriveDirection } from '../data/idDrives'

const DRIVES = ['verify', 'authenticate', 'complete', 'improvise']

const DIRECTION_STYLES = {
  USE:     { text: 'text-emerald-600 dark:text-emerald-400', label: 'USE' },
  NEUTRAL: { text: 'text-slate-500 dark:text-slate-400',     label: 'NEUTRAL' },
  AVOID:   { text: 'text-rose-500 dark:text-rose-400',       label: 'AVOID' },
}

const DEFAULT_SCORES = { verify: 5, authenticate: 5, complete: 5, improvise: 5 }

export default function IDInput({ value, onChange }) {
  const [openTooltip, setOpenTooltip] = useState(null)

  const scores = value ?? DEFAULT_SCORES

  const handleChange = (drive, raw) => {
    onChange({ ...scores, [drive]: Number(raw) })
  }

  const toggleTooltip = (drive) => {
    setOpenTooltip(prev => (prev === drive ? null : drive))
  }

  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
        Instinctive Drives (I.D.)
      </label>

      <div className="space-y-5">
        {DRIVES.map(drive => {
          const def = ID_DRIVES[drive]
          const score = scores[drive] ?? 5
          const dir = getDriveDirection(score)
          const dirStyle = DIRECTION_STYLES[dir]
          const isOpen = openTooltip === drive

          return (
            <div key={drive}>
              {/* Drive name + direction badge */}
              <div className="flex items-center justify-between mb-1">
                <button
                  onClick={() => toggleTooltip(drive)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  aria-expanded={isOpen}
                >
                  {def.name}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-colors ${isOpen ? 'text-amber-500' : 'text-slate-400'}`}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </button>

                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold uppercase tracking-wide ${dirStyle.text}`}>
                    {dirStyle.label}
                  </span>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 w-4 text-right">
                    {score}
                  </span>
                </div>
              </div>

              {/* Tooltip: drive description + USE/AVOID traits */}
              {isOpen && (
                <div className="mb-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 animate-fadeUp">
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug mb-2">
                    {def.description}
                  </p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-snug">
                    <span className="font-bold">USE (6–9): </span>{def.useTraits}
                  </p>
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 leading-snug mt-1">
                    <span className="font-bold">AVOID (1–4): </span>{def.avoidTraits}
                  </p>
                </div>
              )}

              {/* Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-rose-400 dark:text-rose-500 font-bold w-10 shrink-0">
                  AVOID
                </span>
                <input
                  type="range"
                  min="1"
                  max="9"
                  step="1"
                  value={score}
                  onChange={e => handleChange(drive, e.target.value)}
                  className="flex-1 h-2 rounded-full accent-amber-500"
                />
                <span className="text-[10px] text-emerald-500 dark:text-emerald-400 font-bold w-8 text-right shrink-0">
                  USE
                </span>
              </div>

              {/* Tick marks 1–9 */}
              <div className="flex justify-between text-[9px] text-slate-300 dark:text-slate-600 px-10 mt-0.5 select-none">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                  <span
                    key={n}
                    className={score === n ? 'text-amber-500 font-bold' : ''}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
