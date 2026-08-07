'use client'
import { useState, useEffect } from 'react'

/**
 * Returns true when the viewer prefers reduced motion. Use to gate any
 * JS-driven animation; CSS animations are already gated by the scoped
 * @media (prefers-reduced-motion) block.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}
