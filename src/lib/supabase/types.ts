export interface Lead {
  id?: string
  created_at?: string
  updated_at?: string
  
  // Loan Information
  loan_type: 'purchase' | 'refinance'
  
  // Property Information
  property_type?: 'single-family' | 'condo' | 'townhouse' | 'multi-family'
  property_state?: string
  property_city?: string
  purchase_price?: number
  down_payment?: number
  current_loan_balance?: number
  
  // Military Information
  service_branch?: 'army' | 'navy' | 'air-force' | 'marines' | 'coast-guard' | 'space-force'
  service_status?: 'active' | 'veteran' | 'reserves' | 'national-guard'
  has_va_loan_before?: boolean
  has_disability_rating?: boolean
  
  // Financial Information
  credit_score_range?: 'excellent' | 'good' | 'fair' | 'poor'
  annual_income?: number
  monthly_debts?: number
  
  // Personal Information
  first_name: string
  last_name: string
  email: string
  phone: string
  
  // Tracking
  form_completion_percentage?: number
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: Lead
        Insert: Lead
        Update: Partial<Lead>
      }
    }
  }
}