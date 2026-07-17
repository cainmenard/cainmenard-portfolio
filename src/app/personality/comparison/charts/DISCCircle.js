'use client'
import { DISC_PROFILES, DISC_QUADRANTS } from '@/app/personality/comparison/data/discProfiles'

const CAIN_CODE = 'D'   // pure D — angle 0°, 12 o'clock
const DEMO_CODE = 'S'   // demo visitor — angle 180°, 6 o'clock

// Center and radius
const CX = 250
const CY = 245
const R  = 175   // main circle radius

// Quadrant sector definitions (each centered on its pure style, spanning ±45° = 90° arc).
// D at 0° (top) → sector from 315° to 45°; then I, S, C clockwise.
const SECTORS = [
  { key: 'D', start: 315, end:  45, fill: 'rgba(185,28,28,0.11)',  label: 'D' },
  { key: 'I', start:  45, end: 135, fill: 'rgba(217,119,6,0.10)',  label: 'I' },
  { key: 'S', start: 135, end: 225, fill: 'rgba(21,128,61,0.10)',  label: 'S' },
  { key: 'C', start: 225, end: 315, fill: 'rgba(29,78,216,0.10)',  label: 'C' },
]

// Where to place the D/I/S/C large watermark labels (inside circle, near pure-style positions)
const QUADRANT_LABEL_ANGLES = { D: 0, I: 90, S: 180, C: 270 }

