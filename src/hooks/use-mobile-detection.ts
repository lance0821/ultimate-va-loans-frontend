'use client'

import { useState, useEffect } from 'react'

interface MobileDetection {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  screenWidth: number
  touchSupported: boolean
}

export function useMobileDetection(): MobileDetection {
  const [detection, setDetection] = useState<MobileDetection>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 1024,
    touchSupported: false,
  })

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      setDetection({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        screenWidth: width,
        touchSupported,
      })
    }

    // Initial check
    checkDevice()

    // Listen for resize events
    const handleResize = () => checkDevice()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return detection
}