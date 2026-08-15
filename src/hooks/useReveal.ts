import { useEffect, useRef } from 'react'

/**
 * Scroll-reveal: observes elements with `[data-reveal]` inside the returned
 * container ref and adds `.is-in` once they enter the viewport.
 *
 * Elements stay hidden until JS runs: the hook adds `t1-reveal-on` to the
 * container, and the CSS only hides `[data-reveal]` children when that class
 * is present. `prefers-reduced-motion` is handled in CSS (everything visible
 * immediately).
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    root.classList.add('t1-reveal-on')
    const targets = root.querySelectorAll('[data-reveal]')
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return ref
}
