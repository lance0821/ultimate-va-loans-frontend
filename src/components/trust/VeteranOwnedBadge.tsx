'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { trustAssets, getTrustBadgeDataUrl } from "./trust-assets"
import { useAnalytics } from "@/hooks/useAnalytics"
import { useTrustVerification } from "@/hooks/useTrustVerification"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ExternalLink } from "lucide-react"

interface VeteranOwnedBadgeProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showTooltip?: boolean
}

export function VeteranOwnedBadge({ 
  size = 'md', 
  className,
  showTooltip = true 
}: VeteranOwnedBadgeProps) {
  const { trackEvent } = useAnalytics()
  const { openVerification } = useTrustVerification()
  const badgeData = trustAssets.veteranOwned

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-[120px] h-[120px]',
    lg: 'w-32 h-32'
  }

  const handleClick = () => {
    trackEvent({
      action: 'trust_badge_click',
      category: 'Trust',
      label: 'Veteran Owned Badge',
      value: 1
    })
    openVerification('veteranOwned')
  }

  const badge = (
    <button
      onClick={handleClick}
      className={cn(
        "relative group cursor-pointer transition-all duration-300",
        "hover:scale-105 focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-va-gold focus-visible:ring-offset-2",
        sizeClasses[size],
        className
      )}
      aria-label={badgeData.badge.alt}
    >
      <img
        src={getTrustBadgeDataUrl('veteranOwned')}
        alt={badgeData.badge.alt}
        width={badgeData.badge.width}
        height={badgeData.badge.height}
        className="w-full h-full"
      />
      
      {/* Hover indicator */}
      <div className={cn(
        "absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10",
        "flex items-center justify-center transition-all duration-300",
        "opacity-0 group-hover:opacity-100"
      )}>
        <ExternalLink className="w-4 h-4 text-white" />
      </div>
      
      {/* Glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-full",
        "bg-gradient-to-r from-va-gold/0 via-va-gold/20 to-va-gold/0",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        "animate-pulse pointer-events-none"
      )} />
    </button>
  )

  if (!showTooltip) return badge

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <div className="space-y-2">
            <p className="font-semibold">Proudly Veteran Owned & Operated</p>
            <p className="text-sm">
              Our company is founded and led by Veterans who understand your unique needs.
            </p>
            <p className="text-xs text-muted-foreground">
              Cert: {badgeData.certification.number}
            </p>
            <p className="text-xs text-primary">Click to verify →</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}