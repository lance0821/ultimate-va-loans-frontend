'use client'

import { memo } from 'react'
import { Badge } from '@/components/ui/badge'
import { HeroHeadline } from './HeroHeadline'
import { HeroBenefits } from './HeroBenefits'
import { HeroActions } from './HeroActions'
import { HeroTrustBar } from './HeroTrustBar'
import { HeroMeta } from './HeroMeta'
import { RateDisplay } from './RateDisplay'
import { useProgressiveLoading } from '@/hooks/useVisualHierarchy'
import { useSimplifiedHero } from '@/lib/feature-flags/hero-simplification'
import { cn } from '@/lib/utils'
import { Award } from 'lucide-react'

// Legacy import for A/B testing
import { HeroSectionLegacy } from './HeroSection.legacy'

interface HeroSectionProps {
  variant?: 'default' | 'compact' | 'campaign'
  showRates?: boolean
  showSecondaryCTA?: boolean // Control secondary CTA
  className?: string
}

export const HeroSection = memo(function HeroSection(props: HeroSectionProps) {
  // Check feature flag for A/B testing
  const useSimplified = useSimplifiedHero()
  
  // Show legacy version if flag is disabled
  if (!useSimplified) {
    return <HeroSectionLegacy {...props} />
  }
  
  // New simplified implementation
  return <HeroSectionSimplified {...props} />
})

// New simplified hero implementation
const HeroSectionSimplified = memo(function HeroSectionSimplified({ 
  variant = 'default',
  showRates = true,
  showSecondaryCTA = false,
  className
}: HeroSectionProps) {
  const { isCriticalLoaded, isAboveFoldLoaded } = useProgressiveLoading()
  
  return (
    <section 
      className={cn(
        'hero-gradient-bg hero-container relative min-h-[80vh] lg:min-h-[90vh]',
        className
      )}
      aria-label="VA Loan Services Hero"
    >
      {/* Rate Display - Top Right Corner */}
      {isAboveFoldLoaded && showRates && (
        <div className="absolute top-4 right-4 lg:top-8 lg:right-8 z-20">
          <RateDisplay />
        </div>
      )}
      
      <div className="relative z-10 container mx-auto px-4 flex items-center min-h-[inherit]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Critical content loads immediately */}
          {isCriticalLoaded && (
            <>
              {/* Award Badge - Inline above headline */}
              <div className="inline-flex mb-6 animate-fade-in">
                <Badge className="bg-va-gold/20 text-va-gold border-va-gold/30 backdrop-blur-sm px-4 py-2">
                  <Award className="w-4 h-4 mr-2" />
                  Serving Florida Veterans Since 2019
                </Badge>
              </div>
              
              {/* Main Headline */}
              <HeroHeadline />
              
              {/* Subheadline */}
              <p className={cn(
                'text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto mt-6 mb-8',
                'leading-relaxed opacity-90',
                'animate-fade-in-up'
              )}>
                Get your VA home loan with $0 down payment. Join over{' '}
                <span className="font-semibold text-va-gold">10,000+ Florida Veterans</span>{' '}
                who've achieved homeownership with our help.
              </p>
            </>
          )}
          
          {/* Above fold content */}
          {isAboveFoldLoaded && (
            <>
              {/* Benefits List */}
              <HeroBenefits 
                className="mb-8 max-w-xl mx-auto" 
                animationStyle="simple" // Use simple animations
              />
              
              {/* CTA Actions - Single button centered */}
              <HeroActions 
                className="flex justify-center" 
                showSecondary={false} // Force single button
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'
HeroSectionSimplified.displayName = 'HeroSectionSimplified'