import { useState, useEffect } from 'react'

interface ScrollPosition {
  x: number
  y: number
  direction: 'up' | 'down' | null
}

export function useScrollPosition(threshold = 0): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
  })

  useEffect(() => {
    let previousScrollY = window.scrollY
    let ticking = false

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY
      const currentScrollX = window.scrollX
      const direction = currentScrollY > previousScrollY ? 'down' : 'up'

      setScrollPosition({
        x: currentScrollX,
        y: currentScrollY,
        direction: currentScrollY > threshold ? direction : null,
      })

      previousScrollY = currentScrollY
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return scrollPosition
}