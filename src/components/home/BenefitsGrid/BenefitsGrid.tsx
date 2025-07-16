'use client'

import { BenefitCard } from './BenefitCard'
import { benefits } from './benefits.data'
import { cn } from '@/lib/utils'
import { Text } from '@/components/ui/typography'

export function BenefitsGrid() {
  return (
    <section className="py-20 bg-gray-50" aria-labelledby="benefits-heading">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header - already using short, scannable text */}
        <div className="text-center mb-16">
          <Text size="large" color="primary" className="font-semibold mb-3">
            We'll make it easy. You make it home.
          </Text>
          <h2 
            id="benefits-heading" 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Your VA Loan Journey Starts Here
          </h2>
          <Text size="large" color="muted" className="max-w-3xl mx-auto">
            Three simple steps to homeownership with your VA loan benefits
          </Text>
        </div>

        {/* Streamlined 3-Card Grid */}
        <div className={cn(
          "grid gap-8",
          "grid-cols-1",           // Mobile: single column
          "md:grid-cols-2",         // Tablet: 2 columns
          "lg:grid-cols-3",         // Desktop: 3 columns
          "md:max-w-4xl lg:max-w-none",  // Center on tablet
          "mx-auto"
        )}>
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.id}
              className={cn(
                // Center the third card on tablet
                index === 2 && "md:col-span-2 md:max-w-md md:mx-auto lg:col-span-1 lg:max-w-none"
              )}
            >
              <BenefitCard
                {...benefit}
                index={index}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}