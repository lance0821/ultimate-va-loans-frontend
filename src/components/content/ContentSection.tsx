'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/typography"
import { VisualBreak } from "./VisualBreak"

interface ContentSectionProps {
  title?: string
  subtitle?: string
  eyebrow?: string
  children: React.ReactNode
  className?: string
  spacing?: "tight" | "normal" | "loose"
  divider?: "none" | "line" | "dots" | "gradient"
  pattern?: "default" | "highlight" | "alternate"
  id?: string
}

export function ContentSection({
  title,
  subtitle,
  eyebrow,
  children,
  className,
  spacing = "normal",
  divider = "none",
  pattern = "default",
  id
}: ContentSectionProps) {
  const spacingClasses = {
    tight: "py-8 md:py-12",
    normal: "py-12 md:py-16",
    loose: "py-16 md:py-24"
  }
  
  const patternClasses = {
    default: "",
    highlight: "bg-gray-50 rounded-xl p-8 md:p-12",
    alternate: "relative pl-6 md:pl-8 border-l-4 border-primary/20"
  }
  
  return (
    <>
      <section
        id={id}
        className={cn(
          "content-section",
          spacingClasses[spacing],
          patternClasses[pattern],
          className
        )}
      >
        {(eyebrow || title || subtitle) && (
          <header className="mb-8 md:mb-12">
            {eyebrow && (
              <Text 
                size="small" 
                weight="semibold" 
                color="primary"
                className="uppercase tracking-wider mb-2"
              >
                {eyebrow}
              </Text>
            )}
            
            {title && (
              <Heading 
                as="h2" 
                level="h2"
                className="mb-4"
              >
                {title}
              </Heading>
            )}
            
            {subtitle && (
              <Text 
                size="large" 
                color="muted"
                className="max-w-3xl"
              >
                {subtitle}
              </Text>
            )}
          </header>
        )}
        
        <div className="content-prose">
          {children}
        </div>
      </section>
      
      {divider !== "none" && (
        <VisualBreak type={divider} className="my-8 md:my-12" />
      )}
    </>
  )
}

// Sub-components for content structure
export function ContentGrid({ 
  children, 
  columns = 2,
  className 
}: { 
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string 
}) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }
  
  return (
    <div className={cn(
      "grid gap-6 md:gap-8",
      columnClasses[columns],
      className
    )}>
      {children}
    </div>
  )
}

export function ContentAside({ 
  children,
  position = "right",
  className 
}: { 
  children: React.ReactNode
  position?: "left" | "right"
  className?: string
}) {
  return (
    <div className={cn(
      "lg:float-right lg:w-1/3 lg:ml-8 mb-6",
      position === "left" && "lg:float-left lg:ml-0 lg:mr-8",
      "p-6 bg-primary/5 rounded-lg border border-primary/20",
      className
    )}>
      {children}
    </div>
  )
}