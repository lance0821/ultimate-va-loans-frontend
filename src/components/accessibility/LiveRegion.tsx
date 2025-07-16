'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface LiveRegionProps {
  children: React.ReactNode;
  mode?: 'polite' | 'assertive' | 'off';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  className?: string;
  visuallyHidden?: boolean;
}

export function LiveRegion({
  children,
  mode = 'polite',
  atomic = true,
  relevant = 'all',
  className,
  visuallyHidden = true,
}: LiveRegionProps) {
  const [announcement, setAnnouncement] = useState<React.ReactNode>('');
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // Delay announcement to ensure screen readers catch it
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setAnnouncement(children);
    }, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [children]);

  return (
    <div
      role={mode === 'off' ? undefined : 'status'}
      aria-live={mode}
      aria-atomic={atomic}
      aria-relevant={relevant}
      className={cn(
        visuallyHidden && 'sr-only',
        className
      )}
    >
      {announcement}
    </div>
  );
}

// Hook for programmatic announcements
export function useAnnouncer() {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'polite' | 'assertive'>('polite');

  const announce = (text: string, mode: 'polite' | 'assertive' = 'polite') => {
    setPriority(mode);
    setMessage(''); // Clear first to ensure change
    setTimeout(() => setMessage(text), 100);
  };

  const Announcer = () => (
    <LiveRegion mode={priority} visuallyHidden>
      {message}
    </LiveRegion>
  );

  return { announce, Announcer };
}