import { isValidPhoneNumber, AsYouType } from 'libphonenumber-js'
import * as EmailValidator from 'email-validator'

// Email validation
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email) {
    return { isValid: false, error: 'Email is required' }
  }
  
  // Basic format check
  if (!EmailValidator.validate(email)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }
  
  // Check for common typos
  const commonTypos = [
    { pattern: /@gmial\.com$/, suggestion: '@gmail.com' },
    { pattern: /@gmai\.com$/, suggestion: '@gmail.com' },
    { pattern: /@yahooo\.com$/, suggestion: '@yahoo.com' },
    { pattern: /@hotmial\.com$/, suggestion: '@hotmail.com' },
    { pattern: /@outlok\.com$/, suggestion: '@outlook.com' },
  ]
  
  for (const typo of commonTypos) {
    if (typo.pattern.test(email)) {
      return { 
        isValid: false, 
        error: `Did you mean ${email.replace(typo.pattern, typo.suggestion)}?` 
      }
    }
  }
  
  return { isValid: true }
}

// Phone validation and formatting
export function formatPhoneNumber(value: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '')
  
  // Use libphonenumber-js for formatting
  const formatter = new AsYouType('US')
  return formatter.input(digits)
}

export function validatePhoneNumber(phone: string): { isValid: boolean; error?: string } {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' }
  }
  
  // Remove formatting for validation
  const digits = phone.replace(/\D/g, '')
  
  // Check length
  if (digits.length < 10) {
    return { isValid: false, error: 'Phone number must be 10 digits' }
  }
  
  // Validate using libphonenumber-js
  try {
    if (!isValidPhoneNumber(digits, 'US')) {
      return { isValid: false, error: 'Please enter a valid US phone number' }
    }
  } catch {
    return { isValid: false, error: 'Invalid phone number format' }
  }
  
  return { isValid: true }
}

// ZIP code validation
export function validateZipCode(zip: string): { isValid: boolean; error?: string } {
  if (!zip) {
    return { isValid: false, error: 'ZIP code is required' }
  }
  
  // Check format (5 digits or ZIP+4)
  const zipRegex = /^\d{5}(-\d{4})?$/
  if (!zipRegex.test(zip)) {
    return { isValid: false, error: 'Please enter a valid ZIP code (12345 or 12345-6789)' }
  }
  
  return { isValid: true }
}

// Generic validators
export function validateRequired(value: unknown, fieldName: string): { isValid: boolean; error?: string } {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return { isValid: false, error: `${fieldName} is required` }
  }
  return { isValid: true }
}

export function validateMinLength(value: string, minLength: number, fieldName: string): { isValid: boolean; error?: string } {
  if (!value || value.length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` }
  }
  return { isValid: true }
}

export function validateMaxLength(value: string, maxLength: number, fieldName: string): { isValid: boolean; error?: string } {
  if (value && value.length > maxLength) {
    return { isValid: false, error: `${fieldName} must be no more than ${maxLength} characters` }
  }
  return { isValid: true }
}

export function validateMinValue(value: number, min: number, fieldName: string): { isValid: boolean; error?: string } {
  if (value < min) {
    return { isValid: false, error: `${fieldName} must be at least ${min}` }
  }
  return { isValid: true }
}

export function validateMaxValue(value: number, max: number, fieldName: string): { isValid: boolean; error?: string } {
  if (value > max) {
    return { isValid: false, error: `${fieldName} must be no more than ${max}` }
  }
  return { isValid: true }
}

// Sanitization
export function sanitizeInput(value: string): string {
  // Remove potential XSS attempts
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim()
}

// Debounce function for preventing duplicate submissions
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      func(...args)
    }, wait)
  }
}