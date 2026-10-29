/**
 * DataNote keeps the two data worlds visually distinct (guardrail 5):
 *   world="field"   real engagement number (copper, "field note")
 *   world="sandbox" illustrative / composite input (teal, hatched, "sandbox")
 * They must never blend, or the credibility collapses.
 *
 * `projected` adds a PROJECTED stamp for forward projections (guardrail 4).
 */
export default function DataNote({
  world = 'field',
  label,
  projected = false,
  className = '',
  children,
}) {
  const defaultLabel = world === 'sandbox' ? 'Sandbox' : 'Field note'
  return (
    <div className={`fi-note fi-note--${world} ${className}`.trim()}>
      <span className="fi-note__tag">
        {label || defaultLabel}
        {projected && <span className="fi-projected">Projected</span>}
      </span>
      <div className="fi-note__body">{children}</div>
    </div>
  )
}
