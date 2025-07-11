export interface NextStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: {
    type: 'link' | 'button' | 'download';
    label: string;
    href: string;
  };
  highlight?: boolean;
}

export interface ContactOption {
  id: string;
  type: 'phone' | 'email' | 'chat' | 'schedule';
  label: string;
  value: string;
  availability?: string;
  icon: string;
}

export interface Specialist {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  image: string;
  bio: string;
  contact: {
    phone: string;
    email: string;
  };
}

export const NEXT_STEPS: NextStep[] = [
  {
    id: 'check-eligibility',
    title: 'Check Your Eligibility',
    description: 'Confirm your VA loan eligibility in minutes with our online tool',
    icon: 'Shield',
    action: {
      type: 'link',
      label: 'Check Eligibility',
      href: '/eligibility/check',
    },
  },
  {
    id: 'get-preapproved',
    title: 'Get Pre-Approved',
    description: 'Start your official VA loan application and get pre-approved fast',
    icon: 'FileCheck',
    action: {
      type: 'button',
      label: 'Start Application',
      href: '/get-started',
    },
    highlight: true,
  },
  {
    id: 'schedule-consultation',
    title: 'Schedule a Consultation',
    description: 'Speak one-on-one with a VA loan specialist about your situation',
    icon: 'Calendar',
    action: {
      type: 'link',
      label: 'Book Appointment',
      href: '/schedule',
    },
  },
  {
    id: 'download-guide',
    title: 'Download Buyer\'s Guide',
    description: 'Get our comprehensive 40-page VA home buying guide',
    icon: 'Download',
    action: {
      type: 'download',
      label: 'Download PDF',
      href: '/downloads/va-homebuyers-guide.pdf',
    },
  },
];

export const CONTACT_OPTIONS: ContactOption[] = [
  {
    id: 'phone-main',
    type: 'phone',
    label: 'Call Us',
    value: '1-800-VA-LOANS',
    availability: 'Mon-Fri 8am-8pm EST, Sat 9am-5pm EST',
    icon: 'Phone',
  },
  {
    id: 'email-support',
    type: 'email',
    label: 'Email Support',
    value: 'support@ultimatevaloans.com',
    availability: 'Response within 24 hours',
    icon: 'Mail',
  },
  {
    id: 'live-chat',
    type: 'chat',
    label: 'Live Chat',
    value: 'Chat Now',
    availability: 'Available Mon-Fri 8am-8pm EST',
    icon: 'MessageCircle',
  },
  {
    id: 'schedule-call',
    type: 'schedule',
    label: 'Schedule a Call',
    value: 'Pick a Time',
    availability: 'At your convenience',
    icon: 'CalendarCheck',
  },
];

export const VA_LOAN_SPECIALISTS: Specialist[] = [
  {
    id: 'john-smith',
    name: 'John Smith',
    title: 'Senior VA Loan Specialist',
    specialties: ['First-time buyers', 'Active duty', 'Refinancing'],
    image: '/images/specialists/john-smith.jpg',
    bio: 'Marine Corps veteran with 10+ years helping veterans achieve homeownership.',
    contact: {
      phone: '1-800-VA-LOANS ext. 101',
      email: 'john.smith@ultimatevaloans.com',
    },
  },
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    title: 'VA Loan Specialist',
    specialties: ['Credit repair', 'Complex situations', 'Multi-unit properties'],
    image: '/images/specialists/sarah-johnson.jpg',
    bio: 'Air Force spouse specializing in helping military families navigate VA loans.',
    contact: {
      phone: '1-800-VA-LOANS ext. 102',
      email: 'sarah.johnson@ultimatevaloans.com',
    },
  },
  {
    id: 'mike-williams',
    name: 'Mike Williams',
    title: 'VA Loan Specialist',
    specialties: ['Disabled veterans', 'COE assistance', 'Rural properties'],
    image: '/images/specialists/mike-williams.jpg',
    bio: 'Army veteran dedicated to serving fellow veterans with VA loan expertise.',
    contact: {
      phone: '1-800-VA-LOANS ext. 103',
      email: 'mike.williams@ultimatevaloans.com',
    },
  },
];

export const URGENCY_MESSAGES = [
  'VA loan rates are at historic lows',
  'Home prices are rising - lock in your rate today',
  'Limited inventory - get pre-approved to act fast',
  'Our specialists are standing by to help',
];

export const TRUST_INDICATORS = [
  { icon: 'Shield', text: 'VA-approved lender' },
  { icon: 'Award', text: 'A+ BBB rating' },
  { icon: 'Users', text: '50,000+ veterans served' },
  { icon: 'ThumbsUp', text: '98% satisfaction rate' },
];

export const FAQ_LINKS = [
  { question: 'How long does pre-approval take?', href: '/faq#preapproval-time' },
  { question: 'What documents do I need?', href: '/faq#required-documents' },
  { question: 'Can I use a VA loan more than once?', href: '/faq#multiple-uses' },
  { question: 'What if I have bad credit?', href: '/faq#credit-requirements' },
];