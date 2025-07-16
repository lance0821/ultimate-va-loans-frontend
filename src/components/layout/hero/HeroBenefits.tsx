'use client'

import { memo, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useVisualHierarchy } from '@/hooks/useVisualHierarchy'
import { DollarSign, Shield, Home, LucideIcon } from 'lucide-react'

export interface Benefit {
  icon: LucideIcon
  text: string
  highlight?: boolean
}

interface HeroBenefitsProps {
  benefits?: Benefit[]
  variant?: 'list' | 'grid' | 'inline'
  animationStyle?: 'simple' | 'staggered' // Control animation complexity
  className?: string
}

const defaultBenefits: Benefit[] = [
  { icon: DollarSign, text: "$0 Down Payment Required", highlight: true },
  { icon: Shield, text: "No PMI Ever - Save $200+/month" },
  { icon: Home, text: "Close in as Fast as 21 Days" }
]

export const HeroBenefits = memo(function HeroBenefits({ 
  benefits = defaultBenefits,
  variant = 'list',
  animationStyle = 'simple', // Default to simple animations
  className
}: HeroBenefitsProps) {
  const { getAnimationClass } = useVisualHierarchy()
  
  // Sort benefits with highlighted items first
  const sortedBenefits = useMemo(
    () => [...benefits].sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0)),
    [benefits]
  )
  
  const variantClasses = {
    list: 'space-y-3',
    grid: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
    inline: 'flex flex-wrap gap-4'
  }
  
  // Simple vs staggered animation
  const getItemAnimation = (index: number) => {
    if (animationStyle === 'simple') {
      return getAnimationClass('animate-fade-in')
    }
    return getAnimationClass(`animate-fade-in-left delay-${(index + 2) * 100}`)
  }
  
  return (
    <ul className={cn(
      'hero-benefits',
      variantClasses[variant],
      'text-left max-w-xl mx-auto lg:mx-0',
      className
    )}>
      {sortedBenefits.map((benefit, index) => (
        <li 
          key={benefit.text}
          className={cn(
            'flex items-center gap-3 text-gray-200',
            getItemAnimation(index)
          )}
        >
          <div className={cn(
            'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0',
            benefit.highlight 
              ? 'bg-va-gold text-va-blue' 
              : 'bg-va-gold/20 backdrop-blur-sm'
          )}>
            <benefit.icon className="w-3 h-3" />
          </div>
          <span className="text-base lg:text-lg">{benefit.text}</span>
        </li>
      ))}
    </ul>
  )
})

HeroBenefits.displayName = 'HeroBenefits'