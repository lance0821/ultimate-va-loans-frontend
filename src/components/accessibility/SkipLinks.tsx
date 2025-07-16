'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkipLink {
  href: string;
  label: string;
}

const skipLinks: SkipLink[] = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#main-navigation', label: 'Skip to navigation' },
  { href: '#calculator', label: 'Skip to calculator' },
  { href: '#footer', label: 'Skip to footer' },
];

export function SkipLinks() {
  return (
    <div className="skip-links" role="navigation" aria-label="Skip links">
      {skipLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={cn(
            'skip-link',
            'absolute left-0 top-0 z-[100]',
            'bg-primary text-primary-foreground',
            'px-4 py-2 rounded-md',
            'transform -translate-y-full',
            'focus:translate-y-0',
            'transition-transform duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          )}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}