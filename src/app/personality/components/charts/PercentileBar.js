'use client'
import { useState, useEffect } from 'react'

export default function PercentileBar({ label, value, index = 0 }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), 100 + index * 80)
    return () => clearTimeout(timer)
  }, [value, index])

  return (
    <div className="mb-3">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--accent)' }}>{value}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${width}%`,
            background: 'var(--accent)',
          }}
        />
      </div>
    </div>
  )
}
