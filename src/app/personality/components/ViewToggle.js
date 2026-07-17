'use client'

export default function ViewToggle({ mode, onChange }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1">
      <button
        onClick={() => onChange('pro')}
        className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-all duration-200 ${
          mode === 'pro'
            ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm'
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
        }`}
      >
        Professional
      </button>
      <button
        onClick={() => onChange('full')}
        className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-all duration-200 ${
          mode === 'full'
            ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm'
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
        }`}
      >
        Full Explorer
      </button>
    </div>
  )
}
