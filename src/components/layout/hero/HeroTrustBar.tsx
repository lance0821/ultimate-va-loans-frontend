'use client'

import { memo } from 'react'
import { cn } from '@/lib/utils'
import { VeteranOwnedBadge } from '@/components/trust/VeteranOwnedBadge'
import { TrustRating } from '@/components/trust/TrustRating'
import { Shield, Award } from 'lucide-react'
import { useVisualHierarchy } from '@/hooks/useVisualHierarchy'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface HeroTrustBarProps {
  variant?: 'full' | 'compact' | 'minimal'
  position?: 'inline' | 'top-right' // Control positioning
  className?: string
}

export const HeroTrustBar = memo(function HeroTrustBar({ 
  variant = 'compact',
  position = 'inline',
  className 
}: HeroTrustBarProps) {
  const { getAnimationClass } = useVisualHierarchy()
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  // Determine what to show based on variant and viewport
  const showVeteranBadge = variant !== 'minimal'
  const showRating = variant === 'full' || (!isMobile && variant === 'compact')
  const showCertification = variant === 'full'
  
  // Position styles
  const positionClasses = position === 'top-right' 
    ? 'absolute top-4 right-4 lg:top-8 lg:right-8'
    : ''
  
  return (
    <div className={cn(
      'hero-trust-bar',
      'flex items-center gap-4',
      position === 'inline' ? 'justify-center lg:justify-start' : '',
      getAnimationClass('animate-fade-in'), // Simple fade-in
      positionClasses,
      className
    )}>
      {/* Veteran Owned Badge - Primary trust signal */}
      {showVeteranBadge && (
        <div className="hero-trust-item">
          <VeteranOwnedBadge 
            size={isMobile ? 'sm' : 'md'} 
            showTooltip={!isMobile}
          />
        </div>
      )}
      
      {/* Trust Rating - Secondary trust signal */}
      {showRating && (
        <div className="hero-trust-item hidden sm:flex">
          <TrustRating 
            size={isMobile ? 'sm' : 'md'} 
            theme="dark" 
            showCount={!isMobile}
          />
        </div>
      )}
      
      {/* VA Approved - Tertiary trust signal */}
      {showCertification && (
        <div className={cn(
          'hero-trust-item',
          'flex items-center gap-2',
          'px-3 py-2 rounded-lg',
          'bg-white/10 backdrop-blur-sm',
          'border border-white/20'
        )}>
          <Shield className="w-5 h-5 text-va-gold" />
          <span className="text-sm font-medium text-white">VA Approved</span>
        </div>
      )}
      
      {/* Mobile-only compact trust indicator */}
      {isMobile && variant === 'compact' && !showVeteranBadge && (
        <div className="hero-trust-mobile flex items-center gap-2 text-white">
          <Award className="w-4 h-4 text-va-gold" />
          <span className="text-sm">Trusted by 10,000+ Veterans</span>
        </div>
      )}
    </div>
  )
})

HeroTrustBar.displayName = 'HeroTrustBar'