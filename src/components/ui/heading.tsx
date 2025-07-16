import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const headingVariants = cva(
  "text-foreground",
  {
    variants: {
      level: {
        h1: "vh-hero-title",
        h2: "vh-section-title", 
        h3: "vh-subsection-title",
        h4: "vh-card-title",
        h5: "vh-body-emphasis",
        h6: "text-base font-semibold",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      weight: {
        primary: "vh-primary",
        secondary: "vh-secondary",
        tertiary: "vh-tertiary",
      },
    },
    defaultVariants: {
      level: "h2",
      align: "left",
      weight: "primary",
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  children: React.ReactNode
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, align, weight, as, children, ...props }, ref) => {
    const Component = as || level || "h2"
    
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level, align, weight }), className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }