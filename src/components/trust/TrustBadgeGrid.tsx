'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { progressiveBadges } from '@/lib/trust-progression-config'
import { useTrustProgressionContext } from './TrustProgressionController'
import { useVisualHierarchy } from '@/hooks/useVisualHierarchy'
import { ExternalLink } from 'lucide-react'

interface TrustBadgeGridProps {
  badges: (keyof typeof progressiveBadges)[]
  variant?: 'horizontal' | 'grid'
  className?: string
}

export function TrustBadgeGrid({ 
  badges, 
  variant = 'horizontal',
  className 
}: TrustBadgeGridProps) {
  const { isElementVisible, trackInteraction } = useTrustProgressionContext()
  const { getAnimationClass } = useVisualHierarchy()
  
  const visibleBadges = badges.filter(badge => 
    isElementVisible(`badge-${badge}`)
  )

  const handleBadgeClick = (badgeId: string, badge: typeof progressiveBadges[keyof typeof progressiveBadges]) => {
    trackInteraction('badge', badgeId)
    if ('verifyUrl' in badge && badge.verifyUrl) {
      window.open(badge.verifyUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className={cn(
      variant === 'horizontal' ? 'flex flex-wrap gap-6 items-center justify-center' : 'grid grid-cols-2 md:grid-cols-4 gap-4',
      className
    )}>
      {visibleBadges.map((badgeKey, index) => {
        const badge = progressiveBadges[badgeKey]
        
        return (
          <button
            key={badgeKey}
            onClick={() => handleBadgeClick(badgeKey, badge)}
            className={cn(
              'group relative overflow-hidden rounded-lg',
              'border border-gray-200 bg-white p-4',
              'hover:border-primary hover:shadow-md',
              'transition-all duration-300',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              'trust-badge animate',
              getAnimationClass('trust-badge-reveal')
            )}
            style={{
              animationDelay: `${index * 200}ms`
            }}
          >
            {/* Badge Image */}
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-20 h-20 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: badge.svg }}
              />
              
              {/* Badge Info */}
              <div className="text-center">
                <p className="text-sm font-medium">{badge.name}</p>
                {'rating' in badge && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Rating: {badge.rating}
                    {'count' in badge && ` (${badge.count})`}
                  </p>
                )}
                {'awards' in badge && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {badge.awards.length} Awards
                  </p>
                )}
              </div>
            </div>
            
            {/* Hover Overlay */}
            {'verifyUrl' in badge && badge.verifyUrl && (
              <div className={cn(
                'absolute inset-0 bg-primary/5 flex items-center justify-center',
                'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              )}>
                <div className="flex items-center gap-1 text-xs text-primary">
                  <ExternalLink className="w-3 h-3" />
                  Verify
                </div>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}