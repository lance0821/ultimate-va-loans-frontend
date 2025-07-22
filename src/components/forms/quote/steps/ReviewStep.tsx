'use client'

import { Button } from '@/components/ui/button'
import { useQuoteForm } from '../QuoteFormProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info, Home, User, DollarSign, Shield, Check } from 'lucide-react'
import { formatCurrency, formatPhoneNumber } from '@/lib/utils/formatting'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

export function ReviewStep() {
  const { form, previousStep, submitForm, isSubmitting } = useQuoteForm()
  
  const formData = form.getValues()
  
  const handleSubmit = async () => {
    // Validate consent fields
    const isValid = await form.trigger(['agreedToTerms', 'consentToContact'])
    
    if (isValid) {
      await submitForm()
    }
  }
  
  // Format loan purpose display
  const getLoanPurposeDisplay = (purpose: string) => {
    const labels: Record<string, string> = {
      purchase: 'Purchase a Home',
      refinance: 'Refinance Existing Loan',
      cashout: 'Cash-Out Refinance',
    }
    return labels[purpose] || purpose
  }
  
  // Format property type display
  const getPropertyTypeDisplay = (type: string) => {
    const labels: Record<string, string> = {
      single_family: 'Single Family Home',
      condo: 'Condominium',
      townhouse: 'Townhouse',
      multi_family: 'Multi-Family',
      manufactured: 'Manufactured Home',
      other: 'Other',
    }
    return labels[type] || type
  }
  
  return (
    <Form {...form}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Review Your Information</h2>
          <p className="text-muted-foreground">Please review your information before submitting</p>
        </div>
        
        {/* Summary Cards */}
        <div className="space-y-4">
          {/* Loan Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Home className="h-5 w-5" />
                Loan Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loan Purpose:</span>
                <span className="font-medium">{getLoanPurposeDisplay(formData.loanPurpose || '')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Property Type:</span>
                <span className="font-medium">{getPropertyTypeDisplay(formData.propertyType)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Property Location:</span>
                <span className="font-medium">{formData.propertyZipCode}, {formData.propertyState}</span>
              </div>
              {formData.loanPurpose === 'purchase' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purchase Price:</span>
                    <span className="font-medium">{formatCurrency(formData.purchasePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Down Payment:</span>
                    <span className="font-medium">{formatCurrency(formData.downPaymentAmount)}</span>
                  </div>
                </>
              )}
              {(formData.loanPurpose === 'refinance' || formData.loanPurpose === 'cashout') && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Home Value:</span>
                    <span className="font-medium">{formatCurrency(formData.estimatedHomeValue || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Loan Balance:</span>
                    <span className="font-medium">{formatCurrency(formData.currentLoanBalance || 0)}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          {/* Military Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Military Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Branch:</span>
                <span className="font-medium capitalize">{formData.branch?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium capitalize">{formData.serviceStatus?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">VA Disability:</span>
                <span className="font-medium">
                  {formData.hasVADisability ? `Yes (${formData.disabilityRating}%)` : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Previous VA Loan:</span>
                <span className="font-medium">{formData.hasUsedVALoanBefore ? 'Yes' : 'No'}</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Financial Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Credit Score:</span>
                <span className="font-medium capitalize">{formData.creditScoreRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Annual Income:</span>
                <span className="font-medium">{formatCurrency(formData.annualIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Employment:</span>
                <span className="font-medium capitalize">{formData.employmentStatus?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Debts:</span>
                <span className="font-medium">{formatCurrency(formData.monthlyDebtPayments)}</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Personal Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{formatPhoneNumber(formData.phone)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Preferred Contact:</span>
                <span className="font-medium capitalize">{formData.preferredContactMethod}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            By submitting this form, you authorize Veterans United to contact you regarding your VA loan inquiry. 
            This is not a loan application or commitment to lend.
          </AlertDescription>
        </Alert>
        
        {/* Consent Checkboxes */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="agreedToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium cursor-pointer">
                    I agree to the Terms of Service and Privacy Policy
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="consentToContact"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium cursor-pointer">
                    I consent to receive calls, texts, and emails about my VA loan inquiry
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        
        {/* Submit Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
            disabled={isSubmitting}
            size="lg"
          >
            Previous
          </Button>
          <Button 
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !form.watch('agreedToTerms') || !form.watch('consentToContact')}
            size="lg"
            className="min-w-[180px]"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">Submitting...</span>
                <span className="animate-spin">⏳</span>
              </>
            ) : (
              <>
                <Check className="mr-2 h-5 w-5" />
                Submit Quote Request
              </>
            )}
          </Button>
        </div>
      </div>
    </Form>
  )
}