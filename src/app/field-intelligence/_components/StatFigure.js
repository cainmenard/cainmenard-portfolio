/**
 * A single tabular figure: the big number the eye lands on, plus a label.
 * Uses the mono face and tabular-nums so digits line up.
 */
export default function StatFigure({ value, unit, label, size = 'md' }) {
  const scale = { sm: '1.5rem', md: '2.25rem', lg: '3rem' }[size] || '2.25rem'
  return (
    <div className="fi-stat">
      <div
        className="fi-figure"
        style={{ fontSize: scale, fontWeight: 500, lineHeight: 1 }}
      >
        {value}
        {unit && (
          <span className="fi-muted" style={{ fontSize: '0.5em', marginLeft: '0.3em' }}>
            {unit}
          </span>
        )}
      </div>
      {label && (
        <div className="fi-muted" style={{ fontSize: '0.8rem', marginTop: '0.4rem' }}>
          {label}
        </div>
      )}
    </div>
  )
}
