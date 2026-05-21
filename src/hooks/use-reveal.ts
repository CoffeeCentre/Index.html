import { useEffect, useRef, useState } from 'react'

interface RevealConfig extends IntersectionObserverInit {
  delayMs?: number
}

// IntersectionObserver-driven reveal. Toggles a `revealed` boolean once on first
// intersect (then disconnects). Pair with the `.reveal-up` class.
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  { delayMs = 0, threshold = 0.15, rootMargin, root }: RevealConfig = {},
) {
  const ref = useRef<T>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const trigger = () => setRevealed(true)
            if (delayMs > 0) window.setTimeout(trigger, delayMs)
            else trigger()
            observer.disconnect()
            break
          }
        }
      },
      { threshold, rootMargin, root },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delayMs, threshold, rootMargin, root])

  return { ref, revealed }
}
