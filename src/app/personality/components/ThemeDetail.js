'use client'
import { themes } from '../data'

export default function ThemeDetail({ themeId }) {
  const theme = themes.find(t => t.id === themeId)
  if (!theme) return null

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 animate-fadeUp">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{theme.icon}</span>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>{theme.name}</h3>
      </div>

      <p className="text-sm italic leading-relaxed mb-6" style={{ color: 'var(--accent)' }}>
        {theme.synthesis}
      </p>

      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Converging Evidence</p>
      <div className="space-y-2">
        {theme.points.map((p, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
            <span
              className="text-[11px] font-bold uppercase tracking-wider shrink-0 mt-0.5"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-body)' }}
            >
              {p.source}
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{p.insight}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
