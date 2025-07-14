import { useEffect, useState } from 'react'

interface VisualHierarchyOptions {
  enableAnimations?: boolean
  respectReducedMotion?: boolean
}

export function useVisualHierarchy(options: VisualHierarchyOptions = {}) {
  const {
    enableAnimations = true,
    respectReducedMotion = true,
  } = options

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    motionQuery.addEventListener('change', handleMotionChange)

    // Check for high contrast mode
    const contrastQuery = window.matchMedia('(prefers-contrast: high)')
    setIsHighContrast(contrastQuery.matches)

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches)
    }

    contrastQuery.addEventListener('change', handleContrastChange)

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      contrastQuery.removeEventListener('change', handleContrastChange)
    }
  }, [])

  const shouldAnimate = enableAnimations && !(respectReducedMotion && prefersReducedMotion)

  const getAnimationClass = (animationClass: string) => {
    return shouldAnimate ? animationClass : ''
  }

  const getTransitionDuration = (duration: number) => {
    return shouldAnimate ? duration : 0
  }

  return {
    prefersReducedMotion,
    isHighContrast,
    shouldAnimate,
    getAnimationClass,
    getTransitionDuration,
  }
}

// Hook for progressive loading
export function useProgressiveLoading() {
  const [loadingPhase, setLoadingPhase] = useState<
    'critical' | 'above-fold' | 'interactive' | 'complete'
  >('critical')

  useEffect(() => {
    // Simulate progressive loading phases
    const timers: NodeJS.Timeout[] = []

    timers.push(
      setTimeout(() => setLoadingPhase('above-fold'), 500),
      setTimeout(() => setLoadingPhase('interactive'), 1500),
      setTimeout(() => setLoadingPhase('complete'), 2500)
    )

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  return {
    loadingPhase,
    isCriticalLoaded: true,
    isAboveFoldLoaded: loadingPhase !== 'critical',
    isInteractiveLoaded: ['interactive', 'complete'].includes(loadingPhase),
    isComplete: loadingPhase === 'complete',
  }
}