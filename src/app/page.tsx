import { HeroSection } from '@/components/layout/hero/HeroSection'
import { BenefitsGrid } from '@/components/home/BenefitsGrid'
import { TrustIndicatorsSection } from '@/components/home/TrustIndicators'
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
      
      {/* Trust Indicators Section */}
      <TrustIndicatorsSection />
      
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