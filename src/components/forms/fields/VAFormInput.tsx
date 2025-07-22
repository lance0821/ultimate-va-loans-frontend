'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { useFormField } from '@/components/ui/form'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export interface VAFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showSuccess?: boolean
  loading?: boolean
  formatOnBlur?: (value: string) => string
  icon?: React.ReactNode
}

export const VAFormInput = React.forwardRef<HTMLInputElement, VAFormInputProps>(
  ({ className, showSuccess = true, loading, formatOnBlur, icon, ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
    const [value, setValue] = React.useState(props.value || props.defaultValue || '')
    const [touched, setTouched] = React.useState(false)
    
    const hasError = !!error
    const isValid = touched && !error && value && showSuccess
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setTouched(true)
      if (formatOnBlur) {
        const formatted = formatOnBlur(e.target.value)
        setValue(formatted)
        e.target.value = formatted
      }
      props.onBlur?.(e)
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
      props.onChange?.(e)
    }
    
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <Input
          ref={ref}
          id={formItemId}
          aria-describedby={
            !error
              ? `${formDescriptionId}`
              : `${formDescriptionId} ${formMessageId}`
          }
          aria-invalid={!!error}
          className={cn(
            'transition-all duration-200',
            // Error state
            hasError && 'border-destructive focus-visible:ring-destructive',
            // Success state
            isValid && 'border-green-500 focus-visible:ring-green-500',
            // Icon padding
            icon && 'pl-10',
            // Mobile optimization - larger touch target
            'min-h-[44px] text-base sm:text-sm',
            className
          )}
          {...props}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {/* Status icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {loading && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          )}
          {!loading && hasError && (
            <AlertCircle className="h-4 w-4 text-destructive" aria-hidden="true" />
          )}
          {!loading && isValid && (
            <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden="true" />
          )}
        </div>
      </div>
    )
  }
)

VAFormInput.displayName = 'VAFormInput'