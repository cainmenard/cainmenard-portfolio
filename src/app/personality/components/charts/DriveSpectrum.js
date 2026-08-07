'use client'
import { useState, useEffect } from 'react'

export default function DriveSpectrum({ name, score, direction, index = 0 }) {
  const [pos, setPos] = useState(50)

  // Score is 1-9, map to 0-100%
  const targetPos = ((score - 1) / 8) * 100

  useEffect(() => {
    const timer = setTimeout(() => setPos(targetPos), 100 + index * 100)
    return () => clearTimeout(timer)
  }, [targetPos, index])

  const zoneColor = direction === 'Use'
    ? 'text-green-600 dark:text-green-400'
    : 'text-red-500 dark:text-red-400'

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{name}</span>
        <span className={`text-xs font-bold uppercase tracking-wider ${zoneColor}`}>
          {direction} · {score}/9
        </span>
      </div>
      <div className="relative w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
        {/* Zone dividers */}
        <div className="absolute left-[33%] top-0 w-px h-full bg-slate-300 dark:bg-slate-500 z-10" />
        <div className="absolute left-[66%] top-0 w-px h-full bg-slate-300 dark:bg-slate-500 z-10" />
        {/* Zone labels */}
        <div className="absolute inset-0 flex text-[8px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          <span className="flex-1 flex items-center justify-center">Avoid</span>
          <span className="flex-1 flex items-center justify-center">Respond</span>
          <span className="flex-1 flex items-center justify-center">Use</span>
        </div>
        {/* Dot */}
        <div
          className="absolute top-1/2 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-800 shadow-sm z-20 transition-all duration-700 ease-out"
          style={{
            left: `${pos}%`,
            transform: 'translateX(-50%) translateY(-50%)',
            background: direction === 'Use' ? '#16a34a' : '#ef4444',
          }}
        />
      </div>
    </div>
  )
}
