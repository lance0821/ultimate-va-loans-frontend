export function formatCurrency(
  amount: number,
  decimals: number = 2,
  locale: string = 'en-US',
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}

export function parseCurrency(value: string): number {
  // Remove currency symbols and thousands separators
  const cleaned = value.replace(/[^0-9.-]/g, '')
  const parsed = parseFloat(cleaned)
  return isNaN(parsed) ? 0 : parsed
}

export function formatCompactCurrency(
  amount: number
): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}K`
  }
  return formatCurrency(amount, 0)
}

// Example usage:
// formatCurrency(1234.56) => "$1,234.56"
// formatCurrency(1234.56, 0) => "$1,235"
// parseCurrency("$1,234.56") => 1234.56
// formatCompactCurrency(1234567) => "1.2M"
// formatCompactCurrency(12345) => "12K"