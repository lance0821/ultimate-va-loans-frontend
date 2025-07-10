// Simple state transfer mechanism using sessionStorage
export interface CalculatorTransferState {
  annualIncome?: number
  monthlyDebts?: number
  downPayment?: number
  source?: string
}

const TRANSFER_KEY = 'va-calculator-transfer'

export function saveCalculatorState(state: CalculatorTransferState) {
  if (typeof window === 'undefined') return
  
  try {
    sessionStorage.setItem(TRANSFER_KEY, JSON.stringify({
      ...state,
      timestamp: Date.now()
    }))
  } catch (e) {
    console.error('Failed to save calculator state:', e)
  }
}

export function getCalculatorState(): CalculatorTransferState | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = sessionStorage.getItem(TRANSFER_KEY)
    if (!stored) return null
    
    const state = JSON.parse(stored)
    
    // Clear state after reading (one-time transfer)
    sessionStorage.removeItem(TRANSFER_KEY)
    
    // Check if state is less than 5 minutes old
    if (Date.now() - state.timestamp > 5 * 60 * 1000) {
      return null
    }
    
    return state
  } catch (e) {
    console.error('Failed to get calculator state:', e)
    return null
  }
}