import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ReviewRating } from './ReviewRating'
import { Progress } from '@/components/ui/progress'
import type { ReviewStats } from '@/lib/data/reviews'

interface ReviewsSummaryProps {
  stats: ReviewStats
}

export function ReviewsSummary({ stats }: ReviewsSummaryProps) {
  const getPercentage = (count: number) => {
    return stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <p className="text-4xl font-bold mb-2">{stats.averageRating.toFixed(1)}</p>
          <ReviewRating rating={stats.averageRating} size="lg" />
          <p className="text-sm text-muted-foreground mt-2">
            Based on {stats.totalReviews} reviews
          </p>
        </div>
        
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]
            const percentage = getPercentage(count)
            
            return (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-medium w-3">{rating}</span>
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <div className="flex-1">
                  <Progress value={percentage} className="h-2" />
                </div>
                <span className="text-sm text-muted-foreground w-10 text-right">
                  {count}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}