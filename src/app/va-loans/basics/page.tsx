import { Metadata } from 'next'
import { getContentPage } from '@/lib/graphql/queries/content'
import { StreamFieldRenderer } from '@/components/content/StreamFieldRenderer'
import { CTASection } from '@/components/content/CTASection'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContentPage('va-loan-basics')
  
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

export default async function VALoanBasicsPage() {
  const page = await getContentPage('va-loan-basics')
  
  if (!page) {
    // Fallback content for development/build-time
    const fallbackPage = {
      title: "VA Loan Benefits & Basics",
      intro: "Discover how VA loans make homeownership accessible for Veterans and military families with zero down payment, competitive rates, and no PMI.",
      body: [
        { type: "heading", value: "Key VA Loan Benefits" },
        { type: "paragraph", value: "<p>VA loans offer unique advantages designed specifically for those who have served our country. These benefits can save you thousands of dollars and make homeownership more accessible.</p>" },
        { type: "heading", value: "Zero Down Payment" },
        { type: "paragraph", value: "<p>Unlike conventional loans that typically require 5-20% down, VA loans allow eligible Veterans to purchase a home with <strong>no money down</strong>.</p>" },
        { type: "calculator_embed", value: { calculator_type: "mortgage" } }
      ]
    }
    
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-va-blue to-va-blue/90 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <span>📚</span>
                Education Center
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
                  href: "/get-started"
                }}
                secondary={{
                  text: "Use Our Calculator", 
                  href: "/calculators/mortgage"
                }}
              />
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
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Take the first step toward homeownership with your VA loan benefits.
            </p>
            <CTASection 
              primary={{
                text: "Get Your Free Quote",
                href: "/get-started"
              }}
              secondary={{
                text: "Speak with an Expert",
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
              <span>📚</span>
              Education Center
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
                href: "/get-started"
              }}
              secondary={{
                text: "Use Our Calculator", 
                href: "/calculators/mortgage"
              }}
            />
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
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the first step toward homeownership with your VA loan benefits.
          </p>
          <CTASection 
            primary={{
              text: "Get Your Free Quote",
              href: "/get-started"
            }}
            secondary={{
              text: "Speak with an Expert",
              href: "tel:+1-800-555-0123"
            }}
          />
        </div>
      </section>
    </div>
  )
}