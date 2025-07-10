// Basic Allowance for Housing (BAH) rates by rank and zip code
// Note: In production, this would come from a BAH API
export interface BAHRate {
  zipCode: string
  E1_E4: number
  E5: number
  E6: number
  E7: number
  E8: number
  E9: number
  W1_W2: number
  W3: number
  W4: number
  W5: number
  O1_O2: number
  O3: number
  O4: number
  O5: number
  O6: number
  O7_plus: number
}

// Sample BAH rates for major military areas (monthly amounts)
export const BAH_RATES: Record<string, Partial<BAHRate>> = {
  // San Diego, CA
  '92101': {
    E1_E4: 2502,
    E5: 2835,
    E6: 3084,
    E7: 3192,
    E8: 3714,
    E9: 4389,
    O1_O2: 2979,
    O3: 3468,
    O4: 4152,
    O5: 4536,
    O6: 4590,
  },
  // Norfolk, VA
  '23501': {
    E1_E4: 1542,
    E5: 1773,
    E6: 1896,
    E7: 2061,
    E8: 2391,
    E9: 2880,
    O1_O2: 1863,
    O3: 2232,
    O4: 2703,
    O5: 2997,
    O6: 3030,
  },
  // Fort Hood, TX
  '76544': {
    E1_E4: 1116,
    E5: 1290,
    E6: 1368,
    E7: 1488,
    E8: 1731,
    E9: 2100,
    O1_O2: 1356,
    O3: 1623,
    O4: 1956,
    O5: 2172,
    O6: 2196,
  },
}

export const RANK_OPTIONS = [
  { value: 'E1_E4', label: 'E1-E4' },
  { value: 'E5', label: 'E5' },
  { value: 'E6', label: 'E6' },
  { value: 'E7', label: 'E7' },
  { value: 'E8', label: 'E8' },
  { value: 'E9', label: 'E9' },
  { value: 'W1_W2', label: 'W1-W2' },
  { value: 'W3', label: 'W3' },
  { value: 'W4', label: 'W4' },
  { value: 'W5', label: 'W5' },
  { value: 'O1_O2', label: 'O1-O2' },
  { value: 'O3', label: 'O3' },
  { value: 'O4', label: 'O4' },
  { value: 'O5', label: 'O5' },
  { value: 'O6', label: 'O6' },
  { value: 'O7_plus', label: 'O7+' },
]

export function getBAHRate(zipCode: string, rank: string): number {
  const rates = BAH_RATES[zipCode]
  if (!rates) return 0
  
  const rate = rates[rank as keyof typeof rates]
  return typeof rate === 'number' ? rate : 0
}