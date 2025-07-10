import { Phone, Calendar, Download } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export interface CTAOption {
  id: string
  type: 'primary' | 'secondary' | 'tertiary'
  label: string
  sublabel?: string
  href?: string
  onClick?: () => void
  icon?: LucideIcon
  tracking: {
    event: string
    label: string
  }
}

export const ctaOptions: CTAOption[] = [
  {
    id: 'get-quote',
    type: 'primary',
    label: 'Get Your Free Quote',
    sublabel: 'No obligation • 2-minute form',
    href: '/get-started',
    tracking: {
      event: 'click_final_cta_quote',
      label: 'Final CTA - Get Quote'
    }
  },
  {
    id: 'call-now',
    type: 'secondary',
    label: 'Call 1-800-VA-LOANS',
    sublabel: 'Speak to a VA loan specialist',
    href: 'tel:1-800-825-6267',
    icon: Phone,
    tracking: {
      event: 'click_final_cta_call',
      label: 'Final CTA - Call Now'
    }
  },
  {
    id: 'schedule-call',
    type: 'tertiary',
    label: 'Schedule a Call',
    href: '/schedule-consultation',
    icon: Calendar,
    tracking: {
      event: 'click_final_cta_schedule',
      label: 'Final CTA - Schedule Call'
    }
  },
  {
    id: 'download-guide',
    type: 'tertiary',
    label: 'Download VA Loan Guide',
    href: '/resources/va-loan-guide',
    icon: Download,
    tracking: {
      event: 'click_final_cta_download',
      label: 'Final CTA - Download Guide'
    }
  }
]

export const trustIndicators = [
  {
    id: 'no-obligation',
    text: 'No Obligation Quote',
    icon: '✓'
  },
  {
    id: 'fast-response',
    text: '15-Minute Response Time',
    icon: '⚡'
  },
  {
    id: 'va-experts',
    text: 'VA Loan Experts',
    icon: '🎖️'
  },
  {
    id: 'secure',
    text: 'Secure & Confidential',
    icon: '🔒'
  }
]

export const valueProps = [
  '$0 Down Payment',
  'No PMI Required',
  'Competitive Rates',
  'Flexible Credit Requirements'
]