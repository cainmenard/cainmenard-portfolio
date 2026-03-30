'use client'
import { useState, useEffect } from 'react'

const BAR_COLORS = [
  { label: 'Natural', color: 'var(--accent)' },
  { label: 'Priority', color: '#ef4444' },
  { label: 'Outward', color: '#3b82f6' },
]

export default function ProScanBar({ trait, basic, priority, predictor, index = 0 }) {
  const [widths, setWidths] = useState([0, 0, 0])
  const values = [basic, priority, predictor]

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidths(values.map(v => (v / 7) * 100))
    }, 100 + index * 100)
    return () => clearTimeout(timer)
  }, [basic, priority, predictor, index])

  return (
    <div className="mb-4">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{trait}</span>
        <span className="text-xs text-slate-400 tabular-nums">{basic} / {priority} / {predictor}</span>
      </div>
      <div className="space-y-1">
        {BAR_COLORS.map((bar, i) => (
          <div key={bar.label} className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-slate-400 w-12 text-right shrink-0">{bar.label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${widths[i]}%`, background: bar.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
