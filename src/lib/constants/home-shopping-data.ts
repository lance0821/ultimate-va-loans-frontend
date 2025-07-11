export interface ShoppingTip {
  id: string;
  category: 'finding' | 'agents' | 'appraisal' | 'offers';
  title: string;
  description: string;
  tips: string[];
  icon: string;
}

export interface PropertyRequirement {
  category: string;
  requirements: string[];
  commonIssues?: string[];
}

export interface ChecklistItem {
  id: string;
  category: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
}

export const HOME_SHOPPING_TIPS: ShoppingTip[] = [
  {
    id: 'finding-properties',
    category: 'finding',
    title: 'Finding VA-Approved Properties',
    description: 'What makes a property eligible for VA financing',
    icon: 'Home',
    tips: [
      'Any residential property can potentially qualify for VA financing',
      'Property must be your primary residence (no investment properties)',
      'Condos must be on the VA-approved condo list',
      'Manufactured homes must meet VA requirements',
      'Multi-unit properties (up to 4 units) allowed if you occupy one',
      'Property must meet VA Minimum Property Requirements (MPRs)',
    ],
  },
  {
    id: 'working-with-agents',
    category: 'agents',
    title: 'Working with VA-Savvy Real Estate Agents',
    description: 'How to find and work with agents who understand VA loans',
    icon: 'Users',
    tips: [
      'Ask agents about their experience with VA loans',
      'Ensure they understand VA loan timelines (typically 30-45 days)',
      'Verify they know about VA appraisal requirements',
      'Good agents will help position your VA offer competitively',
      'They should know which repairs are VA-required vs negotiable',
      'Ask for references from other veteran clients',
    ],
  },
  {
    id: 'va-appraisal-process',
    category: 'appraisal',
    title: 'Understanding VA Appraisals',
    description: 'What to expect from the VA appraisal process',
    icon: 'ClipboardCheck',
    tips: [
      'VA appraisals determine value AND ensure property meets MPRs',
      'Appraisal is valid for 6 months',
      'Typically takes 10-14 business days',
      'Appraisal fee is paid by the buyer (usually $500-$800)',
      'If appraisal is low, you can negotiate, pay difference, or walk away',
      'Tidewater process allows agent to provide comparable sales',
    ],
  },
  {
    id: 'competitive-offers',
    category: 'offers',
    title: 'Making Competitive VA Offers',
    description: 'Strategies to win in competitive markets with VA financing',
    icon: 'TrendingUp',
    tips: [
      'Get fully underwritten pre-approval, not just pre-qualification',
      'Offer strong earnest money to show commitment',
      'Be flexible on closing date to meet seller needs',
      'Consider paying your own closing costs',
      'Write a personal letter to the seller (where allowed)',
      'Highlight VA loan benefits like assumability',
      'Work with a lender who can close quickly',
      'Don\'t waive inspection - it protects you and is VA-required',
    ],
  },
];

export const MINIMUM_PROPERTY_REQUIREMENTS: PropertyRequirement[] = [
  {
    category: 'Safety & Structural',
    requirements: [
      'Safe, structurally sound, and sanitary',
      'Adequate heating system',
      'Safe electrical system with no exposed wiring',
      'Roofing that prevents moisture entry',
      'Working plumbing with potable water',
      'No lead-based paint hazards',
    ],
    commonIssues: [
      'Missing handrails on stairs',
      'Broken windows',
      'Peeling paint (pre-1978 homes)',
      'Wood-destroying insect damage',
    ],
  },
  {
    category: 'Access & Utilities',
    requirements: [
      'Safe access from street to property',
      'Each bedroom has exterior access (window/door)',
      'Functioning utilities (electric, heat, water)',
      'Proper sewage disposal',
      'Adequate space for living',
    ],
    commonIssues: [
      'Shared driveways without legal agreements',
      'Bedrooms without proper egress windows',
      'Well/septic systems needing inspection',
    ],
  },
  {
    category: 'Property Condition',
    requirements: [
      'No obvious health/safety hazards',
      'Crawl spaces properly vented and accessible',
      'Appliances (if included) must be operational',
      'HVAC systems must function properly',
      'No pooling water against foundation',
    ],
    commonIssues: [
      'Non-functioning appliances left with home',
      'Standing water in crawl space',
      'HVAC systems at end of life',
    ],
  },
];

