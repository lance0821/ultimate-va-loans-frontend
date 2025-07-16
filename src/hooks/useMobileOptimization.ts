import { useState, useEffect, useCallback, useRef } from 'react'
import { useMobileDetection } from './use-mobile-detection'
import { vibrate } from '@/lib/utils/mobile-utils'

export type ThumbZone = 'easy' | 'medium' | 'hard'
export type ConnectionSpeed = 'slow' | 'fast' | 'unknown'

interface MobileOptimizationResult {
  // From existing hook
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  screenWidth: number
  touchSupported: boolean
  
  // New mobile optimizations
  viewportHeight: number
  orientation: 'portrait' | 'landscape'
  hasNotch: boolean
  isIOS: boolean
  isAndroid: boolean
  connectionSpeed: ConnectionSpeed
  getThumbZone: (elementY: number, elementHeight: number) => ThumbZone
  enableHaptics: () => void
  scrollToThumbZone: (element: HTMLElement) => void
}

export function useMobileOptimization(): MobileOptimizationResult {
  // Use existing mobile detection
  const mobileDetection = useMobileDetection()
  
  // Additional mobile states
  const [viewportHeight, setViewportHeight] = useState(0)
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
  const [hasNotch, setHasNotch] = useState(false)
  const [connectionSpeed, setConnectionSpeed] = useState<ConnectionSpeed>('unknown')

  useEffect(() => {
    const updateMobileInfo = () => {
      setViewportHeight(window.innerHeight)
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape')
      
      // Check for notch (iPhone X and later)
      const hasNotch = 
        CSS.supports('padding-top: env(safe-area-inset-top)') &&
        window.matchMedia('(display-mode: standalone)').matches
      setHasNotch(hasNotch)
    }

    updateMobileInfo()
    window.addEventListener('resize', updateMobileInfo)
    window.addEventListener('orientationchange', updateMobileInfo)

    // Check connection speed
    if ('connection' in navigator) {
      const connection = (navigator as unknown as { connection: { effectiveType: string; addEventListener: (event: string, handler: () => void) => void } }).connection
      const updateConnectionSpeed = () => {
        const speed = connection.effectiveType
        setConnectionSpeed(speed === '4g' || speed === '5g' ? 'fast' : 'slow')
      }
      updateConnectionSpeed()
      connection.addEventListener('change', updateConnectionSpeed)
    }

    return () => {
      window.removeEventListener('resize', updateMobileInfo)
      window.removeEventListener('orientationchange', updateMobileInfo)
    }
  }, [])

  // Platform detection
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isAndroid = /Android/.test(navigator.userAgent)

  // Calculate thumb zone based on element position
  const getThumbZone = useCallback((elementY: number, elementHeight: number): ThumbZone => {
    if (!mobileDetection.isMobile) return 'easy'
    
    const elementCenter = elementY + (elementHeight / 2)
    const easyZoneTop = viewportHeight * 0.5
    const easyZoneBottom = viewportHeight * 0.85
    
    if (elementCenter >= easyZoneTop && elementCenter <= easyZoneBottom) {
      return 'easy'
    } else if (elementCenter > viewportHeight * 0.25) {
      return 'medium'
    }
    return 'hard'
  }, [mobileDetection.isMobile, viewportHeight])

  // Enable haptic feedback
  const enableHaptics = useCallback(() => {
    if (mobileDetection.touchSupported) {
      vibrate(10)
    }
  }, [mobileDetection.touchSupported])

  // Scroll element into thumb-friendly zone
  const scrollToThumbZone = useCallback((element: HTMLElement) => {
    if (!mobileDetection.isMobile) return
    
    const rect = element.getBoundingClientRect()
    const currentZone = getThumbZone(rect.top, rect.height)
    
    if (currentZone === 'hard') {
      // Scroll to bring element into easy zone
      const targetY = viewportHeight * 0.6
      const scrollAmount = rect.top - targetY
      window.scrollBy({ top: scrollAmount, behavior: 'smooth' })
    }
  }, [mobileDetection.isMobile, viewportHeight, getThumbZone])

  return {
    ...mobileDetection,
    viewportHeight,
    orientation,
    hasNotch,
    isIOS,
    isAndroid,
    connectionSpeed,
    getThumbZone,
    enableHaptics,
    scrollToThumbZone,
  }
}

// Hook for touch-optimized interactions
export function useTouchInteraction(ref: React.RefObject<HTMLElement | null>) {
  const [isTouching, setIsTouching] = useState(false)
  const [touchPoint, setTouchPoint] = useState({ x: 0, y: 0 })
  const touchStartTime = useRef<number>(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleTouchStart = (e: TouchEvent) => {
      setIsTouching(true)
      touchStartTime.current = Date.now()
      const touch = e.touches[0]
      setTouchPoint({ x: touch.clientX, y: touch.clientY })
    }

    const handleTouchEnd = () => {
      setIsTouching(false)
      const duration = Date.now() - touchStartTime.current
      // Quick tap provides haptic feedback
      if (duration < 200) {
        vibrate(5)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      setTouchPoint({ x: touch.clientX, y: touch.clientY })
    }

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchend', handleTouchEnd)
    element.addEventListener('touchcancel', handleTouchEnd)
    element.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
      element.removeEventListener('touchcancel', handleTouchEnd)
      element.removeEventListener('touchmove', handleTouchMove)
    }
  }, [ref])

  return { isTouching, touchPoint }
}