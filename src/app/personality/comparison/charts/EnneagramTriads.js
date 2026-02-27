'use client'
import { ENNEAGRAM_TYPES, ENNEAGRAM_TRIADS } from '@/app/personality/comparison/data/enneagramTypes'

const CAIN_TYPE = 8
const CAIN_WING = 7
const DEMO_TYPE = 4   // Heart triad — clear cross-triad contrast with Cain's Gut

const CX = 250
const CY = 248
const R  = 178   // type node ring radius

// Clockwise-from-top angle for each type: typeNum × 40 (mod 360), Type 9 → 0° (top)
function cwAngle(typeNum) {
  return (typeNum * 40) % 360
}

// Convert polar angle (0° = top, clockwise) to SVG x,y
function pt(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

// Pie-slice path (handles wrap-around, e.g. Gut sector 300° → 60°)
function sector(cx, cy, r, startDeg, endDeg) {
  let end = endDeg
  if (end <= startDeg) end += 360
  const s = pt(cx, cy, r, startDeg)
  const e = pt(cx, cy, r, end)
  const large = end - startDeg > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} Z`
}

// Triad sectors (120° each, boundary = midpoint between adjacent triad types)
const TRIAD_SECTORS = [
  { key: 'Gut',   start: 300, end:  60, fill: 'rgba(21,128,61,0.08)',  center: 0   },
  { key: 'Heart', start:  60, end: 180, fill: 'rgba(185,28,28,0.08)', center: 120 },
  { key: 'Head',  start: 180, end: 300, fill: 'rgba(29,78,216,0.08)', center: 240 },
]

// Inner connection lines: hexad (1→4→2→8→5→7→1) and triangle (3→6→9→3)
const HEXAD   = [1, 4, 2, 8, 5, 7, 1]
const TRIANGLE = [3, 6, 9, 3]

// SVG text-anchor based on x-position relative to center
function anchor(deg) {
  const sin = Math.sin((deg * Math.PI) / 180)
  if (sin >  0.2) return 'start'
  if (sin < -0.2) return 'end'
  return 'middle'
}

// Interpolate a point fraction of the way from pos1 to pos2
function lerp(p1, p2, t) {
  return { x: p1.x + (p2.x - p1.x) * t, y: p1.y + (p2.y - p1.y) * t }
}

export default function EnneagramTriads({ visitorType = null, visitorWing = null }) {
  const isDemoData = !visitorType
  const activeType = visitorType ? Number(visitorType) : DEMO_TYPE
  const activeWing = visitorType ? visitorWing : null  // no wing shown in demo

  const cainPos    = pt(CX, CY, R, cwAngle(CAIN_TYPE))
  const visitorPos = pt(CX, CY, R, cwAngle(activeType))

  const cainData    = ENNEAGRAM_TYPES[CAIN_TYPE]
  const visitorData = ENNEAGRAM_TYPES[activeType]

  // Positions for Cain's integration / disintegration arrow tips
  const cainGrowthPos  = pt(CX, CY, R, cwAngle(cainData.integrationPoint))
  const cainStressPos  = pt(CX, CY, R, cwAngle(cainData.disintegrationPoint))

  // Visitor arrows (only when real visitor is selected)
  const visGrowthPos  = visitorType ? pt(CX, CY, R, cwAngle(visitorData.integrationPoint)) : null
  const visStressPos  = visitorType ? pt(CX, CY, R, cwAngle(visitorData.disintegrationPoint)) : null

  // Compute arrow segment: starts 22% from origin, ends 82% (leaves gap at target node)
  function arrow(from, to) {
    return { from: lerp(from, to, 0.22), to: lerp(from, to, 0.82) }
  }

  const cainGrowthArr  = arrow(cainPos, cainGrowthPos)
  const cainStressArr  = arrow(cainPos, cainStressPos)
  const visGrowthArr   = visitorType ? arrow(visitorPos, visGrowthPos) : null
  const visStressArr   = visitorType ? arrow(visitorPos, visStressPos) : null

  // Wing label string
  function wingLabel(type, wing) {
    if (!wing) return `${type}`
    const w = ENNEAGRAM_TYPES[type]?.wingVariants?.[String(wing)]
    return w ? `${type}w${wing}` : `${type}`
  }

  return (
    <svg
      viewBox="0 0 500 555"
      className="w-full h-auto"
      role="img"
      aria-labelledby="enn-title enn-desc"
    >
      <title id="enn-title">Enneagram Triads Circle</title>
      <desc id="enn-desc">
        {`Circular diagram with 9 Enneagram types and three triads. Cain is Type ${CAIN_TYPE}w${CAIN_WING} (${cainData.name}).`}
        {visitorType
          ? ` Your type is ${wingLabel(activeType, activeWing)} (${visitorData.name}).`
          : ' Select your type above to see your position.'}
      </desc>

      <defs>
        {/* Arrow markers for integration (growth) and disintegration (stress) */}
        <marker id="arr-growth" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
          <path d="M 0 0 L 5 2.5 L 0 5 Z" fill="rgba(21,128,61,0.65)" />
        </marker>
        <marker id="arr-stress" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
          <path d="M 0 0 L 5 2.5 L 0 5 Z" fill="rgba(185,28,28,0.65)" />
        </marker>
        <marker id="arr-growth-vis" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
          <path d="M 0 0 L 5 2.5 L 0 5 Z" fill="rgba(56,189,248,0.55)" />
        </marker>
        <marker id="arr-stress-vis" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
          <path d="M 0 0 L 5 2.5 L 0 5 Z" fill="rgba(251,113,133,0.55)" />
        </marker>
      </defs>

      {/* ── Triad sector fills ── */}
      {TRIAD_SECTORS.map(s => (
        <path key={s.key} d={sector(CX, CY, R, s.start, s.end)} fill={s.fill} />
      ))}

      {/* ── Outer ring ── */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth={1} />

      {/* ── Triad center watermark labels ── */}
      {TRIAD_SECTORS.map(s => {
        const triad = ENNEAGRAM_TRIADS[s.key]
        const p = pt(CX, CY, 105, s.center)
        return (
          <g key={`tlabel-${s.key}`}>
            <text x={p.x} y={p.y - 5} textAnchor="middle" dominantBaseline="auto"
              fontSize={10} fontWeight="700" letterSpacing="0.06em"
              fill="currentColor" opacity={0.18}>
              {s.key.toUpperCase()}
            </text>
            <text x={p.x} y={p.y + 8} textAnchor="middle" dominantBaseline="auto"
              fontSize={7} letterSpacing="0.04em" fill="currentColor" opacity={0.13}>
              {triad.coreEmotion.toUpperCase()}
            </text>
          </g>
        )
      })}

      {/* ── Inner hexad lines (1→4→2→8→5→7→1) ── */}
      {HEXAD.slice(0, -1).map((from, i) => {
        const to  = HEXAD[i + 1]
        const p1  = pt(CX, CY, R, cwAngle(from))
        const p2  = pt(CX, CY, R, cwAngle(to))
        return (
          <line key={`hex-${from}-${to}`}
            x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke="rgba(148,163,184,0.18)" strokeWidth={0.75} />
        )
      })}

      {/* ── Inner triangle lines (3→6→9→3) ── */}
      {TRIANGLE.slice(0, -1).map((from, i) => {
        const to  = TRIANGLE[i + 1]
        const p1  = pt(CX, CY, R, cwAngle(from))
        const p2  = pt(CX, CY, R, cwAngle(to))
        return (
          <line key={`tri-${from}-${to}`}
            x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke="rgba(148,163,184,0.18)" strokeWidth={0.75} />
        )
      })}

      {/* ── Integration / Disintegration arrows — Cain ── */}
      <line
        x1={cainGrowthArr.from.x} y1={cainGrowthArr.from.y}
        x2={cainGrowthArr.to.x}   y2={cainGrowthArr.to.y}
        stroke="rgba(21,128,61,0.50)" strokeWidth={1.25} strokeDasharray="3 2"
        markerEnd="url(#arr-growth)" />
      <line
        x1={cainStressArr.from.x} y1={cainStressArr.from.y}
        x2={cainStressArr.to.x}   y2={cainStressArr.to.y}
        stroke="rgba(185,28,28,0.50)" strokeWidth={1.25} strokeDasharray="3 2"
        markerEnd="url(#arr-stress)" />

      {/* ── Integration / Disintegration arrows — visitor (when real type selected) ── */}
      {visitorType && visGrowthArr && (
        <line
          x1={visGrowthArr.from.x} y1={visGrowthArr.from.y}
          x2={visGrowthArr.to.x}   y2={visGrowthArr.to.y}
          stroke="rgba(56,189,248,0.45)" strokeWidth={1.25} strokeDasharray="3 2"
          markerEnd="url(#arr-growth-vis)" />
      )}
      {visitorType && visStressArr && (
        <line
          x1={visStressArr.from.x} y1={visStressArr.from.y}
          x2={visStressArr.to.x}   y2={visStressArr.to.y}
          stroke="rgba(251,113,133,0.45)" strokeWidth={1.25} strokeDasharray="3 2"
          markerEnd="url(#arr-stress-vis)" />
      )}

      {/* ── Connector line between Cain and visitor ── */}
      <line
        x1={cainPos.x} y1={cainPos.y}
        x2={visitorPos.x} y2={visitorPos.y}
        stroke={isDemoData ? 'rgba(148,163,184,0.12)' : 'rgba(148,163,184,0.38)'}
        strokeWidth={isDemoData ? 1 : 1.5}
        strokeDasharray="5 4" strokeLinecap="round" />

      {/* ── Type nodes and labels ── */}
      {Array.from({ length: 9 }, (_, i) => i + 1).map(typeNum => {
        const angle = cwAngle(typeNum)
        const p     = pt(CX, CY, R, angle)
        const lp    = pt(CX, CY, R + 22, angle)
        const anc   = anchor(angle)
        const isCain    = typeNum === CAIN_TYPE
        const isVisitor = typeNum === activeType && !isCain
        const typeData  = ENNEAGRAM_TYPES[typeNum]

        // Shorten name to first word for compact display
        const shortName = typeData.name.replace('The ', '')

        return (
          <g key={typeNum}>
            {/* Dot (hidden for Cain / visitor — larger markers handle those) */}
            {!isCain && !isVisitor && (
              <circle cx={p.x} cy={p.y} r={4} fill="#475569" opacity={0.52} />
            )}

            {/* Type number label */}
            <text
              x={lp.x} y={lp.y - 4}
              textAnchor={anc} dominantBaseline="auto"
              fontSize={isCain || isVisitor ? 11 : 10}
              fontWeight={isCain || isVisitor ? '700' : '500'}
              fill={isCain ? '#f59e0b' : isVisitor ? '#38bdf8' : 'currentColor'}
              opacity={isCain || isVisitor ? 1 : 0.45}>
              {typeNum}
            </text>
            {/* Short name */}
            <text
              x={lp.x} y={lp.y + 8}
              textAnchor={anc} dominantBaseline="auto"
              fontSize={7}
              fill={isCain ? '#f59e0b' : isVisitor ? '#38bdf8' : 'currentColor'}
              opacity={isCain || isVisitor ? 0.7 : 0.28}>
              {shortName}
            </text>
          </g>
        )
      })}

      {/* ── Demo visitor marker (faded dashed outline) ── */}
      {isDemoData && (
        <g transform={`translate(${visitorPos.x} ${visitorPos.y})`}>
          <circle r={8} fill="#38bdf8" opacity={0.18} />
          <circle r={8} fill="none" stroke="#38bdf8" strokeWidth={1.5}
            strokeDasharray="3 2" opacity={0.38} />
        </g>
      )}

      {/* ── Real visitor marker (animated pop-in) ── */}
      {!isDemoData && (
        <g key={`${visitorType}-${visitorWing}`}
          transform={`translate(${visitorPos.x} ${visitorPos.y})`}
          style={{ transformOrigin: '0px 0px' }}
          className="marker-pop">
          <circle r={8} fill="#38bdf8" stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} />
        </g>
      )}

      {/* ── Cain's marker ── */}
      <g transform={`translate(${cainPos.x} ${cainPos.y})`}>
        <circle r={14} fill="none" stroke="#f59e0b" strokeWidth={1} opacity={0.28} />
        <circle r={9}  fill="#f59e0b" stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} />
      </g>

      {/* ── Legend ── */}
      <g transform="translate(34 485)">
        <circle cx={0} cy={0} r={5} fill="#f59e0b" />
        <text x={13} y={1} dominantBaseline="middle" fontSize={11}
          fill="currentColor" opacity={0.7}>
          Cain ({wingLabel(CAIN_TYPE, CAIN_WING)})
        </text>

        {isDemoData ? (
          <circle cx={0} cy={22} r={5} fill="none" stroke="#38bdf8"
            strokeWidth={1.5} strokeDasharray="2.5 2" opacity={0.5} />
        ) : (
          <circle cx={0} cy={22} r={5} fill="#38bdf8" />
        )}
        <text x={13} y={23} dominantBaseline="middle" fontSize={11}
          fill="currentColor" opacity={isDemoData ? 0.42 : 0.7}>
          {isDemoData
            ? `${DEMO_TYPE} (sample)`
            : wingLabel(activeType, activeWing) + ' (you)'}
        </text>

        {/* Arrow legend */}
        <line x1={0} y1={44} x2={18} y2={44}
          stroke="rgba(21,128,61,0.55)" strokeWidth={1.25} strokeDasharray="3 2"
          markerEnd="url(#arr-growth)" />
        <text x={25} y={45} dominantBaseline="middle" fontSize={10}
          fill="currentColor" opacity={0.5}>
          Growth (integration)
        </text>

        <line x1={0} y1={60} x2={18} y2={60}
          stroke="rgba(185,28,28,0.55)" strokeWidth={1.25} strokeDasharray="3 2"
          markerEnd="url(#arr-stress)" />
        <text x={25} y={61} dominantBaseline="middle" fontSize={10}
          fill="currentColor" opacity={0.5}>
          Stress (disintegration)
        </text>
      </g>

      {/* ── Sample note ── */}
      {isDemoData && (
        <text x={CX} y={538} textAnchor="middle"
          fontSize={8.5} letterSpacing="0.06em" fill="currentColor" opacity={0.28}>
          SAMPLE COMPARISON SHOWN — SELECT YOUR TYPE ABOVE
        </text>
      )}
    </svg>
  )
}
