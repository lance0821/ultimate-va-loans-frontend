'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics/gtag';

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookie-consent') === 'true';
    if (hasConsented) {
      trackPageView(pathname);
    }
  }, [pathname]);
}