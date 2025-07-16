export const typographyScale = {
  // Desktop scale
  desktop: {
    h1: { size: '3rem', lineHeight: 1.2, weight: 800 },      // 48px
    h2: { size: '2.25rem', lineHeight: 1.3, weight: 700 },   // 36px
    h3: { size: '1.5rem', lineHeight: 1.4, weight: 600 },    // 24px
    h4: { size: '1.25rem', lineHeight: 1.5, weight: 600 },   // 20px
    h5: { size: '1.125rem', lineHeight: 1.5, weight: 500 },  // 18px
    h6: { size: '1rem', lineHeight: 1.6, weight: 500 },      // 16px
    
    bodyLarge: { size: '1.125rem', lineHeight: 1.7 },        // 18px
    body: { size: '1rem', lineHeight: 1.7 },                 // 16px
    bodySmall: { size: '0.875rem', lineHeight: 1.6 },        // 14px
    
    stat: { size: '2.5rem', lineHeight: 1.1, weight: 800 },  // 40px
    quote: { size: '1.25rem', lineHeight: 1.6, weight: 400 } // 20px
  },
  
  // Mobile scale
  mobile: {
    h1: { size: '2rem', lineHeight: 1.2, weight: 800 },      // 32px
    h2: { size: '1.5rem', lineHeight: 1.3, weight: 700 },    // 24px
    h3: { size: '1.25rem', lineHeight: 1.4, weight: 600 },   // 20px
    h4: { size: '1.125rem', lineHeight: 1.5, weight: 600 },  // 18px
    h5: { size: '1rem', lineHeight: 1.5, weight: 500 },      // 16px
    h6: { size: '0.875rem', lineHeight: 1.6, weight: 500 },  // 14px
    
    bodyLarge: { size: '1.125rem', lineHeight: 1.7 },        // 18px
    body: { size: '1rem', lineHeight: 1.7 },                 // 16px (minimum)
    bodySmall: { size: '0.875rem', lineHeight: 1.6 },        // 14px
    
    stat: { size: '1.75rem', lineHeight: 1.1, weight: 800 }, // 28px
    quote: { size: '1.125rem', lineHeight: 1.6, weight: 400 } // 18px
  }
}

export const readabilityRules = {
  // Paragraph constraints
  paragraph: {
    maxWords: 75,
    maxLines: {
      desktop: 4,
      mobile: 5
    },
    idealLineLength: {
      min: 65, // characters
      max: 75  // characters
    }
  },
  
  // Sentence structure
  sentence: {
    averageWords: 15,
    maxWords: 20
  },
  
  // Content sections
  section: {
    paragraphsBetweenHeadings: 3,
    minWhiteSpace: '2rem'
  },
  
  // List formatting
  list: {
    idealItems: { min: 3, max: 7 },
    maxWordsPerItem: 10
  }
}

export const emphasisPatterns = {
  high: {
    weight: 700,
    color: 'primary',
    transform: 'none'
  },
  medium: {
    weight: 600,
    color: 'foreground',
    transform: 'none'
  },
  highlight: {
    weight: 'inherit',
    color: 'inherit',
    background: 'linear-gradient(transparent 60%, var(--color-va-gold) 60%)'
  },
  stat: {
    weight: 800,
    color: 'primary',
    size: '2.5em'
  }
}