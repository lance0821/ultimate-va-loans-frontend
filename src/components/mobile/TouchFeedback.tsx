'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { useTouchInteraction } from "@/hooks/useMobileOptimization"

interface TouchFeedbackProps {
  children: React.ReactNode
  className?: string
  onTouch?: () => void
  rippleColor?: string
  disabled?: boolean
}

interface Ripple {
  x: number
  y: number
  id: number
  size: number
}

export function TouchFeedback({ 
  children, 
  className,
  onTouch,
  rippleColor = "currentColor",
  disabled = false
}: TouchFeedbackProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { isTouching, touchPoint } = useTouchInteraction(ref)
  const [ripples, setRipples] = React.useState<Ripple[]>([])

  React.useEffect(() => {
    if (isTouching && ref.current && !disabled) {
      const rect = ref.current.getBoundingClientRect()
      const x = touchPoint.x - rect.left
      const y = touchPoint.y - rect.top
      
      // Calculate ripple size based on element dimensions
      const sizeX = Math.max(x, rect.width - x)
      const sizeY = Math.max(y, rect.height - y)
      const size = Math.sqrt(sizeX * sizeX + sizeY * sizeY) * 2
      
      const newRipple: Ripple = { x, y, id: Date.now(), size }
      setRipples(prev => [...prev, newRipple])
      onTouch?.()

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, 600)
    }
  }, [isTouching, touchPoint, onTouch, disabled])

  return (
    <div 
      ref={ref}
      className={cn(
        "relative overflow-hidden touch-feedback",
        disabled && "pointer-events-none",
        className
      )}
    >
      {children}
      <div className="absolute inset-0 pointer-events-none">
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="touch-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              marginLeft: -ripple.size / 2,
              marginTop: -ripple.size / 2,
              color: rippleColor,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Higher-order component for adding touch feedback to any component
export function withTouchFeedback<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & { touchFeedbackColor?: string }> {
  return function WithTouchFeedbackComponent(props: P & { touchFeedbackColor?: string }) {
    const { touchFeedbackColor, ...componentProps } = props
    
    return (
      <TouchFeedback rippleColor={touchFeedbackColor}>
        <Component {...(componentProps as P)} />
      </TouchFeedback>
    )
  }
}