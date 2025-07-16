import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
      hierarchy: {
        primary: "min-h-[48px] lg:min-h-[60px] text-base lg:text-lg font-bold shadow-lg hover:shadow-xl animate-subtle-pulse vh-focus-visible",
        secondary: "min-h-[40px] lg:min-h-[48px] font-semibold vh-focus-visible",
        tertiary: "underline font-medium p-0 h-auto vh-focus-visible",
        default: "", // No additional styles
      },
      touchOptimized: {
        true: "touch-target active:scale-[0.98] transition-transform",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hierarchy: "default",
      touchOptimized: false,
    },
  }
)

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    hierarchy?: "primary" | "secondary" | "tertiary" | "default"
    touchOptimized?: boolean
  }

function Button({
  className,
  variant,
  size,
  hierarchy,
  touchOptimized,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, hierarchy, touchOptimized, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
