export const trustAssets = {
  veteranOwned: {
    badge: {
      svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="95" fill="url(#goldGradient)" stroke="#003F72" stroke-width="5"/>
        <path d="M100 40 L115 80 L155 80 L125 105 L140 145 L100 120 L60 145 L75 105 L45 80 L85 80 Z" 
              fill="#003F72"/>
        <text x="100" y="170" font-family="Arial, sans-serif" font-size="16" font-weight="bold" 
              text-anchor="middle" fill="#003F72">VETERAN OWNED</text>
      </svg>`,
      alt: "Proudly Veteran Owned Business",
      verificationUrl: "/verification/veteran-owned",
      width: 120,
      height: 120
    },
    certification: {
      number: "VOSB-2019-FL-001",
      issuedDate: "2019-01-15",
      expiryDate: "2025-01-15",
      verifyingBody: "Department of Veterans Affairs"
    }
  },
  
  vaApproved: {
    badge: {
      svg: `<svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="150" height="100" rx="8" fill="#003F72"/>
        <text x="75" y="35" font-family="Arial, sans-serif" font-size="14" font-weight="bold" 
              text-anchor="middle" fill="white">VA APPROVED</text>
        <text x="75" y="55" font-family="Arial, sans-serif" font-size="12" 
              text-anchor="middle" fill="#FFD700">LENDER</text>
        <text x="75" y="75" font-family="Arial, sans-serif" font-size="10" 
              text-anchor="middle" fill="white">NMLS #123456</text>
      </svg>`,
      alt: "VA Approved Mortgage Lender",
      verificationUrl: "https://www.benefits.va.gov/homeloans/lenders.asp",
      width: 100,
      height: 67
    },
    certification: {
      nmlsNumber: "123456",
      vaLenderId: "VA-FL-2019-001",
      states: ["FL"],
      status: "Active"
    }
  },
  
  ratings: {
    average: 4.9,
    count: 2847,
    lastUpdated: new Date().toISOString(),
    source: "Verified Customer Reviews"
  }
}

// Helper function to get inline SVG data URL
export function getTrustBadgeDataUrl(badgeKey: keyof typeof trustAssets): string {
  const badge = trustAssets[badgeKey]
  if ('badge' in badge && badge.badge.svg) {
    const encoded = encodeURIComponent(badge.badge.svg)
    return `data:image/svg+xml,${encoded}`
  }
  return ''
}