'use client'

import { useEffect } from 'react'
import { useInView } from '@/hooks/useInView'
import { TrustCard } from './TrustCard'
import { trustIndicators } from './trust-indicators.data'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users } from 'lucide-react'
import Link from 'next/link'

export function TrustIndicatorsSection() {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  })

  // Track analytics when section comes into view
  useEffect(() => {
    if (inView && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_trust_indicators', {
        event_category: 'Homepage',
        event_label: 'Trust Indicators Section Viewed',
        section_variant: 'personal_service'
      })
    }
  }, [inView])

  const handleTeamCTA = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_meet_team_cta', {
        event_category: 'Homepage',
        event_label: 'Meet Your Team CTA',
        cta_location: 'trust_indicators'
      })
    }
  }

  const handleApplicationCTA = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_start_application_cta', {
        event_category: 'Homepage',
        event_label: 'Start Application CTA',
        cta_location: 'trust_indicators'
      })
    }
  }

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-to-br"
      aria-label="Why Florida Veterans Trust Us"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Florida Veterans Trust Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Big enough to deliver, small enough to care. We're your local VA loan experts 
            who treat every veteran like family.
          </p>
        </div>

        {/* Trust Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustIndicators.map((indicator, index) => (
            <TrustCard
              key={indicator.id}
              {...indicator}
              animate={inView}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4">
          <p className="text-gray-600 mb-6">
            Ready to experience the difference personal service makes?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/team">
              <Button 
                size="lg" 
                onClick={handleTeamCTA}
                className="bg-white text-va-blue hover:bg-white/90"
              >
                <Users className="w-5 h-5" />
                Meet Your Personal Loan Team
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link href="/get-started">
              <Button 
                size="lg"
                onClick={handleApplicationCTA}
                className="bg-va-gold hover:bg-va-gold/90 text-va-blue"
              >
                Start Your Application
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Updated Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            *Serving all of Florida since 2009. Statistics current as of {new Date().getFullYear()}.
          </p>
        </div>
      </div>
    </section>
  )
}