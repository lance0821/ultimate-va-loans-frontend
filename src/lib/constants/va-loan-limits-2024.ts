export interface CountyLimit {
  state: string;
  county: string;
  limit: number;
  isHighCost: boolean;
}

// Sample data - in production, this would be a complete dataset
export const VA_LOAN_LIMITS_2024: CountyLimit[] = [
  // Standard limit counties (most of the US)
  { state: 'Alabama', county: 'Jefferson', limit: 472030, isHighCost: false },
  { state: 'Alabama', county: 'Madison', limit: 472030, isHighCost: false },
  { state: 'Alabama', county: 'Mobile', limit: 472030, isHighCost: false },
  
  // High-cost counties
  { state: 'California', county: 'Los Angeles', limit: 1149825, isHighCost: true },
  { state: 'California', county: 'San Francisco', limit: 1149825, isHighCost: true },
  { state: 'California', county: 'Orange', limit: 1149825, isHighCost: true },
  { state: 'California', county: 'San Diego', limit: 977500, isHighCost: true },
  
  { state: 'Colorado', county: 'Denver', limit: 723000, isHighCost: true },
  { state: 'Colorado', county: 'Boulder', limit: 776600, isHighCost: true },
  
  { state: 'District of Columbia', county: 'District of Columbia', limit: 1149825, isHighCost: true },
  
  { state: 'Florida', county: 'Miami-Dade', limit: 619000, isHighCost: true },
  { state: 'Florida', county: 'Monroe', limit: 916450, isHighCost: true },
  
  { state: 'Hawaii', county: 'Honolulu', limit: 1149825, isHighCost: true },
  { state: 'Hawaii', county: 'Hawaii', limit: 715000, isHighCost: true },
  { state: 'Hawaii', county: 'Maui', limit: 1149825, isHighCost: true },
  { state: 'Hawaii', county: 'Kauai', limit: 1149825, isHighCost: true },
  
  { state: 'Massachusetts', county: 'Suffolk', limit: 916450, isHighCost: true },
  { state: 'Massachusetts', county: 'Middlesex', limit: 916450, isHighCost: true },
  
  { state: 'New York', county: 'New York', limit: 1149825, isHighCost: true },
  { state: 'New York', county: 'Kings', limit: 1149825, isHighCost: true },
  { state: 'New York', county: 'Queens', limit: 1149825, isHighCost: true },
  
  { state: 'Texas', county: 'Harris', limit: 472030, isHighCost: false },
  { state: 'Texas', county: 'Dallas', limit: 472030, isHighCost: false },
  { state: 'Texas', county: 'Travis', limit: 574000, isHighCost: true },
  
  { state: 'Virginia', county: 'Arlington', limit: 1149825, isHighCost: true },
  { state: 'Virginia', county: 'Fairfax', limit: 1149825, isHighCost: true },
  
  { state: 'Washington', county: 'King', limit: 977500, isHighCost: true },
  { state: 'Washington', county: 'Pierce', limit: 977500, isHighCost: true },
  
  // Add more counties as needed...
];

// Get unique states for dropdown
export const getStates = (): string[] => {
  return [...new Set(VA_LOAN_LIMITS_2024.map(county => county.state))].sort();
};

// Get counties for a specific state
export const getCountiesByState = (state: string): CountyLimit[] => {
  return VA_LOAN_LIMITS_2024
    .filter(county => county.state === state)
    .sort((a, b) => a.county.localeCompare(b.county));
};

// Search counties by name
export const searchCounties = (query: string): CountyLimit[] => {
  const lowerQuery = query.toLowerCase();
  return VA_LOAN_LIMITS_2024.filter(
    county => 
      county.county.toLowerCase().includes(lowerQuery) ||
      county.state.toLowerCase().includes(lowerQuery)
  );
};

// Get standard conforming loan limit for 2024
export const STANDARD_LIMIT_2024 = 766550;
export const BASELINE_LIMIT_2024 = 472030;

export const LOAN_LIMIT_INFO = {
  withFullEntitlement: {
    title: 'No Loan Limit with Full Entitlement',
    description: 'Veterans with full entitlement can borrow above county limits without a down payment',
    conditions: [
      'You\'ve never used your VA loan benefit before',
      'You\'ve paid off a previous VA loan and sold the property',
      'You\'ve had a foreclosure or compromise claim and repaid VA in full',
    ],
  },
  withPartialEntitlement: {
    title: 'County Limits Apply with Partial Entitlement',
    description: 'Veterans with remaining entitlement may need a down payment for loans above county limits',
    calculation: 'Down payment = 25% × (Loan amount - County limit)',
  },
};