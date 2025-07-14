import * as React from "react"
import { Button, type ButtonProps } from "./button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface CTAButtonProps extends ButtonProps {
  hierarchy?: "primary" | "secondary" | "tertiary"
  loading?: boolean
  loadingText?: string
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ 
    className, 
    hierarchy = "primary", 
    loading = false, 
    loadingText = "Loading...", 
    children, 
    disabled,
    ...props 
  }, ref) => {
    const hierarchyClasses = {
      primary: cn(
        "min-h-[48px] lg:min-h-[60px]",
        "px-8 lg:px-12",
        "text-base lg:text-lg",
        "font-bold",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300",
        "animate-subtle-pulse",
        "vh-focus-visible"
      ),
      secondary: cn(
        "min-h-[40px] lg:min-h-[48px]",
        "px-6 lg:px-8",
        "text-sm lg:text-base",
        "font-semibold",
        "border-2",
        "transition-all duration-200",
        "vh-focus-visible"
      ),
      tertiary: cn(
        "underline",
        "font-medium",
        "p-0",
        "h-auto",
        "text-primary hover:text-primary/80",
        "transition-colors duration-150",
        "vh-focus-visible"
      ),
    }

    const getVariant = () => {
      if (hierarchy === "primary") return "default"
      if (hierarchy === "secondary") return "outline"
      return "link"
    }

    return (
      <Button
        ref={ref}
        variant={getVariant()}
        className={cn(hierarchyClasses[hierarchy], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </Button>
    )
  }
)
CTAButton.displayName = "CTAButton"

export { CTAButton }