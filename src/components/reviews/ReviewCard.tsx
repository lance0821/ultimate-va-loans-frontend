import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ReviewRating } from './ReviewRating'
import { ThumbsUp, Shield, CheckCircle } from 'lucide-react'
import { formatDistance } from 'date-fns'
import type { Review, MilitaryBranch } from '@/lib/data/reviews'

interface ReviewCardProps {
  review: Review
  variant?: 'default' | 'compact'
}

const branchColors: Record<MilitaryBranch, string> = {
  'army': 'bg-green-600',
  'navy': 'bg-blue-600',
  'air-force': 'bg-sky-600',
  'marines': 'bg-red-600',
  'coast-guard': 'bg-orange-600',
  'space-force': 'bg-gray-800'
}

const branchNames: Record<MilitaryBranch, string> = {
  'army': 'U.S. Army',
  'navy': 'U.S. Navy',
  'air-force': 'U.S. Air Force',
  'marines': 'U.S. Marines',
  'coast-guard': 'U.S. Coast Guard',
  'space-force': 'U.S. Space Force'
}

export function ReviewCard({ review, variant = 'default' }: ReviewCardProps) {
  const timeAgo = formatDistance(new Date(review.date), new Date(), { addSuffix: true })
  
  if (variant === 'compact') {
    return (
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold">{review.author}</p>
              <Badge 
                variant="secondary" 
                className={`${branchColors[review.branch]} text-white text-xs mt-1`}
              >
                {branchNames[review.branch]}
              </Badge>
            </div>
            <ReviewRating rating={review.rating} size="sm" />
          </div>
          
          <h3 className="font-semibold text-sm mb-2 line-clamp-1">{review.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">{review.content}</p>
          
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            {review.verified && (
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Verified
              </span>
            )}
            <span>{timeAgo}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Shield className={`h-8 w-8 ${branchColors[review.branch]} text-white p-1.5 rounded`} />
              <div>
                <p className="font-semibold text-lg">{review.author}</p>
                <p className="text-sm text-muted-foreground">{branchNames[review.branch]}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <ReviewRating rating={review.rating} showNumber />
            <p className="text-xs text-muted-foreground mt-1">{timeAgo}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <h3 className="font-semibold text-lg mb-3">{review.title}</h3>
        <p className="text-muted-foreground mb-4">{review.content}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Badge variant="outline" className="capitalize">
            {review.loanType} Loan
          </Badge>
          
          {review.location && (
            <span className="text-muted-foreground">{review.location}</span>
          )}
          
          {review.verified && (
            <span className="flex items-center gap-1 text-green-600">
              <CheckCircle className="h-4 w-4" />
              Verified Customer
            </span>
          )}
        </div>
        
        {review.helpful > 0 && (
          <div className="mt-4 pt-4 border-t">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ThumbsUp className="h-4 w-4" />
              {review.helpful} people found this helpful
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}