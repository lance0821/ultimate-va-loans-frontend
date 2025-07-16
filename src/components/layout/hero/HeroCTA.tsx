'use client'

import { CTAButton } from '@/components/ui/cta-button'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useVisualHierarchy } from '@/hooks/useVisualHierarchy'
import { cn } from '@/lib/utils'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'

export function HeroCTA() {
  const [isLoading, setIsLoading] = useState(false)
  const { trackEvent } = useAnalytics()
  const { getAnimationClass } = useVisualHierarchy()

  const handleClick = async () => {
    setIsLoading(true)
    
    // Track CTA click
    trackEvent({
      action: 'click',
      category: 'CTA',
      label: 'Hero Primary - Check Eligibility',
      value: 1
    })

    // Navigate to quote form
    window.location.href = '/get-started'
  }

  return (
    <CTAButton
      hierarchy="primary"
      size="lg"
      onClick={handleClick}
      loading={isLoading}
      loadingText="Starting..."
      className={cn(
        "hero-cta-primary",
        "bg-va-gold hover:bg-va-gold/90",
        "text-va-blue",
        "min-w-[300px]",
        "group",
        getAnimationClass("animate-fade-in-up delay-300")
      )}
    >
      <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
      Check Your Eligibility
      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
    </CTAButton>
  )
}