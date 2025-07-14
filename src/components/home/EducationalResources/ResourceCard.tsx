'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Resource, resourceCategories } from './resources.data'
import { cn } from '@/lib/utils'

interface ResourceCardProps {
  resource: Resource
  isFeatured?: boolean  // NEW prop
  onCardClick?: () => void
}

export function ResourceCard({ resource, isFeatured = false, onCardClick }: ResourceCardProps) {
  const Icon = resource.icon
  const categoryInfo = resourceCategories[resource.category as keyof typeof resourceCategories]
  
  const handleClick = () => {
    try {
      // Track analytics with featured flag
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'click_resource', {
          event_category: 'Education',
          event_label: resource.title,
          resource_id: resource.id,
          read_time: resource.readTime,
          is_featured: isFeatured
        })
      }
    } catch (error) {
      console.error('Analytics tracking failed:', error)
    }
    
    if (onCardClick) {
      onCardClick()
    }
  }
  
  // Featured card variant
  if (isFeatured && resource.featured) {
    return (
      <Link href={resource.href} onClick={handleClick} className="block h-full">
        <Card className={cn(
          "h-full card-interactive cursor-pointer group",
          "bg-gradient-to-br from-gray-50 to-gray-100/50",
          "border-2 hover:border-va-blue/30"
        )}>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-va-blue/10 rounded-xl flex items-center justify-center">
                <Icon className="w-8 h-8 text-va-blue" />
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={categoryInfo.color} variant="secondary">
                  {categoryInfo.label}
                </Badge>
                {resource.badge && (
                  <Badge className="bg-va-gold text-va-blue font-semibold">
                    {resource.badge}
                  </Badge>
                )}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {resource.title}
            </h3>
            
            {resource.subtitle && (
              <p className="text-lg text-va-blue font-medium mb-3">
                {resource.subtitle}
              </p>
            )}
            
            <p className="text-gray-600 mb-4">
              {resource.description}
            </p>
            
            {/* Preview Points */}
            {resource.previewPoints && (
              <ul className="space-y-2 mb-4">
                {resource.previewPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{resource.readTime} min read</span>
              </div>
              
              <span className="flex items-center gap-1 font-semibold text-va-blue group-hover:gap-3 transition-all">
                Read Complete Guide
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }
  
  // Standard card (existing design)
  return (
    <Link href={resource.href} onClick={handleClick} className="block h-full">
      <Card className="h-full card-interactive cursor-pointer group">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 resource-icon-wrapper rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6 va-icon" />
            </div>
            <Badge className={categoryInfo.color} variant="secondary">
              {categoryInfo.label}
            </Badge>
          </div>
          
          <h3 className="text-lg font-semibold line-clamp-2 resource-card-title">
            {resource.title}
          </h3>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="form-helper text-sm line-clamp-3 mb-4">
            {resource.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm form-helper">
              <Clock className="w-4 h-4" />
              <span>{resource.readTime} min read</span>
            </div>
            
            <span className="flex items-center gap-1 text-sm font-medium link-va group-hover:gap-2 transition-all">
              Read more
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}