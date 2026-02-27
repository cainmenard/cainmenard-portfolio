'use client'
import { useState } from 'react'
import MBTISelector from './input/MBTISelector'
import DISCSelector from './input/DISCSelector'
import EnneagramSelector from './input/EnneagramSelector'
import IDInput from './input/IDInput'
import ProScanInput from './input/ProScanInput'
import MBTIWheel from './charts/MBTIWheel'
import DISCCircle from './charts/DISCCircle'

// Default ID state — all at NEUTRAL (5)
const DEFAULT_ID = { verify: 5, authenticate: 5, complete: 5, improvise: 5 }

// Default ProScan state
const DEFAULT_PROSCAN = {
  dominance: null,
  extroversion: null,
  pace: null,
  conformity: null,
  logic: null,
  energy: [],
}

/** I.D. is considered "engaged" if any drive has been moved off neutral */
function isIDEngaged(id) {
  if (!id) return false
  return Object.values(id).some(v => v !== 5)
}

/** ProScan is considered complete if all four trait dimensions are set */
function isProScanComplete(ps) {
  if (!ps) return false
  return !!(ps.dominance && ps.extroversion && ps.pace && ps.conformity)
}

export default function ComparisonContainer() {
  const [mbti, setMBTI] = useState(null)
  const [disc, setDISC] = useState(null)
  const [enneagram, setEnneagram] = useState({ type: null, wing: null })
  const [idDrives, setIDDrives] = useState(DEFAULT_ID)
  const [proScan, setProScan] = useState(DEFAULT_PROSCAN)

  const sections = [
    { id: 'mbti',      label: 'MBTI',       complete: !!mbti },
    { id: 'disc',      label: 'DISC',       complete: !!disc },
    { id: 'enneagram', label: 'Enneagram',  complete: !!enneagram?.type },
    { id: 'id',        label: 'I.D. Drives',complete: isIDEngaged(idDrives) },
    { id: 'proscan',   label: 'ProScan®',   complete: isProScanComplete(proScan) },
  ]

  const completedCount = sections.filter(s => s.complete).length
  const completedLabels = sections.filter(s => s.complete).map(s => s.label)

  const reset = () => {
    setMBTI(null)
    setDISC(null)
    setEnneagram({ type: null, wing: null })
    setIDDrives(DEFAULT_ID)
    setProScan(DEFAULT_PROSCAN)
  }

  return (
    <div>
      {/* Legal disclaimer */}
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-6 leading-relaxed max-w-2xl">
        Enter your assessment results to see how your profile aligns with Cain&apos;s. All processing
        happens in your browser — nothing is stored or transmitted.{' '}
        <span className="text-slate-300 dark:text-slate-600">
          ProScan® is a registered trademark of PDP, Inc. Instinctive Drives® is a trademark of
          Talent Dynamics Pty Ltd. These frameworks are referenced for educational and
          collaboration context only.
        </span>
      </p>

      {/* Progress indicators + reset */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
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
              <svg
                className="inline w-3 h-3 mr-1 -mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {s.label}
          </span>
        ))}

        {completedCount > 0 && (
          <button
            onClick={reset}
            className="ml-auto text-xs text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors underline underline-offset-2"
          >
            Reset All
          </button>
        )}
      </div>

      {/* ── Visual charts ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
            MBTI Position
          </p>
          <MBTIWheel visitorType={mbti} />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
            DISC Style
          </p>
          <DISCCircle visitorCode={disc} />
        </div>
      </div>

      {/* Input cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {/* MBTI */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60">
          <MBTISelector value={mbti} onChange={setMBTI} />
        </div>

        {/* DISC */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60">
          <DISCSelector value={disc} onChange={setDISC} />
        </div>

        {/* Enneagram */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60">
          <EnneagramSelector value={enneagram} onChange={setEnneagram} />
        </div>

        {/* I.D. Drives — takes full row on mobile, 2 cols on lg */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 md:col-span-1 lg:col-span-1">
          <IDInput value={idDrives} onChange={setIDDrives} />
        </div>

        {/* ProScan — spans remaining cols */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 md:col-span-1 lg:col-span-2">
          <ProScanInput value={proScan} onChange={setProScan} />
        </div>
      </div>

      {/* Results placeholder — appears once at least 2 frameworks are entered */}
      {completedCount >= 2 && (
        <div className="p-6 rounded-xl border border-dashed border-amber-200 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-900/10 animate-fadeUp">
          <p className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-1">
            {completedCount} of 5 frameworks entered
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            You&apos;ve entered: {completedLabels.join(', ')}.
            Detailed collaboration insights — communication style alignment, decision-making
            patterns, conflict tendencies, and delegation fit — are coming in the next build phase.
          </p>
        </div>
      )}
    </div>
  )
}
