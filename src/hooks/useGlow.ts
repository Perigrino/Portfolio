import { useRef } from 'react'
import type { MouseEvent } from 'react'

/**
 * Cursor-following glow: writes the pointer position relative to the element
 * straight into `--mx`/`--my` custom properties (no React re-renders). Pair
 * with a CSS `::before` radial-gradient overlay at `var(--mx) var(--my)`.
 */
export function useGlow<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  const handleMouseMove = (e: MouseEvent<T>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return { ref, handleMouseMove }
}
