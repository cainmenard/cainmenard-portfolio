'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

const SECTIONS = [
  { id: 'opening', label: 'The Story' },
  { id: 'the-shift', label: 'The Shift' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'the-numbers', label: 'The Numbers' },
  { id: 'untapped-builders', label: 'The Builders' },
  { id: 'industry-productivity', label: 'The Industry' },
  { id: 'dotcom-parallel', label: 'The Parallel' },
  { id: 'legacy-software', label: 'Legacy Software' },
  { id: 'functional-experience', label: 'The Bottleneck' },
  { id: 'readiness', label: 'Readiness' },
]

export default function SideNav() {
  const [activeId, setActiveId] = useState('')
  const [clickedId, setClickedId] = useState(null)
  const [hidden, setHidden] = useState(false)
  const timeoutRef = useRef(null)

  /* ── Intersection Observer: track which section is in view ── */
  useEffect(() => {
    const sectionEls = SECTIONS
      .map(s => document.getElementById(s.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { threshold: 0.1, rootMargin: '-10% 0px -40% 0px' }
    )

    sectionEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* ── Hide nav when comparison section is in view ── */
  useEffect(() => {
    const compSection = document.getElementById('comparison')
    if (!compSection) return
    const obs = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 }
    )
    obs.observe(compSection)
    return () => obs.disconnect()
  }, [])

  /* ── Clear click override once the observer catches up ── */
  useEffect(() => {
    if (clickedId && activeId === clickedId) setClickedId(null)
  }, [activeId, clickedId])

  /* ── Cleanup timeout on unmount ── */
  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  const handleClick = useCallback((e, id) => {
    e.preventDefault()
    setClickedId(id)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setClickedId(null), 2000)

    const target = document.getElementById(id)
    if (!target) return
    const top = target.getBoundingClientRect().top + window.scrollY - 24
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  const currentActive = clickedId || activeId
  const activeIndex = SECTIONS.findIndex(s => s.id === currentActive)
  const progress = SECTIONS.length > 1 && activeIndex >= 0
    ? activeIndex / (SECTIONS.length - 1)
    : 0

  return (
    <nav className={`side-nav${hidden ? ' side-nav--hidden' : ''}`} aria-label="Article sections">
      <ul className="side-nav__list" style={{ '--rail-progress': progress }}>
        {SECTIONS.map((item) => {
          const isActive = currentActive === item.id
          return (
            <li key={item.id} className="side-nav__item">
              <button
                className={`side-nav__dot${isActive ? ' side-nav__dot--active' : ''}`}
                onClick={(e) => handleClick(e, item.id)}
                aria-label={`Go to ${item.label}`}
              />
              <a
                href={`#${item.id}`}
                className={`side-nav__label${isActive ? ' side-nav__label--active' : ''}`}
                onClick={(e) => handleClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
