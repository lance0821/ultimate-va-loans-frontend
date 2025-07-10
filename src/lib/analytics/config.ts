// Analytics configuration and constants
export const ANALYTICS_CONFIG = {
  // GA4 Events
  EVENTS: {
    FORM_START: 'form_start',
    FORM_SUBMIT: 'form_submit',
    FORM_STEP: 'form_step',
    CALCULATOR_USED: 'calculator_used',
    NAVIGATION_CLICK: 'navigation_click',
    CTA_CLICK: 'cta_click',
  },
  
  // Event Categories
  CATEGORIES: {
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
  },
  
  // Form Types
  FORM_TYPES: {
    QUOTE: 'quote',
    CONTACT: 'contact',
    NEWSLETTER: 'newsletter',
  },
  
  // Calculator Types
  CALCULATOR_TYPES: {
    MORTGAGE: 'mortgage',
    AFFORDABILITY: 'affordability',
    FUNDING_FEE: 'funding_fee',
    REFINANCE: 'refinance',
  },
} as const

// Cookie settings
export const COOKIE_CONSENT_KEY = 'cookie-consent'
export const COOKIE_CONSENT_DURATION = 365 // days

// Debug mode (only in development)
export const DEBUG_ANALYTICS = process.env.NODE_ENV === 'development'