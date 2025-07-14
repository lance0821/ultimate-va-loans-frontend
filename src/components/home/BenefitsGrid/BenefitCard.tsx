'use client'

import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BenefitCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  ctaText: string
  iconColor: string
  index: number
  emphasis?: 'standard' | 'enhanced' | 'primary'
}

export function BenefitCard({
  icon: Icon,
  title,
  description,
  href,
  ctaText,
  iconColor,
  index,
  emphasis = 'standard'
}: BenefitCardProps) {
  const handleClick = () => {
    // Enhanced analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'benefit_card_click', {
        event_category: 'Homepage',
        event_label: title,
        benefit_index: index,
        benefit_emphasis: emphasis,
        benefit_version: 'v2_streamlined'
      })
    }
  }

  // Different card styles based on emphasis
  const cardStyles = {
    standard: 'border-gray-200 hover:border-gray-300',
    enhanced: 'border-va-gold/30 shadow-md hover:shadow-lg bg-gradient-to-br from-white to-va-gold/5',
    primary: 'border-va-blue bg-va-blue text-white hover:bg-va-blue/90'
  }

  const contentStyles = {
    standard: 'text-gray-900',
    enhanced: 'text-gray-900',
    primary: 'text-white'
  }

  const descriptionStyles = {
    standard: 'text-gray-600',
    enhanced: 'text-gray-700',
    primary: 'text-gray-100'
  }

  if (emphasis === 'primary') {
    // Primary CTA card gets special treatment
    return (
      <Link href={href} onClick={handleClick} className="block h-full">
        <Card className={cn(
          "h-full transition-all duration-300 hover:-translate-y-1",
          cardStyles[emphasis]
        )}>
          <CardContent className="p-8 flex flex-col h-full text-center">
            {/* Icon */}
            <div className="mb-6 mx-auto">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <Icon 
                  className={cn("w-12 h-12", iconColor)} 
                  aria-hidden="true"
                />
              </div>
            </div>
            
            {/* Title */}
            <h3 className={cn(
              "text-2xl font-bold mb-3",
              contentStyles[emphasis]
            )}>
              {title}
            </h3>
            
            {/* Description */}
            <p className={cn(
              "text-lg mb-6 flex-grow",
              descriptionStyles[emphasis]
            )}>
              {description}
            </p>
            
            {/* CTA Button */}
            <Button 
              variant="secondary" 
              size="lg" 
              className="w-full bg-white text-va-blue hover:bg-gray-100"
            >
              {ctaText}
              <span className="ml-2" aria-hidden="true">→</span>
            </Button>
          </CardContent>
        </Card>
      </Link>
    )
  }

  // Standard and enhanced cards
  return (
    <Link href={href} onClick={handleClick} className="block h-full">
      <Card className={cn(
        "h-full transition-all duration-300 hover:-translate-y-1",
        cardStyles[emphasis]
      )}>
        <CardContent className="p-8 flex flex-col h-full">
          {/* Icon */}
          <div className="mb-6">
            <Icon 
              className={cn(
                "w-14 h-14",
                emphasis === 'enhanced' ? 'text-va-gold' : iconColor
              )} 
              aria-hidden="true"
            />
          </div>
          
          {/* Title */}
          <h3 className={cn(
            "text-2xl font-semibold mb-3",
            contentStyles[emphasis]
          )}>
            {title}
          </h3>
          
          {/* Description */}
          <p className={cn(
            "text-lg mb-6 flex-grow leading-relaxed",
            descriptionStyles[emphasis]
          )}>
            {description}
          </p>
          
          {/* CTA */}
          <div className="mt-auto">
            <span className={cn(
              "font-semibold inline-flex items-center gap-2 group text-lg",
              emphasis === 'enhanced' ? 'text-va-gold' : 'text-va-blue'
            )}>
              {ctaText}
              <span 
                className="transition-transform group-hover:translate-x-1" 
                aria-hidden="true"
              >
                →
              </span>
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}