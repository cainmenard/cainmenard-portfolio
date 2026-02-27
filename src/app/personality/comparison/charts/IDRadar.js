'use client'

// Cain's hardcoded I.D. profile
const CAIN_ID = { verify: 7, authenticate: 7, complete: 3, improvise: 3 }

const CX     = 250
const CY     = 245
const MAX_R  = 155   // outer ring at scale 9

const AXES = [
  { key: 'verify',       label: 'Verify',       angle: 0   },
  { key: 'authenticate', label: 'Auth.',         angle: 90  },
  { key: 'complete',     label: 'Complete',      angle: 180 },
  { key: 'improvise',    label: 'Improvise',     angle: 270 },
]

/** Convert polar angle (0 = top, clockwise) to SVG x,y. */
function pt(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

/** Map drive score 1-9 to radius. score 1 → 0, score 9 → MAX_R */
function scaleR(value) {
  return ((value - 1) / 8) * MAX_R
}

/** Build diamond-shaped path connecting the 4 axis tips at a given score. */
function gridPath(value) {
  const r    = scaleR(value)
  const pts  = AXES.map(a => pt(CX, CY, r, a.angle))
  return 'M ' + pts.map(p => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' L ') + ' Z'
}

/** Build radar polygon path from a profile object. */
function radarPath(profile) {
  const pts = AXES.map(a => {
    const r = scaleR(profile[a.key])
    return pt(CX, CY, r, a.angle)
  })
  return 'M ' + pts.map(p => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' L ') + ' Z'
}

/** Format profile as "V-A-C-I" shorthand (first letter per axis). */
function profileLabel(profile) {
  return AXES.map(a => profile[a.key]).join('-')
}

export default function IDRadar({ idDrives }) {
  const isEngaged = idDrives && Object.values(idDrives).some(v => v !== 5)
  const visitorProfile = idDrives || { verify: 5, authenticate: 5, complete: 5, improvise: 5 }

  const GHOST_VALUE = 5  // ghost diamond shown at neutral (5) when not engaged

  return (
    <svg
      viewBox="0 0 500 520"
      className="w-full h-auto"
      role="img"
      aria-labelledby="idradar-title idradar-desc"
    >
      <title id="idradar-title">I.D. Drives Profile Radar</title>
      <desc id="idradar-desc">
        {`Diamond radar chart showing four I.D. drive scores (Verify, Authenticate, Complete, Improvise) on a scale of 1-9. Cain scores ${profileLabel(CAIN_ID)}.`}
        {isEngaged
          ? ` Your scores are ${profileLabel(visitorProfile)}.`
          : ' Adjust the sliders above to see your profile.'}
      </desc>

      {/* ── Grid rings (diamonds at 1, 3, 5, 7, 9) ── */}
      {[1, 3, 7, 9].map(v => (
        <path
          key={v}
          d={gridPath(v)}
          fill="none"
          stroke="rgba(148,163,184,0.12)"
          strokeWidth={0.75}
        />
      ))}
      {/* Neutral midline (5) — emphasized */}
      <path
        d={gridPath(5)}
        fill="none"
        stroke="rgba(148,163,184,0.30)"
        strokeWidth={1.25}
      />

      {/* ── Axis spokes ── */}
      {AXES.map(a => {
        const end = pt(CX, CY, MAX_R, a.angle)
        return (
          <line
            key={a.key}
            x1={CX} y1={CY}
            x2={end.x} y2={end.y}
            stroke="rgba(148,163,184,0.18)"
            strokeWidth={0.75}
          />
        )
      })}

      {/* ── Zone labels on the Verify (top) axis ── */}
      {/* USE label */}
      <text
        x={CX + 6}
        y={CY - scaleR(8) + 4}
        textAnchor="start"
        dominantBaseline="middle"
        fontSize={7.5}
        letterSpacing="0.04em"
        fill="rgba(21,128,61,0.65)"
      >
        USE (6–9)
      </text>
      {/* NEUTRAL label */}
      <text
        x={CX + 6}
        y={CY - scaleR(5) + 4}
        textAnchor="start"
        dominantBaseline="middle"
        fontSize={7.5}
        letterSpacing="0.04em"
        fill="rgba(148,163,184,0.55)"
      >
        NEUTRAL
      </text>
      {/* AVOID label */}
      <text
        x={CX + 6}
        y={CY - scaleR(2.5) + 4}
        textAnchor="start"
        dominantBaseline="middle"
        fontSize={7.5}
        letterSpacing="0.04em"
        fill="rgba(185,28,28,0.55)"
      >
        AVOID (1–4)
      </text>

      {/* ── Scale value ticks on the Verify (top) axis ── */}
      {[1, 5, 9].map(v => {
        const y = CY - scaleR(v)
        return (
          <text
            key={v}
            x={CX - 7}
            y={y}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={7}
            fill="currentColor"
            opacity={0.28}
          >
            {v}
          </text>
        )
      })}

      {/* ── Ghost placeholder (shown when visitor not engaged) ── */}
      {!isEngaged && (
        <path
          d={gridPath(GHOST_VALUE)}
          fill="none"
          stroke="rgba(56,189,248,0.25)"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
      )}

      {/* ── Cain's radar polygon ── */}
      <path
        d={radarPath(CAIN_ID)}
        fill="rgba(245,158,11,0.22)"
        stroke="#f59e0b"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* ── Visitor's radar polygon (animated when engaged) ── */}
      {isEngaged && (
        <g
          key={JSON.stringify(visitorProfile)}
          className="marker-pop"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <path
            d={radarPath(visitorProfile)}
            fill="rgba(56,189,248,0.20)"
            stroke="#38bdf8"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* ── Cain axis dots (highlight each drive) ── */}
      {AXES.map(a => {
        const r = scaleR(CAIN_ID[a.key])
        const p = pt(CX, CY, r, a.angle)
        return <circle key={`cain-dot-${a.key}`} cx={p.x} cy={p.y} r={3} fill="#f59e0b" opacity={0.7} />
      })}

      {/* ── Visitor axis dots (when engaged) ── */}
      {isEngaged && AXES.map(a => {
        const r = scaleR(visitorProfile[a.key])
        const p = pt(CX, CY, r, a.angle)
        return <circle key={`vis-dot-${a.key}`} cx={p.x} cy={p.y} r={3} fill="#38bdf8" opacity={0.7} />
      })}

      {/* ── Axis labels at outer tips ── */}
      {AXES.map(a => {
        const p  = pt(CX, CY, MAX_R + 20, a.angle)
        const sin = Math.sin((a.angle * Math.PI) / 180)
        const anc = sin > 0.2 ? 'start' : sin < -0.2 ? 'end' : 'middle'
        const dy  = a.angle === 0 ? -6 : a.angle === 180 ? 6 : 0
        return (
          <text
            key={`axis-label-${a.key}`}
            x={p.x}
            y={p.y + dy}
            textAnchor={anc}
            dominantBaseline="middle"
            fontSize={9}
            fontWeight="600"
            letterSpacing="0.03em"
            fill="currentColor"
            opacity={0.55}
          >
            {a.label}
          </text>
        )
      })}

      {/* ── Legend ── */}
      <g transform="translate(34 454)">
        {/* Cain polygon swatch */}
        <rect x={-2} y={-6} width={12} height={12} rx={2} fill="rgba(245,158,11,0.22)" stroke="#f59e0b" strokeWidth={1.5} />
        <text x={18} y={1} dominantBaseline="middle" fontSize={11} fill="currentColor" opacity={0.7}>
          Cain ({profileLabel(CAIN_ID)})
        </text>

        {/* Visitor polygon swatch */}
        {isEngaged ? (
          <rect x={-2} y={16} width={12} height={12} rx={2} fill="rgba(56,189,248,0.20)" stroke="#38bdf8" strokeWidth={1.5} />
        ) : (
          <rect x={-2} y={16} width={12} height={12} rx={2} fill="none" stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="3 2" opacity={0.4} />
        )}
        <text
          x={18} y={23}
          dominantBaseline="middle"
          fontSize={11}
          fill="currentColor"
          opacity={isEngaged ? 0.7 : 0.38}
        >
          {isEngaged ? `You (${profileLabel(visitorProfile)})` : 'Your data'}
        </text>
      </g>

      {/* ── Legend: scale note ── */}
      <g transform="translate(34 490)">
        <text fontSize={8.5} fill="currentColor" opacity={0.28} letterSpacing="0.03em">
          Scale 1–9 · USE = 6–9 · NEUTRAL = 5 · AVOID = 1–4
        </text>
      </g>

      {/* ── Sample note ── */}
      {!isEngaged && (
        <text
          x={CX}
          y={508}
          textAnchor="middle"
          fontSize={8.5}
          letterSpacing="0.06em"
          fill="currentColor"
          opacity={0.28}
        >
          YOUR DATA WILL APPEAR HERE — ADJUST SLIDERS ABOVE
        </text>
      )}
    </svg>
  )
}
