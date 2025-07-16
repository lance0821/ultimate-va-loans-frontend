'use client'

import { lazy, Suspense } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useVisualHierarchy } from '@/hooks/useVisualHierarchy'

// Lazy load non-critical components
const RateDisplay = lazy(() => import('./RateDisplay').then(module => ({ default: module.RateDisplay })))

interface HeroMetaProps {
  showRates?: boolean
  showScrollIndicator?: boolean // Default false per requirements
  className?: string
}

export function HeroMeta({ 
  showRates = true,
  showScrollIndicator = false, // Changed default to false
  className 
}: HeroMetaProps) {
  const { shouldAnimate, getAnimationClass } = useVisualHierarchy()
  
  return (
    <div className={cn('hero-meta', className)}>
      {/* Rate Display */}
      {showRates && (
        <Suspense fallback={<div className="h-12" />}>
          <div className={cn(
            'flex items-center justify-center lg:justify-start gap-4 text-gray-300',
            getAnimationClass('animate-fade-in') // Simple fade-in
          )}>
            <RateDisplay />
            <span className="text-sm">|</span>
            <span className="text-sm">Updated daily at 9am PST</span>
          </div>
        </Suspense>
      )}
      
      {/* Scroll Indicator - Only shown if explicitly enabled */}
      {showScrollIndicator && (
        <div className={cn(
          'absolute bottom-8 left-1/2 transform -translate-x-1/2',
          'hidden lg:flex flex-col items-center gap-2 text-white/60',
          shouldAnimate && 'animate-bounce'
        )}>
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      )}
    </div>
  )
}

HeroMeta.displayName = 'HeroMeta'