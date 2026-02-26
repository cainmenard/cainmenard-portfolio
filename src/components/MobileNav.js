'use client'
import { useEffect, useRef } from 'react'

export default function MobileNav({ navItems, activeSection, mobileNav, onClose, secondaryLink = null, secondaryLinks = null, ctaHref = null }) {
  const resolvedLinks = secondaryLinks || (secondaryLink ? [secondaryLink] : [])
  const overlayRef = useRef(null)

  // Escape key handler
  useEffect(() => {
    if (!mobileNav) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mobileNav, onClose])

  // Focus trap
  useEffect(() => {
    if (!mobileNav || !overlayRef.current) return
    const focusableEls = overlayRef.current.querySelectorAll('a, button')
    if (focusableEls.length) focusableEls[0].focus()

    const handleTab = (e) => {
      if (e.key !== 'Tab' || !focusableEls.length) return
      const first = focusableEls[0]
      const last = focusableEls[focusableEls.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [mobileNav])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    onClose()
    // Small delay to let the overlay start closing before scrolling
    setTimeout(() => {
      const target = document.getElementById(id)
      if (!target) return
      // Compact nav height (56px) + buffer
      const top = target.getBoundingClientRect().top + window.scrollY - 68
      window.scrollTo({ top, behavior: 'smooth' })
    }, 100)
  }

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={`fixed inset-0 z-40 bg-white dark:bg-slate-900 flex flex-col items-center justify-center gap-6 md:hidden mobile-nav-overlay ${mobileNav ? 'mobile-nav-open' : 'mobile-nav-closed'}`}
    >
      {navItems.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`text-xl font-semibold transition ${activeSection === item.id ? 'text-amber-600 dark:text-amber-500' : 'text-slate-800 dark:text-slate-200 hover:text-amber-600'}`}
          onClick={(e) => handleNavClick(e, item.id)}
        >
          {item.label}
        </a>
      ))}
      {resolvedLinks.length > 0 && (
        <>
          <span className="w-12 h-px bg-slate-200 dark:bg-slate-700" aria-hidden="true"></span>
          {resolvedLinks.map(link => (
            <a key={link.href} href={link.href} className="text-lg font-medium text-slate-400 hover:text-amber-600 transition" onClick={onClose}>{link.label}</a>
          ))}
        </>
      )}
      {ctaHref && <a href={ctaHref} className="btn-primary mt-4" onClick={onClose}>Get in Touch</a>}
    </div>
  )
}
