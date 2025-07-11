'use client'

import { useEffect } from 'react'
import { useInView } from '@/hooks/useInView'
import { ResourceCard } from './ResourceCard'
import { featuredResources } from './resources.data'
import { Button } from '@/components/ui/button'
import { BookOpen, ArrowRight } from 'lucide-react'

export function EducationalResources() {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  })
  
  // Track analytics when section comes into view
  useEffect(() => {
    if (inView && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_educational_resources', {
        event_category: 'Homepage',
        event_label: 'Educational Resources Section Viewed'
      })
    }
  }, [inView])
  
  return (
    <section 
      ref={ref}
      className="py-16 bg-white"
      aria-label="Educational Resources"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-va-blue/10 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-va-blue" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            VA Loan Education Center
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get expert guidance on VA loans with our comprehensive resources. 
            From eligibility to closing, we'll help you navigate every step.
          </p>
        </div>
        
        {/* Resource Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
            />
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-va-blue hover:bg-va-blue/90"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'click_view_all_resources', {
                    event_category: 'Education',
                    event_label: 'View All Resources CTA'
                  })
                }
                window.location.href = '/education'
              }}
            >
              View All Resources
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'click_download_guide', {
                    event_category: 'Education',
                    event_label: 'Download VA Loan Guide CTA'
                  })
                }
                window.location.href = '/resources/va-loan-guide-download'
              }}
            >
              Download VA Loan Guide
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-gray-600">
            Have questions? Our VA loan specialists are here to help.{' '}
            <a href="/contact" className="text-va-blue hover:underline font-medium">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}