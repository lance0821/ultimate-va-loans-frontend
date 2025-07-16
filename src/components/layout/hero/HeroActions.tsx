'use client'

import { memo } from 'react'
import { cn } from '@/lib/utils'
import { HeroCTA } from './HeroCTA'
import { CTAButton } from '@/components/ui/cta-button'
import { Phone } from 'lucide-react'

interface CTAConfig {
  text: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  loadingText?: string
}

interface HeroActionsProps {
  secondaryCTA?: CTAConfig | null // Optional secondary CTA
  showSecondary?: boolean // Control secondary CTA visibility
  layout?: 'horizontal' | 'vertical' | 'stacked'
  className?: string
}

const defaultSecondaryCTA: CTAConfig = {
  text: 'Call (555) 123-4567',
  icon: <Phone className="w-4 h-4" />
}

export const HeroActions = memo(function HeroActions({ 
  secondaryCTA = null, // Default to no secondary CTA
  showSecondary = false, // Default to single CTA
  layout = 'horizontal',
  className
}: HeroActionsProps) {
  const layoutClasses = {
    horizontal: 'flex-row',
    vertical: 'flex-col',
    stacked: 'flex-col sm:flex-row'
  }
  
  // Determine if secondary should be shown
  const shouldShowSecondary = showSecondary && (secondaryCTA || defaultSecondaryCTA)
  
  return (
    <div className={cn(
      'hero-actions flex gap-4 items-center justify-center lg:justify-start',
      shouldShowSecondary ? layoutClasses[layout] : '',
      className
    )}>
      {/* Primary CTA - Always shown */}
      <HeroCTA />
      
      {/* Secondary CTA - Only if explicitly enabled */}
      {shouldShowSecondary && (
        <CTAButton
          hierarchy="secondary"
          variant="outline"
          size="lg"
          href={(secondaryCTA || defaultSecondaryCTA).href}
          onClick={(secondaryCTA || defaultSecondaryCTA).onClick}
          className={cn(
            'w-full sm:w-auto',
            'border-white/30 text-white hover:bg-white/10 backdrop-blur-sm'
          )}
        >
          {(secondaryCTA || defaultSecondaryCTA).icon}
          {(secondaryCTA || defaultSecondaryCTA).text}
        </CTAButton>
      )}
    </div>
  )
})

HeroActions.displayName = 'HeroActions'