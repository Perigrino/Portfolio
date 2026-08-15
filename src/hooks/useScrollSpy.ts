import { useEffect, useState } from 'react'

/**
 * Scrollspy: returns the id of the section currently in view, so the nav can
 * highlight it. Uses a scroll listener with rAF throttling — the sections are
 * few, so this is cheaper and more predictable than an IntersectionObserver
 * with rootMargin math.
 */
export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    let raf = 0

    const compute = () => {
      raf = 0
      let current = ids[0] ?? ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= offset) current = id
      }
      // If we've scrolled past the last section, keep it highlighted.
      const last = ids[ids.length - 1]
      if (last && window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = last
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ids, offset])

  return active
}
