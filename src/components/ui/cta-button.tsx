import * as React from "react"
import { Button, type ButtonProps } from "./button"
import { cn } from "@/lib/utils"
import { Check, AlertCircle, Loader2 } from "lucide-react"

export interface CTAButtonProps extends ButtonProps {
  hierarchy?: "primary" | "secondary" | "tertiary"
  loading?: boolean
  loadingText?: string
  success?: boolean
  successText?: string
  error?: boolean
  errorText?: string
  iconPosition?: "left" | "right"
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ 
    className, 
    hierarchy = "primary", 
    loading = false, 
    loadingText = "Loading...", 
    success = false,
    successText = "Success!",
    error = false,
    errorText = "Try again",
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
        "vh-focus-visible",
        // Mobile touch optimizations
        "touch-target md:touch-auto",
        "-webkit-tap-highlight-color-transparent",
        !loading && "hover:scale-[1.02] active:scale-[0.98]"
      ),
      secondary: cn(
        "min-h-[44px] lg:min-h-[48px]", // Ensure 44px minimum on mobile
        "px-6 lg:px-8",
        "text-sm lg:text-base",
        "font-semibold",
        "border-2",
        "transition-all duration-200",
        "vh-focus-visible",
        // Mobile touch optimizations
        "touch-target md:touch-auto",
        "-webkit-tap-highlight-color-transparent",
        !loading && "active:scale-[0.98]"
      ),
      tertiary: cn(
        "underline",
        "font-medium",
        "p-0",
        "min-h-[44px] md:h-auto", // Ensure 44px minimum on mobile
        "text-primary hover:text-primary/80",
        "transition-colors duration-150",
        "vh-focus-visible",
        // Mobile touch optimizations
        "touch-target md:touch-auto",
        "-webkit-tap-highlight-color-transparent",
        !loading && "active:scale-[0.98]"
      ),
    }

    const getVariant = () => {
      if (hierarchy === "primary") return "default"
      if (hierarchy === "secondary") return "outline"
      return "link"
    }

    const [showSuccess, setShowSuccess] = React.useState(false)

    React.useEffect(() => {
      if (success) {
        setShowSuccess(true)
        const timer = setTimeout(() => setShowSuccess(false), 2000)
        return () => clearTimeout(timer)
      }
    }, [success])

    const getContent = () => {
      if (loading) {
        return (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 cta-spinner" />
            <span>{loadingText || "Loading..."}</span>
          </span>
        )
      }

      if (showSuccess) {
        return (
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span>{successText || "Success!"}</span>
          </span>
        )
      }

      if (error) {
        return (
          <span className="inline-flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{errorText || "Try again"}</span>
          </span>
        )
      }

      // Handle icon positioning for normal state
      if (React.isValidElement(children)) {
        return children
      }

      return <span>{children}</span>
    }

    return (
      <Button
        ref={ref}
        variant={getVariant()}
        hierarchy={hierarchy}
        className={cn(
          hierarchyClasses[hierarchy],
          showSuccess && "cta-success",
          error && "border-destructive text-destructive",
          className
        )}
        disabled={disabled || loading}
        data-loading={loading}
        data-success={showSuccess}
        data-error={error}
        {...props}
      >
        {getContent()}
      </Button>
    )
  }
)
CTAButton.displayName = "CTAButton"

export { CTAButton }