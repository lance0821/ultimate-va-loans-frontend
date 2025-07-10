'use client'

import { forwardRef, ChangeEvent } from 'react'
import { formatPhoneNumber } from '@/lib/utils/validation'
import { FormInput, FormInputProps } from './FormInput'

export interface PhoneInputProps extends Omit<FormInputProps, 'onChange' | 'type'> {
  onChange?: (value: string) => void
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ onChange, ...props }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value)
      e.target.value = formatted
      onChange?.(formatted)
    }
    
    return (
      <FormInput
        ref={ref}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="(555) 123-4567"
        onChange={handleChange}
        helperText={props.helperText || "US phone numbers only"}
        {...props}
      />
    )
  }
)

PhoneInput.displayName = 'PhoneInput'