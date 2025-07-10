import { trackEvent } from './gtag';

// Form Events
export const trackFormStart = (formType: string) => {
  trackEvent('form_start', {
    form_type: formType,
    event_category: 'engagement',
  });
};

export const trackFormSubmit = (formType: string, step?: number) => {
  trackEvent('form_submit', {
    form_type: formType,
    step: step,
    event_category: 'conversion',
  });
};

export const trackFormStep = (formType: string, step: number) => {
  trackEvent('form_step', {
    form_type: formType,
    step: step,
    event_category: 'engagement',
  });
};

// Calculator Events
export const trackCalculatorUsed = (calculatorType: string, result?: number) => {
  trackEvent('calculator_used', {
    calculator_type: calculatorType,
    result: result,
    event_category: 'engagement',
  });
};

// Navigation Events
export const trackNavigation = (linkText: string, destination: string) => {
  trackEvent('navigation_click', {
    link_text: linkText,
    destination: destination,
    event_category: 'engagement',
  });
};

// CTA Events
export const trackCTAClick = (ctaText: string, location: string) => {
  trackEvent('cta_click', {
    cta_text: ctaText,
    location: location,
    event_category: 'engagement',
  });
};