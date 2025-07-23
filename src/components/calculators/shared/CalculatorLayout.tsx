'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CalculatorLayoutProps {
  title: string
  description: string
  children: ReactNode
  className?: string
}

export function CalculatorLayout({
  title,
  description,
  children,
  className,
}: CalculatorLayoutProps) {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

interface CalculatorSectionProps {
  title?: string
  children: ReactNode
  className?: string
}

export function CalculatorSection({
  title,
  children,
  className,
}: CalculatorSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {title && (
        <h3 className="text-lg font-semibold">{title}</h3>
      )}
      {children}
    </div>
  )
}