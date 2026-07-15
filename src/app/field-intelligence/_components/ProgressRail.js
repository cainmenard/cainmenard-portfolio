'use client'
import { useCallback } from 'react'

/**
 * FIELD -> OFFICE -> JOB COST -> PORTFOLIO -> DECISIONS.
 * A fixed top rail rendered as an editorial segmented stepper: each station is
 * a numbered step (01..05) whose name sits above a short segment bar, and the
 * segments fill copper one-by-one as the reader advances — together reading as
 * a progress bar. It closes into a loop at the epilogue (the return arc lights
 * up, every segment fills, the first step re-glows). Steps are keyboard-
 * navigable anchors that smooth-scroll, offset by the rail height.
 *
 * @param {{id:string, short:string}[]} sections
 * @param {number} activeIndex  index of the active station, or -1
 * @param {boolean} looped      true once the loop has closed (finale onward)
 * @param {string} backHref
 * @param {string} backLabel
 */
export default function ProgressRail({ sections, activeIndex, looped, backHref, backLabel }) {
  const handleNav = useCallback((e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    const railH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--fi-rail-h') || '56',
      10
    )
    const top = target.getBoundingClientRect().top + window.scrollY - railH - 12
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  return (
    <nav className={`fi-rail${looped ? ' fi-rail--looped' : ''}`} aria-label="Progress">
      <a className="fi-rail__back" href={backHref}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        {backLabel}
      </a>

      <ol className="fi-rail__steps">
        {sections.map((s, i) => {
          const isActive = !looped && i === activeIndex
          const isDone = looped || i < activeIndex
          const cls =
            'fi-rail__step' +
            (isActive ? ' fi-rail__step--active' : '') +
            (isDone ? ' fi-rail__step--done' : '')
          return (
            <li key={s.id} className={cls}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? 'step' : undefined}
                onClick={(e) => handleNav(e, s.id)}
              >
                <span className="fi-rail__step-head">
                  <span className="fi-rail__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="fi-rail__name">{s.short}</span>
                </span>
                <span className="fi-rail__seg" aria-hidden="true">
                  <span className="fi-rail__seg-fill" />
                </span>
              </a>
            </li>
          )
        })}
      </ol>

      <span className="fi-rail__loop" aria-hidden="true" title="The loop closes">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.5 15a9 9 0 1 0 2.1-9.4L1 10" />
        </svg>
      </span>
    </nav>
  )
}
