import { useEffect, useState } from 'react'

/**
 * Animates a number from 0 to `target` when `start` flips true, driven by
 * requestAnimationFrame with an ease-out curve. Under reduced motion (or
 * before `start`), it renders the final value directly.
 */
export function useCountUp(target: number, start: boolean, duration = 1200) {
  const [value, setValue] = useState(start ? target : 0)

  useEffect(() => {
    if (!start) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let raf = 0
    const t0 = performance.now()
    // Ease-out-back: overshoots past the target near the end, then settles,
    // so the final number lands with a subtle spring. c1 tunes the overshoot.
    const c1 = 1.2
    const c3 = c1 + 1

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      const u = p - 1
      const eased = 1 + c3 * u * u * u + c1 * u * u
      setValue(Math.round(target * eased))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setValue(target)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, start, duration])

  return value
}
