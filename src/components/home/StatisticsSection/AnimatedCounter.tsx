'use client'

import { useEffect, useState, useRef } from 'react'

interface AnimatedCounterProps {
  end: number
  decimals?: number
  duration?: number
  start?: boolean
  prefix?: string
  suffix?: string
  separator?: string
}

export function AnimatedCounter({
  end,
  decimals = 0,
  duration = 2000,
  start = false,
  prefix = '',
  suffix = '',
  separator = ','
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  // Format number with thousand separators
  const formatNumber = (num: number): string => {
    const parts = num.toFixed(decimals).split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return parts.join('.')
  }

  useEffect(() => {
    if (!start) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setCount(end)
      return
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const progress = Math.min(
        (timestamp - startTimeRef.current) / duration,
        1
      )

      // Easing function (ease-out-expo)
      const easeOutExpo = progress === 1 
        ? 1 
        : 1 - Math.pow(2, -10 * progress)

      const currentCount = easeOutExpo * end
      countRef.current = currentCount
      setCount(currentCount)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [end, duration, start, decimals])

  return (
    <span className="tabular-nums">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  )
}