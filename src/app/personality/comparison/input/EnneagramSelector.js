'use client'
import { useState } from 'react'
import { ENNEAGRAM_TYPES, ENNEAGRAM_TRIADS } from '../data/enneagramTypes'
import EnneagramQuiz from './EnneagramQuiz'

const TYPE_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function EnneagramSelector({ value, onChange }) {
  const [mode, setMode] = useState('select')

  const selectedType = value?.type ?? null
  const selectedWing = value?.wing ?? null
  const typeData = selectedType ? ENNEAGRAM_TYPES[selectedType] : null
  const triad = typeData ? ENNEAGRAM_TRIADS[typeData.triad] : null

  function handleModeChange(m) {
    setMode(m)
    onChange({ type: null, wing: null })
  }

  const handleTypeChange = (e) => {
    const t = e.target.value ? parseInt(e.target.value, 10) : null
    onChange({ type: t, wing: null })
  }

  const handleWingChange = (e) => {
    const w = e.target.value ? parseInt(e.target.value, 10) : null
    onChange({ type: selectedType, wing: w })
  }

  const wingVariant =
    selectedWing && typeData?.wingVariants?.[String(selectedWing)]
      ? typeData.wingVariants[String(selectedWing)]
      : null

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Enneagram Type
        </label>
        <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 text-[11px]">
          {[['select', 'Select'], ['quiz', 'Take Quiz']].map(([m, label]) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`px-2.5 py-1 transition-colors font-medium ${
                mode === m
                  ? 'bg-amber-400 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {mode === 'select' ? (
        <>
          <div className="flex gap-2">
            {/* Type selector */}
            <select
              value={selectedType ?? ''}
              onChange={handleTypeChange}
              className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="">Type…</option>
              {TYPE_ORDER.map(n => {
                const t = ENNEAGRAM_TYPES[n]
                return (
                  <option key={n} value={n}>
                    {n} — {t.name}
                  </option>
                )
              })}
            </select>

            {/* Wing selector */}
            <select
              value={selectedWing ?? ''}
              onChange={handleWingChange}
              disabled={!selectedType}
              className="w-24 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="">Wing…</option>
              {typeData?.wings.map(w => (
                <option key={w} value={w}>
                  w{w}
                </option>
              ))}
            </select>
          </div>

          {typeData && (
            <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 animate-fadeUp">
              {/* Triad badge */}
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: triad?.lightColor,
                    color: triad?.color,
                  }}
                >
                  {typeData.triad} Triad
                </span>
                {wingVariant && (
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {wingVariant.label}
                  </span>
                )}
              </div>

              {/* Core fear */}
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mb-1">
                <span className="font-semibold">Core fear:</span> {typeData.coreFear}
              </p>

              {/* Wing description */}
              {wingVariant && (
                <p className="text-[11px] text-slate-400 leading-snug mt-1">
                  {wingVariant.description}
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <EnneagramQuiz
          onChange={(result) => {
            onChange(result)
            setMode('select')
          }}
        />
      )}
    </div>
  )
}
