import { Metadata } from 'next';
import PurchaseHeroSection from '@/components/va-loans/purchase/PurchaseHeroSection';
import VALoanProcessTimeline from '@/components/va-loans/purchase/VALoanProcessTimeline';
import EligibilityRequirements from '@/components/va-loans/purchase/EligibilityRequirements';
import VALoanAdvantages from '@/components/va-loans/purchase/VALoanAdvantages';
import HomeShoppingTips from '@/components/va-loans/purchase/HomeShoppingTips';
import VALoanLimitsSection from '@/components/va-loans/purchase/VALoanLimitsSection';
import EducationalResources from '@/components/va-loans/purchase/EducationalResources';
import CalculatorHub from '@/components/calculators/CalculatorHub';
import SuccessStories from '@/components/va-loans/purchase/SuccessStories';
import PurchaseCTASection from '@/components/va-loans/purchase/PurchaseCTASection';

export const metadata: Metadata = {
  title: 'Purchase a Home with Your VA Loan | 0% Down Payment | Ultimate VA Loans',
  description: 'Learn how to use your VA loan benefit to purchase a home with 0% down payment. Get step-by-step guidance, eligibility info, and expert support.',
  keywords: 'VA loan purchase, VA home loan, 0 down payment, military home loan, VA loan process, buy home with VA loan',
  openGraph: {
    title: 'Purchase a Home with Your VA Loan - 0% Down Payment',
    description: 'Complete guide to using your VA loan benefit for home purchase. No down payment required for qualified veterans.',
    url: 'https://ultimatevaloans.com/va-loans/purchase',
    siteName: 'Ultimate VA Loans',
    images: [
      {
        url: '/images/va-loan-purchase-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Military family in front of their new home purchased with VA loan',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Purchase a Home with Your VA Loan - 0% Down',
    description: 'Step-by-step guide to buying a home with your VA loan benefit. No down payment required.',
    images: ['/images/va-loan-purchase-hero.jpg'],
  },
  alternates: {
    canonical: 'https://ultimatevaloans.com/va-loans/purchase',
  },
};

export default function VALoanPurchasePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Purchase a Home with Your VA Loan',
    description: 'Comprehensive guide to using VA loan benefits for home purchase',
    author: {
      '@type': 'Organization',
      name: 'Ultimate VA Loans',
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://ultimatevaloans.com/va-loans/purchase',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main className="min-h-screen">
        <PurchaseHeroSection />
        
        {/* VA Loan Process Timeline - Implemented */}
        <VALoanProcessTimeline />
        
        {/* Eligibility Requirements - Implemented */}
        <EligibilityRequirements />
        
        {/* VA Loan Advantages - Implemented */}
        <VALoanAdvantages />
        
        {/* Home Shopping Tips - Implemented */}
        <HomeShoppingTips />
        
        {/* VA Loan Limits & Funding Fee - Implemented */}
        <VALoanLimitsSection />
        
        {/* Educational Resources - Implemented */}
        <EducationalResources />
        
        {/* Calculator Tools - Implemented */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <CalculatorHub />
          </div>
        </section>
        {/* Success Stories - Implemented */}
        <SuccessStories />
        
        {/* Final CTA Section - Implemented */}
        <PurchaseCTASection />
      </main>
    </>
  );
}