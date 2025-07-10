'use client'

import { useEffect, useState } from 'react'
import { TrustIndicator } from './TrustIndicator'
import { trustIndicators } from './trust-data'
import { cn } from '@/lib/utils'

export function TrustBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger fade-in animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section 
      className={cn(
        "bg-gray-50 border-y border-gray-200 transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      aria-label="Trust and Compliance Information"
    >
      <div className="container mx-auto px-4 py-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between divide-x divide-gray-300">
          {trustIndicators.map((indicator) => (
            <TrustIndicator
              key={indicator.id}
              {...indicator}
              className="flex-1"
            />
          ))}
        </div>

        {/* Mobile Layout - Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex items-center min-w-max divide-x divide-gray-300">
            {trustIndicators.map((indicator) => (
              <TrustIndicator
                key={indicator.id}
                {...indicator}
                className="flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Compliance Text */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Licensed in all 50 states. NMLS# 123456. Equal Housing Opportunity Lender.
          </p>
        </div>
      </div>
    </section>
  )
}