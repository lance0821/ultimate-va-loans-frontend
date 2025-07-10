// Google Analytics 4 configuration
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) return;
  
  window.gtag = function(...args: unknown[]) {
    (window as unknown as { dataLayer: unknown[] }).dataLayer = (window as unknown as { dataLayer: unknown[] }).dataLayer || [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push(args);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // Manual page view tracking
    cookie_flags: 'SameSite=None;Secure',
  });
};

// Track page views
export const trackPageView = (url: string) => {
  if (!GA_MEASUREMENT_ID) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  if (!GA_MEASUREMENT_ID) return;
  
  window.gtag('event', eventName, parameters);
};