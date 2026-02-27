'use client'
import { allAssessments } from '../data'

export default function AssessmentGrid({ active, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {allAssessments.map((a) => {
        const isActive = active === a.id
        return (
          <button
            key={a.id}
            onClick={() => onSelect(isActive ? null : a.id)}
            className={`group text-left p-4 rounded-xl border transition-all duration-200 ${
              isActive
                ? 'bg-white dark:bg-slate-800 border-amber-300 dark:border-amber-500 shadow-md'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-600 hover:shadow-sm'
            }`}
          >
            <span className="text-xl mb-2 block">{a.icon}</span>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{a.name}</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {a.headline}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">{a.subtitle}</p>
          </button>
        )
      })}
    </div>
  )
}
