'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Badge } from "@/components/ui/badge"
import { Text } from "@/components/ui/typography"

interface ContentCardProps {
  title: string
  description?: string
  badge?: string
  icon?: React.ReactNode
  children?: React.ReactNode
  action?: React.ReactNode
  highlight?: boolean
  className?: string
}

export function ContentCard({
  title,
  description,
  badge,
  icon,
  children,
  action,
  highlight = false,
  className
}: ContentCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all",
      highlight && "ring-2 ring-primary shadow-lg",
      "hover:shadow-md",
      className
    )}>
      {/* Highlight indicator */}
      {highlight && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-400" />
      )}
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {icon && (
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-2">
              <Heading as="h3" level="h4" className="line-clamp-2">
                {title}
              </Heading>
              
              {badge && (
                <Badge variant="secondary" className="flex-shrink-0">
                  {badge}
                </Badge>
              )}
            </div>
            
            {description && (
              <Text color="muted" className="line-clamp-2">
                {description}
              </Text>
            )}
          </div>
        </div>
        
        {/* Content */}
        {children && (
          <div className="mt-4 pt-4 border-t">
            {children}
          </div>
        )}
        
        {/* Action */}
        {action && (
          <div className="mt-4 pt-4 border-t">
            {action}
          </div>
        )}
      </div>
    </Card>
  )
}

// Grid of content cards
export function ContentCardGrid({
  cards,
  columns = 3,
  className
}: {
  cards: ContentCardProps[]
  columns?: 2 | 3 | 4
  className?: string
}) {
  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }
  
  return (
    <div className={cn(
      "grid gap-6",
      columnClasses[columns],
      className
    )}>
      {cards.map((card, index) => (
        <ContentCard key={index} {...card} />
      ))}
    </div>
  )
}