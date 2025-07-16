'use client'

import Link from 'next/link'
import { TrendingUp, Calendar } from 'lucide-react'
import { currentVARates, formatRate, shouldShowBothRates } from '@/lib/constants/va-rates'
import { cn } from '@/lib/utils'

export function RateDisplay() {
  const handleRateClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_rate_click', {
        event_category: 'Homepage',
        event_label: 'View All Rates',
        rate_value: currentVARates.purchaseRate
      })
    }
  }

  const showBothRates = shouldShowBothRates(
    currentVARates.purchaseRate,
    currentVARates.refinanceRate
  )

  return (
    <div className={cn(
      "relative z-20", // Above hero background
      "w-full lg:absolute lg:top-8 lg:right-8", // Desktop: top-right
      "lg:w-auto"
    )}>
      <div className={cn(
        // Container styling
        "bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg",
        "p-4 lg:p-5",
        "text-white",
        // Mobile: full width, Desktop: fixed width
        "w-full lg:w-[320px]",
        // Subtle entrance animation
        "animate-in fade-in slide-in-from-top-2 duration-500"
      )}>
        {/* Rate Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-va-gold" />
            <h3 className="font-semibold text-lg">Today's VA Rates</h3>
          </div>
        </div>

        {/* Rate Display */}
        <div className="space-y-2">
          {/* Purchase Rate - Always Show */}
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-gray-200">Purchase</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-va-gold">
                {formatRate(currentVARates.purchaseRate)}
              </span>
              <span className="text-xs text-gray-300 ml-1">APR*</span>
            </div>
          </div>

          {/* Refinance Rate - Show if different */}
          {showBothRates && (
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-200">Refinance</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-va-gold">
                  {formatRate(currentVARates.refinanceRate)}
                </span>
                <span className="text-xs text-gray-300 ml-1">APR*</span>
              </div>
            </div>
          )}

          {/* Rate Type */}
          <div className="text-xs text-gray-300 text-right">
            {currentVARates.rateType}
          </div>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-white/20" />

        {/* Footer */}
        <div className="space-y-2">
          {/* Update Date */}
          <div className="flex items-center gap-1 text-xs text-gray-300">
            <Calendar className="w-3 h-3" />
            <span>As of {currentVARates.lastUpdated}</span>
          </div>

          {/* CTA Link */}
          <Link
            href="/rates"
            onClick={handleRateClick}
            className={cn(
              "inline-flex items-center gap-1",
              "text-sm font-medium text-va-gold",
              "hover:text-yellow-400 transition-colors",
              "group"
            )}
          >
            View All Rates
            <span 
              className="transition-transform group-hover:translate-x-1" 
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>

        {/* Disclaimer Tooltip */}
        <div className="absolute -bottom-1 left-4 right-4">
          <div className="relative group">
            <span className="text-[10px] text-gray-300 cursor-help">
              *{currentVARates.disclaimer.substring(0, 30)}...
            </span>
            {/* Full disclaimer on hover */}
            <div className={cn(
              "absolute bottom-full left-0 mb-2 w-64 p-3",
              "bg-gray-900 text-white text-xs rounded-lg shadow-lg",
              "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
              "transition-all duration-200",
              "pointer-events-none"
            )}>
              {currentVARates.disclaimer}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}