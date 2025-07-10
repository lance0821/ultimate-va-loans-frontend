'use client'

import { forwardRef, ChangeEvent } from 'react'
import { FormInput, FormInputProps } from './FormInput'

export interface ZipCodeInputProps extends Omit<FormInputProps, 'onChange' | 'type'> {
  onChange?: (value: string) => void
  // TODO: Implement city/state lookup in future
  // onCityStateFound?: (city: string, state: string) => void
}

export const ZipCodeInput = forwardRef<HTMLInputElement, ZipCodeInputProps>(
  ({ onChange, ...props }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/\D/g, '')
      
      // Format ZIP+4
      if (value.length > 5) {
        value = value.slice(0, 5) + '-' + value.slice(5, 9)
      }
      
      e.target.value = value
      onChange?.(value)
      
      // TODO: In production, call an API to get city/state
      // For now, we'll just validate the format
      if (value.length === 5 || value.length === 10) {
        // This would be an API call in production
        // Example: onCityStateFound?.('San Diego', 'CA')
      }
    }
    
    return (
      <FormInput
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="postal-code"
        placeholder="12345"
        maxLength={10}
        onChange={handleChange}
        helperText={props.helperText || "5-digit ZIP or ZIP+4"}
        {...props}
      />
    )
  }
)

ZipCodeInput.displayName = 'ZipCodeInput'