export interface SuccessStory {
  id: string;
  name: string;
  branch: string;
  location: string;
  image: string;
  quote: string;
  beforeAfter: {
    before: {
      situation: string;
      challenges: string[];
    };
    after: {
      outcome: string;
      benefits: string[];
    };
  };
  details: {
    purchasePrice: number;
    downPayment: number;
    closingTime: number; // days
    monthlyPayment: number;
    savedVsRenting: number;
  };
  videoTestimonial?: {
    url: string;
    duration: string;
    thumbnail: string;
  };
}

export interface SuccessMetric {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: string;
}

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'martinez-family',
    name: 'The Martinez Family',
    branch: 'U.S. Army',
    location: 'San Antonio, TX',
    image: '/images/success-stories/martinez-family.jpg',
    quote: 'The VA loan made homeownership possible for our family. Zero down payment meant we could keep our savings for emergencies.',
    beforeAfter: {
      before: {
        situation: 'Renting a 2-bedroom apartment for $1,800/month',
        challenges: [
          'Unable to save for traditional 20% down payment',
          'Worried about qualifying with one income during deployment',
          'Needed more space for growing family',
        ],
      },
      after: {
        outcome: 'Purchased 4-bedroom home with 0% down',
        benefits: [
          'Monthly payment $1,650 (saving $150/month)',
          'Building equity instead of paying rent',
          '2,400 sq ft home with yard for kids',
          'Used savings for furniture and moving costs',
        ],
      },
    },
    details: {
      purchasePrice: 325000,
      downPayment: 0,
      closingTime: 38,
      monthlyPayment: 1650,
      savedVsRenting: 150,
    },
    videoTestimonial: {
      url: 'https://www.youtube.com/embed/example1',
      duration: '2:45',
      thumbnail: '/images/testimonials/martinez-thumb.jpg',
    },
  },
  {
    id: 'johnson-retirement',
    name: 'Chief Johnson',
    branch: 'U.S. Navy (Retired)',
    location: 'Virginia Beach, VA',
    image: '/images/success-stories/johnson.jpg',
    quote: 'After 20 years of service and multiple relocations, we finally found our forever home thanks to the VA loan.',
    beforeAfter: {
      before: {
        situation: 'Living in base housing, preparing for retirement',
        challenges: [
          'No civilian credit history',
          'Transitioning from military to civilian income',
          'Competing in hot real estate market',
        ],
      },
      after: {
        outcome: 'Closed on dream home near the beach',
        benefits: [
          'VA loan accepted in competitive market',
          'No PMI saving $280/month',
          'Seller paid closing costs',
          'Home for retirement years',
        ],
      },
    },
    details: {
      purchasePrice: 450000,
      downPayment: 0,
      closingTime: 42,
      monthlyPayment: 2100,
      savedVsRenting: 280,
    },
  },
  {
    id: 'smith-first-time',
    name: 'Sergeant Smith',
    branch: 'U.S. Air Force',
    location: 'Colorado Springs, CO',
    image: '/images/success-stories/smith.jpg',
    quote: 'As a first-time homebuyer, the VA loan process was smoother than I expected. My lender walked me through everything.',
    beforeAfter: {
      before: {
        situation: 'Single airman living in small apartment',
        challenges: [
          'First-time buyer with no experience',
          'Limited savings after recent PCS move',
          'Unsure about homebuying process',
        ],
      },
      after: {
        outcome: 'Owns 3-bedroom townhome near base',
        benefits: [
          'Building wealth through homeownership',
          'Renting out spare rooms to fellow airmen',
          'Tax benefits of homeownership',
          'Stable housing near work',
        ],
      },
    },
    details: {
      purchasePrice: 285000,
      downPayment: 0,
      closingTime: 35,
      monthlyPayment: 1450,
      savedVsRenting: 200,
    },
    videoTestimonial: {
      url: 'https://www.youtube.com/embed/example2',
      duration: '3:15',
      thumbnail: '/images/testimonials/smith-thumb.jpg',
    },
  },
  {
    id: 'williams-family',
    name: 'The Williams Family',
    branch: 'U.S. Marine Corps',
    location: 'Jacksonville, NC',
    image: '/images/success-stories/williams-family.jpg',
    quote: 'With twins on the way, we needed a bigger home fast. The VA loan streamlined everything and we closed in just 30 days.',
    beforeAfter: {
      before: {
        situation: 'Outgrowing 2-bedroom rental home',
        challenges: [
          'Expanding family needing more space urgently',
          'High rent eating into savings',
          'Wanted to buy before next deployment',
        ],
      },
      after: {
        outcome: 'Purchased 4-bedroom home in family neighborhood',
        benefits: [
          'Plenty of room for growing family',
          'Great school district for kids',
          'Lower monthly payment than rent',
          'Closed quickly before deployment',
        ],
      },
    },
    details: {
      purchasePrice: 295000,
      downPayment: 0,
      closingTime: 30,
      monthlyPayment: 1525,
      savedVsRenting: 275,
    },
  },
];

export const SUCCESS_METRICS: SuccessMetric[] = [
  {
    id: 'total-helped',
    value: '50,000+',
    label: 'Veterans Helped',
    description: 'Families who achieved homeownership through our VA loan program',
    icon: 'Users',
  },
  {
    id: 'total-saved',
    value: '$2.5B',
    label: 'Total Saved',
    description: 'In down payments and PMI for our veteran homeowners',
    icon: 'DollarSign',
  },
  {
    id: 'avg-closing-time',
    value: '32 Days',
    label: 'Average Closing',
    description: 'Fast, efficient closings to get you in your home quickly',
    icon: 'Clock',
  },
  {
    id: 'satisfaction-rate',
    value: '98%',
    label: 'Satisfaction Rate',
    description: 'Of veterans who would recommend us to fellow service members',
    icon: 'ThumbsUp',
  },
];

export const TESTIMONIAL_HIGHLIGHTS = [
  'No down payment required',
  'No PMI ever',
  'Competitive rates',
  'Expert VA loan guidance',
  'Fast closings',
  'Dedicated veteran support',
];

export const getAverageStats = () => {
  const stories = SUCCESS_STORIES;
  const avgClosingTime = Math.round(
    stories.reduce((sum, story) => sum + story.details.closingTime, 0) / stories.length
  );
  const avgMonthlySavings = Math.round(
    stories.reduce((sum, story) => sum + story.details.savedVsRenting, 0) / stories.length
  );
  const totalDownPaymentSaved = stories.reduce(
    (sum, story) => sum + (story.details.purchasePrice * 0.2), // 20% conventional down
    0
  );

  return {
    avgClosingTime,
    avgMonthlySavings,
    totalDownPaymentSaved,
  };
};