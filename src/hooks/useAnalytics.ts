'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, trackEvent as gtagTrackEvent } from '@/lib/analytics/gtag';

interface TrackEventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
}

interface CTAEventParams {
  action: 'click' | 'impression';
  category: string;
  label: string;
  value?: number;
  position?: string;
  variant?: string;
  clickCount?: number;
}

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookie-consent') === 'true';
    if (hasConsented) {
      trackPageView(pathname);
    }
  }, [pathname]);

  const trackEvent = useCallback((params: TrackEventParams) => {
    const hasConsented = localStorage.getItem('cookie-consent') === 'true';
    if (hasConsented) {
      gtagTrackEvent(params.action, {
        event_category: params.category,
        event_label: params.label,
        value: params.value,
        ...params.custom_parameters
      });
    }
  }, []);

  const trackCTAEvent = useCallback((params: CTAEventParams) => {
    const hasConsented = localStorage.getItem('cookie-consent') === 'true';
    if (hasConsented) {
      const eventName = `cta_${params.action}`;
      gtagTrackEvent(eventName, {
        event_category: params.category,
        event_label: params.label,
        value: params.value,
        cta_position: params.position,
        cta_variant: params.variant,
        click_count: params.clickCount,
        timestamp: new Date().toISOString(),
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        scroll_depth: Math.round((window.scrollY / document.documentElement.scrollHeight) * 100)
      });
    }
  }, []);

  return {
    trackEvent,
    trackCTAEvent
  };
}