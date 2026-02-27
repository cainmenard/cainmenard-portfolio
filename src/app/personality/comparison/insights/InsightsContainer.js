'use client'
import { useState, useMemo } from 'react'
import buildAllInsights from './insightEngine'

const FRAMEWORK_LABELS = {
  mbti: 'MBTI',
  disc: 'DISC',
  enneagram: 'Enneagram',
  idDrives: 'I.D.',
  proScan: 'ProScan',
}

export default function InsightsContainer({ visitorProfile }) {
  const [activeInsight, setActiveInsight] = useState(null)

  const insights = useMemo(
    () => buildAllInsights(visitorProfile),
    [visitorProfile?.mbti, visitorProfile?.disc, visitorProfile?.enneagram?.type, visitorProfile?.enneagram?.wing, visitorProfile?.idDrives, visitorProfile?.proScan]
  )

  if (insights.length === 0) return null

  const activeData = insights.find(i => i.id === activeInsight)

  return (
    <div className="mt-8 animate-fadeUp">
      {/* Section heading */}
      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
        How We Work Together
      </p>

      {/* ── Card grid (mirrors ThemeExplorer) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {insights.map(insight => {
          const isActive = activeInsight === insight.id
          return (
            <button
              key={insight.id}
              onClick={() => setActiveInsight(isActive ? null : insight.id)}
              className={`group text-left p-4 rounded-xl border transition-all duration-200 ${
                isActive
                  ? 'bg-white dark:bg-slate-800 border-amber-300 dark:border-amber-500 shadow-md'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-600 hover:shadow-sm'
              }`}
            >
              <span className="text-xl mb-2 block">{insight.icon}</span>
              <p
                className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {insight.title}
              </p>

              {/* Depth pips — filled dots for active sources */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <span
                    key={n}
                    className={`block w-1.5 h-1.5 rounded-full transition-colors ${
                      n <= insight.sourcesUsed
                        ? 'bg-amber-400 dark:bg-amber-500'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
                <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-1">
                  {insight.sourcesUsed}/{5}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* ── Expanded detail panel (mirrors ThemeDetail) ── */}
      {activeData && (
        <div
          key={activeData.id}
          className="mt-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 animate-fadeUp"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{activeData.icon}</span>
            <h3
              className="text-lg font-bold text-slate-900 dark:text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {activeData.title}
            </h3>
          </div>

          {/* Summary line */}
          <p
            className="text-sm italic leading-relaxed mb-5"
            style={{ color: 'var(--accent)' }}
          >
            {activeData.summary}
          </p>

          {/* Based-on badges */}
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Based on:
            </span>
            {activeData.detail.basedOn.map(fw => (
              <span
                key={fw}
                className="inline-block px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold"
              >
                {FRAMEWORK_LABELS[fw] || fw}
              </span>
            ))}
          </div>

          {/* Narrative */}
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            The Dynamic
          </p>
          <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 space-y-3">
            {activeData.detail.narrative.split(/(?<=[.!?])\s+(?=[A-Z])/).reduce((paragraphs, sentence, i) => {
              // Group sentences into paragraphs of ~3 sentences
              const pIdx = Math.floor(i / 3)
              if (!paragraphs[pIdx]) paragraphs[pIdx] = ''
              paragraphs[pIdx] += (paragraphs[pIdx] ? ' ' : '') + sentence
              return paragraphs
            }, []).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Tips — For You / For Cain */}
          {activeData.detail.tips.length > 0 && (
            <>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Actionable Tips
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {/* Visitor tips */}
                {activeData.detail.tips.filter(t => t.for === 'visitor').length > 0 && (
                  <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-900/20">
                    <p className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-2">
                      For You
                    </p>
                    <div className="space-y-2">
                      {activeData.detail.tips
                        .filter(t => t.for === 'visitor')
                        .map((t, i) => (
                          <p
                            key={i}
                            className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed"
                          >
                            {t.tip}
                          </p>
                        ))}
                    </div>
                  </div>
                )}

                {/* Cain tips */}
                {activeData.detail.tips.filter(t => t.for === 'cain').length > 0 && (
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20">
                    <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
                      For Cain
                    </p>
                    <div className="space-y-2">
                      {activeData.detail.tips
                        .filter(t => t.for === 'cain')
                        .map((t, i) => (
                          <p
                            key={i}
                            className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed"
                          >
                            {t.tip}
                          </p>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Watch out */}
          {activeData.detail.watchOut && (
            <div className="flex gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-5">
              <span className="text-amber-500 dark:text-amber-400 text-sm flex-shrink-0 leading-none mt-px">
                ⚠
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  Watch out:{' '}
                </span>
                {activeData.detail.watchOut}
              </p>
            </div>
          )}

          {/* Deepen prompt */}
          {activeData.detail.deepen && (
            <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed italic">
              💡 {activeData.detail.deepen}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
