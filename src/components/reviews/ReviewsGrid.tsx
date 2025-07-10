'use client'

import { useState } from 'react'
import { ReviewCard } from './ReviewCard'
import { ReviewsSummary } from './ReviewsSummary'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { staticReviews, calculateReviewStats, type MilitaryBranch } from '@/lib/data/reviews'

type SortOption = 'recent' | 'helpful' | 'rating-high' | 'rating-low'
type FilterOption = 'all' | 'purchase' | 'refinance' | MilitaryBranch

export function ReviewsGrid() {
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')

  // Filter reviews
  let filteredReviews = [...staticReviews]
  if (filterBy === 'purchase' || filterBy === 'refinance') {
    filteredReviews = filteredReviews.filter(r => r.loanType === filterBy)
  } else if (filterBy !== 'all') {
    filteredReviews = filteredReviews.filter(r => r.branch === filterBy)
  }

  // Sort reviews
  switch (sortBy) {
    case 'recent':
      filteredReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      break
    case 'helpful':
      filteredReviews.sort((a, b) => b.helpful - a.helpful)
      break
    case 'rating-high':
      filteredReviews.sort((a, b) => b.rating - a.rating)
      break
    case 'rating-low':
      filteredReviews.sort((a, b) => a.rating - b.rating)
      break
  }

  const stats = calculateReviewStats(staticReviews)

  return (
    <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
      {/* Sidebar */}
      <aside className="lg:col-span-1 space-y-6">
        <ReviewsSummary stats={stats} />
        
        {/* Filters */}
        <div className="space-y-4">
          <h3 className="font-semibold">Filter Reviews</h3>
          
          <Tabs value={filterBy} onValueChange={(v) => setFilterBy(v as FilterOption)}>
            <TabsList className="grid grid-cols-1 h-auto">
              <TabsTrigger value="all" className="justify-start">All Reviews</TabsTrigger>
              <TabsTrigger value="purchase" className="justify-start">Purchase Loans</TabsTrigger>
              <TabsTrigger value="refinance" className="justify-start">Refinance Loans</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">By Military Branch</p>
            <Tabs value={filterBy} onValueChange={(v) => setFilterBy(v as FilterOption)}>
              <TabsList className="grid grid-cols-1 h-auto">
                <TabsTrigger value="army" className="justify-start">Army</TabsTrigger>
                <TabsTrigger value="navy" className="justify-start">Navy</TabsTrigger>
                <TabsTrigger value="air-force" className="justify-start">Air Force</TabsTrigger>
                <TabsTrigger value="marines" className="justify-start">Marines</TabsTrigger>
                <TabsTrigger value="coast-guard" className="justify-start">Coast Guard</TabsTrigger>
                <TabsTrigger value="space-force" className="justify-start">Space Force</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </aside>

      {/* Reviews List */}
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold">
            {filteredReviews.length} Reviews
          </h3>
          
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
              <SelectItem value="rating-high">Highest Rated</SelectItem>
              <SelectItem value="rating-low">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}