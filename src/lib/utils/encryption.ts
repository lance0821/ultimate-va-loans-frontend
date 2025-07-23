import CryptoJS from 'crypto-js'

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'dev-key-change-in-prod'

export function encryptPII(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString()
}

export function decryptPII(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

interface FormDataWithSensitiveFields {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  ssn?: string
  [key: string]: unknown
}

// Encrypt sensitive form data before storing
export function encryptFormData(formData: FormDataWithSensitiveFields): string {
  const sensitiveFields = ['firstName', 'lastName', 'email', 'phone', 'ssn'] as const
  const encrypted = { ...formData }
  
  sensitiveFields.forEach(field => {
    const value = encrypted[field]
    if (typeof value === 'string' && value) {
      encrypted[field] = encryptPII(value)
    }
  })
  
  return JSON.stringify(encrypted)
}

// Decrypt form data after retrieval
export function decryptFormData(encryptedString: string): FormDataWithSensitiveFields {
  const encrypted = JSON.parse(encryptedString) as FormDataWithSensitiveFields
  const decrypted = { ...encrypted }
  const sensitiveFields = ['firstName', 'lastName', 'email', 'phone', 'ssn'] as const
  
  sensitiveFields.forEach(field => {
    const value = decrypted[field]
    if (typeof value === 'string' && value) {
      decrypted[field] = decryptPII(value)
    }
  })
  
  return decrypted
}