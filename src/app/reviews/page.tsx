import type { Metadata } from 'next'
import { ReviewsGrid } from '@/components/reviews/ReviewsGrid'
import { ReviewSchema } from '@/components/reviews/ReviewSchema'
import { staticReviews, calculateReviewStats } from '@/lib/data/reviews'

export const metadata: Metadata = {
  title: 'Customer Reviews | VA Home Loans Success Stories',
  description: 'Read real reviews from Veterans who have successfully obtained VA home loans. See why thousands trust us with their homeownership journey.',
  keywords: 'VA loan reviews, veteran testimonials, VA mortgage reviews, customer success stories',
}

export default function ReviewsPage() {
  const stats = calculateReviewStats(staticReviews)

  return (
    <>
      <ReviewSchema reviews={staticReviews} stats={stats} />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-primary-900 text-white py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Veteran Success Stories
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Real reviews from real Veterans. See how we've helped thousands of 
              military families achieve their dream of homeownership through VA loans.
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <ReviewsGrid />
        </div>

        {/* Trust Badges */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-va-blue">{stats.totalReviews}+</p>
                <p className="text-sm text-muted-foreground">Happy Veterans</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-va-blue">{stats.averageRating.toFixed(1)}/5</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-va-blue">$0</p>
                <p className="text-sm text-muted-foreground">Down Payment</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-va-blue">21 Days</p>
                <p className="text-sm text-muted-foreground">Average Close Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}