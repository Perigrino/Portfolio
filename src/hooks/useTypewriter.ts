import { useEffect, useState } from 'react'

/**
 * Typewriter: reveals `text` one character at a time after `startDelay` ms.
 * Returns the string to render. If the user prefers reduced motion, the full
 * string is returned immediately and typing never starts.
 */
export function useTypewriter(text: string, speed = 55, startDelay = 600) {
  const [out, setOut] = useState('')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text)
      return
    }

    let i = 0
    let interval: ReturnType<typeof setInterval> | undefined
    let timer: ReturnType<typeof setTimeout> | undefined

    timer = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setOut(text.slice(0, i))
        if (i >= text.length && interval) clearInterval(interval)
      }, speed)
    }, startDelay)

    return () => {
      if (timer) clearTimeout(timer)
      if (interval) clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return out
}
