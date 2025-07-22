export function isValidPhoneNumber(phone: string, countryCode: string = 'US'): boolean {
  const cleaned = phone.replace(/\D/g, '')
  
  if (countryCode === 'US') {
    // US phone numbers should be 10 digits (or 11 with country code)
    return cleaned.length === 10 || (cleaned.length === 11 && cleaned.startsWith('1'))
  }
  
  // Basic validation for other countries
  return cleaned.length >= 10 && cleaned.length <= 15
}

export function formatPhoneNumber(phone: string, countryCode: string = 'US'): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (countryCode === 'US') {
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
    }
  }
  
  return phone
}

export function parsePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '')
}