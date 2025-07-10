import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReviewRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  className?: string
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6'
}

export function ReviewRating({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showNumber = false,
  className 
}: ReviewRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center" role="img" aria-label={`${rating} out of ${maxRating} stars`}>
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(sizeMap[size], 'fill-yellow-400 text-yellow-400')}
          />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star className={cn(sizeMap[size], 'text-gray-300')} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={cn(sizeMap[size], 'fill-yellow-400 text-yellow-400')} />
            </div>
          </div>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(sizeMap[size], 'text-gray-300')}
          />
        ))}
      </div>
      
      {showNumber && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}