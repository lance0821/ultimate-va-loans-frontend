'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  checkEligibility, 
  DISCHARGE_TYPES,
  type EligibilityCheckResult 
} from '@/lib/constants/va-eligibility-criteria';

interface FormData {
  serviceType: string;
  startDate: string;
  endDate?: string;
  stillServing: boolean;
  dischargeType?: string;
  isSurvivingSpouse: boolean;
}

export default function EligibilityChecker() {
  const [result, setResult] = useState<EligibilityCheckResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      serviceType: 'activeRegular',
      stillServing: false,
      isSurvivingSpouse: false,
    },
  });

  const stillServing = watch('stillServing');
  const isSurvivingSpouse = watch('isSurvivingSpouse');

  const onSubmit = (data: FormData) => {
    setIsChecking(true);
    
    // Simulate processing
    setTimeout(() => {
      const serviceDates = {
        start: new Date(data.startDate),
        end: data.stillServing ? undefined : data.endDate ? new Date(data.endDate) : undefined,
      };

      const result = checkEligibility(
        data.serviceType,
        serviceDates,
        data.dischargeType || 'honorable',
        data.isSurvivingSpouse
      );

      setResult(result);
      setIsChecking(false);
    }, 500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-blue-600" />
          Check Your VA Loan Eligibility
        </CardTitle>
        <CardDescription>
          Answer a few questions to see if you may qualify for VA loan benefits
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Surviving Spouse Check */}
          <div className="space-y-2">
            <Label htmlFor="survivingSpouse">Are you a surviving spouse?</Label>
            <RadioGroup
              defaultValue="false"
              onValueChange={(value) => {
                const form = document.getElementById('eligibility-form') as HTMLFormElement;
                if (form) {
                  const input = form.elements.namedItem('isSurvivingSpouse') as HTMLInputElement;
                  if (input) input.value = value;
                }
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="spouse-no" />
                <Label htmlFor="spouse-no" className="font-normal">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="spouse-yes" />
                <Label htmlFor="spouse-yes" className="font-normal">Yes</Label>
              </div>
            </RadioGroup>
            <input type="hidden" {...register('isSurvivingSpouse')} />
          </div>

          {!isSurvivingSpouse && (
            <>
              {/* Service Type */}
              <div className="space-y-2">
                <Label htmlFor="serviceType">Type of Service</Label>
                <Select {...register('serviceType', { required: 'Please select your service type' })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activeRegular">Active Duty - Regular Military</SelectItem>
                    <SelectItem value="nationalGuard">National Guard</SelectItem>
                    <SelectItem value="reserves">Reserves</SelectItem>
                  </SelectContent>
                </Select>
                {errors.serviceType && (
                  <p className="text-sm text-red-600">{errors.serviceType.message}</p>
                )}
              </div>

              {/* Service Dates */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Service Start Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      {...register('startDate', { required: 'Start date is required' })}
                      className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  {errors.startDate && (
                    <p className="text-sm text-red-600">{errors.startDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stillServing">Currently Serving?</Label>
                  <RadioGroup
                    defaultValue="false"
                    onValueChange={(value) => {
                      const form = document.getElementById('eligibility-form') as HTMLFormElement;
                      if (form) {
                        const input = form.elements.namedItem('stillServing') as HTMLInputElement;
                        if (input) input.value = value;
                      }
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="serving-no" />
                      <Label htmlFor="serving-no" className="font-normal">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="serving-yes" />
                      <Label htmlFor="serving-yes" className="font-normal">Yes</Label>
                    </div>
                  </RadioGroup>
                  <input type="hidden" {...register('stillServing')} />
                </div>
              </div>

              {!stillServing && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Service End Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        {...register('endDate', { 
                          required: stillServing ? false : 'End date is required' 
                        })}
                        className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    {errors.endDate && (
                      <p className="text-sm text-red-600">{errors.endDate.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dischargeType">Discharge Type</Label>
                    <Select {...register('dischargeType', { 
                      required: stillServing ? false : 'Please select discharge type' 
                    })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select discharge type" />
                      </SelectTrigger>
                      <SelectContent>
                        {DISCHARGE_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.dischargeType && (
                      <p className="text-sm text-red-600">{errors.dischargeType.message}</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isChecking}
            id="eligibility-form"
          >
            {isChecking ? 'Checking Eligibility...' : 'Check My Eligibility'}
          </Button>
        </form>

        {/* Results */}
        {result && (
          <div className="mt-6 space-y-4">
            <Alert className={result.isEligible ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
              <div className="flex items-start gap-2">
                {result.isEligible ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <AlertTitle className={result.isEligible ? 'text-green-900' : 'text-yellow-900'}>
                    {result.isEligible ? 'You May Be Eligible!' : 'Additional Review Needed'}
                  </AlertTitle>
                  <AlertDescription className={result.isEligible ? 'text-green-800' : 'text-yellow-800'}>
                    {result.reason}
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            {/* Next Steps */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Recommended Next Steps:</h4>
              <ul className="space-y-2">
                {result.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warnings */}
            {result.warnings && result.warnings.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1">
                    {result.warnings.map((warning, index) => (
                      <li key={index} className="text-sm">{warning}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              {result.isEligible ? (
                <>
                  <Button asChild className="flex-1">
                    <a
                      href="https://www.va.gov/housing-assistance/home-loans/request-coe-form-26-1880/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Request Certificate of Eligibility
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <a href="/get-started">Get Pre-Approved</a>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="flex-1">
                    <a
                      href="https://www.va.gov/discharge-upgrade-instructions/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn About Discharge Upgrades
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <a href="/contact">Contact a Specialist</a>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}