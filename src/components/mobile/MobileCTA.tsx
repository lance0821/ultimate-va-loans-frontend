'use client'

import * as React from "react"
import { CTAButton, type CTAButtonProps } from "@/components/ui/cta-button"
import { useMobileOptimization } from "@/hooks/useMobileOptimization"
import { cn } from "@/lib/utils"
import { Phone, MessageSquare } from "lucide-react"

interface MobileCTAProps extends CTAButtonProps {
  sticky?: boolean
  showSecondaryActions?: boolean
  autoHideOnScroll?: boolean
}

export function MobileCTA({ 
  sticky = false,
  showSecondaryActions = false,
  autoHideOnScroll = false,
  className,
  children,
  ...props 
}: MobileCTAProps) {
  const { isMobile, enableHaptics, hasNotch, viewportHeight } = useMobileOptimization()
  const [isVisible, setIsVisible] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!sticky || !isMobile || !autoHideOnScroll) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY
      const nearBottom = currentScrollY + viewportHeight >= document.body.scrollHeight - 100
      
      // Show when scrolling up or near bottom
      setIsVisible(!scrollingDown || nearBottom)
      setLastScrollY(currentScrollY)
    }

    const throttledScroll = throttle(handleScroll, 100)
    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [sticky, isMobile, autoHideOnScroll, lastScrollY, viewportHeight])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    enableHaptics()
    props.onClick?.(e)
  }

  const handleSecondaryAction = (action: 'call' | 'chat') => {
    enableHaptics()
    if (action === 'call') {
      window.location.href = 'tel:1-800-555-0123'
    } else {
      // Open chat widget or navigate to chat
      console.log('Open chat')
    }
  }

  // Desktop fallback
  if (!isMobile) {
    return (
      <CTAButton 
        className={className} 
        {...props} 
        onClick={handleClick}
      >
        {children}
      </CTAButton>
    )
  }

  const content = (
    <>
      <CTAButton
        {...props}
        onClick={handleClick}
        className={cn(
          "mobile-cta w-full",
          "text-base md:text-lg", // Ensure readable text
          className
        )}
      >
        {children}
      </CTAButton>
      
      {showSecondaryActions && (
        <div className="flex gap-2 mt-2">
          <button 
            onClick={() => handleSecondaryAction('call')}
            className="flex-1 touch-target touch-feedback p-3 border border-border rounded-lg flex items-center justify-center gap-2 bg-background"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Call</span>
          </button>
          <button 
            onClick={() => handleSecondaryAction('chat')}
            className="flex-1 touch-target touch-feedback p-3 border border-border rounded-lg flex items-center justify-center gap-2 bg-background"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">Chat</span>
          </button>
        </div>
      )}
    </>
  )

  if (sticky) {
    return (
      <div 
        ref={containerRef}
        className={cn(
          "thumb-zone-fixed",
          "transform transition-transform duration-300",
          isVisible ? "translate-y-0" : "translate-y-full",
          hasNotch && "safe-area-padding-bottom"
        )}
      >
        <div className="max-w-lg mx-auto">
          {content}
        </div>
      </div>
    )
  }

  return content
}

// Utility function for scroll throttling
function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  let lastCall = 0
  
  return (...args: Parameters<T>) => {
    const now = Date.now()
    
    if (now - lastCall >= delay) {
      func(...args)
      lastCall = now
    } else {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        func(...args)
        lastCall = Date.now()
      }, delay - (now - lastCall))
    }
  }
}