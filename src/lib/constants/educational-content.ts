export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: 'getting-started' | 'process' | 'tips' | 'closing';
  order: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  relatedTerms?: string[];
  category: 'loan-terms' | 'process' | 'requirements' | 'financial';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'eligibility' | 'process' | 'costs' | 'property' | 'closing';
}

export const VIDEO_TUTORIALS: VideoTutorial[] = [
  {
    id: 'intro-va-loans',
    title: 'Introduction to VA Home Loans',
    description: 'Learn the basics of VA loans and why they\'re the best mortgage option for veterans',
    duration: '5:32',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
    thumbnailUrl: '/images/video-thumbnails/intro-va-loans.jpg',
    category: 'getting-started',
    order: 1,
  },
  {
    id: 'getting-coe',
    title: 'How to Get Your Certificate of Eligibility',
    description: 'Step-by-step guide to obtaining your COE through VA.gov or your lender',
    duration: '4:15',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
    thumbnailUrl: '/images/video-thumbnails/getting-coe.jpg',
    category: 'process',
    order: 2,
  },
  {
    id: 'choosing-lender',
    title: 'Choosing the Right VA Lender',
    description: 'What to look for in a VA-approved lender and questions to ask',
    duration: '6:45',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
    thumbnailUrl: '/images/video-thumbnails/choosing-lender.jpg',
    category: 'process',
    order: 3,
  },
  {
    id: 'pre-approval-process',
    title: 'The VA Loan Pre-Approval Process',
    description: 'Documents needed and what to expect during pre-approval',
    duration: '7:20',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
    thumbnailUrl: '/images/video-thumbnails/pre-approval.jpg',
    category: 'process',
    order: 4,
  },
  {
    id: 'home-shopping-tips',
    title: 'Home Shopping with a VA Loan',
    description: 'Tips for finding VA-eligible properties and making competitive offers',
    duration: '8:10',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
    thumbnailUrl: '/images/video-thumbnails/home-shopping.jpg',
    category: 'tips',
    order: 5,
  },
  {
    id: 'va-appraisal',
    title: 'Understanding the VA Appraisal Process',
    description: 'What happens during a VA appraisal and MPR requirements',
    duration: '6:55',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
    thumbnailUrl: '/images/video-thumbnails/va-appraisal.jpg',
    category: 'process',
    order: 6,
  },
  {
    id: 'closing-process',
    title: 'VA Loan Closing Process Explained',
    description: 'Final steps to homeownership and what to bring to closing',
    duration: '5:40',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
    thumbnailUrl: '/images/video-thumbnails/closing.jpg',
    category: 'closing',
    order: 7,
  },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'coe',
    term: 'Certificate of Eligibility (COE)',
    definition: 'A document issued by the VA that verifies your eligibility for a VA home loan benefit based on your military service.',
    relatedTerms: ['DD-214', 'Entitlement'],
    category: 'requirements',
  },
  {
    id: 'entitlement',
    term: 'Entitlement',
    definition: 'The amount the VA will guarantee on your home loan. Basic entitlement is $36,000, but additional entitlement may be available.',
    relatedTerms: ['Full Entitlement', 'Partial Entitlement', 'Loan Limits'],
    category: 'loan-terms',
  },
  {
    id: 'funding-fee',
    term: 'VA Funding Fee',
    definition: 'A one-time fee paid to the VA that helps keep the loan program running. Can be financed into the loan amount.',
    relatedTerms: ['Exemption', 'Down Payment'],
    category: 'financial',
  },
  {
    id: 'mpr',
    term: 'Minimum Property Requirements (MPRs)',
    definition: 'VA standards ensuring the property is safe, structurally sound, and sanitary. Must be met for VA loan approval.',
    relatedTerms: ['VA Appraisal', 'Inspection'],
    category: 'requirements',
  },
  {
    id: 'irrrl',
    term: 'Interest Rate Reduction Refinance Loan (IRRRL)',
    definition: 'A VA refinance option to lower your interest rate on an existing VA loan, also called a VA Streamline.',
    relatedTerms: ['Refinance', 'Cash-Out Refinance'],
    category: 'loan-terms',
  },
  {
    id: 'assumable',
    term: 'Assumable Loan',
    definition: 'A VA loan feature allowing a qualified buyer to take over your loan and its terms when you sell.',
    relatedTerms: ['Transfer', 'Release of Liability'],
    category: 'loan-terms',
  },
  {
    id: 'dd214',
    term: 'DD Form 214',
    definition: 'Certificate of Release or Discharge from Active Duty, showing your military service history.',
    relatedTerms: ['COE', 'Service Requirements'],
    category: 'requirements',
  },
  {
    id: 'debt-to-income',
    term: 'Debt-to-Income Ratio (DTI)',
    definition: 'Your monthly debt payments divided by gross monthly income. VA typically requires 41% or less.',
    relatedTerms: ['Residual Income', 'Credit Score'],
    category: 'financial',
  },
  {
    id: 'residual-income',
    term: 'Residual Income',
    definition: 'The amount of money left over each month after paying all debts and expenses. VA has specific requirements by region and family size.',
    relatedTerms: ['DTI', 'Qualification'],
    category: 'financial',
  },
  {
    id: 'tidewater',
    term: 'Tidewater Process',
    definition: 'A VA appraisal procedure when the appraised value may come in below the purchase price, allowing agents to provide additional comparables.',
    relatedTerms: ['Appraisal', 'Value'],
    category: 'process',
  },
];

