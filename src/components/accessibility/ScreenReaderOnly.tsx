import React from 'react';
import { cn } from '@/lib/utils';

interface ScreenReaderOnlyProps {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export function ScreenReaderOnly({
  as: Component = 'span',
  children,
  className,
}: ScreenReaderOnlyProps) {
  return (
    <Component
      className={cn(
        'sr-only',
        // More robust than just using sr-only
        'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
        className
      )}
    >
      {children}
    </Component>
  );
}

// Convenience component for live announcements
export function ScreenReaderAnnouncement({
  children,
  priority = 'polite',
}: {
  children: React.ReactNode;
  priority?: 'polite' | 'assertive';
}) {
  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  );
}