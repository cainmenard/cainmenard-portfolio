'use client'

// Cain's hardcoded ProScan profile
const CAIN_PROSCAN = {
  dominance:   'High',
  extroversion:'High',
  pace:        'Low',
  conformity:  'Low',
  logic:       'Fact',
  energy:      ['Thrust'],
}

const TRAITS = [
  { key: 'dominance',   label: 'Dominance' },
  { key: 'extroversion',label: 'Extroversion' },
  { key: 'pace',        label: 'Pace' },
  { key: 'conformity',  label: 'Conformity' },
]

const LEVEL_WIDTH = { High: '100%', Mid: '66%', Low: '33%' }
const LEVEL_ORDER = { High: 3, Mid: 2, Low: 1 }

function isComplete(ps) {
  if (!ps) return false
  return !!(ps.dominance && ps.extroversion && ps.pace && ps.conformity)
}

function LevelBadge({ level, isMatch }) {
  return (
    <span
      className={`inline-block px-1.5 py-0 rounded text-xs font-semibold leading-5 ${
        isMatch ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' : ''
      }`}
    >
      {level}
    </span>
  )
}

export default function ProScanBars({ visitorProScan }) {
  if (!isComplete(visitorProScan)) return null

  return (
    <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 mb-6">
      {/* Header */}
      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
        ProScan® Comparison
      </p>

      {/* Trait bars */}
      <div className="space-y-4 mb-5">
        {TRAITS.map(({ key, label }) => {
          const cainLevel    = CAIN_PROSCAN[key]
          const visitorLevel = visitorProScan[key]
          const isMatch      = cainLevel === visitorLevel

          return (
            <div key={key}>
              {/* Row label + match badge */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 w-24 shrink-0">
                  {label}
                </span>
                {isMatch && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    Matched
                  </span>
                )}
              </div>

              {/* Cain bar */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-amber-600 dark:text-amber-400 w-10 shrink-0 text-right font-medium">
                  Cain
                </span>
                <div className="flex-1 bg-slate-100 dark:bg-slate-700/50 rounded h-4 overflow-hidden">
                  <div
                    className="h-full rounded bg-amber-400/70 dark:bg-amber-500/60 transition-all duration-500"
                    style={{ width: LEVEL_WIDTH[cainLevel] ?? '0%' }}
                  />
                </div>
                <span className="text-xs w-8 shrink-0 text-slate-500 dark:text-slate-400">
                  <LevelBadge level={cainLevel} isMatch={isMatch} />
                </span>
              </div>

              {/* Visitor bar */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-sky-500 dark:text-sky-400 w-10 shrink-0 text-right font-medium">
                  You
                </span>
                <div className="flex-1 bg-slate-100 dark:bg-slate-700/50 rounded h-4 overflow-hidden">
                  <div
                    className="h-full rounded bg-sky-400/70 dark:bg-sky-500/60 transition-all duration-500"
                    style={{ width: LEVEL_WIDTH[visitorLevel] ?? '0%' }}
                  />
                </div>
                <span className="text-xs w-8 shrink-0 text-slate-500 dark:text-slate-400">
                  <LevelBadge level={visitorLevel} isMatch={isMatch} />
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Logic + Energy comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/60">
        {/* Logic style */}
        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 font-bold">
            Logic Style
          </p>
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
              CAIN_PROSCAN.logic === visitorProScan.logic
                ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400'
                : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              {CAIN_PROSCAN.logic}
            </span>
            {CAIN_PROSCAN.logic !== visitorProScan.logic && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-400">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />
                {visitorProScan.logic}
              </span>
            )}
            {CAIN_PROSCAN.logic === visitorProScan.logic && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 self-center font-medium">
                Matched
              </span>
            )}
          </div>
        </div>

        {/* Energy style */}
        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 font-bold">
            Energy Style
          </p>
          <div className="flex flex-wrap gap-2">
            {CAIN_PROSCAN.energy.map(e => (
              <span key={`cain-e-${e}`} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                {e}
              </span>
            ))}
            {(visitorProScan.energy || []).map(e => {
              const isShared = CAIN_PROSCAN.energy.includes(e)
              return (
                <span key={`vis-e-${e}`} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
                  isShared
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400'
                    : 'bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${isShared ? 'bg-emerald-400' : 'bg-sky-400'}`} />
                  {e}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
