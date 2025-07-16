export interface ResourcePriority {
  critical: string[];
  high: string[];
  medium: string[];
  low: string[];
}

// Define resource loading priorities based on visual hierarchy
export const resourcePriorities: ResourcePriority = {
  critical: [
    // Phase 0: 0-0.5s
    'hero-headline',
    'hero-subheadline', 
    'primary-cta',
    'navigation',
  ],
  high: [
    // Phase 1: 0.5-1.5s
    'hero-image',
    'trust-badges',
    'above-fold-fonts',
  ],
  medium: [
    // Phase 2: 1.5-2.5s
    'benefits-grid',
    'statistics',
    'calculator-preview',
  ],
  low: [
    // Phase 3: 2.5s+
    'testimonials',
    'footer',
    'analytics',
    'third-party',
  ],
};

// Generate resource hints for <head>
export function generateResourceHints(): string {
  const hints: string[] = [];

  // Preconnect to required origins
  hints.push('<link rel="preconnect" href="https://fonts.googleapis.com">');
  
  // DNS prefetch for lower priority resources
  hints.push('<link rel="dns-prefetch" href="https://www.google-analytics.com">');
  
  // Preload critical resources
  hints.push('<link rel="preload" as="font" href="/fonts/va-sans-subset.woff2" crossorigin>');
  
  return hints.join('\n');
}

// Get loading priority for a component
export function getLoadingPhase(componentName: string): 0 | 1 | 2 | 3 {
  const priorities = resourcePriorities;
  
  if (priorities.critical.includes(componentName)) return 0;
  if (priorities.high.includes(componentName)) return 1;
  if (priorities.medium.includes(componentName)) return 2;
  return 3;
}