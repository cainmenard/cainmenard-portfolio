'use client'
import { useState } from 'react'
import generateInsights from './generateInsights'

const ALIGNMENT_STYLE = {
  high: {
    badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    label: 'High',
  },
  moderate: {
    badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    label: 'Moderate',
  },
  low: {
    badge: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400',
    label: 'Low',
  },
}

export default function InsightsPanel({ visitorProfile }) {
  const insights = generateInsights(visitorProfile)
  const [openIdx, setOpenIdx] = useState(0)

  if (insights.length === 0) return null

  function toggleIdx(idx) {
    setOpenIdx(prev => (prev === idx ? null : idx))
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fadeUp">
      {/* Panel header */}
      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Collaboration Insights
          </h3>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {insights.length} of 8 dimensions
          </span>
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
          Based on the frameworks you&apos;ve entered
        </p>
      </div>

      {/* Accordion items */}
      {insights.map((insight, idx) => {
        const isOpen = openIdx === idx
        const alignStyle = ALIGNMENT_STYLE[insight.alignment] ?? ALIGNMENT_STYLE.moderate

        return (
          <div
            key={insight.id}
            className="border-b border-slate-200 dark:border-slate-700 last:border-b-0"
          >
            {/* Row header — always visible */}
            <button
              onClick={() => toggleIdx(idx)}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <span className="text-base leading-none flex-shrink-0">{insight.icon}</span>
              <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                {insight.dimension}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${alignStyle.badge}`}>
                {alignStyle.label}
              </span>
              <svg
                className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Expanded body */}
            {isOpen && (
              <div className="px-5 pb-5 space-y-3 bg-white dark:bg-slate-800/10">
                {/* Summary */}
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1 border-t border-slate-100 dark:border-slate-700/50">
                  {insight.summary}
                </p>

                {/* For You / For Cain */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-900/20">
                    <p className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1.5">
                      For You
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {insight.forVisitor}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20">
                    <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1.5">
                      For Cain
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {insight.forCain}
                    </p>
                  </div>
                </div>

                {/* Watch out */}
                {insight.watchOut && (
                  <div className="flex gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-amber-500 dark:text-amber-400 text-sm flex-shrink-0 leading-none mt-px">
                      ⚠
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">
                        Watch out:{' '}
                      </span>
                      {insight.watchOut}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
