'use client'
import { useState } from 'react'
import MBTISelector from './input/MBTISelector'
import DISCSelector from './input/DISCSelector'
import EnneagramSelector from './input/EnneagramSelector'
import IDInput from './input/IDInput'
import ProScanInput from './input/ProScanInput'
import MBTIQuiz from './input/MBTIQuiz'
import DISCQuiz from './input/DISCQuiz'
import EnneagramQuiz from './input/EnneagramQuiz'
import MBTIWheel from './charts/MBTIWheel'
import DISCCircle from './charts/DISCCircle'
import EnneagramTriads from './charts/EnneagramTriads'
import IDRadar from './charts/IDRadar'
import ProScanBars from './charts/ProScanBars'
import InsightsPanel from './insights/InsightsPanel'

// ── Default state ──────────────────────────────────────────────────────────
const DEFAULT_ID = { verify: 5, authenticate: 5, complete: 5, improvise: 5 }
const DEFAULT_PROSCAN = {
  dominance: null, extroversion: null, pace: null, conformity: null,
  logic: null, energy: [],
}

// ── Sample INFP profile (shown in Compare tab before real data is entered) ──
const SAMPLE_VISITOR = {
  mbti: 'INFP',
  disc: 'Si',
  enneagram: { type: 4, wing: 5 },
  idDrives: { verify: 5, authenticate: 7, complete: 3, improvise: 6 },
  proScan: {
    dominance: 'Low', extroversion: 'Low',
    pace: 'High', conformity: 'Mid',
    logic: 'Feeling', energy: ['Allegiance'],
  },
}

// ── Helpers ────────────────────────────────────────────────────────────────
function isIDEngaged(id) {
  if (!id) return false
  return Object.values(id).some(v => v !== 5)
}

function isProScanComplete(ps) {
  if (!ps) return false
  return !!(ps.dominance && ps.extroversion && ps.pace && ps.conformity)
}

// ── Quiz card metadata ─────────────────────────────────────────────────────
const QUIZ_META = [
  {
    id: 'mbti',
    icon: '🧩',
    title: 'MBTI Type Indicator',
    time: '5–7 min',
    description: '20 Likert-scale questions across four cognitive dichotomies to identify your personality type.',
  },
  {
    id: 'disc',
    icon: '🎯',
    title: 'DISC Behavioral Profile',
    time: '4–5 min',
    description: '16 Most/Least word-set questions to identify your dominant behavioral style from 16 blend positions.',
  },
  {
    id: 'enneagram',
    icon: '🌀',
    title: 'Enneagram Type Finder',
    time: '6–8 min',
    description: '36 forced-choice pairs covering all type combinations to identify your core type and wing.',
  },
]

