'use client'

import { useEffect } from 'react'
import { useInView } from '@/hooks/useInView'
import { ResourceCard } from './ResourceCard'
import { featuredResources } from './resources.data'
import { Button } from '@/components/ui/button'
import { BookOpen, ArrowRight } from 'lucide-react'
import { Text } from '@/components/ui/typography'

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
        event_label: 'Educational Resources Section Viewed',
        has_featured: true  // Track that we have featured content
      })
    }
  }, [inView])
  
  // Separate featured from standard resources with error handling
  const featuredResource = featuredResources.find(r => r.featured)
  const standardResources = featuredResources.filter(r => !r.featured)
  
  // Fallback if no featured resource
  if (!featuredResource) {
    console.warn('No featured resource found, displaying standard grid')
    return (
      <section ref={ref} className="py-16 bg-white" aria-label="Educational Resources">
        <div className="container mx-auto px-4">
          {/* Standard grid fallback */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section 
      ref={ref}
      className="py-16 bg-white"
      aria-label="Educational Resources"
    >
      <div className="container mx-auto px-4">
        {/* Section Header - simplified for scannability */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary-900/10 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-va-blue" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            VA Loan Education Center
          </h2>
          <Text size="large" color="muted" className="max-w-2xl mx-auto">
            Expert guides to help you navigate every step of your VA loan.
          </Text>
        </div>
        
        {/* Featured + Standard Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Featured Resource - Left Side */}
          {featuredResource && (
            <div className="lg:row-span-2">
              <ResourceCard 
                resource={featuredResource} 
                isFeatured={true}
              />
            </div>
          )}
          
          {/* Standard Resources - Right Side */}
          <div className="grid gap-6">
            {standardResources.slice(0, 2).map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
              />
            ))}
          </div>
        </div>
        
        {/* Additional Resource if needed */}
        {standardResources.length > 2 && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {standardResources.slice(2).map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
              />
            ))}
          </div>
        )}
        
        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary-900 hover:bg-primary-900/90"
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
          
          <Text size="small" color="muted" className="mt-6">
            Questions? <a href="/contact" className="text-va-blue hover:underline font-medium">Contact our VA loan specialists</a>
          </Text>
        </div>
      </div>
    </section>
  )
}