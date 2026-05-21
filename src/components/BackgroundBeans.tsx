import { useMemo } from 'react'

interface Bean {
  left: string
  size: number
  duration: number
  delay: number
  tilt: number
  opacity: number
}

// Fixed-position decorative layer of slowly-falling coffee beans. Pointer-events
// none so it never blocks interaction. ~14 particles tuned for negligible CPU.
export function BackgroundBeans({ count = 14 }: { count?: number }) {
  const beans = useMemo<Bean[]>(() => {
    return Array.from({ length: count }).map((_, i) => {
      // Stable pseudo-random per index so the layout doesn't shuffle on re-render
      const seed = (i + 1) * 9301
      const rand = (offset: number) => {
        const v = Math.sin(seed + offset) * 10000
        return v - Math.floor(v)
      }
      return {
        left: `${(rand(1) * 100).toFixed(2)}%`,
        size: 10 + rand(2) * 14,
        duration: 28 + rand(3) * 32,
        delay: -rand(4) * 60,
        tilt: rand(5) * 60 - 30,
        opacity: 0.08 + rand(6) * 0.12,
      }
    })
  }, [count])

  return (
    <div className="bean-rain-layer" aria-hidden="true">
      {beans.map((b, i) => (
        <span
          key={i}
          className="bean-particle"
          style={{
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size * 1.55}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            opacity: b.opacity,
            transform: `rotate(${b.tilt}deg)`,
          }}
        />
      ))}
    </div>
  )
}
