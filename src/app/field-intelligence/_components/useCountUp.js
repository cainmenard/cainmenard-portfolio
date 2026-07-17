'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

// easeOutCubic — fast to start, settles softly on the final figure
const ease = (t) => 1 - Math.pow(1 - t, 3)

/**
 * An eased count-up tween for a single figure.
 *
 * `value` is null while idle and the current animating number once running,
 * so the caller formats it (e.g. tabular dollars). `start(from, to)` kicks a
 * tween; `reset()` clears it back to idle. Reduced motion is respected here —
 * the tween is skipped and the figure lands straight on `to` — so the caller
 * never has to branch on it.
 *
 * @param {number} durationMs
 */
export function useCountUp(durationMs = 750) {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(null)
  const raf = useRef(0)

  const start = useCallback(
    (from, to) => {
      cancelAnimationFrame(raf.current)
      if (reduced) {
        setValue(to)
        return
      }
      const t0 = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / durationMs)
        setValue(from + (to - from) * ease(p))
        if (p < 1) raf.current = requestAnimationFrame(tick)
      }
      raf.current = requestAnimationFrame(tick)
    },
    [reduced, durationMs]
  )

  const reset = useCallback(() => {
    cancelAnimationFrame(raf.current)
    setValue(null)
  }, [])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  return { value, start, reset }
}
