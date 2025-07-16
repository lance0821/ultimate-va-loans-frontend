'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { CTAButton, type CTAButtonProps } from './cta-button'

interface CTAStackProps {
  children: React.ReactNode
  className?: string
  direction?: 'horizontal' | 'vertical'
  align?: 'start' | 'center' | 'end'
  spacing?: 'sm' | 'md' | 'lg'
  mobileStack?: boolean
}

export function CTAStack({
  children,
  className,
  direction = 'horizontal',
  align = 'start',
  spacing = 'md',
  mobileStack = true
}: CTAStackProps) {
  const spacingClasses = {
    sm: 'gap-2',
    md: 'gap-4', 
    lg: 'gap-6'
  }

  const alignClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end'
  }

  return (
    <div
      className={cn(
        'cta-stack',
        direction === 'vertical' && 'cta-stack-vertical',
        !mobileStack && 'cta-stack-no-mobile-stack',
        spacingClasses[spacing],
        alignClasses[align],
        className
      )}
    >
      {children}
    </div>
  )
}

// Predefined CTA patterns for consistency
interface CTAPatternProps {
  primary: {
    text: string
    href?: string
    onClick?: () => void
  } & Omit<CTAButtonProps, 'hierarchy' | 'children'>
  secondary?: {
    text: string
    href?: string
    onClick?: () => void
  } & Omit<CTAButtonProps, 'hierarchy' | 'children'>
  tertiary?: {
    text: string
    href?: string
    onClick?: () => void
  } & Omit<CTAButtonProps, 'hierarchy' | 'children'>
  pattern?: 'inline' | 'stacked' | 'split'
  trackingCategory?: string
}

export function CTAPattern({
  primary,
  secondary,
  tertiary,
  pattern = 'inline',
  trackingCategory = 'cta_pattern'
}: CTAPatternProps) {
  // Split pattern: Primary on left, secondary/tertiary on right
  if (pattern === 'split' && secondary) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <CTAButton 
          hierarchy="primary"
          className="flex-1 cta-primary-enhanced"
          data-tracking-category={trackingCategory}
          data-tracking-label={`Primary - ${primary.text}`}
          {...primary}
        >
          {primary.text}
        </CTAButton>
        <div className="flex gap-2 flex-1">
          {secondary && (
            <CTAButton 
              hierarchy="secondary"
              className="flex-1 cta-secondary-enhanced"
              data-tracking-category={trackingCategory}
              data-tracking-label={`Secondary - ${secondary.text}`}
              {...secondary}
            >
              {secondary.text}
            </CTAButton>
          )}
          {tertiary && (
            <CTAButton 
              hierarchy="tertiary"
              className="cta-tertiary-enhanced"
              data-tracking-category={trackingCategory}
              data-tracking-label={`Tertiary - ${tertiary.text}`}
              {...tertiary}
            >
              {tertiary.text}
            </CTAButton>
          )}
        </div>
      </div>
    )
  }

  // Stacked pattern: All CTAs vertical
  if (pattern === 'stacked') {
    return (
      <CTAStack direction="vertical" align="center">
        <CTAButton 
          hierarchy="primary"
          className="w-full sm:w-auto cta-primary-enhanced"
          data-tracking-category={trackingCategory}
          data-tracking-label={`Primary - ${primary.text}`}
          {...primary}
        >
          {primary.text}
        </CTAButton>
        {secondary && (
          <CTAButton 
            hierarchy="secondary"
            className="w-full sm:w-auto cta-secondary-enhanced"
            data-tracking-category={trackingCategory}
            data-tracking-label={`Secondary - ${secondary.text}`}
            {...secondary}
          >
            {secondary.text}
          </CTAButton>
        )}
        {tertiary && (
          <CTAButton 
            hierarchy="tertiary"
            className="cta-tertiary-enhanced"
            data-tracking-category={trackingCategory}
            data-tracking-label={`Tertiary - ${tertiary.text}`}
            {...tertiary}
          >
            {tertiary.text}
          </CTAButton>
        )}
      </CTAStack>
    )
  }

  // Default inline pattern
  return (
    <CTAStack align="center">
      <CTAButton 
        hierarchy="primary"
        className="cta-primary-enhanced"
        data-tracking-category={trackingCategory}
        data-tracking-label={`Primary - ${primary.text}`}
        {...primary}
      >
        {primary.text}
      </CTAButton>
      {secondary && (
        <CTAButton 
          hierarchy="secondary"
          className="cta-secondary-enhanced"
          data-tracking-category={trackingCategory}
          data-tracking-label={`Secondary - ${secondary.text}`}
          {...secondary}
        >
          {secondary.text}
        </CTAButton>
      )}
      {tertiary && (
        <CTAButton 
          hierarchy="tertiary"
          className="cta-tertiary-enhanced"
          data-tracking-category={trackingCategory}
          data-tracking-label={`Tertiary - ${tertiary.text}`}
          {...tertiary}
        >
          {tertiary.text}
        </CTAButton>
      )}
    </CTAStack>
  )
}