'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Nav({ navItems, activeSection, scrolled, mobileNav, onToggleMobile, logoHref = '/', ctaHref = null, secondaryLink = null }) {
  const [visibleCount, setVisibleCount] = useState(navItems.length)
  const [measured, setMeasured] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const navRef = useRef(null)
  const moreRef = useRef(null)
  const itemsRef = useRef(null)

  /* ── Close "More" dropdown on outside click ── */
  useEffect(() => {
    if (!moreOpen) return
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [moreOpen])

  /* ── Measure nav items and determine overflow ── */
  useEffect(() => {
    const nav = navRef.current
    const container = itemsRef.current
    if (!nav || !container) return

    let widths = null

    const measureWidths = () => {
      const testEl = document.createElement('div')
      testEl.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;pointer-events:none;top:-9999px;left:0'
      document.body.appendChild(testEl)
      widths = navItems.map(item => {
        const span = document.createElement('span')
        span.className = 'nav-link'
        span.textContent = item.label
        testEl.appendChild(span)
        const w = span.offsetWidth
        testEl.removeChild(span)
        return w
      })
      document.body.removeChild(testEl)
    }

    const calculate = () => {
      if (!widths) return

      // Use actual container width — flex-1 min-w-0 gives the true available space
      const containerWidth = container.clientWidth

      // Measure the secondary link area if present in the DOM
      const secondaryEl = container.querySelector('[data-nav-secondary]')
      const secondaryW = secondaryEl ? secondaryEl.offsetWidth + 20 : 0

      const available = containerWidth - secondaryW
      const gap = 20
      const moreBtnW = 80

      let used = 0
      let count = 0

      for (let i = 0; i < widths.length; i++) {
        const g = count > 0 ? gap : 0
        const remaining = widths.length - i - 1
        const moreSpace = remaining > 0 ? moreBtnW + gap : 0
        if (used + widths[i] + g + moreSpace <= available) {
          used += widths[i] + g
          count++
        } else break
      }

      setVisibleCount(Math.max(count, 3))
      setMoreOpen(false)
      setMeasured(true)
    }

    const init = () => {
      measureWidths()
      calculate()
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(init)
    } else {
      init()
    }

    const observer = new ResizeObserver(() => {
      if (widths) calculate()
    })
    observer.observe(nav)
    return () => observer.disconnect()
  }, [navItems, secondaryLink])

  /* ── Scroll to section with nav-height offset ── */
  const handleNavClick = useCallback((e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    const navHeight = navRef.current?.offsetHeight || 64
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12
    window.scrollTo({ top, behavior: 'smooth' })
    setMoreOpen(false)
  }, [])

  const visibleItems = navItems.slice(0, visibleCount)
  const overflowItems = navItems.slice(visibleCount)

  return (
    <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-glass nav-scrolled' : 'bg-transparent'}`}>
      <div className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-20'}`}>
        {/* ── Logo ── */}
        <a
          href={logoHref}
          className={`font-bold tracking-tight transition-all duration-300 flex-shrink-0 ${scrolled ? 'text-base' : 'text-lg'}`}
          style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}
        >
          CM
        </a>

        {/* ── Desktop nav items ── */}
        <div ref={itemsRef} className={`hidden md:flex items-center gap-5 flex-1 justify-end ml-8 min-w-0 ${!measured ? 'invisible' : ''}`}>
          {visibleItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`nav-link whitespace-nowrap flex-shrink-0 ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}

          {/* "More" dropdown */}
          {overflowItems.length > 0 && (
            <div className="relative flex-shrink-0" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(v => !v)}
                className={`nav-link flex items-center gap-1 whitespace-nowrap ${overflowItems.some(i => activeSection === i.id) ? 'active' : ''}`}
                aria-expanded={moreOpen}
                aria-haspopup="true"
              >
                More
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`nav-dropdown ${moreOpen ? 'nav-dropdown--open' : ''}`}>
                {overflowItems.map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`nav-dropdown__item ${activeSection === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {secondaryLink && (
            <div className="flex items-center gap-5 flex-shrink-0" data-nav-secondary>
              <span className="w-px h-4 bg-slate-200 dark:bg-slate-600 flex-shrink-0" />
              <a
                href={secondaryLink.href}
                className="nav-link text-slate-400 hover:text-amber-600 whitespace-nowrap flex-shrink-0"
                style={{ borderBottom: 'none' }}
              >
                {secondaryLink.label}
              </a>
            </div>
          )}
        </div>

        {/* ── Controls ── */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          <ThemeToggle />
          {ctaHref && <a href={ctaHref} className="btn-primary text-xs py-2 px-5 hidden md:inline-flex">Get in Touch</a>}
          <button onClick={onToggleMobile} className="md:hidden p-2 -mr-2" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileNav ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
