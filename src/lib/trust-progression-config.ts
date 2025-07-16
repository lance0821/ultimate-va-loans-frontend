export interface TrustStage {
  id: string
  name: string
  triggerDepth: number // Percentage of page scrolled
  triggerTime?: number // Optional time delay in seconds
  elements: TrustElement[]
}

export interface TrustElement {
  type: 'badge' | 'testimonial' | 'metric' | 'message'
  content: string | Record<string, unknown>
  placement: string // Section ID or component name
  animation?: 'fade' | 'slide' | 'scale' | 'none'
  priority: number // Visual weight within stage
}

export const trustProgressionStages: TrustStage[] = [
  {
    id: 'initial',
    name: 'Initial Trust',
    triggerDepth: 0,
    triggerTime: 0,
    elements: [
      {
        type: 'badge',
        content: 'veteranOwned',
        placement: 'hero',
        animation: 'fade',
        priority: 1
      },
      {
        type: 'message',
        content: 'Serving Florida Veterans Since 2019',
        placement: 'hero',
        animation: 'none',
        priority: 2
      },
      {
        type: 'metric',
        content: { rating: 4.9, count: 2847 },
        placement: 'hero',
        animation: 'fade',
        priority: 3
      }
    ]
  },
  
  {
    id: 'validation',
    name: 'Validation',
    triggerDepth: 20, // 20% scroll
    triggerTime: 3,
    elements: [
      {
        type: 'badge',
        content: 'bbb',
        placement: 'trust-bar',
        animation: 'slide',
        priority: 1
      },
      {
        type: 'badge',
        content: 'vaApproved',
        placement: 'trust-bar',
        animation: 'slide',
        priority: 1
      },
      {
        type: 'metric',
        content: { 
          veteransHelped: 10000,
          yearsInBusiness: 5,
          statesLicensed: 1 
        },
        placement: 'benefits',
        animation: 'fade',
        priority: 2
      }
    ]
  },
  
  {
    id: 'credibility',
    name: 'Credibility',
    triggerDepth: 50, // 50% scroll
    triggerTime: 10,
    elements: [
      {
        type: 'testimonial',
        content: {
          preview: true,
          count: 3,
          highlighted: true
        },
        placement: 'process',
        animation: 'fade',
        priority: 1
      },
      {
        type: 'badge',
        content: 'googleReviews',
        placement: 'reviews',
        animation: 'scale',
        priority: 2
      },
      {
        type: 'badge',
        content: 'industryAwards',
        placement: 'education',
        animation: 'fade',
        priority: 3
      }
    ]
  },
  
  {
    id: 'confidence',
    name: 'Confidence',
    triggerDepth: 70, // 70% scroll
    triggerTime: 30,
    elements: [
      {
        type: 'badge',
        content: 'securityCerts',
        placement: 'final-cta',
        animation: 'fade',
        priority: 1
      },
      {
        type: 'message',
        content: '30-Day Satisfaction Guarantee',
        placement: 'final-cta',
        animation: 'slide',
        priority: 1
      },
      {
        type: 'badge',
        content: 'equalHousing',
        placement: 'footer',
        animation: 'none',
        priority: 3
      }
    ]
  }
]

// Badge definitions for progressive display
export const progressiveBadges = {
  bbb: {
    name: 'BBB Accredited',
    rating: 'A+',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#0057A0"/>
      <text x="50" y="50" font-family="Arial" font-size="36" font-weight="bold" 
            text-anchor="middle" fill="white" dy=".3em">BBB</text>
      <text x="50" y="75" font-family="Arial" font-size="14" 
            text-anchor="middle" fill="white">A+ Rated</text>
    </svg>`,
    verifyUrl: 'https://www.bbb.org/us/fl/miami/profile/mortgage-lenders/ultimate-va-loans-0633-123456789',
    size: { width: 100, height: 80 }
  },
  
  googleReviews: {
    name: 'Google Reviews',
    rating: 4.9,
    count: 1247,
    svg: `<svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
      <g transform="scale(0.8)">
        <path d="M50 20 L55 30 L67 30 L57 37 L62 47 L50 40 L38 47 L43 37 L33 30 L45 30 Z" 
              fill="#FBBC04"/>
        <text x="62" y="26" font-family="Arial" font-size="16" font-weight="bold">4.9</text>
      </g>
    </svg>`,
    verifyUrl: 'https://www.google.com/search?q=ultimate+va+loans+reviews',
    size: { width: 120, height: 40 }
  },
  
  industryAwards: {
    name: 'Industry Excellence',
    awards: ['Best VA Lender 2023', 'Top Workplace 2024'],
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#FFD700" stroke="#FFA500" stroke-width="3"/>
      <path d="M50 20 L60 40 L80 40 L65 55 L75 75 L50 60 L25 75 L35 55 L20 40 L40 40 Z" 
            fill="#FFA500"/>
      <text x="50" y="90" font-family="Arial" font-size="10" text-anchor="middle">Excellence</text>
    </svg>`,
    size: { width: 100, height: 100 }
  },
  
  securityCerts: {
    name: 'Security Certifications',
    certs: ['SOC 2 Type II', 'ISO 27001'],
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 10 L80 25 L80 50 C80 70 65 85 50 90 C35 85 20 70 20 50 L20 25 Z" 
            fill="#22C55E" stroke="#16A34A" stroke-width="2"/>
      <path d="M35 50 L45 60 L65 40" stroke="white" stroke-width="4" 
            stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>`,
    size: { width: 90, height: 90 }
  },
  
  equalHousing: {
    name: 'Equal Housing Lender',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="40" width="60" height="40" fill="#003F72"/>
      <polygon points="50,20 80,40 20,40" fill="#003F72"/>
      <rect x="40" y="55" width="20" height="25" fill="white"/>
      <text x="50" y="95" font-family="Arial" font-size="8" text-anchor="middle">EQUAL HOUSING</text>
    </svg>`,
    size: { width: 60, height: 60 }
  }
}

// Helper to get stage by scroll depth and time
export function getCurrentStage(scrollDepth: number, timeOnPage: number): TrustStage | null {
  return trustProgressionStages.find(stage => 
    scrollDepth >= stage.triggerDepth &&
    (!stage.triggerTime || timeOnPage >= stage.triggerTime)
  ) || null
}

// Helper to check if element should be visible
export function shouldShowElement(
  element: TrustElement, 
  currentStage: string, 
  completedStages: string[]
): boolean {
  const stageIndex = trustProgressionStages.findIndex(s => s.id === currentStage)
  const elementStageIndex = trustProgressionStages.findIndex(s => 
    s.elements.some(e => e === element)
  )
  
  return elementStageIndex <= stageIndex || completedStages.includes(currentStage)
}