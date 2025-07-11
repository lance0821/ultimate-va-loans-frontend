export interface ClosingCost {
  category: string;
  items: {
    name: string;
    typical: number | { min: number; max: number };
    description: string;
    isPercent?: boolean;
    vaAllowed: boolean;
  }[];
}

export interface DebtItem {
  id: string;
  name: string;
  amount: number;
}

export interface PreApprovalItem {
  id: string;
  category: string;
  item: string;
  description: string;
  required: boolean;
}

export const CLOSING_COSTS: ClosingCost[] = [
  {
    category: 'Lender Fees',
    items: [
      {
        name: 'Loan Origination Fee',
        typical: { min: 0, max: 1 },
        description: 'Fee charged by lender for processing your loan',
        isPercent: true,
        vaAllowed: true,
      },
      {
        name: 'Credit Report',
        typical: 50,
        description: 'Cost to pull your credit report',
        vaAllowed: true,
      },
      {
        name: 'VA Appraisal Fee',
        typical: { min: 500, max: 800 },
        description: 'Required VA property appraisal',
        vaAllowed: true,
      },
    ],
  },
  {
    category: 'Title & Escrow',
    items: [
      {
        name: 'Title Insurance',
        typical: { min: 500, max: 1500 },
        description: 'Protects against title defects',
        vaAllowed: true,
      },
      {
        name: 'Escrow/Settlement Fee',
        typical: { min: 500, max: 1000 },
        description: 'Fee for closing agent services',
        vaAllowed: true,
      },
      {
        name: 'Recording Fees',
        typical: { min: 100, max: 250 },
        description: 'County fees to record the deed',
        vaAllowed: true,
      },
    ],
  },
  {
    category: 'Prepaid Items',
    items: [
      {
        name: 'Homeowners Insurance',
        typical: { min: 800, max: 2000 },
        description: '12 months paid at closing',
        vaAllowed: true,
      },
      {
        name: 'Property Taxes',
        typical: { min: 500, max: 3000 },
        description: 'Prorated amount varies by closing date',
        vaAllowed: true,
      },
      {
        name: 'Prepaid Interest',
        typical: { min: 200, max: 1000 },
        description: 'Interest from closing to first payment',
        vaAllowed: true,
      },
    ],
  },
  {
    category: 'Other Costs',
    items: [
      {
        name: 'Home Inspection',
        typical: { min: 300, max: 500 },
        description: 'Optional but recommended',
        vaAllowed: true,
      },
      {
        name: 'Survey',
        typical: { min: 300, max: 500 },
        description: 'May be required by lender',
        vaAllowed: true,
      },
      {
        name: 'Pest Inspection',
        typical: { min: 75, max: 150 },
        description: 'Required in some states',
        vaAllowed: true,
      },
    ],
  },
];

export const VA_PROHIBITED_FEES = [
  'Attorney fees charged by lender',
  'Commission or brokerage fees',
  'Prepayment penalties',
];

export const DTI_GUIDELINES = {
  vaGuideline: 41,
  vaMax: 50, // With compensating factors
  frontEndRatio: 28, // Housing expense ratio
  categories: [
    { max: 36, rating: 'Excellent', color: 'green' },
    { max: 41, rating: 'Good', color: 'blue' },
    { max: 45, rating: 'Fair', color: 'yellow' },
    { max: 50, rating: 'Needs Review', color: 'orange' },
    { max: 100, rating: 'Too High', color: 'red' },
  ],
};

export const RESIDUAL_INCOME_REQUIREMENTS = {
  // By region and family size
  northeast: {
    1: 450,
    2: 755,
    3: 909,
    4: 1025,
    5: 1062,
  },
  midwest: {
    1: 441,
    2: 738,
    3: 889,
    4: 1003,
    5: 1039,
  },
  south: {
    1: 441,
    2: 738,
    3: 889,
    4: 1003,
    5: 1039,
  },
  west: {
    1: 491,
    2: 823,
    3: 990,
    4: 1117,
    5: 1158,
  },
};

export const PRE_APPROVAL_CHECKLIST: PreApprovalItem[] = [
  // Financial Documents
  {
    id: 'w2',
    category: 'Income Documentation',
    item: 'W-2 forms (last 2 years)',
    description: 'Shows employment income for wage earners',
    required: true,
  },
  {
    id: 'tax-returns',
    category: 'Income Documentation',
    item: 'Tax returns (last 2 years)',
    description: 'Complete returns with all schedules',
    required: true,
  },
  {
    id: 'pay-stubs',
    category: 'Income Documentation',
    item: 'Recent pay stubs (30 days)',
    description: 'Shows current income and year-to-date earnings',
    required: true,
  },
  {
    id: '1099',
    category: 'Income Documentation',
    item: '1099 forms (if self-employed)',
    description: 'For contractors and self-employed individuals',
    required: false,
  },
  
  // Asset Documentation
  {
    id: 'bank-statements',
    category: 'Asset Documentation',
    item: 'Bank statements (2-3 months)',
    description: 'All checking and savings accounts',
    required: true,
  },
  {
    id: 'investment-statements',
    category: 'Asset Documentation',
    item: 'Investment account statements',
    description: 'Stocks, bonds, mutual funds, retirement accounts',
    required: false,
  },
  {
    id: 'gift-letter',
    category: 'Asset Documentation',
    item: 'Gift letter (if applicable)',
    description: 'If using gift funds for down payment/closing',
    required: false,
  },
  
  // Military/VA Documents
  {
    id: 'coe',
    category: 'VA Documents',
    item: 'Certificate of Eligibility (COE)',
    description: 'Proves VA loan eligibility',
    required: true,
  },
  {
    id: 'dd214',
    category: 'VA Documents',
    item: 'DD-214 or Statement of Service',
    description: 'Military discharge papers',
    required: true,
  },
  {
    id: 'disability-letter',
    category: 'VA Documents',
    item: 'VA disability award letter',
    description: 'If receiving disability compensation',
    required: false,
  },
  
  // Other Documents
  {
    id: 'drivers-license',
    category: 'Identification',
    item: 'Valid government-issued ID',
    description: 'Driver\'s license or passport',
    required: true,
  },
  {
    id: 'social-security',
    category: 'Identification',
    item: 'Social Security card',
    description: 'For identity verification',
    required: true,
  },
  {
    id: 'divorce-decree',
    category: 'Legal Documents',
    item: 'Divorce decree (if applicable)',
    description: 'If paying alimony or child support',
    required: false,
  },
  {
    id: 'bankruptcy-docs',
    category: 'Legal Documents',
    item: 'Bankruptcy discharge papers',
    description: 'If filed bankruptcy in past 7 years',
    required: false,
  },
];

