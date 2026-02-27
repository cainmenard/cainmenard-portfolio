'use client'
import { useState, useRef } from 'react'
import { DISC_PROFILES } from '../data/discProfiles'

const QUESTIONS = [
  { words: [{ word: 'Adventurous', dim: 'D' }, { word: 'Playful', dim: 'I' }, { word: 'Patient', dim: 'S' }, { word: 'Precise', dim: 'C' }] },
  { words: [{ word: 'Commanding', dim: 'D' }, { word: 'Charming', dim: 'I' }, { word: 'Loyal', dim: 'S' }, { word: 'Careful', dim: 'C' }] },
  { words: [{ word: 'Decisive', dim: 'D' }, { word: 'Persuasive', dim: 'I' }, { word: 'Dependable', dim: 'S' }, { word: 'Systematic', dim: 'C' }] },
  { words: [{ word: 'Bold', dim: 'D' }, { word: 'Enthusiastic', dim: 'I' }, { word: 'Calm', dim: 'S' }, { word: 'Thorough', dim: 'C' }] },
  { words: [{ word: 'Competitive', dim: 'D' }, { word: 'Talkative', dim: 'I' }, { word: 'Supportive', dim: 'S' }, { word: 'Methodical', dim: 'C' }] },
  { words: [{ word: 'Direct', dim: 'D' }, { word: 'Expressive', dim: 'I' }, { word: 'Accommodating', dim: 'S' }, { word: 'Analytical', dim: 'C' }] },
  { words: [{ word: 'Forceful', dim: 'D' }, { word: 'Optimistic', dim: 'I' }, { word: 'Steady', dim: 'S' }, { word: 'Accurate', dim: 'C' }] },
  { words: [{ word: 'Daring', dim: 'D' }, { word: 'Fun-loving', dim: 'I' }, { word: 'Gentle', dim: 'S' }, { word: 'Perfectionist', dim: 'C' }] },
  { words: [{ word: 'Results-driven', dim: 'D' }, { word: 'People-oriented', dim: 'I' }, { word: 'Reliable', dim: 'S' }, { word: 'Detail-oriented', dim: 'C' }] },
  { words: [{ word: 'Independent', dim: 'D' }, { word: 'Sociable', dim: 'I' }, { word: 'Cooperative', dim: 'S' }, { word: 'Reserved', dim: 'C' }] },
  { words: [{ word: 'Determined', dim: 'D' }, { word: 'Inspiring', dim: 'I' }, { word: 'Consistent', dim: 'S' }, { word: 'Cautious', dim: 'C' }] },
  { words: [{ word: 'Assertive', dim: 'D' }, { word: 'Lively', dim: 'I' }, { word: 'Even-tempered', dim: 'S' }, { word: 'Logical', dim: 'C' }] },
  { words: [{ word: 'Ambitious', dim: 'D' }, { word: 'Spontaneous', dim: 'I' }, { word: 'Predictable', dim: 'S' }, { word: 'Disciplined', dim: 'C' }] },
  { words: [{ word: 'Strong-willed', dim: 'D' }, { word: 'Convincing', dim: 'I' }, { word: 'Considerate', dim: 'S' }, { word: 'Orderly', dim: 'C' }] },
  { words: [{ word: 'Risk-taking', dim: 'D' }, { word: 'Energetic', dim: 'I' }, { word: 'Thoughtful', dim: 'S' }, { word: 'Structured', dim: 'C' }] },
  { words: [{ word: 'Tough-minded', dim: 'D' }, { word: 'Magnetic', dim: 'I' }, { word: 'Harmonious', dim: 'S' }, { word: 'Fact-based', dim: 'C' }] },
]

// DISC dimension colors for score bars
const DIM_COLORS = {
  D: 'bg-red-400',
  I: 'bg-amber-400',
  S: 'bg-emerald-500',
  C: 'bg-blue-500',
}

const DIM_LABELS = { D: 'Dominance', I: 'Influence', S: 'Steadiness', C: 'Conscientiousness' }

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function computeScores(answers, shuffled) {
  const scores = { D: 0, I: 0, S: 0, C: 0 }
  answers.forEach((ans, i) => {
    if (!ans) return
    scores[shuffled[i].words[ans.mostIdx].dim] += 2
    scores[shuffled[i].words[ans.leastIdx].dim] -= 1
  })
  return scores
}

function mapToBlendCode(rawScores) {
  const entries = Object.entries(rawScores)
  const vals = entries.map(([, v]) => v)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const range = max - min || 1
  const norm = Object.fromEntries(entries.map(([k, v]) => [k, ((v - min) / range) * 100]))

  const sorted = Object.entries(norm).sort((a, b) => b[1] - a[1])
  const [primary, pScore] = sorted[0]
  const [secondary, sScore] = sorted[1]
  const gap = pScore - sScore

  if (gap >= 30) return primary
  const code = gap < 15
    ? `${primary}${secondary}`
    : `${primary}${secondary.toLowerCase()}`
  return DISC_PROFILES.find(p => p.code === code) ? code : primary
}

