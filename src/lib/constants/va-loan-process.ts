export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  shortDescription: string;
  estimatedTime: string;
  details: string[];
  tips: string[];
  documents?: string[];
  icon: string; // Icon name from lucide-react
}

export const VA_LOAN_PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'get-coe',
    number: 1,
    title: 'Get Your COE',
    shortDescription: 'Obtain your Certificate of Eligibility to prove your VA loan benefit',
    estimatedTime: '1-2 weeks',
    icon: 'FileCheck',
    details: [
      'Request your COE through VA.gov, your lender, or by mail',
      'Provides proof of your military service and VA loan eligibility',
      'Shows remaining entitlement amount',
      'Required by all VA-approved lenders',
    ],
    tips: [
      'Apply online at VA.gov for fastest processing',
      'Your lender can often obtain this for you through the Web LGY system',
      'Keep DD-214 or discharge papers handy',
    ],
    documents: [
      'DD Form 214 (Discharge papers)',
      'Current statement of service (if active duty)',
      'VA Form 26-1880 (if applying by mail)',
    ],
  },
  {
    id: 'find-lender',
    number: 2,
    title: 'Find a VA-Approved Lender',
    shortDescription: 'Choose a lender experienced with VA loans for the best service',
    estimatedTime: '1-2 days',
    icon: 'Building',
    details: [
      'Not all lenders offer VA loans - ensure yours is VA-approved',
      'Compare interest rates, fees, and customer reviews',
      'Look for lenders with VA loan expertise',
      'Consider local vs. national lenders',
    ],
    tips: [
      'Get quotes from at least 3-4 different lenders',
      'Ask about lender fees and closing costs',
      'Check if they offer assistance with COE',
      'Read reviews from other veterans',
    ],
  },
  {
    id: 'get-preapproved',
    number: 3,
    title: 'Get Pre-Approved',
    shortDescription: 'Secure your pre-approval to know your buying power',
    estimatedTime: '2-5 days',
    icon: 'ClipboardCheck',
    details: [
      'Lender reviews your finances and credit',
      'Receive pre-approval letter stating loan amount',
      'Shows sellers you\'re a serious buyer',
      'Valid for 60-90 days typically',
    ],
    tips: [
      'Gather financial documents beforehand',
      'Don\'t make major purchases during this time',
      'Be honest about your financial situation',
      'Keep your pre-approval updated if house hunting takes time',
    ],
    documents: [
      'Last 2 years of tax returns',
      'Recent pay stubs (30 days)',
      'Bank statements (2-3 months)',
      'Proof of other income/assets',
      'Government-issued ID',
    ],
  },
  {
    id: 'shop-for-home',
    number: 4,
    title: 'Shop for Your Home',
    shortDescription: 'Find your perfect home that meets VA requirements',
    estimatedTime: '1-3 months',
    icon: 'Home',
    details: [
      'Work with a real estate agent familiar with VA loans',
      'Ensure property meets VA Minimum Property Requirements',
      'Make competitive offers with your pre-approval',
      'Schedule VA appraisal after offer acceptance',
    ],
    tips: [
      'Be prepared to act fast in competitive markets',
      'Consider VA loan assumption as a selling point',
      'Don\'t waive inspection contingencies',
      'Communicate VA loan timeline to sellers',
    ],
  },
  {
    id: 'close-on-home',
    number: 5,
    title: 'Close on Your Home',
    shortDescription: 'Complete the final steps to become a homeowner',
    estimatedTime: '30-45 days',
    icon: 'Key',
    details: [
      'VA appraisal ensures fair value and property condition',
      'Underwriting reviews all documentation',
      'Clear to close issued when all conditions met',
      'Sign closing documents and receive keys',
    ],
    tips: [
      'Stay responsive to lender requests',
      'Review closing disclosure carefully',
      'Prepare certified funds for closing',
      'Do final walk-through before closing',
    ],
    documents: [
      'Homeowner\'s insurance policy',
      'Certified funds for closing costs',
      'Valid photo ID',
      'Any additional documents requested by lender',
    ],
  },
];

export const TOTAL_ESTIMATED_TIME = '2-4 months from start to finish';