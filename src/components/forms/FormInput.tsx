'use client'

import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  touched?: boolean
  required?: boolean
  showValidation?: boolean
  helperText?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, touched, required, showValidation = true, helperText, className, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`
    
    const hasError = touched && error
    const isValid = touched && !error && props.value
    
    return (
      <div className="space-y-2">
        <Label htmlFor={fieldId} className="flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
        
        <div className="relative">
          <Input
            ref={ref}
            id={fieldId}
            className={cn(
              'transition-all duration-200',
              hasError && 'border-red-500 focus:ring-red-500',
              isValid && showValidation && 'border-green-500 focus:ring-green-500',
              isFocused && 'ring-2 ring-offset-2',
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-invalid={hasError ? 'true' : undefined}
            aria-describedby={hasError ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
            {...props}
          />
          
          {showValidation && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {hasError && (
                <AlertCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
              )}
              {isValid && (
                <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden="true" />
              )}
            </div>
          )}
        </div>
        
        {helperText && !hasError && (
          <p id={`${fieldId}-helper`} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
        
        {hasError && (
          <p
            id={`${fieldId}-error`}
            className="text-sm text-red-500 animate-in fade-in slide-in-from-top-1"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'