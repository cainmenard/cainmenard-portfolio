'use client'
import { themes } from '../data'

export default function ThemeExplorer({ active, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {themes.map((t) => {
        const isActive = active === t.id
        return (
          <button
            key={t.id}
            onClick={() => onSelect(isActive ? null : t.id)}
            className={`group text-left p-4 rounded-xl border transition-all duration-200 ${
              isActive
                ? 'bg-white dark:bg-slate-800 border-amber-300 dark:border-amber-500 shadow-md'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-600 hover:shadow-sm'
            }`}
          >
            <span className="text-xl mb-2 block">{t.icon}</span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {t.name}
            </p>
          </button>
        )
      })}
    </div>
  )
}
