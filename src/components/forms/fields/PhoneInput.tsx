'use client'

import { forwardRef } from 'react'
import { PatternFormat } from 'react-number-format'
import { Input } from '@/components/ui/input'

interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  error?: boolean
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, placeholder = '(555) 555-5555', className, error, ...props }, ref) => {
    return (
      <PatternFormat
        format="(###) ###-####"
        mask="_"
        allowEmptyFormatting
        customInput={Input}
        value={value}
        onValueChange={(values) => {
          onChange?.(values.value)
        }}
        placeholder={placeholder}
        className={className}
        data-error={error}
        getInputRef={ref}
        {...props}
      />
    )
  }
)

PhoneInput.displayName = 'PhoneInput'