'use client'
import { useState, useRef } from 'react'
import { ENNEAGRAM_TYPES, ENNEAGRAM_TRIADS } from '../data/enneagramTypes'

// All 36 unique C(9,2) pairs — every type appears exactly 8 times (balanced scoring).
// Ordered across 4 sections of 9 to naturally mix types throughout.
const QUESTIONS = [
  // ── Part 1 (Q1–Q9) ──────────────────────────────────────────────────────
  { a: { text: 'I take charge and push hard for what I believe in', type: 8 },
    b: { text: 'I step back and let things unfold naturally', type: 9 } },
  { a: { text: 'I focus on being helpful and caring for others', type: 2 },
    b: { text: 'I focus on achieving goals and being successful', type: 3 } },
  { a: { text: 'I value being uniquely authentic above all else', type: 4 },
    b: { text: 'I value gaining deep knowledge and mastery', type: 5 } },
  { a: { text: 'I seek security and want to know what could go wrong', type: 6 },
    b: { text: 'I seek adventure and focus on what could go right', type: 7 } },
  { a: { text: 'I have strong principles and feel compelled to act on them', type: 1 },
    b: { text: 'I prefer to accommodate others and keep the peace', type: 9 } },
  { a: { text: "I challenge authority when I believe it's wrong", type: 8 },
    b: { text: 'I look to authority and systems for guidance and security', type: 6 } },
  { a: { text: 'I try to control my feelings and act on principle', type: 1 },
    b: { text: 'I embrace and express my feelings, even difficult ones', type: 4 } },
  { a: { text: 'I pursue one major goal with intense, focused determination', type: 3 },
    b: { text: 'I pursue many exciting possibilities at once', type: 7 } },
  { a: { text: 'I find safety in knowledge and self-sufficiency', type: 5 },
    b: { text: 'I find safety in trusted people and reliable systems', type: 6 } },

  // ── Part 2 (Q10–Q18) ─────────────────────────────────────────────────────
  { a: { text: 'I influence through warmth, generosity, and nurturing', type: 2 },
    b: { text: 'I influence through strength, directness, and control', type: 8 } },
  { a: { text: 'I embrace my individuality even when it creates tension', type: 4 },
    b: { text: 'I soften my individuality to maintain harmony with others', type: 9 } },
  { a: { text: 'I hold myself to high standards regardless of recognition', type: 1 },
    b: { text: "I measure myself by my achievements and others' perception", type: 3 } },
  { a: { text: 'I work hard to stand out and be recognized', type: 3 },
    b: { text: 'I prefer to blend in and keep things running smoothly', type: 9 } },
  { a: { text: 'I deal with difficulty by reframing it and staying upbeat', type: 7 },
    b: { text: 'I deal with difficulty by confronting it head-on', type: 8 } },
  { a: { text: 'I build loyalty by always being there for the people I care about', type: 2 },
    b: { text: 'I build loyalty through consistent reliability over time', type: 6 } },
  { a: { text: "I feel responsible for correcting what's wrong in the world", type: 1 },
    b: { text: 'I feel most alive when mastering a complex subject deeply', type: 5 } },
  { a: { text: 'What makes me different defines who I am', type: 4 },
    b: { text: 'What keeps my group safe and cohesive matters most to me', type: 6 } },
  { a: { text: 'I pull back from the world to conserve my energy and think', type: 5 },
    b: { text: "I go along with others' agendas to keep inner conflict at bay", type: 9 } },

  // ── Part 3 (Q19–Q27) ─────────────────────────────────────────────────────
  { a: { text: 'I adapt how I present myself to get ahead', type: 3 },
    b: { text: "I resist changing how I present myself for others' approval", type: 4 } },
  { a: { text: "My energy naturally flows toward other people's needs", type: 2 },
    b: { text: 'My energy naturally flows toward exciting new possibilities', type: 7 } },
  { a: { text: "I feel compelled to do what's right, even when it's hard", type: 1 },
    b: { text: 'I look for the positive angle and keep my options flexible', type: 7 } },
  { a: { text: "I'm loyal and committed but tend to worry about what might go wrong", type: 6 },
    b: { text: "I'm peaceful and easygoing but tend to avoid difficult truths", type: 9 } },
  { a: { text: 'I measure success through visible accomplishments and recognition', type: 3 },
    b: { text: 'I measure success through depth of understanding and expertise', type: 5 } },
  { a: { text: 'I keep life stimulating with new experiences and possibilities', type: 7 },
    b: { text: 'I keep life comfortable by minimizing disruption and conflict', type: 9 } },
  { a: { text: 'I lean into difficult emotions — they feel real and meaningful', type: 4 },
    b: { text: 'I step away from difficult emotions by staying busy and positive', type: 7 } },
  { a: { text: 'I push back against rules that get in the way of the mission', type: 8 },
    b: { text: 'I work within established rules to improve things from the inside', type: 1 } },
  { a: { text: "I feel fulfilled when I've genuinely helped someone in need", type: 2 },
    b: { text: "I feel fulfilled when I've fully expressed who I really am", type: 4 } },

  // ── Part 4 (Q28–Q36) ─────────────────────────────────────────────────────
  { a: { text: 'I prefer to observe and analyze carefully before engaging', type: 5 },
    b: { text: 'I prefer to dive in and experience things directly first', type: 7 } },
  { a: { text: 'I achieve through efficiency, image, and adaptability', type: 3 },
    b: { text: 'I achieve through force of will, power, and directness', type: 8 } },
  { a: { text: "I'm driven by doing things the right and proper way", type: 1 },
    b: { text: "I'm driven by being genuinely needed and loved by others", type: 2 } },
  { a: { text: 'I connect with people by being warm, giving, and supportive', type: 2 },
    b: { text: 'I connect with people by sharing knowledge and deep insight', type: 5 } },
  { a: { text: 'I thrive when I can compete and earn recognition', type: 3 },
    b: { text: 'I thrive when I feel secure and have reliable support around me', type: 6 } },
  { a: { text: 'I express vulnerability and deep emotion openly', type: 4 },
    b: { text: 'I guard against vulnerability and project strength', type: 8 } },
  { a: { text: 'I protect myself by withdrawing and becoming self-sufficient', type: 5 },
    b: { text: 'I protect myself by asserting control and projecting strength', type: 8 } },
  { a: { text: "I focus on others' needs because I genuinely want to be needed", type: 2 },
    b: { text: "I go along with others' preferences to avoid conflict", type: 9 } },
  { a: { text: 'I trust my own principles and act independently', type: 1 },
    b: { text: 'I look to trusted people and systems for guidance', type: 6 } },
]

