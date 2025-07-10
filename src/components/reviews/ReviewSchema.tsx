import Script from 'next/script'
import type { Review, ReviewStats } from '@/lib/data/reviews'

interface ReviewSchemaProps {
  reviews: Review[]
  stats: ReviewStats
  businessName?: string
}

export function ReviewSchema({ 
  reviews, 
  stats, 
  businessName = 'VA Home Loans' 
}: ReviewSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: businessName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: stats.averageRating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      ratingCount: stats.totalReviews,
      reviewCount: stats.totalReviews
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      datePublished: review.date,
      reviewBody: review.content,
      name: review.title,
      reviewRating: {
        '@type': 'Rating',
        bestRating: '5',
        ratingValue: review.rating.toString(),
        worstRating: '1'
      }
    }))
  }

  return (
    <Script
      id="reviews-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
}