// Input Validation Constants
export const INPUT_LIMITS = {
  purchasePrice: { min: 1000, max: 10000000 }, // $1K to $10M
  monthlyIncome: { min: 1000, max: 50000 }, // $1K to $50K monthly
  monthlyDebt: { min: 0, max: 25000 }, // $0 to $25K monthly
  downPayment: { min: 0, max: 2000000 }, // $0 to $2M
  loanAmount: { min: 1000, max: 10000000 }, // $1K to $10M
  familySize: { min: 1, max: 10 }, // 1 to 10 family members
};

export const INPUT_VALIDATION_MESSAGES = {
  purchasePrice: 'Purchase price must be between $1,000 and $10,000,000',
  monthlyIncome: 'Monthly income must be between $1,000 and $50,000',
  monthlyDebt: 'Monthly debt cannot exceed $25,000',
  downPayment: 'Down payment cannot exceed $2,000,000',
  loanAmount: 'Loan amount must be between $1,000 and $10,000,000',
  familySize: 'Family size must be between 1 and 10',
  negative: 'Value cannot be negative',
  required: 'This field is required',
  numeric: 'Please enter a valid number',
};

// Validation Helper Functions
export function validateNumericInput(
  value: number,
  field: keyof typeof INPUT_LIMITS
): { isValid: boolean; message?: string } {
  if (isNaN(value) || value < 0) {
    return { isValid: false, message: INPUT_VALIDATION_MESSAGES.negative };
  }
  
  const limits = INPUT_LIMITS[field];
  if (value < limits.min || value > limits.max) {
    return { isValid: false, message: INPUT_VALIDATION_MESSAGES[field] };
  }
  
  return { isValid: true };
}

// Calculation Functions
export function calculateEstimatedClosingCosts(
  purchasePrice: number,
  loanAmount: number
): {
  total: number;
  breakdown: { category: string; amount: number }[];
  errors?: string[];
} {
  // Input validation
  const errors: string[] = [];
  
  const purchasePriceValidation = validateNumericInput(purchasePrice, 'purchasePrice');
  if (!purchasePriceValidation.isValid) {
    errors.push(purchasePriceValidation.message!);
  }
  
  const loanAmountValidation = validateNumericInput(loanAmount, 'loanAmount');
  if (!loanAmountValidation.isValid) {
    errors.push(loanAmountValidation.message!);
  }
  
  if (errors.length > 0) {
    return { total: 0, breakdown: [], errors };
  }

  const breakdown: { category: string; amount: number }[] = [];
  let total = 0;

  CLOSING_COSTS.forEach(category => {
    let categoryTotal = 0;
    
    category.items.forEach(item => {
      let itemCost = 0;
      
      if (item.isPercent && typeof item.typical === 'object') {
        // Percentage of loan amount
        itemCost = loanAmount * (item.typical.max / 100);
      } else if (typeof item.typical === 'object') {
        // Use average of min/max
        itemCost = (item.typical.min + item.typical.max) / 2;
      } else {
        itemCost = item.typical;
      }
      
      categoryTotal += itemCost;
    });
    
    breakdown.push({ category: category.category, amount: categoryTotal });
    total += categoryTotal;
  });

  return { total, breakdown };
}

export function calculateDTI(
  monthlyIncome: number,
  monthlyDebts: number,
  proposedHousingPayment: number
): {
  frontEndRatio: number;
  backEndRatio: number;
  rating: string;
  color: string;
  qualified: boolean;
  errors?: string[];
} {
  // Input validation
  const errors: string[] = [];
  
  const incomeValidation = validateNumericInput(monthlyIncome, 'monthlyIncome');
  if (!incomeValidation.isValid) {
    errors.push(incomeValidation.message!);
  }
  
  const debtValidation = validateNumericInput(monthlyDebts, 'monthlyDebt');
  if (!debtValidation.isValid) {
    errors.push(debtValidation.message!);
  }
  
  if (monthlyIncome <= 0) {
    errors.push('Monthly income must be greater than zero');
  }
  
  if (errors.length > 0) {
    return { 
      frontEndRatio: 0, 
      backEndRatio: 0, 
      rating: 'Error', 
      color: 'red', 
      qualified: false,
      errors 
    };
  }

  const frontEndRatio = (proposedHousingPayment / monthlyIncome) * 100;
  const backEndRatio = ((monthlyDebts + proposedHousingPayment) / monthlyIncome) * 100;
  
  const category = DTI_GUIDELINES.categories.find(cat => backEndRatio <= cat.max);
  
  return {
    frontEndRatio,
    backEndRatio,
    rating: category?.rating || 'Too High',
    color: category?.color || 'red',
    qualified: backEndRatio <= DTI_GUIDELINES.vaMax,
  };
}