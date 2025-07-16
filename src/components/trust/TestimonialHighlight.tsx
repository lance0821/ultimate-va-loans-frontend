'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Star, Quote } from 'lucide-react'
import { useTrustProgressionContext } from './TrustProgressionController'
import { useVisualHierarchy } from '@/hooks/useVisualHierarchy'

interface TestimonialData {
  id: string
  author: string
  branch: string
  rating: number
  content: string
  location?: string
}

interface TestimonialHighlightProps {
  testimonials: TestimonialData[]
  variant?: 'inline' | 'card' | 'minimal'
  className?: string
}

export function TestimonialHighlight({
  testimonials,
  variant = 'inline',
  className
}: TestimonialHighlightProps) {
  const { isElementVisible, trackInteraction } = useTrustProgressionContext()
  const { getAnimationClass } = useVisualHierarchy()
  const [currentIndex, setCurrentIndex] = React.useState(0)
  
  const isVisible = isElementVisible('testimonial-preview')
  
  React.useEffect(() => {
    if (!isVisible || testimonials.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, 8000) // Rotate every 8 seconds
    
    return () => clearInterval(interval)
  }, [isVisible, testimonials.length])

  const handleClick = () => {
    trackInteraction('testimonial', 'highlight')
    // Navigate to full reviews
    const reviewsSection = document.getElementById('reviews')
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!isVisible || testimonials.length === 0) return null

  const current = testimonials[currentIndex]

  if (variant === 'minimal') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2 text-sm text-muted-foreground',
          'cursor-pointer hover:text-foreground transition-colors',
          'trust-element visible priority-2',
          className
        )}
        onClick={handleClick}
      >
        <Quote className="w-3 h-3" />
        <span>"{current.content.slice(0, 60)}..."</span>
        <span className="text-xs">- {current.author}</span>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div
        className={cn(
          'p-6 rounded-lg border bg-card',
          'cursor-pointer hover:shadow-lg transition-all',
          'testimonial-highlight animate',
          getAnimationClass('testimonial-slide'),
          className
        )}
        onClick={handleClick}
      >
        <div className="flex items-start gap-4">
          <Quote className="w-8 h-8 text-primary/20 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm mb-3 italic">"{current.content}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{current.author}</p>
                <p className="text-xs text-muted-foreground">{current.branch}</p>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-3 h-3',
                      i < current.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-1 mt-4">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-colors',
                  i === currentIndex ? 'bg-primary' : 'bg-gray-300'
                )}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Default inline variant
  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 rounded-lg',
        'bg-primary/5 border border-primary/20',
        'cursor-pointer hover:bg-primary/10 transition-colors',
        'trust-element visible priority-1',
        className
      )}
      onClick={handleClick}
    >
      <Quote className="w-6 h-6 text-primary/40" />
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">
          "{current.content}"
        </p>
      </div>
      <div className="text-right text-sm">
        <p className="font-medium">{current.author}</p>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-3 h-3',
                i < current.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}