// ── Component ──────────────────────────────────────────────────────────────
export default function ComparisonContainer() {
  // Assessment state
  const [mbti, setMBTI]           = useState(null)
  const [disc, setDISC]           = useState(null)
  const [enneagram, setEnneagram] = useState({ type: null, wing: null })
  const [idDrives, setIDDrives]   = useState(DEFAULT_ID)
  const [proScan, setProScan]     = useState(DEFAULT_PROSCAN)

  // UI state
  const [activeTab, setActiveTab]       = useState('enter')
  const [expandedQuiz, setExpandedQuiz] = useState(null)   // 'mbti' | 'disc' | 'enneagram' | null
  const [awaitingReset, setAwaitingReset] = useState(false)

  // Completion tracking
  const sections = [
    { id: 'mbti',      label: 'MBTI',        complete: !!mbti },
    { id: 'disc',      label: 'DISC',        complete: !!disc },
    { id: 'enneagram', label: 'Enneagram',   complete: !!enneagram?.type },
    { id: 'id',        label: 'I.D. Drives', complete: isIDEngaged(idDrives) },
    { id: 'proscan',   label: 'ProScan®',    complete: isProScanComplete(proScan) },
  ]
  const completedCount = sections.filter(s => s.complete).length

  // Reset handlers
  function doReset() {
    setMBTI(null)
    setDISC(null)
    setEnneagram({ type: null, wing: null })
    setIDDrives(DEFAULT_ID)
    setProScan(DEFAULT_PROSCAN)
  }

  function handleResetConfirm() {
    doReset()
    setAwaitingReset(false)
    setActiveTab('enter')
  }

  // Effective profile for Compare tab — real data ?? sample INFP fallback per framework
  const isShowingSample    = completedCount === 0
  const effectiveMBTI      = mbti ?? SAMPLE_VISITOR.mbti
  const effectiveDISC      = disc ?? SAMPLE_VISITOR.disc
  const effectiveEnneagram = enneagram.type ? enneagram : SAMPLE_VISITOR.enneagram
  const effectiveIDDrives  = isIDEngaged(idDrives)      ? idDrives : SAMPLE_VISITOR.idDrives
  const effectiveProScan   = isProScanComplete(proScan) ? proScan  : SAMPLE_VISITOR.proScan

  return (
    <div>
      {/* ── Legal disclaimer ──────────────────────────────────────── */}
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-5 leading-relaxed max-w-2xl">
        Enter your assessment results to see how your profile aligns with Cain&apos;s. All processing
        happens in your browser — nothing is stored or transmitted.{' '}
        <span className="text-slate-300 dark:text-slate-600">
          ProScan® is a registered trademark of PDP, Inc. Instinctive Drives® is a trademark of
          Talent Dynamics Pty Ltd. These frameworks are referenced for educational and
          collaboration context only.
        </span>
      </p>

      {/* ── Progress badges + reset control ──────────────────────── */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {sections.map(s => (
          <span
            key={s.id}
            className={`inline-block px-3 py-1 rounded border text-xs font-medium transition-all duration-200 ${
              s.complete
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-700'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
          >
            {s.complete && (
              <svg className="inline w-3 h-3 mr-1 -mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {s.label}
          </span>
        ))}

        {completedCount > 0 && (
          awaitingReset ? (
            <div className="ml-auto flex items-center gap-2.5 text-xs">
              <span className="text-slate-400 dark:text-slate-500">Reset all results?</span>
              <button
                onClick={handleResetConfirm}
                className="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 font-semibold transition-colors"
              >
                Yes, clear
              </button>
              <button
                onClick={() => setAwaitingReset(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAwaitingReset(true)}
              className="ml-auto text-xs text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors underline underline-offset-2"
            >
              Reset All
            </button>
          )
        )}
      </div>

      {/* ── Tab navigation ────────────────────────────────────────── */}
      <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-6">
        {[
          ['enter',   'Enter Results', 'Enter'],
          ['quiz',    'Take a Quiz',   'Quiz'],
          ['compare', 'Compare',       'Compare'],
        ].map(([id, fullLabel, shortLabel]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              activeTab === id
                ? 'bg-amber-400 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <span className="hidden sm:inline">{fullLabel}</span>
            <span className="sm:hidden">{shortLabel}</span>
            {id === 'compare' && completedCount > 0 && (
              <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 align-middle -mt-0.5" />
            )}
          </button>
        ))}
      </div>

      {/* ── Tab pane (key triggers animate-fadeUp on every switch) ── */}
      <div key={activeTab} className="animate-fadeUp">

        {/* ═══════════════════════════════════════════════
            TAB 1 — ENTER RESULTS
        ═══════════════════════════════════════════════ */}
        {activeTab === 'enter' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 animate-fadeUp" style={{ animationDelay: '0ms' }}>
              <MBTISelector value={mbti} onChange={setMBTI} />
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 animate-fadeUp" style={{ animationDelay: '60ms' }}>
              <DISCSelector value={disc} onChange={setDISC} />
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 animate-fadeUp" style={{ animationDelay: '120ms' }}>
              <EnneagramSelector value={enneagram} onChange={setEnneagram} />
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 md:col-span-1 lg:col-span-1 animate-fadeUp" style={{ animationDelay: '180ms' }}>
              <IDInput value={idDrives} onChange={setIDDrives} />
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 md:col-span-1 lg:col-span-2 animate-fadeUp" style={{ animationDelay: '240ms' }}>
              <ProScanInput value={proScan} onChange={setProScan} />
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════
            TAB 2 — TAKE A QUIZ
        ═══════════════════════════════════════════════ */}
        {activeTab === 'quiz' && (
          <div className="space-y-3">
            {QUIZ_META.map((card, i) => {
              const isDone     = card.id === 'mbti' ? !!mbti
                               : card.id === 'disc' ? !!disc
                               : !!enneagram.type
              const doneLabel  = card.id === 'mbti' ? mbti
                               : card.id === 'disc' ? disc
                               : enneagram.type ? `${enneagram.type}w${enneagram.wing}` : null
              const isExpanded = expandedQuiz === card.id

              return (
                <div
                  key={card.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800/60 animate-fadeUp"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Card header */}
                  <div className="flex items-start gap-3 px-5 py-4">
                    <span className="text-xl leading-none mt-0.5 flex-shrink-0">{card.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                          {card.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-medium flex-shrink-0">
                          ~{card.time}
                        </span>
                        {isDone && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold flex-shrink-0">
                            ✓ {doneLabel}
                          </span>
                        )}
                      </div>
                      {!isExpanded && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 leading-snug">
                          {card.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setExpandedQuiz(isExpanded ? null : card.id)}
                      className={`flex-shrink-0 mt-0.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors min-w-[60px] ${
                        isExpanded
                          ? 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                          : isDone
                          ? 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                          : 'bg-amber-400 text-white hover:bg-amber-500'
                      }`}
                    >
                      {isExpanded ? 'Close' : isDone ? 'Retake' : 'Start →'}
                    </button>
                  </div>

                  {/* Expanded quiz body */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 dark:border-slate-700 px-4 pb-4 pt-2">
                      {card.id === 'mbti' && (
                        <MBTIQuiz onChange={(code) => { setMBTI(code); setExpandedQuiz(null) }} />
                      )}
                      {card.id === 'disc' && (
                        <DISCQuiz onChange={(code) => { setDISC(code); setExpandedQuiz(null) }} />
                      )}
                      {card.id === 'enneagram' && (
                        <EnneagramQuiz onChange={(r) => { setEnneagram(r); setExpandedQuiz(null) }} />
                      )}
                    </div>
                  )}
                </div>
              )
            })}

            {/* I.D. / ProScan note */}
            <p className="text-xs text-slate-400 dark:text-slate-500 pt-1 leading-relaxed">
              <span className="font-semibold text-slate-500 dark:text-slate-400">I.D. Drives</span> and{' '}
              <span className="font-semibold text-slate-500 dark:text-slate-400">ProScan®</span> require your
              official assessment results.{' '}
              <button
                onClick={() => setActiveTab('enter')}
                className="text-amber-500 dark:text-amber-400 underline underline-offset-2 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
              >
                Enter them in the Enter Results tab.
              </button>
            </p>
          </div>
        )}

        {/* ═══════════════════════════════════════════════
            TAB 3 — OUR COMPARISON
        ═══════════════════════════════════════════════ */}
        {activeTab === 'compare' && (
          <div>
            {/* Sample data banner */}
            {isShowingSample && (
              <div className="flex gap-2.5 p-3 mb-5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 animate-fadeUp">
                <span className="flex-shrink-0 mt-px">👁</span>
                <span className="leading-relaxed">
                  Showing a{' '}
                  <strong className="text-slate-600 dark:text-slate-300">sample comparison</strong>
                  {' '}using an INFP profile so you can preview how this works.{' '}
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="text-amber-500 dark:text-amber-400 underline underline-offset-2 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
                  >
                    Take a quiz
                  </button>
                  {' '}or{' '}
                  <button
                    onClick={() => setActiveTab('enter')}
                    className="text-amber-500 dark:text-amber-400 underline underline-offset-2 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
                  >
                    enter your results
                  </button>
                  {' '}to see your own comparison.
                </span>
              </div>
            )}

            {/* Charts row 1: MBTI + DISC */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                  MBTI Position
                </p>
                <MBTIWheel visitorType={effectiveMBTI} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                  DISC Style
                </p>
                <DISCCircle visitorCode={effectiveDISC} />
              </div>
            </div>

            {/* Charts row 2: Enneagram + I.D. Radar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                  Enneagram Position
                </p>
                <EnneagramTriads visitorType={effectiveEnneagram.type} visitorWing={effectiveEnneagram.wing} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                  I.D. Drives Profile
                </p>
                <IDRadar idDrives={effectiveIDDrives} />
              </div>
            </div>

            {/* ProScan — always visible in Compare tab using effective profile */}
            <ProScanBars visitorProScan={effectiveProScan} />

            {/* Insights panel — only with real visitor data, never sample */}
            {completedCount >= 2 && (
              <InsightsPanel visitorProfile={{ mbti, disc, enneagram, idDrives, proScan }} />
            )}
          </div>
        )}

      </div>
    </div>
  )
}
