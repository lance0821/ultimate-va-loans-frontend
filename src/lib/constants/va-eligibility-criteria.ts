export interface ServicePeriod {
  name: string;
  startDate: string;
  endDate: string | null;
  isWartime: boolean;
}

export interface EligibilityRequirement {
  category: string;
  minimumService: string;
  additionalRequirements?: string[];
}

export const SERVICE_PERIODS: ServicePeriod[] = [
  {
    name: 'World War II',
    startDate: '1941-09-16',
    endDate: '1946-07-25',
    isWartime: true,
  },
  {
    name: 'Korean War',
    startDate: '1950-06-27',
    endDate: '1955-01-31',
    isWartime: true,
  },
  {
    name: 'Vietnam War',
    startDate: '1964-08-05',
    endDate: '1975-05-07',
    isWartime: true,
  },
  {
    name: 'Persian Gulf War',
    startDate: '1990-08-02',
    endDate: null,
    isWartime: true,
  },
  {
    name: 'Peacetime',
    startDate: '1947-07-26',
    endDate: '1950-06-26',
    isWartime: false,
  },
  {
    name: 'Peacetime',
    startDate: '1955-02-01',
    endDate: '1964-08-04',
    isWartime: false,
  },
  {
    name: 'Peacetime',
    startDate: '1975-05-08',
    endDate: '1980-09-07',
    isWartime: false,
  },
  {
    name: 'Peacetime',
    startDate: '1980-09-08',
    endDate: '1990-08-01',
    isWartime: false,
  },
];

export const ELIGIBILITY_REQUIREMENTS: Record<string, EligibilityRequirement> = {
  activeRegular: {
    category: 'Active Duty - Regular Military',
    minimumService: '90 continuous days',
    additionalRequirements: [
      'Currently on active duty',
      'OR discharged under conditions other than dishonorable',
    ],
  },
  wartimeVeteran: {
    category: 'Wartime Veteran',
    minimumService: '90 days of active service',
    additionalRequirements: [
      'At least 1 day during wartime period',
      'Discharged under conditions other than dishonorable',
      'If enlisted after 9/7/1980, generally need 24 months continuous active duty',
    ],
  },
  peacetimeVeteran: {
    category: 'Peacetime Veteran',
    minimumService: '181 continuous days',
    additionalRequirements: [
      'Discharged under conditions other than dishonorable',
      'If enlisted after 9/7/1980, generally need 24 months continuous active duty',
    ],
  },
  nationalGuard: {
    category: 'National Guard',
    minimumService: '6 years in Selected Reserve or Guard',
    additionalRequirements: [
      'Honorably discharged',
      'OR placed on retired list',
      'OR transferred to Standby Reserve or Ready Reserve',
      'OR continue to serve',
    ],
  },
  reserves: {
    category: 'Reserves',
    minimumService: '6 years in Selected Reserve',
    additionalRequirements: [
      'Honorably discharged',
      'OR placed on retired list',
      'OR transferred to Standby Reserve or Ready Reserve',
      'OR continue to serve',
    ],
  },
  survivingSpouse: {
    category: 'Surviving Spouse',
    minimumService: 'Not applicable',
    additionalRequirements: [
      'Spouse died in service or from service-connected disability',
      'Have not remarried (or remarried after age 57 and after 12/16/2003)',
      'Spouse was not dishonorably discharged',
    ],
  },
};

export const DISCHARGE_TYPES = [
  { value: 'honorable', label: 'Honorable' },
  { value: 'general', label: 'General (Under Honorable Conditions)' },
  { value: 'other-than-honorable', label: 'Other Than Honorable' },
  { value: 'bad-conduct', label: 'Bad Conduct' },
  { value: 'dishonorable', label: 'Dishonorable' },
  { value: 'uncharacterized', label: 'Uncharacterized' },
];

export const ELIGIBLE_DISCHARGE_TYPES = ['honorable', 'general'];

export interface EligibilityCheckResult {
  isEligible: boolean;
  reason: string;
  nextSteps: string[];
  warnings?: string[];
}

export function checkEligibility(
  serviceType: string,
  serviceDates: { start: Date; end?: Date },
  dischargeType: string,
  isSurvivingSpouse: boolean = false
): EligibilityCheckResult {
  // Surviving spouse has different criteria
  if (isSurvivingSpouse) {
    return {
      isEligible: true,
      reason: 'Surviving spouses of eligible veterans may qualify for VA loan benefits.',
      nextSteps: [
        'Gather documentation about your spouse\'s service',
        'Apply for your Certificate of Eligibility',
        'Contact a VA-approved lender',
      ],
      warnings: [
        'You must not have remarried (unless after age 57 and after Dec 16, 2003)',
        'Your spouse must have died in service or from a service-connected disability',
      ],
    };
  }

  // Check discharge type
  if (!ELIGIBLE_DISCHARGE_TYPES.includes(dischargeType)) {
    return {
      isEligible: false,
      reason: `A discharge type of "${dischargeType}" typically does not qualify for VA loan benefits.`,
      nextSteps: [
        'Consider applying for a discharge upgrade',
        'Consult with a Veterans Service Officer',
        'Review your discharge paperwork for specifics',
      ],
      warnings: [
        'Some discharge types may still qualify in certain circumstances',
      ],
    };
  }

  // Calculate service duration
  const serviceMonths = serviceDates.end
    ? Math.floor((serviceDates.end.getTime() - serviceDates.start.getTime()) / (1000 * 60 * 60 * 24 * 30))
    : 0;

  // Check based on service type
  switch (serviceType) {
    case 'activeRegular':
      if (serviceMonths >= 3 || !serviceDates.end) {
        return {
          isEligible: true,
          reason: 'You meet the active duty service requirements for VA loan eligibility.',
          nextSteps: [
            'Request your Certificate of Eligibility (COE)',
            'Find a VA-approved lender',
            'Get pre-approved for your loan amount',
          ],
        };
      }
      break;

    case 'nationalGuard':
    case 'reserves':
      if (serviceMonths >= 72) {
        return {
          isEligible: true,
          reason: 'You meet the Guard/Reserve service requirements for VA loan eligibility.',
          nextSteps: [
            'Request your Certificate of Eligibility (COE)',
            'Ensure you have your NGB Form 22 or discharge papers',
            'Find a VA-approved lender',
          ],
        };
      }
      break;
  }

  return {
    isEligible: false,
    reason: 'Based on the information provided, you may not meet the minimum service requirements.',
    nextSteps: [
      'Review your service records for accuracy',
      'Contact the VA for a formal eligibility determination',
      'Speak with a Veterans Service Officer for assistance',
    ],
    warnings: [
      'This is a preliminary check only - the VA makes final eligibility determinations',
    ],
  };
}