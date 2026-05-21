import { useRef, useState, useCallback } from 'react'
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react'

interface TiltConfig {
  max?: number
  scale?: number
}

// Mouse-tracking 3D tilt. Returns props to spread onto the wrapper element.
export function useTilt<T extends HTMLElement = HTMLDivElement>({
  max = 12,
  scale = 1.03,
}: TiltConfig = {}) {
  const ref = useRef<T>(null)
  const [style, setStyle] = useState<CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0)',
    transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
  })

  const onMouseMove = useCallback(
    (e: ReactMouseEvent<T>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const rotateY = (x - 0.5) * 2 * max
      const rotateX = -(y - 0.5) * 2 * max
      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale}) translateZ(0)`,
        transition: 'transform 0.08s linear',
      })
    },
    [max, scale],
  )

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0)',
      transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
    })
  }, [])

  return { ref, style, onMouseMove, onMouseLeave }
}
