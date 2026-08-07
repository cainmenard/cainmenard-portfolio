'use client'
import { useState, useEffect } from 'react'

/**
 * Track which section owns the vertical center of the viewport.
 * Drives both the progress rail and the day-arc theme band, so there is
 * one source of truth for "where are we" and they can never disagree.
 *
 * @param {string[]} ids  ordered section ids to observe
 * @returns {string} the id of the section crossing the viewport middle
 */
export function useActiveSection(ids) {
  const key = ids.join(',')
  const [active, setActive] = useState(ids[0] || '')

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      // shrink the root to a thin band at the vertical center: whichever
      // section straddles the middle is "active"
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return active
}
