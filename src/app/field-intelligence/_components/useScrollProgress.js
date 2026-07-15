'use client'
import { useEffect } from 'react'

/**
 * Continuous 0→1 progress through the whole article, driving the day-arc
 * sky (color, sun position, stars). Unlike useActiveSection — which reports a
 * discrete "which station" — this is smooth, so the sky moves WITH the scroll
 * instead of snapping at section boundaries.
 *
 * Imperative by design: it calls `onChange(progress)` on each rAF tick rather
 * than returning state, so the caller can write CSS variables directly and the
 * React tree never re-renders per frame. rAF-throttled — the scroll listener
 * only flags "dirty" and a single frame reads layout, so fast wheel/touch
 * scrolls never thrash.
 *
 * NOTE: this deliberately does NOT gate on prefers-reduced-motion. A sky color
 * tied to scroll POSITION is not vestibular motion, and freezing it here is
 * exactly what made the effect look dead for reduced-motion viewers. Reduced
 * motion is handled purely in CSS — it stills the sun's travel and the star
 * twinkle while the sky color still tracks scroll for everyone.
 *
 * @param {(progress:number)=>void} onChange  called with clamped progress [0,1].
 *   Keep it stable (useCallback) so the listener isn't re-subscribed each render.
 */
export function useScrollProgress(onChange) {
  useEffect(() => {
    let frame = 0
    let ticking = false

    const measure = () => {
      ticking = false
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const next = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0
      onChange(next)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [onChange])
}