const SECTION_BREAKS = [
  null,
  { title: 'Part 1 complete', sub: '9 of 36 done. Keep going!' },
  { title: "You're halfway there!", sub: '18 of 36 done. Almost there.' },
  { title: 'Just 9 more to go', sub: '27 of 36 done. Final stretch!' },
]

function scoreQuiz(answers) {
  const scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
  answers.forEach((ans, i) => {
    if (ans === null) return
    const q = QUESTIONS[i]
    scores[ans === 'a' ? q.a.type : q.b.type] += 1
  })

  // Primary = highest score; tiebreak by lower type number
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1] || Number(a[0]) - Number(b[0]))
  const primaryType = parseInt(sorted[0][0])

  // Wing = higher-scoring adjacent type
  const [wingA, wingB] = ENNEAGRAM_TYPES[primaryType].wings
  const wing = scores[wingA] >= scores[wingB] ? wingA : wingB

  return { primaryType, wing, scores }
}

export default function EnneagramQuiz({ onChange }) {
  const [phase, setPhase] = useState('disclaimer')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(Array(36).fill(null))
  const [breakNum, setBreakNum] = useState(0)
  const advancing = useRef(false)

  const section = Math.floor(current / 9) + 1
  const sectionQ = (current % 9) + 1

  function handleSelect(choice) {
    if (advancing.current) return
    advancing.current = true

    const newAnswers = [...answers]
    newAnswers[current] = choice
    setAnswers(newAnswers)

    setTimeout(() => {
      advancing.current = false
      // Section break at Q9, Q18, Q27 (after answering Q9=idx8, Q18=idx17, Q27=idx26)
      const nextIdx = current + 1
      if (nextIdx < 36 && nextIdx % 9 === 0) {
        setCurrent(nextIdx)
        setBreakNum(nextIdx / 9)
        setPhase('section-break')
      } else if (nextIdx === 36) {
        setPhase('result')
      } else {
        setCurrent(nextIdx)
      }
    }, 350)
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
    setAnswers(Array(36).fill(null))
    setBreakNum(0)
    advancing.current = false
  }

  // ── Disclaimer ────────────────────────────────────────────────────────────
  if (phase === 'disclaimer') {
    return (
      <div className="animate-fadeUp">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Enneagram Quick Assessment
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
          This is an unofficial, simplified assessment for educational purposes.
          The Enneagram of Personality is in the public domain; the Enneagram Institute® is a
          registered trademark and this tool is not affiliated with or endorsed by them.
          For in-depth results, consider a certified practitioner.
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-4">
          36 questions · ~5 minutes · Forced choice (A or B)
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

  // ── Section Break ─────────────────────────────────────────────────────────
  if (phase === 'section-break') {
    const brk = SECTION_BREAKS[breakNum]
    return (
      <div className="animate-fadeUp text-center py-2">
        <p className="text-lg font-black text-slate-800 dark:text-slate-100 mb-1">
          {brk.title}
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">{brk.sub}</p>
        {/* Mini progress bar */}
        <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mx-4 mb-5 mt-3">
          <div
            className="h-full rounded-full bg-amber-400 transition-all duration-500"
            style={{ width: `${(current / 36) * 100}%` }}
          />
        </div>
        <button
          onClick={() => setPhase('quiz')}
          className="w-full py-2 rounded-lg bg-amber-400 hover:bg-amber-500 text-white text-sm font-semibold transition-colors"
        >
          Continue →
        </button>
      </div>
    )
  }

  // ── Quiz ──────────────────────────────────────────────────────────────────
  if (phase === 'quiz') {
    const q = QUESTIONS[current]
    const progress = ((current + 1) / 36) * 100

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
            {current + 1}/36
          </span>
        </div>

        {/* Question content — keyed for fade animation per question */}
        <div key={current} className="animate-fadeUp">
          <p className="text-[10px] font-semibold text-amber-500 uppercase tracking-wider mb-3">
            Part {section} of 4 · Question {sectionQ} of 9
          </p>

          <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-3 leading-snug">
            Which statement resonates with you <span className="font-bold text-slate-500 dark:text-slate-400">more</span>?
          </p>

          {/* Two choice cards — stacked on mobile, side-by-side on sm+ */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[
              { key: 'a', label: 'A', stmt: q.a },
              { key: 'b', label: 'B', stmt: q.b },
            ].map(({ key, label, stmt }) => {
              const isSelected = answers[current] === key
              return (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`relative text-left rounded-xl px-4 py-3.5 transition-all duration-150 leading-snug min-h-[4rem] ${
                    isSelected
                      ? 'bg-amber-400 text-white shadow-md'
                      : 'bg-slate-50 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-[0.98]'
                  }`}
                >
                  <span
                    className={`absolute top-2 right-2.5 text-[9px] font-black tracking-widest ${
                      isSelected ? 'text-white/70' : 'text-slate-300 dark:text-slate-500'
                    }`}
                  >
                    {label}
                  </span>
                  <span className="text-[12px] font-medium pr-4">{stmt.text}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ── Result ────────────────────────────────────────────────────────────────
  const { primaryType, wing, scores } = scoreQuiz(answers)
  const typeData = ENNEAGRAM_TYPES[primaryType]
  const triad = ENNEAGRAM_TRIADS[typeData.triad]
  const wingVariant = typeData.wingVariants?.[String(wing)] ?? null

  // Normalize scores to 0-100 for display bars
  const maxScore = Math.max(...Object.values(scores))
  const minScore = Math.min(...Object.values(scores))
  const scoreRange = maxScore - minScore || 1

  return (
    <div className="animate-fadeUp">
      {/* Type + wing */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-black font-mono text-slate-800 dark:text-slate-100">
          {primaryType}w{wing}
        </span>
        {wingVariant && (
          <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
            {wingVariant.label}
          </span>
        )}
      </div>

      {/* Triad badge */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-[11px] font-bold px-2 py-0.5 rounded"
          style={{ backgroundColor: triad.lightColor, color: triad.color }}
        >
          {typeData.triad} Triad
        </span>
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          {typeData.name}
        </span>
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mb-1">
        <span className="font-semibold">Core fear:</span> {typeData.coreFear}
      </p>
      {wingVariant && (
        <p className="text-[11px] text-slate-400 leading-snug mb-3">
          {wingVariant.description}
        </p>
      )}

      {/* Score bars: all 9 types */}
      <div className="space-y-1 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(t => {
          const isPrimary = t === primaryType
          const barWidth = Math.round(((scores[t] - minScore) / scoreRange) * 100)
          return (
            <div key={t} className="flex items-center gap-1.5">
              <span
                className={`text-[10px] font-bold w-3 flex-shrink-0 text-right ${
                  isPrimary ? 'text-amber-500' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {t}
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isPrimary ? 'bg-amber-400' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <span className="text-[9px] text-slate-400 font-mono w-4 text-right flex-shrink-0">
                {scores[t]}
              </span>
            </div>
          )
        })}
      </div>

      {/* Action buttons */}
      <button
        onClick={() => onChange({ type: primaryType, wing })}
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
