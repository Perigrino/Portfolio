import { useEffect, useState } from 'react'

/**
 * Returns the current window scroll position (rAF-throttled), updated on
 * scroll and resize. Shared by the nav shrink and back-to-top button so only
 * one listener pattern exists.
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      setScrollY(window.scrollY)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return scrollY
}
