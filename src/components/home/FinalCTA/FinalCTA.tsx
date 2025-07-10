'use client'

import { useEffect } from 'react'
import { useInView } from '@/hooks/useInView'
import { Button } from '@/components/ui/button'
import { ctaOptions, trustIndicators, valueProps } from './cta-data'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export function FinalCTA() {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  })

  // Track analytics when section comes into view
  useEffect(() => {
    if (inView && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_final_cta', {
        event_category: 'Homepage',
        event_label: 'Final CTA Section Viewed'
      })
    }
  }, [inView])

  const handleCTAClick = (tracking: { event: string; label: string }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', tracking.event, {
        event_category: 'Homepage',
        event_label: tracking.label
      })
    }
  }

  return (
    <section 
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-va-blue to-va-blue/90 overflow-hidden"
      aria-label="Get Started with Your VA Loan"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Use Your VA Loan Benefit?
          </h2>
          
          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {valueProps.map((prop) => (
              <div key={prop} className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5 text-va-gold" />
                <span className="text-lg">{prop}</span>
              </div>
            ))}
          </div>
          
          {/* Subheadline */}
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join over 50,000 veterans who've achieved homeownership with our help. 
            Start your journey today with no obligation.
          </p>
          
          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {ctaOptions.filter(cta => cta.type === 'primary' || cta.type === 'secondary').map((cta) => {
              const Icon = cta.icon
              const isPrimary = cta.type === 'primary'
              
              return (
                <Link
                  key={cta.id}
                  href={cta.href || '#'}
                  onClick={() => handleCTAClick(cta.tracking)}
                  className="group"
                >
                  <Button
                    size="lg"
                    variant={isPrimary ? 'default' : 'secondary'}
                    className={`
                      ${isPrimary 
                        ? 'bg-va-gold text-va-blue hover:bg-va-gold/90 shadow-lg' 
                        : 'bg-white text-va-blue hover:bg-gray-100'
                      } 
                      px-8 py-6 text-lg h-auto flex-col sm:flex-row gap-1
                    `}
                  >
                    <span className="flex items-center gap-2">
                      {Icon && <Icon className="w-5 h-5" />}
                      {cta.label}
                    </span>
                    {cta.sublabel && (
                      <span className="text-sm opacity-80 font-normal">
                        {cta.sublabel}
                      </span>
                    )}
                    {isPrimary && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </Link>
              )
            })}
          </div>
          
          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            {ctaOptions.filter(cta => cta.type === 'tertiary').map((cta) => {
              const Icon = cta.icon
              
              return (
                <Link
                  key={cta.id}
                  href={cta.href || '#'}
                  onClick={() => handleCTAClick(cta.tracking)}
                  className="inline-flex items-center gap-2 text-white hover:text-va-gold transition-colors"
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="underline underline-offset-4">
                    {cta.label}
                  </span>
                </Link>
              )
            })}
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
            {trustIndicators.map((indicator) => (
              <div key={indicator.id} className="flex items-center gap-2">
                <span className="text-va-gold">{indicator.icon}</span>
                <span>{indicator.text}</span>
              </div>
            ))}
          </div>
          
          {/* Operating Hours */}
          <div className="mt-8 text-white/70 text-sm">
            <p>Available Monday-Friday 8am-8pm EST, Saturday 9am-5pm EST</p>
            <p className="mt-2">
              Questions? Email us at{' '}
              <a href="mailto:support@vahomeloans.com" className="underline hover:text-white">
                support@vahomeloans.com
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-va-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
    </section>
  )
}