export const PURCHASE_FAQS: FAQ[] = [
  {
    id: 'down-payment-required',
    question: 'Do I need a down payment for a VA loan?',
    answer: 'No! One of the biggest benefits of VA loans is that qualified borrowers can purchase a home with 0% down payment. However, you may choose to make a down payment to lower your monthly payment or reduce the funding fee.',
    category: 'costs',
  },
  {
    id: 'credit-score-minimum',
    question: 'What credit score do I need for a VA loan?',
    answer: 'The VA doesn\'t set a minimum credit score requirement, but most lenders require at least 620. Some lenders may work with scores as low as 580. Your credit score affects your interest rate, so improving it before applying can save you money.',
    category: 'eligibility',
  },
  {
    id: 'closing-costs',
    question: 'Who pays closing costs on a VA loan?',
    answer: 'As the buyer, you\'re typically responsible for closing costs (usually 3-5% of the loan amount). However, you can negotiate for the seller to pay some or all closing costs, or finance some costs into the loan. The VA limits certain fees lenders can charge you.',
    category: 'costs',
  },
  {
    id: 'property-types',
    question: 'What types of properties can I buy with a VA loan?',
    answer: 'VA loans can be used for single-family homes, condos (if VA-approved), multi-unit properties (up to 4 units if you live in one), and manufactured homes that meet VA requirements. The property must be your primary residence.',
    category: 'property',
  },
  {
    id: 'multiple-va-loans',
    question: 'Can I have more than one VA loan at a time?',
    answer: 'Yes! If you have remaining entitlement, you can have multiple VA loans simultaneously. This is common when relocating for military service. Your lender can help determine your remaining entitlement.',
    category: 'eligibility',
  },
  {
    id: 'va-appraisal-time',
    question: 'How long does the VA appraisal take?',
    answer: 'VA appraisals typically take 10-14 business days from when ordered, though this varies by location and appraiser availability. In busy markets, it may take longer. Your lender orders the appraisal after your offer is accepted.',
    category: 'process',
  },
  {
    id: 'offer-competitiveness',
    question: 'Are VA loan offers less competitive?',
    answer: 'While some sellers may have misconceptions about VA loans, they\'re actually very reliable. VA loans have similar closing timelines to conventional loans. Work with an experienced agent who can educate sellers about VA loan benefits like assumability.',
    category: 'process',
  },
  {
    id: 'inspection-required',
    question: 'Is a home inspection required for VA loans?',
    answer: 'A home inspection is not required by the VA, but it\'s highly recommended. The VA appraisal checks for MPRs but isn\'t as thorough as a full inspection. An inspection protects you by identifying potential issues before purchase.',
    category: 'property',
  },
  {
    id: 'pmi-required',
    question: 'Do VA loans require PMI?',
    answer: 'No! VA loans do not require Private Mortgage Insurance (PMI) regardless of your down payment. This saves you hundreds of dollars monthly compared to conventional loans with less than 20% down.',
    category: 'costs',
  },
  {
    id: 'closing-timeline',
    question: 'How long does it take to close on a VA loan?',
    answer: 'VA loans typically close in 30-45 days, similar to conventional loans. The timeline depends on various factors including appraisal scheduling, underwriting complexity, and how quickly you provide requested documents.',
    category: 'closing',
  },
];

export const RESOURCE_LINKS = [
  {
    title: 'VA Loan Payment Calculator',
    description: 'Calculate your monthly payment with VA loan benefits',
    url: '/calculators/mortgage',
    icon: 'Calculator',
  },
  {
    title: 'Affordability Calculator',
    description: 'Determine how much home you can afford',
    url: '/calculators/affordability',
    icon: 'DollarSign',
  },
  {
    title: 'Funding Fee Calculator',
    description: 'Calculate your VA funding fee',
    url: '/calculators/funding-fee',
    icon: 'Percent',
  },
  {
    title: 'Rent vs Buy Calculator',
    description: 'See if buying makes financial sense',
    url: '/calculators/rent-vs-buy',
    icon: 'Home',
  },
];

export const DOWNLOADABLE_GUIDES = [
  {
    id: 'first-time-buyer',
    title: 'First-Time VA Homebuyer\'s Guide',
    description: 'Complete 40-page guide covering everything you need to know',
    fileSize: '2.5 MB',
    format: 'PDF',
    url: '/downloads/first-time-va-homebuyer-guide.pdf',
  },
  {
    id: 'va-loan-checklist',
    title: 'VA Loan Document Checklist',
    description: 'List of all documents you\'ll need for your VA loan',
    fileSize: '150 KB',
    format: 'PDF',
    url: '/downloads/va-loan-document-checklist.pdf',
  },
  {
    id: 'mpr-guide',
    title: 'VA Property Requirements Guide',
    description: 'Detailed guide to VA Minimum Property Requirements',
    fileSize: '1.8 MB',
    format: 'PDF',
    url: '/downloads/va-mpr-guide.pdf',
  },
];