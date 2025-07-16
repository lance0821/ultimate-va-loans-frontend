'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Shield, Star } from 'lucide-react'

interface TrustBadgesProps {
  variant?: 'full' | 'compact'
  className?: string
}

export function TrustBadges({ variant = 'full', className }: TrustBadgesProps) {
  if (variant === 'compact') {
    return (
      <div className={cn(
        "flex items-center gap-3",
        "p-3 rounded-lg",
        "bg-white/10 backdrop-blur-sm",
        "border border-white/20",
        className
      )}>
        <div className="flex items-center gap-2 text-white">
          <Shield className="w-5 h-5 text-va-gold" />
          <span className="text-sm font-medium">VA Approved</span>
        </div>
        <div className="w-px h-5 bg-white/30" />
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-va-gold fill-va-gold" />
          <span className="text-sm text-white font-medium">4.9</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "grid grid-cols-3 gap-4",
      "opacity-80 hover:opacity-100 transition-opacity",
      className
    )}>
      <div className="text-center">
        <Image
          src="/images/trust/va-approved.svg"
          alt="VA Approved Lender"
          width={80}
          height={60}
          className="mx-auto mb-1 brightness-0 invert opacity-90"
          loading="eager"
          priority
        />
        <p className="text-xs text-gray-300">VA Approved</p>
      </div>
      
      <div className="text-center">
        <Image
          src="/images/trust/bbb-rating.svg"
          alt="BBB A+ Rating"
          width={80}
          height={60}
          className="mx-auto mb-1 brightness-0 invert opacity-90"
          loading="eager"
          priority
        />
        <p className="text-xs text-gray-300">A+ Rating</p>
      </div>
      
      <div className="text-center">
        <Image
          src="/images/trust/equal-housing.svg"
          alt="Equal Housing Lender"
          width={60}
          height={60}
          className="mx-auto mb-1 brightness-0 invert opacity-90"
          loading="eager"
          priority
        />
        <p className="text-xs text-gray-300">Equal Housing</p>
      </div>
    </div>
  )
}