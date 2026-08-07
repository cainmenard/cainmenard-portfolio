'use client'
import { PROSCAN_TRAITS, PROSCAN_LOGIC_STYLES, PROSCAN_ENERGY_STYLES } from '../data/proScanTraits'

const TRAIT_ORDER = ['dominance', 'extroversion', 'pace', 'conformity']
const LEVELS = ['High', 'Mid', 'Low']

export default function ProScanInput({ value, onChange }) {
  const update = (field, val) => onChange({ ...value, [field]: val })

  const toggleEnergy = (style) => {
    const current = value?.energy ?? []
    const next = current.includes(style)
      ? current.filter(s => s !== style)
      : [...current, style]
    onChange({ ...value, energy: next })
  }

  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
        ProScan®
      </label>

      {/* Behavioral trait dropdowns — 2×2 grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {TRAIT_ORDER.map(trait => {
          const def = PROSCAN_TRAITS[trait]
          const selected = value?.[trait] ?? null

          return (
            <div key={trait}>
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                {def.name}
              </label>
              <select
                value={selected ?? ''}
                onChange={e => update(trait, e.target.value || null)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              >
                <option value="">Select…</option>
                {LEVELS.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>

              {selected && (
                <p className="text-[10px] text-slate-400 mt-1 leading-snug line-clamp-2">
                  {def[selected.toLowerCase()].description}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Logic style — segmented toggle */}
      <div className="mb-4">
        <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
          Logic Style
        </label>
        <div className="flex gap-1.5">
          {Object.entries(PROSCAN_LOGIC_STYLES).map(([key, def]) => {
            const isSelected = value?.logic === key
            return (
              <button
                key={key}
                onClick={() => update('logic', isSelected ? null : key)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                  isSelected
                    ? 'bg-amber-400 border-amber-400 text-white'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-300 dark:hover:border-amber-600'
                }`}
              >
                {def.label}
              </button>
            )
          })}
        </div>
        {value?.logic && (
          <p className="text-[11px] text-slate-400 mt-1.5 leading-snug animate-fadeUp">
            {PROSCAN_LOGIC_STYLES[value.logic].description}
          </p>
        )}
      </div>

      {/* Energy style — multi-select pill toggles */}
      <div>
        <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
          Energy Style
          <span className="normal-case font-normal text-slate-400 dark:text-slate-500 ml-1">
            (select all that apply)
          </span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(PROSCAN_ENERGY_STYLES).map(([key, def]) => {
            const isSelected = (value?.energy ?? []).includes(key)
            return (
              <button
                key={key}
                onClick={() => toggleEnergy(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                  isSelected
                    ? 'bg-amber-400 border-amber-400 text-white'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-300 dark:hover:border-amber-600'
                }`}
              >
                {def.label}
              </button>
            )
          })}
        </div>
        {(value?.energy ?? []).length > 0 && (
          <div className="mt-2 space-y-1 animate-fadeUp">
            {(value.energy).map(style => (
              <p key={style} className="text-[11px] text-slate-400 leading-snug">
                <span className="font-semibold text-slate-500 dark:text-slate-400">{style}:</span>{' '}
                {PROSCAN_ENERGY_STYLES[style]?.description}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
