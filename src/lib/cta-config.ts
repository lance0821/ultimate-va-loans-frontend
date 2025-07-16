export interface CTAConfig {
  id: string
  text: string
  hierarchy: 'primary' | 'secondary' | 'tertiary'
  action: string
  icon?: React.ComponentType<{ className?: string }>
  trackingLabel: string
  trackingCategory: string
  conditions?: {
    showOn?: 'mobile' | 'desktop' | 'all'
    showAfter?: number // seconds
    showIfScrollDepth?: number // percentage
  }
}

// CTA text variants for A/B testing
export const ctaVariants = {
  eligibility: {
    control: 'Check Your Eligibility',
    variantA: 'See If You Qualify',
    variantB: 'Get Started in 2 Minutes',
    variantC: 'Start Your VA Loan Journey'
  },
  application: {
    control: 'Start Your Application',
    variantA: 'Apply Now',
    variantB: 'Get Pre-Approved Today',
    variantC: 'Begin Application'
  },
  quote: {
    control: 'Get Your Free Quote',
    variantA: 'Get Instant Quote',
    variantB: 'Calculate Your Rate',
    variantC: 'See Your Rate'
  },
  call: {
    control: 'Call (555) 123-4567',
    variantA: 'Speak to a Specialist',
    variantB: 'Get Expert Help',
    variantC: 'Talk to Us'
  }
}

// Homepage CTA configurations by section
export const homepageCTAs = {
  hero: {
    primary: {
      id: 'hero-primary',
      text: ctaVariants.eligibility.control,
      action: '/get-started',
      trackingLabel: 'Hero Primary - Check Eligibility',
      trackingCategory: 'hero_section'
    },
    secondary: {
      id: 'hero-secondary', 
      text: ctaVariants.call.control,
      action: 'tel:5551234567',
      trackingLabel: 'Hero Secondary - Call',
      trackingCategory: 'hero_section'
    },
    tertiary: {
      id: 'hero-tertiary',
      text: 'Learn More',
      action: '#benefits',
      trackingLabel: 'Hero Tertiary - Learn More',
      trackingCategory: 'hero_section'
    }
  },
  
  benefits: {
    primary: {
      id: 'benefits-primary',
      text: ctaVariants.application.control,
      action: '/get-started',
      trackingLabel: 'Benefits Primary - Start Application',
      trackingCategory: 'benefits_section'
    },
    tertiary: {
      id: 'benefits-tertiary',
      text: 'View All Benefits',
      action: '/benefits',
      trackingLabel: 'Benefits Tertiary - View All',
      trackingCategory: 'benefits_section'
    }
  },
  
  calculator: {
    primary: {
      id: 'calculator-primary',
      text: 'Calculate Your Savings',
      action: '#calculator',
      trackingLabel: 'Calculator Primary - Calculate',
      trackingCategory: 'calculator_section'
    },
    secondary: {
      id: 'calculator-secondary',
      text: 'Get Pre-Approved',
      action: '/get-started?step=financial',
      trackingLabel: 'Calculator Secondary - Pre-Approval',
      trackingCategory: 'calculator_section'
    }
  },
  
  finalCTA: {
    primary: {
      id: 'final-primary',
      text: ctaVariants.quote.control,
      action: '/get-started',
      trackingLabel: 'Final Primary - Free Quote',
      trackingCategory: 'final_cta_section'
    },
    secondary: {
      id: 'final-secondary',
      text: 'Schedule a Call',
      action: '/schedule-consultation',
      trackingLabel: 'Final Secondary - Schedule Call',
      trackingCategory: 'final_cta_section'
    },
    tertiary: {
      id: 'final-tertiary',
      text: 'Download VA Loan Guide',
      action: '/resources/va-loan-guide',
      trackingLabel: 'Final Tertiary - Download Guide',
      trackingCategory: 'final_cta_section'
    }
  }
}

// CTA placement rules for visual hierarchy
export const ctaPlacementRules = {
  primary: {
    maxPerViewport: 1,
    minSpacing: '80vh',
    positions: ['above-fold', 'section-end', 'final-cta']
  },
  secondary: {
    maxPerViewport: 2,
    minSpacing: '40vh',
    positions: ['alongside-primary', 'section-middle']
  },
  tertiary: {
    maxPerViewport: 3,
    minSpacing: '20vh',
    positions: ['inline-content', 'support-text', 'footer']
  }
}

// Helper to get variant based on user segment or test group
export function getCTAVariant(
  variantKey: keyof typeof ctaVariants,
  testGroup?: 'control' | 'variantA' | 'variantB' | 'variantC'
): string {
  const variants = ctaVariants[variantKey]
  if (!variants) return ''
  
  // Default to control if no test group specified
  const group = testGroup || 'control'
  return variants[group] || variants.control
}