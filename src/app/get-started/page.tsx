import { Metadata } from 'next'
import { Suspense } from 'react'
import { QuoteForm } from '@/components/forms/quote/QuoteForm'

export const metadata: Metadata = {
  title: 'Get Your VA Loan Quote | VA Home Loans',
  description: 'Get a personalized VA loan quote in minutes. No obligations, no credit check required.',
}

export default function GetStartedPage() {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Get Your Personalized VA Loan Quote
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Answer a few quick questions to receive your customized rate quote. 
          It only takes 5 minutes and won't affect your credit score.
        </p>
      </div>
      
      <Suspense fallback={<div>Loading...</div>}>
        <QuoteForm />
      </Suspense>
    </>
  )
}