export default function DISCQuiz({ onChange }) {
  const [phase, setPhase] = useState('disclaimer')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(Array(16).fill(null))
  const [mostIdx, setMostIdx] = useState(null)
  const [leastIdx, setLeastIdx] = useState(null)
  const advancing = useRef(false)

  // Shuffle words once per question on mount
  const [shuffled] = useState(() =>
    QUESTIONS.map(q => ({ ...q, words: shuffleArray(q.words) }))
  )

  function handleWordClick(wordIdx) {
    if (advancing.current) return
    // Deselect
    if (wordIdx === mostIdx) { setMostIdx(null); return }
    if (wordIdx === leastIdx) { setLeastIdx(null); return }
    // Set Most first
    if (mostIdx === null) { setMostIdx(wordIdx); return }
    // Set Least → both set → record + advance
    if (leastIdx === null) {
      const newLeast = wordIdx
      setLeastIdx(newLeast)
      advancing.current = true
      const newAnswers = [...answers]
      newAnswers[current] = { mostIdx, leastIdx: newLeast }
      setAnswers(newAnswers)
      setTimeout(() => {
        advancing.current = false
        setMostIdx(null)
        setLeastIdx(null)
        if (current === 15) setPhase('result')
        else setCurrent(c => c + 1)
      }, 450)
    }
  }

  function handleBack() {
    if (current === 0) {
      setPhase('disclaimer')
    } else {
      setMostIdx(null)
      setLeastIdx(null)
      setCurrent(c => c - 1)
    }
  }

  function handleRetake() {
    setPhase('disclaimer')
    setCurrent(0)
    setAnswers(Array(16).fill(null))
    setMostIdx(null)
    setLeastIdx(null)
    advancing.current = false
  }

  // ── Disclaimer ────────────────────────────────────────────────────────────
  if (phase === 'disclaimer') {
    return (
      <div className="animate-fadeUp">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          DISC Quick Assessment
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
          This is an unofficial, simplified assessment for educational purposes.
          The DISC model is based on William Marston's public-domain research.
          DiSC® is a registered trademark of Wiley — this tool is not affiliated with
          or endorsed by Wiley.
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
    const q = shuffled[current]
    const progress = ((current + 1) / 16) * 100

    return (
      <div>
        {/* Progress bar + back */}
        <div className="flex items-center gap-2 mb-3">
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
            {current + 1}/16
          </span>
        </div>

        {/* Question area — keyed for fade animation */}
        <div key={current} className="animate-fadeUp">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-3 leading-snug">
            Pick the word that describes you{' '}
            <span className="font-bold text-amber-500">MOST</span>, then the one that
            describes you{' '}
            <span className="font-bold text-rose-500">LEAST</span>.
          </p>

          {/* 2×2 word card grid */}
          <div className="grid grid-cols-2 gap-2">
            {q.words.map((w, idx) => {
              const isMost = mostIdx === idx
              const isLeast = leastIdx === idx
              return (
                <button
                  key={idx}
                  onClick={() => handleWordClick(idx)}
                  className={`relative rounded-lg px-2 py-3 text-sm font-semibold text-center transition-all duration-150 min-h-[3rem] leading-tight ${
                    isMost
                      ? 'bg-amber-400 text-white shadow-md'
                      : isLeast
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-95'
                  }`}
                >
                  {(isMost || isLeast) && (
                    <span className="absolute top-1 right-1.5 text-[8px] font-black tracking-widest uppercase opacity-80">
                      {isMost ? 'MOST' : 'LEAST'}
                    </span>
                  )}
                  {w.word}
                </button>
              )
            })}
          </div>

          {/* Hint when one picked */}
          <div className="h-4 mt-1.5 flex items-center justify-center">
            {mostIdx !== null && leastIdx === null && (
              <p className="text-[10px] text-slate-400 dark:text-slate-500 animate-fadeUp">
                Now pick your <span className="text-rose-500 font-bold">LEAST</span>
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── Result ────────────────────────────────────────────────────────────────
  const rawScores = computeScores(answers, shuffled)
  const code = mapToBlendCode(rawScores)
  const profile = DISC_PROFILES.find(p => p.code === code)

  // Normalize scores to 0-100 for display bars
  const scoreVals = Object.values(rawScores)
  const scoreMin = Math.min(...scoreVals)
  const scoreMax = Math.max(...scoreVals)
  const scoreRange = scoreMax - scoreMin || 1
  const normScores = Object.fromEntries(
    Object.entries(rawScores).map(([k, v]) => [k, Math.round(((v - scoreMin) / scoreRange) * 100)])
  )

  return (
    <div className="animate-fadeUp">
      {/* Blend code + label */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-black font-mono text-slate-800 dark:text-slate-100">
          {code}
        </span>
        {profile && (
          <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
            {profile.label}
          </span>
        )}
      </div>

      {profile && (
        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
          {profile.description}
        </p>
      )}

      {/* Score bars */}
      <div className="space-y-1.5 mb-4">
        {['D', 'I', 'S', 'C'].map(dim => (
          <div key={dim} className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 w-4 flex-shrink-0">
              {dim}
            </span>
            <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${DIM_COLORS[dim]}`}
                style={{ width: `${normScores[dim]}%` }}
              />
            </div>
            <span className="text-[9px] text-slate-400 font-mono w-6 text-right flex-shrink-0">
              {rawScores[dim]}
            </span>
          </div>
        ))}
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
