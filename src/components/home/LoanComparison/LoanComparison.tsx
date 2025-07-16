'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { loanTypes, comparisonPoints } from './loan-types.data'
import { LoanTypeCard } from './LoanTypeCard'
import { ComparisonRow } from './ComparisonRow'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Text } from '@/components/ui/typography'

export function LoanComparison() {
  const router = useRouter()
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          
          // Track analytics
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'view_loan_comparison', {
              event_category: 'Homepage',
              event_label: 'Loan Comparison Table'
            })
          }
        }
      },
      { threshold: 0.1 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => observer.disconnect()
  }, [])

  const handleGetStarted = () => {
    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_loan_comparison_cta', {
        event_category: 'Homepage',
        event_label: 'Get Started'
      })
    }
    
    router.push('/get-started')
  }

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-white"
      aria-label="VA Loan Comparison"
    >
      <div className="container mx-auto px-4">
        {/* Section Header - simplified for scannability */}
        <div className={`text-center mb-12 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose a VA Loan?
          </h2>
          <Text size="large" color="muted" className="max-w-3xl mx-auto">
            See why VA loans beat conventional mortgages for veterans.
          </Text>
        </div>

        {/* Comparison Table */}
        <div className={`max-w-6xl mx-auto transition-all duration-700 delay-200 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Feature
                  </th>
                  {loanTypes.map(loanType => (
                    <th key={loanType.id} className="px-3 py-3 bg-gray-50">
                      <LoanTypeCard loanType={loanType} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {comparisonPoints.map((point) => (
                  <ComparisonRow
                    key={point.id}
                    point={point}
                    loanTypes={loanTypes.map(lt => lt.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Note */}
          <p className="mt-4 text-sm text-gray-500 text-center md:hidden">
            Scroll horizontally to see all loan types →
          </p>
        </div>

        {/* CTA Section */}
        <div className={`mt-12 text-center transition-all duration-700 delay-400 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Text color="muted" className="mb-6">
            Ready to use your VA loan benefits?
          </Text>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-2 bg-primary-900 text-white px-8 py-4 rounded-md font-semibold hover:bg-blue-900 transition-colors shadow-md"
            aria-label="Get started with your VA loan"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="mt-6">
            <Link 
              href="/resources/loan-comparison"
              className="text-va-blue hover:text-blue-900 underline"
            >
              View detailed comparison guide
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className={`mt-8 text-center transition-all duration-700 delay-600 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}>
          <Text size="small" color="muted" className="max-w-3xl mx-auto">
            * No loan limits with full entitlement. Limits may apply with reduced entitlement.
          </Text>
        </div>
      </div>
    </section>
  )
}