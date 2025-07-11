export interface FundingFeeRate {
  usage: 'first' | 'subsequent';
  downPayment: string;
  regularMilitary: number;
  reserveNationalGuard: number;
}

export interface FundingFeeExemption {
  id: string;
  description: string;
  documentation: string;
}

// 2024 VA Funding Fee Rates (as percentages)
export const FUNDING_FEE_RATES: FundingFeeRate[] = [
  // First Use
  {
    usage: 'first',
    downPayment: 'Less than 5%',
    regularMilitary: 2.15,
    reserveNationalGuard: 2.40,
  },
  {
    usage: 'first',
    downPayment: '5% or more but less than 10%',
    regularMilitary: 1.50,
    reserveNationalGuard: 1.75,
  },
  {
    usage: 'first',
    downPayment: '10% or more',
    regularMilitary: 1.25,
    reserveNationalGuard: 1.50,
  },
  // Subsequent Use
  {
    usage: 'subsequent',
    downPayment: 'Less than 5%',
    regularMilitary: 3.30,
    reserveNationalGuard: 3.30,
  },
  {
    usage: 'subsequent',
    downPayment: '5% or more but less than 10%',
    regularMilitary: 1.50,
    reserveNationalGuard: 1.75,
  },
  {
    usage: 'subsequent',
    downPayment: '10% or more',
    regularMilitary: 1.25,
    reserveNationalGuard: 1.50,
  },
];

export const FUNDING_FEE_EXEMPTIONS: FundingFeeExemption[] = [
  {
    id: 'disability',
    description: 'Veterans receiving VA disability compensation',
    documentation: 'VA disability award letter',
  },
  {
    id: 'purple-heart',
    description: 'Purple Heart recipients',
    documentation: 'Purple Heart citation or DD-214',
  },
  {
    id: 'surviving-spouse',
    description: 'Surviving spouses of veterans who died in service or from service-connected disabilities',
    documentation: 'VA Dependency and Indemnity Compensation (DIC) award letter',
  },
  {
    id: 'pre-discharge',
    description: 'Veterans eligible to receive compensation as a result of pre-discharge disability exam',
    documentation: 'Pre-discharge disability documentation',
  },
];

export interface FundingFeeCalculation {
  loanAmount: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  isFirstUse: boolean;
  isRegularMilitary: boolean;
  isExempt: boolean;
  fundingFeePercent: number;
  fundingFeeAmount: number;
  totalLoanWithFee: number;
}

export function calculateFundingFee({
  purchasePrice,
  downPaymentAmount,
  isFirstUse,
  isRegularMilitary,
  isExempt,
}: {
  purchasePrice: number;
  downPaymentAmount: number;
  isFirstUse: boolean;
  isRegularMilitary: boolean;
  isExempt: boolean;
}): FundingFeeCalculation {
  const loanAmount = purchasePrice - downPaymentAmount;
  const downPaymentPercent = (downPaymentAmount / purchasePrice) * 100;

  if (isExempt) {
    return {
      loanAmount,
      downPaymentAmount,
      downPaymentPercent,
      isFirstUse,
      isRegularMilitary,
      isExempt,
      fundingFeePercent: 0,
      fundingFeeAmount: 0,
      totalLoanWithFee: loanAmount,
    };
  }

  // Determine which rate to use
  const usage = isFirstUse ? 'first' : 'subsequent';
  let downPaymentCategory: string;
  
  if (downPaymentPercent < 5) {
    downPaymentCategory = 'Less than 5%';
  } else if (downPaymentPercent < 10) {
    downPaymentCategory = '5% or more but less than 10%';
  } else {
    downPaymentCategory = '10% or more';
  }

  const rate = FUNDING_FEE_RATES.find(
    r => r.usage === usage && r.downPayment === downPaymentCategory
  );

  if (!rate) {
    throw new Error('Unable to find funding fee rate');
  }

  const fundingFeePercent = isRegularMilitary 
    ? rate.regularMilitary 
    : rate.reserveNationalGuard;

  const fundingFeeAmount = loanAmount * (fundingFeePercent / 100);
  const totalLoanWithFee = loanAmount + fundingFeeAmount;

  return {
    loanAmount,
    downPaymentAmount,
    downPaymentPercent,
    isFirstUse,
    isRegularMilitary,
    isExempt,
    fundingFeePercent,
    fundingFeeAmount,
    totalLoanWithFee,
  };
}

// Cash-out refinance rates (different from purchase)
export const CASH_OUT_REFINANCE_RATES = {
  first: {
    regularMilitary: 2.15,
    reserveNationalGuard: 2.40,
  },
  subsequent: {
    regularMilitary: 3.30,
    reserveNationalGuard: 3.30,
  },
};

// IRRRL (Interest Rate Reduction Refinance Loan) rate
export const IRRRL_FUNDING_FEE = 0.50; // 0.5% for all borrowers