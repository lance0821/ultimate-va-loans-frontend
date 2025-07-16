export interface SecurityContext {
  level: 'low' | 'medium' | 'high'
  message: string
  icon: 'lock' | 'shield' | 'badge' | 'check'
  details?: string
}

export const securityContexts: Record<string, SecurityContext> = {
  // Form-specific contexts
  personalInfo: {
    level: 'high',
    message: 'Your information is protected',
    icon: 'lock',
    details: 'We use bank-level 256-bit encryption to protect your data.'
  },
  
  financialInfo: {
    level: 'high',
    message: 'Bank-level security',
    icon: 'shield',
    details: 'Your financial information is encrypted and never stored in plain text.'
  },
  
  contactInfo: {
    level: 'medium',
    message: 'We respect your privacy',
    icon: 'check',
    details: 'Your contact information is only used to help you with your VA loan.'
  },
  
  documentUpload: {
    level: 'high',
    message: 'Secure document handling',
    icon: 'badge',
    details: 'Documents are encrypted in transit and at rest. Automatically deleted after 90 days.'
  },
  
  // Field-specific contexts
  ssn: {
    level: 'high',
    message: 'SSN is fully encrypted',
    icon: 'lock',
    details: 'Your SSN is encrypted immediately and only the last 4 digits are ever displayed.'
  },
  
  income: {
    level: 'medium',
    message: 'Income verification is secure',
    icon: 'shield',
    details: 'We only share your income data with VA-approved underwriters.'
  },
  
  email: {
    level: 'low',
    message: 'No spam, ever',
    icon: 'check',
    details: 'We only send loan-related updates. Unsubscribe anytime.'
  }
}

export const securityBadges = {
  ssl: {
    name: 'SSL Secured',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 7V12C4 16.5 6.8 20.7 12 22C17.2 20.7 20 16.5 20 12V7L12 2Z" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" 
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    verifyUrl: 'https://www.ssl.com/checker/'
  },
  
  encryption: {
    name: '256-bit Encryption',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
      <path d="M7 11V7C7 4.2 9.2 2 12 2C14.8 2 17 4.2 17 7V11" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="12" cy="16" r="1" fill="currentColor"/>
    </svg>`
  },
  
  pci: {
    name: 'PCI Compliant',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
      <path d="M3 12H21" stroke="currentColor" stroke-width="2"/>
      <path d="M7 16H10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  }
}

// Dynamic message selection based on form fields
export function getSecurityMessage(formType: string, fields: string[]): SecurityContext {
  // Determine highest security level needed
  const contexts = fields
    .map(field => securityContexts[field])
    .filter(Boolean)
  
  if (contexts.length === 0) {
    return securityContexts.contactInfo // Default
  }
  
  // Return highest security level context
  const highSecurity = contexts.find(c => c.level === 'high')
  if (highSecurity) return highSecurity
  
  const medSecurity = contexts.find(c => c.level === 'medium')
  if (medSecurity) return medSecurity
  
  return contexts[0]
}