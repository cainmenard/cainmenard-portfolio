'use client'
import { useState, useRef } from 'react'
import { MBTI_TYPES } from '../data/mbtiTypes'

const QUESTIONS = [
  // E/I — Energy Direction
  { dichotomy: 'EI', left: 'E', right: 'I', text: 'After a long day, I recharge by…', leftLabel: 'Socializing', rightLabel: 'Time alone' },
  { dichotomy: 'EI', left: 'E', right: 'I', text: 'In group settings, I tend to…', leftLabel: 'Speak up first', rightLabel: 'Listen then contribute' },
  { dichotomy: 'EI', left: 'E', right: 'I', text: 'I get energized by…', leftLabel: 'Variety of activities with people', rightLabel: 'Deep focus on one thing' },
  { dichotomy: 'EI', left: 'E', right: 'I', text: 'When meeting new people…', leftLabel: 'I initiate conversation easily', rightLabel: 'I wait for others to approach' },
  // S/N — Information Processing
  { dichotomy: 'SN', left: 'S', right: 'N', text: 'I focus more on…', leftLabel: "What's real and present", rightLabel: "What's possible and future" },
  { dichotomy: 'SN', left: 'S', right: 'N', text: 'I trust more…', leftLabel: 'Direct experience', rightLabel: 'Theoretical patterns' },
  { dichotomy: 'SN', left: 'S', right: 'N', text: 'When explaining something…', leftLabel: 'I give specific examples', rightLabel: 'I describe the big picture' },
  { dichotomy: 'SN', left: 'S', right: 'N', text: "I'm drawn to…", leftLabel: 'Practical, proven methods', rightLabel: 'Novel, innovative approaches' },
  // T/F — Decision-Making
  { dichotomy: 'TF', left: 'T', right: 'F', text: 'When deciding, I prioritize…', leftLabel: 'Logical consistency', rightLabel: 'Impact on people' },
  { dichotomy: 'TF', left: 'T', right: 'F', text: 'In disagreements, I value…', leftLabel: 'Being correct', rightLabel: 'Maintaining harmony' },
  { dichotomy: 'TF', left: 'T', right: 'F', text: "I give feedback that's…", leftLabel: 'Direct and analytical', rightLabel: 'Supportive and encouraging' },
  { dichotomy: 'TF', left: 'T', right: 'F', text: "I'm more impressed by…", leftLabel: 'Competence', rightLabel: 'Compassion' },
  // J/P — Lifestyle Orientation
  { dichotomy: 'JP', left: 'J', right: 'P', text: 'I prefer to…', leftLabel: 'Plan ahead and decide early', rightLabel: 'Keep options open' },
  { dichotomy: 'JP', left: 'J', right: 'P', text: 'My workspace tends to be…', leftLabel: 'Organized with clear systems', rightLabel: 'Flexible with creative clutter' },
  { dichotomy: 'JP', left: 'J', right: 'P', text: 'Deadlines make me…', leftLabel: 'Motivated to finish early', rightLabel: 'Productive under pressure' },
  { dichotomy: 'JP', left: 'J', right: 'P', text: 'I prefer schedules that are…', leftLabel: 'Structured and predictable', rightLabel: 'Flexible and spontaneous' },
  // A/T — Identity (16personalities variant)
  { dichotomy: 'AT', left: 'A', right: 'T', text: 'After making a decision…', leftLabel: 'I move on confidently', rightLabel: 'I wonder if it was right' },
  { dichotomy: 'AT', left: 'A', right: 'T', text: 'Under pressure…', leftLabel: 'I stay calm and collected', rightLabel: 'I feel stressed and worried' },
  { dichotomy: 'AT', left: 'A', right: 'T', text: 'When criticized…', leftLabel: 'I take it in stride', rightLabel: 'It affects me deeply' },
  { dichotomy: 'AT', left: 'A', right: 'T', text: 'My self-confidence is…', leftLabel: 'Generally stable', rightLabel: 'Fluctuates based on circumstances' },
]

const DICHOTOMY_LABEL = { EI: 'Energy', SN: 'Information', TF: 'Decision', JP: 'Lifestyle', AT: 'Identity' }

const ROLE_ABBR = ['dom', 'aux', 'ter', 'inf']

const STACK_COLORS = [
  'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400',
  'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
  'bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400',
  'bg-slate-100 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500',
]

function scoreQuiz(answers) {
  const groups = { EI: [], SN: [], TF: [], JP: [], AT: [] }
  QUESTIONS.forEach((q, i) => {
    if (answers[i] !== null) groups[q.dichotomy].push(answers[i])
  })

  function scoreDichotomy(key, leftLetter, rightLetter) {
    const vals = groups[key]
    const avg = vals.reduce((s, v) => s + v, 0) / vals.length
    return {
      letter: avg <= 4 ? leftLetter : rightLetter,
      pct: Math.round(50 + (Math.abs(avg - 4) / 3) * 50),
    }
  }

  const ei = scoreDichotomy('EI', 'E', 'I')
  const sn = scoreDichotomy('SN', 'S', 'N')
  const tf = scoreDichotomy('TF', 'T', 'F')
  const jp = scoreDichotomy('JP', 'J', 'P')
  const at = scoreDichotomy('AT', 'A', 'T')

  return {
    code: `${ei.letter}${sn.letter}${tf.letter}${jp.letter}`,
    breakdown: { ei, sn, tf, jp, at },
  }
}

