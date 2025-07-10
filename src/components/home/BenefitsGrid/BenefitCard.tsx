'use client'

import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface BenefitCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  ctaText: string
  iconColor: string
  index: number
}

export function BenefitCard({
  icon: Icon,
  title,
  description,
  href,
  ctaText,
  iconColor,
  index
}: BenefitCardProps) {
  const handleClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'benefit_card_click', {
        event_category: 'Homepage',
        event_label: title,
        benefit_index: index
      })
    }
  }

  return (
    <Link href={href} onClick={handleClick} className="block h-full">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-gray-200">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Icon */}
          <div className="mb-4">
            <Icon 
              className={cn(
                "w-12 h-12",
                iconColor
              )} 
              aria-hidden="true"
            />
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 mb-4 flex-grow">
            {description}
          </p>
          
          {/* CTA */}
          <div className="mt-auto">
            <span className="text-va-blue font-medium inline-flex items-center gap-1 group">
              {ctaText}
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}