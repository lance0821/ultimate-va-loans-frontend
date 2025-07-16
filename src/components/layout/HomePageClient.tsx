'use client'

import { useEffect, useRef } from 'react'
import { Section } from '@/components/layout/Section'
import { Heading } from '@/components/ui/heading'
// Import content components from PRP-063
import { ContentSection } from '@/components/content/ContentSection'
import { VisualBreak } from '@/components/content/VisualBreak'
// Import hook from PRP-063
// import { useReadingProgress } from '@/hooks/useReadingProgress' // TODO: Enable for analytics
import { BenefitsGrid } from '@/components/home/BenefitsGrid'
import { TrustIndicatorsSection } from '@/components/home/TrustIndicators'
import { AffordabilityPreview } from '@/components/home/AffordabilityPreview'
import { LoanComparison } from '@/components/home/LoanComparison'
import { EducationalResources } from '@/components/home/EducationalResources'
import { ReviewsSection } from '@/components/reviews/ReviewsSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { TrustProgressionController } from '@/components/trust/TrustProgressionController'
// Import loading components
import { ContentPhaseLoader } from '@/components/loading/ContentPhaseLoader'
import { GridSkeleton, CardSkeleton } from '@/components/loading/skeletons/CardSkeleton'
import { TrustBarSkeleton, TextBlockSkeleton } from '@/components/loading/skeletons/TextBlockSkeleton'

export function HomePageClient() {
  const { trackSection } = useScrollProgress()
  const contentRef = useRef<HTMLDivElement>(null)
  // const readingProgress = useReadingProgress(contentRef) // TODO: Use for analytics
  
  // Section refs for tracking
  const benefitsRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const calculatorRef = useRef<HTMLDivElement>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Track sections when they mount
  useEffect(() => {
    if (benefitsRef.current) trackSection('benefits', benefitsRef.current)
    if (trustRef.current) trackSection('trust', trustRef.current)
    if (calculatorRef.current) trackSection('calculator', calculatorRef.current)
    if (comparisonRef.current) trackSection('comparison', comparisonRef.current)
    if (educationRef.current) trackSection('education', educationRef.current)
    if (reviewsRef.current) trackSection('reviews', reviewsRef.current)
    if (ctaRef.current) trackSection('final-cta', ctaRef.current)
  }, [trackSection])

  return (
    <TrustProgressionController>
      <div ref={contentRef}>
        {/* Phase 1: Above-fold (0.5-1.5s) - Benefits Grid */}
        <ContentPhaseLoader 
          phase={1}
          skeleton={<GridSkeleton columns={3} count={3} />}
          componentKey="benefits-grid"
          priority="high"
        >
          <div ref={benefitsRef}>
            <ContentSection id="benefits">
              <Section
                id="benefits"
                spacing="default"
                background="default"
                className="section-spacing-first"
                aria-label="VA Loan Benefits"
              >
                <BenefitsGrid />
              </Section>
            </ContentSection>
          </div>
        </ContentPhaseLoader>
        
        {/* Phase 1: Above-fold (0.5-1.5s) - Trust Indicators */}
        <ContentPhaseLoader
          phase={1}
          skeleton={<TrustBarSkeleton />}
          componentKey="trust-indicators"
          priority="high"
        >
          <div ref={trustRef}>
            <ContentSection id="trust">
              <Section
                id="trust"
                spacing="default"
                className="section-bg-trust"
                aria-label="Why Veterans Trust Us"
              >
                <TrustIndicatorsSection />
              </Section>
            </ContentSection>
          </div>
        </ContentPhaseLoader>
        {/* Decorative wave divider */}
        <VisualBreak type="wave" spacing="normal" />
        
        {/* Phase 2: Interactive (1.5-2.5s) - Affordability Calculator */}
        <ContentPhaseLoader
          phase={2}
          skeleton={<CardSkeleton hasImage={false} lines={4} />}
          componentKey="calculator-preview"
          priority="medium"
        >
          <div ref={calculatorRef}>
            <ContentSection id="calculator">
              <Section
                id="calculator"
                spacing="default"
                className="section-bg-interactive"
                aria-label="Affordability Calculator"
              >
                <AffordabilityPreview />
              </Section>
            </ContentSection>
          </div>
        </ContentPhaseLoader>
        <VisualBreak type="line" spacing="normal" />
        
        {/* Phase 2: Interactive (1.5-2.5s) - VA Loan Comparison */}
        <ContentPhaseLoader
          phase={2}
          skeleton={<TextBlockSkeleton lines={6} hasTitle={true} />}
          componentKey="loan-comparison"
          priority="medium"
        >
          <div ref={comparisonRef}>
            <ContentSection id="comparison">
              <Section
                id="comparison"
                spacing="default"
                background="alt"
                aria-label="VA Loan Comparison"
              >
                <LoanComparison />
              </Section>
            </ContentSection>
          </div>
        </ContentPhaseLoader>
        {/* Phase 3: Enhancement (2.5s+) - Educational Resources */}
        <ContentPhaseLoader
          phase={3}
          skeleton={<GridSkeleton columns={2} count={4} />}
          componentKey="educational-resources"
          priority="low"
        >
          <div ref={educationRef}>
            <ContentSection id="education">
              <Section
                id="education"
                spacing="default"
                className="section-bg-pattern"
                aria-label="Educational Resources"
              >
                <EducationalResources />
              </Section>
            </ContentSection>
          </div>
        </ContentPhaseLoader>
        <VisualBreak type="gradient" spacing="normal" />
        
        {/* Phase 3: Enhancement (2.5s+) - Reviews Section */}
        <ContentPhaseLoader
          phase={3}
          skeleton={<CardSkeleton hasImage={true} imagePosition="left" lines={3} />}
          componentKey="reviews-section"
          priority="low"
        >
          <div ref={reviewsRef}>
            <ContentSection id="reviews">
              <Section
                id="reviews"
                spacing="default"
                className="section-bg-muted"
                aria-label="Customer Reviews"
              >
                <ReviewsSection />
              </Section>
            </ContentSection>
          </div>
        </ContentPhaseLoader>
        {/* Phase 3: Enhancement (2.5s+) - Final CTA */}
        <ContentPhaseLoader
          phase={3}
          skeleton={<TextBlockSkeleton lines={4} hasTitle={true} centered={true} />}
          componentKey="final-cta"
          priority="low"
        >
          <div ref={ctaRef}>
            <ContentSection id="final-cta">
              <Section
                id="final-cta"
                spacing="default"
                className="section-bg-cta section-spacing-last"
                aria-label="Get Started"
              >
                <FinalCTA />
              </Section>
            </ContentSection>
          </div>
        </ContentPhaseLoader>
      </div>
    </TrustProgressionController>
  )
}