export const SHOPPING_CHECKLIST: ChecklistItem[] = [
  // Before You Start Shopping
  {
    id: 'coe-obtained',
    category: 'Before Shopping',
    text: 'Obtain Certificate of Eligibility (COE)',
    priority: 'high',
  },
  {
    id: 'pre-approval',
    category: 'Before Shopping',
    text: 'Get fully underwritten pre-approval letter',
    priority: 'high',
  },
  {
    id: 'budget-determined',
    category: 'Before Shopping',
    text: 'Determine comfortable monthly payment budget',
    priority: 'high',
  },
  {
    id: 'down-payment-ready',
    category: 'Before Shopping',
    text: 'Save for earnest money and closing costs',
    priority: 'high',
  },
  {
    id: 'credit-check',
    category: 'Before Shopping',
    text: 'Review credit report for accuracy',
    priority: 'medium',
  },
  
  // Finding an Agent
  {
    id: 'agent-interviews',
    category: 'Finding an Agent',
    text: 'Interview 2-3 agents with VA loan experience',
    priority: 'high',
  },
  {
    id: 'agent-references',
    category: 'Finding an Agent',
    text: 'Check references from veteran clients',
    priority: 'medium',
  },
  {
    id: 'agent-agreement',
    category: 'Finding an Agent',
    text: 'Sign buyer\'s representation agreement',
    priority: 'medium',
  },
  
  // Property Search
  {
    id: 'location-priorities',
    category: 'Property Search',
    text: 'List must-haves vs nice-to-haves',
    priority: 'high',
  },
  {
    id: 'neighborhood-research',
    category: 'Property Search',
    text: 'Research neighborhoods and schools',
    priority: 'high',
  },
  {
    id: 'commute-test',
    category: 'Property Search',
    text: 'Test commute during rush hour',
    priority: 'medium',
  },
  {
    id: 'property-age',
    category: 'Property Search',
    text: 'Note property age (lead paint if pre-1978)',
    priority: 'medium',
  },
  
  // Making an Offer
  {
    id: 'comps-review',
    category: 'Making an Offer',
    text: 'Review comparable sales with agent',
    priority: 'high',
  },
  {
    id: 'offer-strategy',
    category: 'Making an Offer',
    text: 'Discuss offer strategy and contingencies',
    priority: 'high',
  },
  {
    id: 'earnest-money',
    category: 'Making an Offer',
    text: 'Prepare earnest money deposit',
    priority: 'high',
  },
  {
    id: 'personal-letter',
    category: 'Making an Offer',
    text: 'Write personal letter to seller (if appropriate)',
    priority: 'low',
  },
  
  // After Offer Acceptance
  {
    id: 'inspection-schedule',
    category: 'After Acceptance',
    text: 'Schedule home inspection immediately',
    priority: 'high',
  },
  {
    id: 'appraisal-order',
    category: 'After Acceptance',
    text: 'Ensure lender orders VA appraisal',
    priority: 'high',
  },
  {
    id: 'insurance-quotes',
    category: 'After Acceptance',
    text: 'Get homeowner\'s insurance quotes',
    priority: 'high',
  },
  {
    id: 'title-review',
    category: 'After Acceptance',
    text: 'Review title commitment',
    priority: 'medium',
  },
  {
    id: 'closing-funds',
    category: 'After Acceptance',
    text: 'Prepare funds for closing',
    priority: 'high',
  },
];

export const VA_APPRAISAL_TIMELINE = [
  { phase: 'Order Placed', days: '1-2 days after contract' },
  { phase: 'Appraiser Assigned', days: '2-3 days' },
  { phase: 'Property Inspection', days: '5-7 days' },
  { phase: 'Report Completed', days: '2-3 days' },
  { phase: 'VA Review', days: '2-3 days' },
  { phase: 'Total Timeline', days: '10-14 business days' },
];