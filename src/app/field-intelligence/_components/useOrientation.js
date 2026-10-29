'use client'
import { useState, useEffect } from 'react'

/**
 * Returns the pipeline layout orientation: 'v' (stacked) on narrow screens,
 * 'h' (left-to-right) otherwise. Starts 'h' so server render and first paint
 * agree, then corrects on mount. Mirrors useReducedMotion's matchMedia pattern.
 */
export function useOrientation(query = '(max-width: 640px)') {
  const [vertical, setVertical] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setVertical(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])

  return vertical ? 'v' : 'h'
}
