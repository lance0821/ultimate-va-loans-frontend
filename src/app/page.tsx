import { HeroSection } from '@/components/layout/hero/HeroSection'
import { BenefitsGrid } from '@/components/home/BenefitsGrid'
import { StatisticsSection } from '@/components/home/StatisticsSection'
import { AffordabilityPreview } from '@/components/home/AffordabilityPreview'
import { LoanComparison } from '@/components/home/LoanComparison'
import { EducationalResources } from '@/components/home/EducationalResources'
import { ReviewsSection } from '@/components/reviews/ReviewsSection'
import { FinalCTA } from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      
      {/* Benefits Grid Section */}
      <BenefitsGrid />
      
      {/* Statistics Section */}
      <StatisticsSection />
      
      {/* Affordability Calculator Preview */}
      <AffordabilityPreview />
      
      {/* VA Loan Comparison Section */}
      <LoanComparison />
      
      {/* Educational Resources Section */}
      <EducationalResources />
      
      {/* Reviews Section */}
      <ReviewsSection />
      
      {/* Final CTA Section */}
      <FinalCTA />
    </main>
  )
}