export default function MBTIQuiz({ onChange }) {
  const [phase, setPhase] = useState('disclaimer')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(Array(20).fill(null))
  const advancing = useRef(false)

  function handleAnswer(val) {
    if (advancing.current) return
    advancing.current = true
    const newAnswers = [...answers]
    newAnswers[current] = val
    setAnswers(newAnswers)
    setTimeout(() => {
      advancing.current = false
      if (current === 19) {
        setPhase('result')
      } else {
        setCurrent(c => c + 1)
      }
    }, 280)
  }

  function handleBack() {
    if (current === 0) {
      setPhase('disclaimer')
    } else {
      setCurrent(c => c - 1)
    }
  }

  function handleRetake() {
    setPhase('disclaimer')
    setCurrent(0)
    setAnswers(Array(20).fill(null))
    advancing.current = false
  }

  // ── Disclaimer ────────────────────────────────────────────────────────────
  if (phase === 'disclaimer') {
    return (
      <div className="animate-fadeUp">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          MBTI Quick Assessment
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
          This is an unofficial, simplified personality assessment for educational purposes.
          For accurate results, take the official assessment at{' '}
          <a
            href="https://www.16personalities.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-500 hover:underline"
          >
            16personalities.com
          </a>
          .
        </p>
        <button
          onClick={() => setPhase('quiz')}
          className="w-full py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-white text-sm font-semibold transition-colors"
        >
          Begin Quiz →
        </button>
      </div>
    )
  }

  // ── Quiz ──────────────────────────────────────────────────────────────────
  if (phase === 'quiz') {
    const q = QUESTIONS[current]
    const progress = ((current + 1) / 20) * 100

    return (
      <div>
        {/* Progress bar + back */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={handleBack}
            className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex-shrink-0 leading-none"
          >
            ← Back
          </button>
          <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 flex-shrink-0 tabular-nums font-mono">
            {current + 1}/20
          </span>
        </div>

        {/* Question — keyed to trigger fade animation on advance */}
        <div key={current} className="animate-fadeUp">
          <p className="text-[10px] font-semibold text-amber-500 uppercase tracking-wider mb-1">
            {DICHOTOMY_LABEL[q.dichotomy]} · {q.left}/{q.right}
          </p>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-snug mb-5 min-h-[2.5rem]">
            {q.text}
          </p>

          {/* Anchor labels */}
          <div className="flex justify-between mb-2 px-0.5">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 max-w-[44%] leading-tight">
              {q.leftLabel}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 max-w-[44%] leading-tight text-right">
              {q.rightLabel}
            </span>
          </div>

          {/* 7-point Likert buttons */}
          <div className="flex gap-1.5 justify-between">
            {[1, 2, 3, 4, 5, 6, 7].map(val => (
              <button
                key={val}
                onClick={() => handleAnswer(val)}
                className={`flex-1 aspect-square rounded-lg text-xs font-bold transition-all duration-150 ${
                  answers[current] === val
                    ? 'bg-amber-400 text-white shadow-md scale-110'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95'
                }`}
              >
                {val}
              </button>
            ))}
          </div>

          <div className="flex justify-center mt-1.5">
            <span className="text-[9px] text-slate-300 dark:text-slate-600 tracking-wide">
              4 = neutral
            </span>
          </div>
        </div>
      </div>
    )
  }

  // ── Result ────────────────────────────────────────────────────────────────
  const { code, breakdown } = scoreQuiz(answers)
  const typeInfo = MBTI_TYPES[code]

  return (
    <div className="animate-fadeUp">
      {/* Type code + identity suffix */}
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-2xl font-black font-mono text-slate-800 dark:text-slate-100">
          {code}
        </span>
        <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
          -{breakdown.at.letter}
        </span>
      </div>

      {typeInfo && (
        <>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-0.5">
            {typeInfo.label}
          </p>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
            {typeInfo.description}
          </p>

          {/* Cognitive stack pills */}
          <div className="flex flex-wrap gap-1 mb-3">
            {typeInfo.stack.map((fn, i) => (
              <span key={fn} className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${STACK_COLORS[i]}`}>
                {fn}
                <span className="font-normal ml-1 text-[10px] opacity-70">{ROLE_ABBR[i]}</span>
              </span>
            ))}
          </div>
        </>
      )}

      {/* Dichotomy breakdown */}
      <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 text-[10px] font-mono mb-4">
        {[
          [breakdown.ei, 'E', 'I'],
          [breakdown.sn, 'S', 'N'],
          [breakdown.tf, 'T', 'F'],
          [breakdown.jp, 'J', 'P'],
        ].map(([d, l, r]) => (
          <span key={l + r} className="text-slate-500 dark:text-slate-400">
            <span className={d.letter === l ? 'text-amber-500 font-bold' : ''}>{l}</span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className={d.letter === r ? 'text-amber-500 font-bold' : ''}>{r}</span>
            {' '}{d.pct}%
          </span>
        ))}
        <span className="text-slate-300 dark:text-slate-600">·</span>
        <span className="text-slate-500 dark:text-slate-400">
          <span className={breakdown.at.letter === 'A' ? 'text-amber-500 font-bold' : ''}>A</span>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className={breakdown.at.letter === 'T' ? 'text-amber-500 font-bold' : ''}>T</span>
          {' '}{breakdown.at.pct}%
        </span>
      </div>

      {/* Action buttons */}
      <button
        onClick={() => onChange(code)}
        className="w-full py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-white text-sm font-semibold transition-colors mb-2"
      >
        Apply to Comparison
      </button>
      <button
        onClick={handleRetake}
        className="w-full py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        Retake Quiz
      </button>
    </div>
  )
}
