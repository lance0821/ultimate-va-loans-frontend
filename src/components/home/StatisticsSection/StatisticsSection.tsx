'use client'

import { useEffect } from 'react'
import { useInView } from '@/hooks/useInView'
import { StatCard } from './StatCard'
import { statistics } from './statistics.data'

export function StatisticsSection() {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  })

  // Track analytics when section comes into view
  useEffect(() => {
    if (inView && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_statistics_section', {
        event_category: 'Homepage',
        event_label: 'Statistics Section Viewed'
      })
    }
  }, [inView])

  return (
    <section 
      ref={ref}
      className="py-16 bg-white"
      aria-label="Company Statistics"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Veterans Nationwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our track record speaks for itself. See why thousands of veterans choose us for their VA loan needs.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
          {statistics.map((stat) => (
            <StatCard
              key={stat.id}
              {...stat}
              animate={inView}
            />
          ))}
        </div>

        {/* Optional Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            *Statistics as of {new Date().getFullYear()}. Individual results may vary.
          </p>
        </div>
      </div>
    </section>
  )
}