'use client'

import { CTAButton } from '@/components/ui/cta-button'
import { Badge } from '@/components/ui/badge'
import { HeroHeadline } from './HeroHeadline'
import { HeroCTA } from './HeroCTA'
import { TrustBadges } from './TrustBadges'
import { RateDisplay } from './RateDisplay'
import { VeteranOwnedBadge } from '@/components/trust/VeteranOwnedBadge'
import { TrustRating } from '@/components/trust/TrustRating'
import { useVisualHierarchy, useProgressiveLoading } from '@/hooks/useVisualHierarchy'
import { cn } from '@/lib/utils'
import { Phone, ChevronDown, DollarSign, Home, Shield, Award } from 'lucide-react'

export function HeroSectionLegacy() {
  const { shouldAnimate, getAnimationClass } = useVisualHierarchy()
  const { isCriticalLoaded, isAboveFoldLoaded } = useProgressiveLoading()

  return (
    <section 
      className="hero-gradient-bg hero-container relative"
      aria-label="VA Loan Services Hero"
    >
      {/* Trust Badge - Desktop: top-right, Mobile: integrated below */}
      <div className={cn(
        "hidden lg:block absolute top-6 right-6 z-20",
        getAnimationClass("animate-fade-in delay-300")
      )}>
        {isAboveFoldLoaded && <VeteranOwnedBadge size="md" />}
      </div>
      
      {/* Trust Badge - Existing badges for comparison */}
      <div className="hero-trust-position">
        {isAboveFoldLoaded && <TrustBadges variant="compact" />}
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center lg:text-left">
          {/* Critical: Headline loads immediately */}
          {isCriticalLoaded && (
            <>
              {/* Award Badge */}
              <div className={cn(
                "inline-flex mb-6",
                getAnimationClass("animate-fade-in")
              )}>
                <Badge className="bg-va-gold/20 text-va-gold border-va-gold/30 backdrop-blur-sm px-4 py-2">
                  <Award className="w-4 h-4 mr-2" />
                  Serving Florida Veterans Since 2019
                </Badge>
              </div>
              
              {/* Main Headline with Hierarchy */}
              <HeroHeadline />
              
              {/* Subheadline - Secondary visual weight with Trust Count */}
              <p className={cn(
                "text-lg lg:text-xl text-gray-200 max-w-2xl mt-6 mb-8",
                "leading-relaxed opacity-90",
                getAnimationClass("animate-fade-in-up delay-100")
              )}>
                Get your VA home loan with $0 down payment. Join over <span className="font-semibold text-va-gold">10,000+ Florida Veterans</span> 
                who've achieved homeownership with our help.
              </p>
              
              {/* Mobile Trust Badge */}
              <div className={cn(
                "lg:hidden flex justify-center mb-6",
                getAnimationClass("animate-fade-in delay-300")
              )}>
                <VeteranOwnedBadge size="sm" />
              </div>
            </>
          )}
          
          {/* Above fold content loads next */}
          {isAboveFoldLoaded && (
            <>
              {/* Benefits List - Tertiary visual weight */}
              <ul className="space-y-3 mb-8 text-left max-w-xl mx-auto lg:mx-0">
                {[
                  { icon: DollarSign, text: "$0 Down Payment Required" },
                  { icon: Shield, text: "No PMI Ever - Save $200+/month" },
                  { icon: Home, text: "Close in as Fast as 21 Days" }
                ].map((benefit, index) => (
                  <li 
                    key={index}
                    className={cn(
                      "flex items-center gap-3 text-gray-200",
                      getAnimationClass(`animate-fade-in-left delay-${(index + 2) * 100}`)
                    )}
                  >
                    <div className="w-5 h-5 rounded-full bg-va-gold/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-3 h-3 text-va-gold" />
                    </div>
                    <span className="text-base lg:text-lg">{benefit.text}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA Section with Rate Display */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-4">
                <HeroCTA />
                
                {/* Secondary CTA */}
                <CTAButton
                  hierarchy="secondary"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call (555) 123-4567
                </CTAButton>
              </div>
              
              {/* Trust Rating below CTA */}
              <div className={cn(
                "flex justify-center lg:justify-start mb-8",
                getAnimationClass("animate-fade-in delay-500")
              )}>
                <TrustRating 
                  size="md" 
                  theme="dark" 
                  showCount={true}
                />
              </div>
              
              {/* Rate Display - Supporting element */}
              <div className={cn(
                "flex items-center justify-center lg:justify-start gap-4 text-gray-300",
                getAnimationClass("animate-fade-in delay-500")
              )}>
                <RateDisplay />
                <span className="text-sm">|</span>
                <span className="text-sm">Updated daily at 9am PST</span>
              </div>
            </>
          )}
          
          {/* Scroll Indicator - Only on desktop */}
          <div className={cn(
            "absolute bottom-8 left-1/2 transform -translate-x-1/2",
            "hidden lg:flex flex-col items-center gap-2 text-white/60",
            shouldAnimate && "animate-bounce"
          )}>
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  )
}