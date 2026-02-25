'use client'
import { useState, useEffect } from 'react'

export default function DichotomyScale({ left, right, value, letter, index = 0 }) {
  const [pos, setPos] = useState(50)

  useEffect(() => {
    const timer = setTimeout(() => setPos(value), 100 + index * 80)
    return () => clearTimeout(timer)
  }, [value, index])

  const isLeft = pos > 50

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-xs font-semibold uppercase tracking-wider ${isLeft ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>
          {left}
        </span>
        <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'var(--accent)', color: '#fff' }}>
          {letter} · {value}%
        </span>
        <span className={`text-xs font-semibold uppercase tracking-wider ${!isLeft ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>
          {right}
        </span>
      </div>
      <div className="relative w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700">
        <div className="absolute left-1/2 top-0 w-px h-full bg-slate-300 dark:bg-slate-500" />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-800 shadow-sm transition-all duration-700 ease-out"
          style={{
            left: `${pos}%`,
            transform: `translateX(-50%) translateY(-50%)`,
            background: 'var(--accent)',
          }}
        />
        {/* Fill bar from center */}
        <div
          className="absolute top-0 h-full rounded-full transition-all duration-700 ease-out"
          style={{
            left: isLeft ? '50%' : `${pos}%`,
            width: `${Math.abs(pos - 50)}%`,
            background: 'var(--accent)',
            opacity: 0.3,
          }}
        />
      </div>
    </div>
  )
}
