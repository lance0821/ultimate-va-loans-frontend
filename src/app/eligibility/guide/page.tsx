import { Metadata } from 'next'
import { getContentPage } from '@/lib/graphql/queries/content'
import { StreamFieldRenderer } from '@/components/content/StreamFieldRenderer'
import { CTASection } from '@/components/content/CTASection'
import { EligibilityChecklist } from '@/components/eligibility/EligibilityChecklist'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContentPage('va-eligibility-guide')
  
  if (!page) return {}
  
  return {
    title: page.seoTitle || page.title,
    description: page.metaDescription,
    keywords: page.metaKeywords,
    openGraph: {
      title: page.ogTitle || page.title,
      description: page.ogDescription || page.metaDescription,
      type: 'article',
    },
  }
}

export default async function EligibilityGuidePage() {
  const page = await getContentPage('va-eligibility-guide')
  
  if (!page) {
    // Fallback content for development/build-time
    const fallbackPage = {
      title: "VA Loan Eligibility Guide",
      intro: "Understand your VA loan eligibility requirements and start your homeownership journey with confidence.",
      body: [
        { type: "heading", value: "Who Qualifies for VA Loans?" },
        { type: "paragraph", value: "<p>VA loans are available to eligible Veterans, active-duty service members, National Guard and Reserve members, and certain surviving spouses.</p>" },
        { type: "heading", value: "Service Requirements" },
        { type: "paragraph", value: "<p><strong>Active Duty:</strong> 90 continuous days during wartime, 181 days during peacetime</p>" },
        { type: "paragraph", value: "<p><strong>National Guard/Reserve:</strong> 6 years of service, or 90 days during wartime</p>" },
        { type: "heading", value: "Certificate of Eligibility (COE)" },
        { type: "paragraph", value: "<p>Your COE verifies your eligibility for VA loan benefits. You can apply online through the VA website or your lender can help you obtain it.</p>" },
        { type: "calculator_embed", value: { calculator_type: "affordability" } }
      ]
    }
    
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-va-blue to-va-blue/90 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <span>✓</span>
                Eligibility Guide
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {fallbackPage.title}
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {fallbackPage.intro}
              </p>
              <CTASection 
                primary={{
                  text: "Check Your Eligibility",
                  href: "/eligibility/check"
                }}
                secondary={{
                  text: "Get Your COE", 
                  href: "/eligibility/coe"
                }}
              />
            </div>
          </div>
        </section>

        {/* Quick Eligibility Check */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <EligibilityChecklist />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <StreamFieldRenderer content={fallbackPage.body} />
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-va-gold/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-va-blue mb-4">
              Ready to Apply?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Start your VA loan application process today and take advantage of your earned benefits.
            </p>
            <CTASection 
              primary={{
                text: "Get Started",
                href: "/get-started"
              }}
              secondary={{
                text: "Contact an Expert",
                href: "tel:+1-800-555-0123"
              }}
            />
          </div>
        </section>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-va-blue to-va-blue/90 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <span>✓</span>
              Eligibility Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {page.title}
            </h1>
            {page.intro && (
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {page.intro}
              </p>
            )}
            <CTASection 
              primary={{
                text: "Check Your Eligibility",
                href: "/eligibility/check"
              }}
              secondary={{
                text: "Get Your COE", 
                href: "/eligibility/coe"
              }}
            />
          </div>
        </div>
      </section>

      {/* Quick Eligibility Check */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <EligibilityChecklist />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <StreamFieldRenderer content={page.body} />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-va-gold/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-va-blue mb-4">
            Ready to Apply?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Start your VA loan application process today and take advantage of your earned benefits.
          </p>
          <CTASection 
            primary={{
              text: "Get Started",
              href: "/get-started"
            }}
            secondary={{
              text: "Contact an Expert",
              href: "tel:+1-800-555-0123"
            }}
          />
        </div>
      </section>
    </div>
  )
}