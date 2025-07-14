'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { AnimatedCounter } from './AnimatedCounter'
import type { TrustIndicator } from './trust-indicators.data'

interface TrustCardProps extends TrustIndicator {
  animate: boolean
  index: number
}

export function TrustCard({
  value,
  label,
  subtext,
  icon: Icon,
  accentColor,
  hoverDetail,
  testimonialSnippet,
  link,
  animate,
  index
}: TrustCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'trust_indicator_click', {
        event_category: 'Homepage',
        event_label: label,
        indicator_index: index,
        has_link: !!link
      })
    }
  }

  const handleHover = (hovering: boolean) => {
    setIsHovered(hovering)
    
    if (hovering && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'trust_indicator_hover', {
        event_category: 'Homepage',
        event_label: label,
        indicator_index: index
      })
    }
  }

  // Color mappings for icons and accents
  const colorClasses = {
    gold: {
      icon: 'text-va-gold',
      iconBg: 'bg-va-gold/10',
      border: 'border-va-gold/20',
      hover: 'hover:border-va-gold/40'
    },
    blue: {
      icon: 'text-va-blue',
      iconBg: 'bg-va-blue/10',
      border: 'border-va-blue/20',
      hover: 'hover:border-va-blue/40'
    },
    green: {
      icon: 'text-green-600',
      iconBg: 'bg-green-600/10',
      border: 'border-green-600/20',
      hover: 'hover:border-green-600/40'
    },
    primary: {
      icon: 'text-primary',
      iconBg: 'bg-primary/10',
      border: 'border-primary/20',
      hover: 'hover:border-primary/40'
    }
  }

  const colors = colorClasses[accentColor]

  const cardContent = (
    <div 
      className={cn(
        "group relative h-full p-6 rounded-xl transition-all duration-300",
        "bg-gradient-to-br from-white to-gray-50/50",
        "border-2",
        colors.border,
        colors.hover,
        "hover:shadow-lg hover:-translate-y-1",
        "cursor-pointer"
      )}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onClick={handleClick}
    >
      {/* Icon */}
      <div className={cn(
        "w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto",
        colors.iconBg,
        "transition-transform group-hover:scale-110"
      )}>
        <Icon className={cn("w-8 h-8", colors.icon)} />
      </div>

      {/* Main Value */}
      <div className="text-center mb-3">
        <div className={cn(
          "text-3xl md:text-4xl font-bold",
          colors.icon,
          "mb-1"
        )}>
          {typeof value === 'number' ? (
            <AnimatedCounter
              end={value}
              decimals={value % 1 !== 0 ? 1 : 0}
              start={animate}
              suffix={label.includes('Rating') ? '★' : ''}
            />
          ) : (
            value
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {label}
        </h3>
      </div>

      {/* Subtext */}
      <p className="text-sm text-gray-600 text-center mb-3">
        {subtext}
      </p>

      {/* Hover Content */}
      <div className={cn(
        "absolute inset-x-6 bottom-6 transition-all duration-300",
        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      )}>
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-700 mb-2">{hoverDetail}</p>
          {testimonialSnippet && (
            <p className="text-xs italic text-gray-600 border-l-2 border-va-gold pl-2">
              {testimonialSnippet}
            </p>
          )}
        </div>
      </div>

      {/* Stagger animation delay */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .group {
          animation: fadeInUp 0.6s ease-out;
          animation-delay: ${index * 0.1}s;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  )

  return link ? (
    <Link href={link} className="block h-full">
      {cardContent}
    </Link>
  ) : (
    cardContent
  )
}