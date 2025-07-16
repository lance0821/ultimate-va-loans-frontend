'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { trustAssets } from "./trust-assets"
import { useAnalytics } from "@/hooks/useAnalytics"

interface TrustRatingProps {
  variant?: 'inline' | 'stacked'
  showCount?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  theme?: 'light' | 'dark'
}

export function TrustRating({ 
  variant = 'inline',
  showCount = true,
  size = 'md',
  className,
  theme = 'dark'
}: TrustRatingProps) {
  const { trackEvent } = useAnalytics()
  const { average, count } = trustAssets.ratings

  const sizeClasses = {
    sm: {
      text: 'text-sm',
      star: 'w-3 h-3',
      gap: 'gap-0.5'
    },
    md: {
      text: 'text-base',
      star: 'w-4 h-4',
      gap: 'gap-1'
    },
    lg: {
      text: 'text-lg',
      star: 'w-5 h-5',
      gap: 'gap-1'
    }
  }

  const themeClasses = {
    light: {
      text: 'text-gray-700',
      muted: 'text-gray-500',
      star: 'text-va-gold'
    },
    dark: {
      text: 'text-white',
      muted: 'text-gray-300',
      star: 'text-va-gold'
    }
  }

  const handleClick = () => {
    trackEvent({
      action: 'trust_rating_click',
      category: 'Trust',
      label: 'Rating Display',
      value: average
    })
    // Could navigate to reviews section
    document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })
  }

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(average)
    const partial = i === Math.floor(average) && average % 1 > 0
    const fillPercent = partial ? (average % 1) * 100 : filled ? 100 : 0

    return (
      <div key={i} className="relative">
        <Star 
          className={cn(
            sizeClasses[size].star,
            themeClasses[theme].star,
            "fill-current"
          )}
          style={{ 
            clipPath: `inset(0 ${100 - fillPercent}% 0 0)` 
          }}
        />
        <Star 
          className={cn(
            sizeClasses[size].star,
            "absolute inset-0 text-gray-400"
          )}
        />
      </div>
    )
  })

  if (variant === 'stacked') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "group cursor-pointer transition-all duration-200",
          "hover:scale-105 focus:outline-none focus-visible:ring-2",
          "focus-visible:ring-va-gold focus-visible:ring-offset-2",
          "text-center",
          className
        )}
        aria-label={`Rated ${average} out of 5 stars by ${count} customers`}
      >
        <div className={cn("flex justify-center", sizeClasses[size].gap)}>
          {stars}
        </div>
        <div className={cn(sizeClasses[size].text, themeClasses[theme].text, "mt-1")}>
          <span className="font-bold">{average}</span>
          {showCount && (
            <span className={cn("ml-1", themeClasses[theme].muted)}>
              ({count.toLocaleString()} reviews)
            </span>
          )}
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group cursor-pointer transition-all duration-200",
        "hover:scale-105 focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-va-gold focus-visible:ring-offset-2",
        "inline-flex items-center",
        sizeClasses[size].gap,
        className
      )}
      aria-label={`Rated ${average} out of 5 stars by ${count} customers`}
    >
      <div className={cn("flex", sizeClasses[size].gap)}>
        {stars}
      </div>
      <span className={cn(sizeClasses[size].text, themeClasses[theme].text, "font-medium")}>
        {average}
      </span>
      {showCount && (
        <span className={cn(sizeClasses[size].text, themeClasses[theme].muted)}>
          ({count.toLocaleString()})
        </span>
      )}
    </button>
  )
}