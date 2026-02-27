'use client'
import { MBTI_TYPES, TEMPERAMENTS } from '@/app/personality/comparison/data/mbtiTypes'

const CAIN_TYPE = 'ENTJ'
const DEMO_TYPE = 'INFP'

// Center and radius constants
const CX = 250
const CY = 248
const R  = 178   // node ring radius

// Angle (degrees, 0 = 12 o'clock, clockwise) for each of the 16 types.
// 4 types per 90° quadrant, spaced evenly at 22.5° intervals starting 11.25° in.
const TYPE_ANGLES = {
  // NT — top-right (0° – 90°)
  ENTJ: 11.25,
  INTJ: 33.75,
  ENTP: 56.25,
  INTP: 78.75,
  // SJ — bottom-right (90° – 180°)
  ESTJ: 101.25,
  ISTJ: 123.75,
  ESFJ: 146.25,
  ISFJ: 168.75,
  // SP — bottom-left (180° – 270°)
  ESTP: 191.25,
  ISTP: 213.75,
  ESFP: 236.25,
  ISFP: 258.75,
  // NF — top-left (270° – 360°)
  ENFJ: 281.25,
  INFJ: 303.75,
  ENFP: 326.25,
  INFP: 348.75,
}

// Quadrant sector definitions
const QUADRANTS = [
  { name: 'NT', start: 0,   end: 90,  fill: 'rgba(245,158,11,0.08)',  center: 45,  label: TEMPERAMENTS.NT.label },
  { name: 'SJ', start: 90,  end: 180, fill: 'rgba(99,102,241,0.08)',  center: 135, label: TEMPERAMENTS.SJ.label },
  { name: 'SP', start: 180, end: 270, fill: 'rgba(251,113,133,0.08)', center: 225, label: TEMPERAMENTS.SP.label },
  { name: 'NF', start: 270, end: 360, fill: 'rgba(52,211,153,0.08)',  center: 315, label: TEMPERAMENTS.NF.label },
]

// Boundary angles where quadrant dividers sit
const DIVIDERS = [0, 90, 180, 270]

