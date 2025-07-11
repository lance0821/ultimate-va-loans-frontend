'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Resource, resourceCategories } from './resources.data'

interface ResourceCardProps {
  resource: Resource
  onCardClick?: () => void
}

export function ResourceCard({ resource, onCardClick }: ResourceCardProps) {
  const Icon = resource.icon
  const categoryInfo = resourceCategories[resource.category as keyof typeof resourceCategories]
  
  const handleClick = () => {
    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_resource', {
        event_category: 'Education',
        event_label: resource.title,
        resource_id: resource.id,
        read_time: resource.readTime
      })
    }
    
    if (onCardClick) {
      onCardClick()
    }
  }
  
  return (
    <Link href={resource.href} onClick={handleClick} className="block h-full">
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 bg-va-blue/10 rounded-lg flex items-center justify-center group-hover:bg-va-blue/20 transition-colors">
              <Icon className="w-6 h-6 text-va-blue" />
            </div>
            <Badge className={categoryInfo.color} variant="secondary">
              {categoryInfo.label}
            </Badge>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-va-blue transition-colors">
            {resource.title}
          </h3>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {resource.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{resource.readTime} min read</span>
            </div>
            
            <span className="flex items-center gap-1 text-sm font-medium text-va-blue group-hover:gap-2 transition-all">
              Read more
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}