/** Convert polar angle (0 = 12 o'clock, clockwise) to SVG x,y. */
function pt(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

/** Build a pie-slice SVG path. Handles sectors that cross 360°. */
function sector(cx, cy, r, startDeg, endDeg) {
  // Normalize: ensure endDeg > startDeg
  let end = endDeg
  if (end <= startDeg) end += 360
  const s = pt(cx, cy, r, startDeg)
  const e = pt(cx, cy, r, end)
  const large = end - startDeg > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} Z`
}

/** Choose SVG text-anchor based on angle. */
function anchor(deg) {
  const sin = Math.sin((deg * Math.PI) / 180)
  if (sin >  0.22) return 'start'
  if (sin < -0.22) return 'end'
  return 'middle'
}

/** Nudge a label slightly further out so it clears the dot. */
const LABEL_R = 196

export default function DISCCircle({ visitorCode = null }) {
  const isDemoData  = !visitorCode
  const activeCode  = visitorCode || DEMO_CODE

  const cainProfile    = DISC_PROFILES.find(p => p.code === CAIN_CODE)
  const visitorProfile = DISC_PROFILES.find(p => p.code === activeCode)

  const cainPos    = pt(CX, CY, R, cainProfile.angle)
  const visitorPos = pt(CX, CY, R, visitorProfile.angle)

  // Axis endpoints (outer edge of circle)
  const axisTop    = pt(CX, CY, R, 0)
  const axisBottom = pt(CX, CY, R, 180)
  const axisLeft   = pt(CX, CY, R, 270)
  const axisRight  = pt(CX, CY, R, 90)

  return (
    <svg
      viewBox="0 0 500 555"
      className="w-full h-auto"
      role="img"
      aria-labelledby="disc-circle-title disc-circle-desc"
    >
      <title id="disc-circle-title">DISC Style Circle</title>
      <desc id="disc-circle-desc">
        {`Circular diagram showing 16 DISC blend styles. Cain is ${CAIN_CODE} (${DISC_QUADRANTS.D.label}), positioned at 12 o'clock.`}
        {visitorCode
          ? ` Your style is ${visitorCode} (${DISC_QUADRANTS[visitorProfile?.primary]?.label}).`
          : ' Select your style above to see your position.'}
      </desc>

      {/* ── Axis labels (outside circle) ── */}
      {/* Top: Fast / Outgoing */}
      <text
        x={CX} y={axisTop.y - 24}
        textAnchor="middle"
        fontSize={9}
        letterSpacing="0.04em"
        fill="currentColor"
        opacity={0.60}
      >
        FAST / OUTGOING
      </text>

      {/* Bottom: Moderate / Reserved */}
      <text
        x={CX} y={axisBottom.y + 24}
        textAnchor="middle"
        fontSize={9}
        letterSpacing="0.04em"
        fill="currentColor"
        opacity={0.60}
      >
        MODERATE / RESERVED
      </text>

      {/* Left: Task-Oriented (rotated vertical text) */}
      <text
        transform={`rotate(-90 ${axisLeft.x - 24} ${CY})`}
        x={axisLeft.x - 24}
        y={CY}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={9}
        letterSpacing="0.04em"
        fill="currentColor"
        opacity={0.60}
      >
        TASK-ORIENTED
      </text>

      {/* Right: People-Oriented (rotated vertical text) */}
      <text
        transform={`rotate(90 ${axisRight.x + 24} ${CY})`}
        x={axisRight.x + 24}
        y={CY}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={9}
        letterSpacing="0.04em"
        fill="currentColor"
        opacity={0.60}
      >
        PEOPLE-ORIENTED
      </text>

      {/* ── Quadrant sector fills ── */}
      {SECTORS.map(s => (
        <path key={s.key} d={sector(CX, CY, R, s.start, s.end)} fill={s.fill} />
      ))}

      {/* ── Axis lines (vertical D↔S, horizontal I↔C) ── */}
      <line x1={CX} y1={axisTop.y}   x2={CX} y2={axisBottom.y} stroke="rgba(148,163,184,0.14)" strokeWidth={0.75} />
      <line x1={axisLeft.x} y1={CY}  x2={axisRight.x} y2={CY}  stroke="rgba(148,163,184,0.14)" strokeWidth={0.75} />

      {/* ── Outer ring ── */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth={1} />

      {/* ── Large watermark quadrant labels (D, I, S, C) inside circle ── */}
      {Object.entries(QUADRANT_LABEL_ANGLES).map(([dim, deg]) => {
        const p = pt(CX, CY, 118, deg)
        const info = DISC_QUADRANTS[dim]
        return (
          <g key={`qlabel-${dim}`}>
            <text
              x={p.x} y={p.y - 5}
              textAnchor="middle"
              dominantBaseline="auto"
              fontSize={20}
              fontWeight="800"
              letterSpacing="0.02em"
              fill="currentColor"
              opacity={0.35}
            >
              {dim}
            </text>
            <text
              x={p.x} y={p.y + 12}
              textAnchor="middle"
              dominantBaseline="auto"
              fontSize={7}
              letterSpacing="0.06em"
              fill="currentColor"
              opacity={0.25}
            >
              {info.label.toUpperCase()}
            </text>
          </g>
        )
      })}

      {/* ── Connection line (drawn before markers) ── */}
      <line
        x1={cainPos.x} y1={cainPos.y}
        x2={visitorPos.x} y2={visitorPos.y}
        stroke={isDemoData ? 'rgba(148,163,184,0.12)' : 'rgba(148,163,184,0.38)'}
        strokeWidth={isDemoData ? 1 : 1.5}
        strokeDasharray="5 4"
        strokeLinecap="round"
      />

      {/* ── Blend position reference dots + tiny labels ── */}
      {DISC_PROFILES.map(profile => {
        const p    = pt(CX, CY, R, profile.angle)
        const lp   = pt(CX, CY, LABEL_R, profile.angle)
        const anc  = anchor(profile.angle)
        const isMe = profile.code === CAIN_CODE
        const isVis = profile.code === activeCode && !isMe

        return (
          <g key={profile.code}>
            {/* Dot */}
            {!isMe && !isVis && (
              <circle cx={p.x} cy={p.y} r={3} fill="#475569" opacity={0.5} />
            )}
            {/* Label — omit for pure styles (D/I/S/C); they have watermarks inside ring */}
            {profile.secondary !== null && (
              <text
                x={lp.x}
                y={lp.y}
                textAnchor={anc}
                dominantBaseline="middle"
                fontSize={isMe || isVis ? 10 : 7.5}
                fontWeight={isMe || isVis ? '600' : '400'}
                fill={isMe ? '#f59e0b' : isVis ? '#38bdf8' : 'currentColor'}
                opacity={isMe || isVis ? 1 : 0.55}
              >
                {profile.code}
              </text>
            )}
          </g>
        )
      })}

      {/* ── Demo visitor marker (faded, dashed outline) ── */}
      {isDemoData && (
        <g transform={`translate(${visitorPos.x} ${visitorPos.y})`}>
          <circle r={8} fill="#38bdf8" opacity={0.18} />
          <circle r={8} fill="none" stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="3 2" opacity={0.38} />
        </g>
      )}

      {/* ── Real visitor marker (animated pop-in) ── */}
      {!isDemoData && (
        <g key={visitorCode} transform={`translate(${visitorPos.x} ${visitorPos.y})`}>
          <g className="marker-pop">
            <circle r={8} fill="#38bdf8" stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} />
          </g>
        </g>
      )}

      {/* ── Cain's marker (always visible, rendered on top) ── */}
      <g transform={`translate(${cainPos.x} ${cainPos.y})`}>
        {/* Glow ring */}
        <circle r={14} fill="none" stroke="#f59e0b" strokeWidth={1} opacity={0.28} />
        {/* Marker */}
        <circle r={9} fill="#f59e0b" stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} />
      </g>

      {/* ── Legend ── */}
      <g transform="translate(34 484)">
        {/* Cain */}
        <circle cx={0} cy={0} r={5} fill="#f59e0b" />
        <text x={13} y={1} dominantBaseline="middle" fontSize={11} fill="currentColor" opacity={0.8}>
          Cain (D — {DISC_QUADRANTS.D.label})
        </text>

        {/* Visitor / demo */}
        {isDemoData ? (
          <circle cx={0} cy={22} r={5} fill="none" stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="2.5 2" opacity={0.5} />
        ) : (
          <circle cx={0} cy={22} r={5} fill="#38bdf8" />
        )}
        <text
          x={13} y={23}
          dominantBaseline="middle"
          fontSize={11}
          fill="currentColor"
          opacity={isDemoData ? 0.55 : 0.8}
        >
          {isDemoData
            ? `${DEMO_CODE} (sample)`
            : `${visitorCode} — ${visitorProfile?.label}`}
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
          opacity={0.45}
        >
          SAMPLE COMPARISON SHOWN — SELECT YOUR STYLE ABOVE
        </text>
      )}
    </svg>
  )
}