/** Convert polar angle (0 = top, clockwise) to SVG x,y. */
function pt(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

/** Build a pie-slice SVG path. */
function sector(cx, cy, r, startDeg, endDeg) {
  const s = pt(cx, cy, r, startDeg)
  const e = pt(cx, cy, r, endDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} Z`
}

/** Pick SVG text-anchor based on angular position. */
function anchor(deg) {
  const sin = Math.sin((deg * Math.PI) / 180)
  if (sin >  0.2) return 'start'
  if (sin < -0.2) return 'end'
  return 'middle'
}

export default function MBTIWheel({ visitorType = null }) {
  const isDemoData   = !visitorType
  const activeType   = visitorType || DEMO_TYPE

  const cainAngle    = TYPE_ANGLES[CAIN_TYPE]
  const visitorAngle = TYPE_ANGLES[activeType]

  const cainPos    = pt(CX, CY, R, cainAngle)
  const visitorPos = pt(CX, CY, R, visitorAngle)

  const cainInfo    = MBTI_TYPES[CAIN_TYPE]
  const visitorInfo = MBTI_TYPES[activeType]

  return (
    <svg
      viewBox="0 0 500 555"
      className="w-full h-auto"
      role="img"
      aria-labelledby="mbti-wheel-title mbti-wheel-desc"
    >
      <title id="mbti-wheel-title">MBTI Personality Type Wheel</title>
      <desc id="mbti-wheel-desc">
        {`Circular diagram with 16 MBTI types grouped by Keirsey temperament. Cain's type is ${CAIN_TYPE} (${cainInfo?.label}).`}
        {visitorType
          ? ` Your type is ${visitorType} (${visitorInfo?.label}).`
          : ' Select your type above to see your position.'}
      </desc>

      {/* ── Quadrant sector fills ── */}
      {QUADRANTS.map(q => (
        <path key={q.name} d={sector(CX, CY, R, q.start, q.end)} fill={q.fill} />
      ))}

      {/* ── Outer ring ── */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth={1} />

      {/* ── Quadrant divider lines ── */}
      {DIVIDERS.map(a => {
        const end = pt(CX, CY, R, a)
        return (
          <line
            key={a}
            x1={CX} y1={CY}
            x2={end.x} y2={end.y}
            stroke="rgba(148,163,184,0.14)"
            strokeWidth={0.75}
          />
        )
      })}

      {/* ── Temperament labels (inside each quadrant) ── */}
      {QUADRANTS.map(q => {
        const p = pt(CX, CY, 102, q.center)
        return (
          <g key={`qlabel-${q.name}`}>
            <text
              x={p.x} y={p.y - 6}
              textAnchor="middle"
              dominantBaseline="auto"
              fontSize={13}
              fontWeight="700"
              letterSpacing="0.04em"
              fill="currentColor"
              opacity={0.22}
            >
              {q.name}
            </text>
            <text
              x={p.x} y={p.y + 9}
              textAnchor="middle"
              dominantBaseline="auto"
              fontSize={7}
              letterSpacing="0.06em"
              fill="currentColor"
              opacity={0.16}
            >
              {q.label.toUpperCase()}
            </text>
          </g>
        )
      })}

      {/* ── Connection line (drawn before markers so it sits behind) ── */}
      <line
        x1={cainPos.x} y1={cainPos.y}
        x2={visitorPos.x} y2={visitorPos.y}
        stroke={isDemoData ? 'rgba(148,163,184,0.12)' : 'rgba(148,163,184,0.38)'}
        strokeWidth={isDemoData ? 1 : 1.5}
        strokeDasharray="5 4"
        strokeLinecap="round"
      />

      {/* ── All 16 type nodes + code labels ── */}
      {Object.entries(TYPE_ANGLES).map(([type, deg]) => {
        const p   = pt(CX, CY, R, deg)
        const lp  = pt(CX, CY, R + 22, deg)
        const anc = anchor(deg)
        const isCain    = type === CAIN_TYPE
        const isVisitor = type === activeType && !isCain

        return (
          <g key={type}>
            {/* Dot — hidden for Cain/visitor positions (replaced by larger markers below) */}
            {!isCain && !isVisitor && (
              <circle cx={p.x} cy={p.y} r={3.5} fill="#475569" opacity={0.55} />
            )}

            {/* Code label */}
            <text
              x={lp.x}
              y={lp.y}
              textAnchor={anc}
              dominantBaseline="middle"
              fontSize={isCain || isVisitor ? 11 : 9.5}
              fontWeight={isCain || isVisitor ? '600' : '400'}
              fill={isCain ? '#f59e0b' : isVisitor ? '#38bdf8' : 'currentColor'}
              opacity={isCain || isVisitor ? 1 : 0.42}
            >
              {type}
            </text>
          </g>
        )
      })}

      {/* ── Demo visitor marker (faded, shown before visitor selects) ── */}
      {isDemoData && (
        <g transform={`translate(${visitorPos.x} ${visitorPos.y})`}>
          <circle r={8} fill="#38bdf8" opacity={0.18} />
          <circle r={8} fill="none" stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="3 2" opacity={0.38} />
        </g>
      )}

      {/* ── Real visitor marker (animated pop-in when type is selected) ── */}
      {!isDemoData && (
        <g key={visitorType} transform={`translate(${visitorPos.x} ${visitorPos.y})`}>
          <g className="marker-pop">
            <circle r={8} fill="#38bdf8" stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} />
          </g>
        </g>
      )}

      {/* ── Cain's marker (always visible, rendered on top) ── */}
      <g transform={`translate(${cainPos.x} ${cainPos.y})`}>
        {/* Subtle glow ring */}
        <circle r={14} fill="none" stroke="#f59e0b" strokeWidth={1} opacity={0.28} />
        {/* Filled marker */}
        <circle r={9} fill="#f59e0b" stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} />
      </g>

      {/* ── Legend ── */}
      <g transform="translate(34 484)">
        {/* Cain */}
        <circle cx={0} cy={0} r={5} fill="#f59e0b" />
        <text x={13} y={1} dominantBaseline="middle" fontSize={11} fill="currentColor" opacity={0.7}>
          Cain (ENTJ)
        </text>

        {/* Visitor / demo */}
        {isDemoData ? (
          <circle cx={120} cy={0} r={5} fill="none" stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="2.5 2" opacity={0.5} />
        ) : (
          <circle cx={120} cy={0} r={5} fill="#38bdf8" />
        )}
        <text x={133} y={1} dominantBaseline="middle" fontSize={11} fill="currentColor" opacity={isDemoData ? 0.42 : 0.7}>
          {isDemoData ? `${DEMO_TYPE} (sample)` : `${visitorType} (you)`}
        </text>
      </g>

      {/* ── Sample note ── */}
      {isDemoData && (
        <text
          x={CX}
          y={536}
          textAnchor="middle"
          fontSize={8.5}
          letterSpacing="0.06em"
          fill="currentColor"
          opacity={0.28}
        >
          SAMPLE COMPARISON SHOWN — SELECT YOUR TYPE ABOVE
        </text>
      )}
    </svg>
  )
}
