export interface LoanBenefit {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  highlight?: boolean;
}

export interface LoanTypeComparison {
  feature: string;
  vaLoan: string | boolean;
  conventional: string | boolean;
  fha: string | boolean;
  tooltip?: string;
}

export const VA_LOAN_BENEFITS: LoanBenefit[] = [
  {
    id: 'no-down-payment',
    title: 'No Down Payment',
    description: 'Purchase your home with 0% down on most loans up to conforming limits',
    icon: 'DollarSign',
    highlight: true,
  },
  {
    id: 'no-pmi',
    title: 'No PMI Required',
    description: 'Save hundreds monthly by avoiding private mortgage insurance',
    icon: 'Shield',
    highlight: true,
  },
  {
    id: 'competitive-rates',
    title: 'Competitive Interest Rates',
    description: 'Typically 0.25% to 0.5% lower than conventional loans',
    icon: 'TrendingDown',
  },
  {
    id: 'limited-closing-costs',
    title: 'Limited Closing Costs',
    description: 'VA limits certain fees that lenders can charge',
    icon: 'Receipt',
  },
  {
    id: 'no-prepayment-penalty',
    title: 'No Prepayment Penalties',
    description: 'Pay off your loan early without any fees',
    icon: 'Clock',
  },
  {
    id: 'assumable-loan',
    title: 'Assumable Loans',
    description: 'Future buyers can take over your VA loan and its terms',
    icon: 'Users',
  },
];

export const LOAN_COMPARISON_DATA: LoanTypeComparison[] = [
  {
    feature: 'Down Payment',
    vaLoan: '0%',
    conventional: '3-20%',
    fha: '3.5%',
    tooltip: 'Minimum down payment required for each loan type',
  },
  {
    feature: 'Mortgage Insurance',
    vaLoan: 'None',
    conventional: 'Required if <20% down',
    fha: 'Required for life of loan',
    tooltip: 'Monthly mortgage insurance requirements',
  },
  {
    feature: 'Credit Score Minimum',
    vaLoan: 'No VA minimum (lender varies)',
    conventional: '620-740',
    fha: '580',
    tooltip: 'Minimum credit scores typically required',
  },
  {
    feature: 'Funding Fee',
    vaLoan: '0-3.3% (can be financed)',
    conventional: 'None',
    fha: '1.75% upfront + annual',
    tooltip: 'One-time or ongoing fees specific to loan type',
  },
  {
    feature: 'Loan Limits',
    vaLoan: 'No limit with full entitlement',
    conventional: '$766,550 (2024)',
    fha: '$498,257 (2024)',
    tooltip: 'Maximum loan amounts for 2024',
  },
  {
    feature: 'Property Types',
    vaLoan: 'Primary residence only',
    conventional: 'Any property type',
    fha: 'Primary residence only',
    tooltip: 'Eligible property usage types',
  },
  {
    feature: 'Assumable',
    vaLoan: true,
    conventional: false,
    fha: true,
    tooltip: 'Can future buyers assume your loan?',
  },
  {
    feature: 'Prepayment Penalty',
    vaLoan: false,
    conventional: 'Varies by lender',
    fha: false,
    tooltip: 'Penalties for paying off loan early',
  },
];

export interface PMISavingsCalculation {
  loanAmount: number;
  conventionalRate: number;
  vaRate: number;
  pmiRate: number;
  years: number;
}

export function calculatePMISavings({
  loanAmount,
  conventionalRate = 7.0,
  vaRate = 6.5,
  pmiRate = 0.5,
  years = 30,
}: PMISavingsCalculation): {
  monthlyPMI: number;
  totalPMISaved: number;
  monthlyPaymentDifference: number;
  totalSavings: number;
} {
  // Calculate monthly PMI (0.5% annually by default)
  const monthlyPMI = (loanAmount * (pmiRate / 100)) / 12;
  
  // Calculate total PMI over loan term (assuming it's removed at 78% LTV)
  const monthsOfPMI = Math.floor(years * 12 * 0.35); // Roughly 35% of loan term
  const totalPMISaved = monthlyPMI * monthsOfPMI;
  
  // Calculate monthly payment difference due to interest rate
  const conventionalMonthly = calculateMonthlyPayment(loanAmount, conventionalRate, years);
  const vaMonthly = calculateMonthlyPayment(loanAmount, vaRate, years);
  const monthlyPaymentDifference = conventionalMonthly - vaMonthly;
  
  // Total savings over loan term
  const interestSavings = monthlyPaymentDifference * (years * 12);
  const totalSavings = totalPMISaved + interestSavings;
  
  return {
    monthlyPMI,
    totalPMISaved,
    monthlyPaymentDifference,
    totalSavings,
  };
}

function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  
  if (monthlyRate === 0) return principal / numPayments;
  
  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
    (Math.pow(1 + monthlyRate, numPayments) - 1);
    
  return monthlyPayment;
}