'use client'

import * as React from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useInView } from '@/hooks/useInView'

interface CTATrackerProps {
  children: React.ReactElement<{ 
    onClick?: (e: React.MouseEvent) => void; 
    ref?: React.Ref<HTMLElement>;
  } & Record<string, unknown>> // Allow additional props like data attributes
  category: string
  label: string
  value?: number
  position?: string
  variant?: string
}

export function CTATracker({
  children,
  category,
  label,
  value = 1,
  position,
  variant
}: CTATrackerProps) {
  const { trackCTAEvent } = useAnalytics()
  const [clickCount, setClickCount] = React.useState(0)
  const [hasTrackedImpression, setHasTrackedImpression] = React.useState(false)
  const elementRef = React.useRef<HTMLElement>(null)
  
  // Use existing useInView hook for impression tracking
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  })

  // Track impression when CTA comes into view
  React.useEffect(() => {
    if (inView && !hasTrackedImpression) {
      trackCTAEvent({
        action: 'impression',
        category,
        label,
        position,
        variant
      })
      setHasTrackedImpression(true)
    }
  }, [inView, hasTrackedImpression, category, label, position, variant, trackCTAEvent])

  const handleClick = (e: React.MouseEvent) => {
    setClickCount(prev => prev + 1)

    // Track the CTA click with enhanced data
    trackCTAEvent({
      action: 'click',
      category,
      label,
      value,
      position,
      variant,
      clickCount: clickCount + 1
    })

    // Call original onClick if exists
    if (children.props && typeof children.props.onClick === 'function') {
      children.props.onClick(e)
    }
  }

  // Combine refs - inViewRef is a RefObject, not a function
  const setRefs = React.useCallback(
    (node: HTMLElement | null) => {
      // Set the inViewRef's current value
      if (inViewRef && 'current' in inViewRef) {
        (inViewRef as React.MutableRefObject<HTMLElement | null>).current = node
      }
      elementRef.current = node
    },
    [inViewRef]
  )

  return React.cloneElement(children, {
    ref: setRefs,
    onClick: handleClick,
    'data-cta-tracked': true,
    'data-cta-category': category,
    'data-cta-label': label
  })
}

// HOC version for easier use
export function withCTATracking<P extends object>(
  Component: React.ComponentType<P>,
  trackingConfig: Omit<CTATrackerProps, 'children'>
): React.FC<P> {
  return function TrackedComponent(props: P) {
    return (
      <CTATracker {...trackingConfig}>
        <Component {...props} />
      </CTATracker>
    )
  }
}