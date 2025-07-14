import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const sectionVariants = cva(
  "w-full transition-all duration-300",
  {
    variants: {
      spacing: {
        default: "vh-section-padding",
        compact: "vh-section-padding-compact",
        none: "",
      },
      background: {
        default: "bg-background",
        alt: "vh-section-alt",
        primary: "bg-primary text-primary-foreground",
        muted: "bg-muted",
        gradient: "bg-gradient-to-br from-primary/5 to-primary/10",
      },
      divider: {
        none: "",
        subtle: "vh-section-divider",
        strong: "border-b-2 border-border",
      },
    },
    defaultVariants: {
      spacing: "default",
      background: "default",
      divider: "none",
    },
  }
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: "section" | "div" | "article"
  children: React.ReactNode
}

function Section({ className, spacing, background, divider, as = "section", children, ...props }: SectionProps) {
  const Component = as
  
  return (
    <Component
      className={cn(sectionVariants({ spacing, background, divider }), className)}
      {...props}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </Component>
  )
}
Section.displayName = "Section"

export { Section, sectionVariants }