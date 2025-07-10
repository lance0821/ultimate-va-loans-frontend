import { useState, useCallback } from 'react'
import { z } from 'zod'

interface ValidationState {
  errors: Record<string, string>
  touched: Record<string, boolean>
  isValidating: Record<string, boolean>
}

interface UseFormValidationOptions {
  mode?: 'onChange' | 'onBlur' | 'onSubmit'
  revalidateMode?: 'onChange' | 'onBlur' | 'onSubmit'
  debounceMs?: number
}

export function useFormValidation<T extends z.ZodSchema>(
  schema: T,
  options: UseFormValidationOptions = {}
) {
  const { mode = 'onBlur', revalidateMode = 'onChange', debounceMs = 300 } = options
  
  const [validationState, setValidationState] = useState<ValidationState>({
    errors: {},
    touched: {},
    isValidating: {},
  })
  
  // Validate a single field
  const validateField = useCallback(
    async (name: string, value: unknown) => {
      setValidationState((prev) => ({
        ...prev,
        isValidating: { ...prev.isValidating, [name]: true },
      }))
      
      try {
        // Extract the field schema if possible
        if (schema instanceof z.ZodObject) {
          const fieldSchema = schema.shape[name]
          if (fieldSchema) {
            await fieldSchema.parseAsync(value)
          }
        }
        
        // Clear error if validation passes
        setValidationState((prev) => ({
          ...prev,
          errors: { ...prev.errors, [name]: '' },
          isValidating: { ...prev.isValidating, [name]: false },
        }))
        
        return true
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.issues[0]?.message || 'Invalid value'
          setValidationState((prev) => ({
            ...prev,
            errors: { ...prev.errors, [name]: fieldError },
            isValidating: { ...prev.isValidating, [name]: false },
          }))
        }
        return false
      }
    },
    [schema]
  )
  
  // Debounced validation for onChange
  const debouncedValidateField = useCallback(
    (name: string, value: unknown) => {
      const timeoutId = setTimeout(() => validateField(name, value), debounceMs)
      return () => clearTimeout(timeoutId)
    },
    [validateField, debounceMs]
  )
  
  // Validate entire form
  const validateForm = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        await schema.parseAsync(data)
        setValidationState((prev) => ({
          ...prev,
          errors: {},
        }))
        return true
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: Record<string, string> = {}
          error.issues.forEach((err) => {
            const path = err.path.join('.')
            if (path && !errors[path]) {
              errors[path] = err.message
            }
          })
          setValidationState((prev) => ({
            ...prev,
            errors,
          }))
        }
        return false
      }
    },
    [schema]
  )
  
  // Handle field blur
  const handleBlur = useCallback(
    (name: string) => {
      setValidationState((prev) => ({
        ...prev,
        touched: { ...prev.touched, [name]: true },
      }))
      
      if (mode === 'onBlur' || (revalidateMode === 'onBlur' && validationState.touched[name])) {
        return (value: unknown) => validateField(name, value)
      }
    },
    [mode, revalidateMode, validateField, validationState.touched]
  )
  
  // Handle field change
  const handleChange = useCallback(
    (name: string) => {
      if (mode === 'onChange' || (revalidateMode === 'onChange' && validationState.touched[name])) {
        return (value: unknown) => debouncedValidateField(name, value)
      }
    },
    [mode, revalidateMode, debouncedValidateField, validationState.touched]
  )
  
  // Get error for a specific field
  const getFieldError = useCallback(
    (name: string) => {
      return validationState.touched[name] ? validationState.errors[name] : undefined
    },
    [validationState.errors, validationState.touched]
  )
  
  // Check if field is valid
  const isFieldValid = useCallback(
    (name: string) => {
      return validationState.touched[name] && !validationState.errors[name]
    },
    [validationState.errors, validationState.touched]
  )
  
  // Clear errors
  const clearErrors = useCallback((fields?: string[]) => {
    setValidationState((prev) => {
      if (fields) {
        const errors = { ...prev.errors }
        fields.forEach((field) => delete errors[field])
        return { ...prev, errors }
      }
      return { ...prev, errors: {} }
    })
  }, [])
  
  // Reset validation state
  const reset = useCallback(() => {
    setValidationState({
      errors: {},
      touched: {},
      isValidating: {},
    })
  }, [])
  
  return {
    errors: validationState.errors,
    touched: validationState.touched,
    isValidating: validationState.isValidating,
    validateField,
    validateForm,
    handleBlur,
    handleChange,
    getFieldError,
    isFieldValid,
    clearErrors,
    reset,
  }
}