'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface EligibilityRequirement {
  id: string
  category: string
  requirement: string
  description: string
  qualifying: boolean | null
}

const eligibilityRequirements: EligibilityRequirement[] = [
  {
    id: 'service-active',
    category: 'Active Duty',
    requirement: 'Served 90+ days during wartime OR 181+ days during peacetime',
    description: 'Continuous active duty service periods',
    qualifying: null
  },
  {
    id: 'service-guard',
    category: 'National Guard/Reserve',
    requirement: '6+ years of service OR 90+ days during wartime',
    description: 'Guard/Reserve service requirements',
    qualifying: null
  },
  {
    id: 'service-veteran',
    category: 'Veteran',
    requirement: 'Honorable discharge or general discharge under honorable conditions',
    description: 'Discharge status must meet VA requirements',
    qualifying: null
  },
  {
    id: 'surviving-spouse',
    category: 'Surviving Spouse',
    requirement: 'Spouse of service member who died in service or from service-connected disability',
    description: 'Specific surviving spouse eligibility criteria',
    qualifying: null
  }
]

export function EligibilityChecklist() {
  const [requirements, setRequirements] = useState<EligibilityRequirement[]>(eligibilityRequirements)
  const [showResult, setShowResult] = useState(false)

  const updateRequirement = (id: string, qualifying: boolean) => {
    setRequirements(prev => 
      prev.map(req => 
        req.id === id ? { ...req, qualifying } : req
      )
    )
  }

  const checkEligibility = () => {
    setShowResult(true)
  }

  const getEligibilityStatus = () => {
    const answered = requirements.filter(req => req.qualifying !== null)
    const qualifying = requirements.filter(req => req.qualifying === true)
    
    if (answered.length === 0) return 'incomplete'
    if (qualifying.length > 0) return 'eligible'
    return 'ineligible'
  }

  const status = getEligibilityStatus()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-va-blue" />
          Quick Eligibility Check
        </CardTitle>
        <p className="text-sm text-gray-600">
          Answer these questions to get a preliminary assessment of your VA loan eligibility.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {requirements.map((req) => (
          <div key={req.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <Badge variant="outline" className="mb-2">
                  {req.category}
                </Badge>
                <h4 className="font-medium text-gray-900 mb-1">
                  {req.requirement}
                </h4>
                <p className="text-sm text-gray-600">
                  {req.description}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant={req.qualifying === true ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateRequirement(req.id, true)}
                >
                  Yes
                </Button>
                <Button
                  variant={req.qualifying === false ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateRequirement(req.id, false)}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center pt-4">
          <Button 
            onClick={checkEligibility}
            className="bg-va-blue hover:bg-va-blue/90"
          >
            Check My Eligibility
          </Button>
        </div>

        {showResult && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center gap-3 mb-3">
              {status === 'eligible' && (
                <>
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <h3 className="font-semibold text-green-800">
                    You appear to be eligible for VA loans!
                  </h3>
                </>
              )}
              {status === 'ineligible' && (
                <>
                  <XCircle className="h-6 w-6 text-red-600" />
                  <h3 className="font-semibold text-red-800">
                    You may not be eligible based on these requirements
                  </h3>
                </>
              )}
              {status === 'incomplete' && (
                <>
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                  <h3 className="font-semibold text-amber-800">
                    Please answer all questions for a complete assessment
                  </h3>
                </>
              )}
            </div>
            
            {status === 'eligible' && (
              <div className="space-y-2">
                <p className="text-sm text-gray-700 mb-4">
                  This is a preliminary assessment. Contact us for a detailed eligibility review and to start your application.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-va-blue hover:bg-va-blue/90">
                    Get Started
                  </Button>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            )}
            
            {status === 'ineligible' && (
              <div className="space-y-2">
                <p className="text-sm text-gray-700 mb-4">
                  Don't worry - there may be other options. Contact us to discuss your specific situation.
                </p>
                <Button size="sm" variant="outline">
                  Contact an Expert
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}