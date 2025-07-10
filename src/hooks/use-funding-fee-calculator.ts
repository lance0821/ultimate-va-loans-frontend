'use client'

import { useState, useCallback, useMemo } from 'react'
import { calculateVAFundingFee, getFundingFeePercentage } from '@/lib/calculators/funding-fee'

export interface FundingFeeCalculatorInputs {
  loanAmount: number
  loanType: 'purchase' | 'refinance'
  refinanceType: 'cashOut' | 'irrrl'
  downPaymentPercent: number
  isFirstTimeUse: boolean
  hasDisabilityRating: boolean
  includeInLoan: boolean
}

export interface FundingFeeCalculatorResults {
  fundingFee: number
  feePercentage: number
  totalLoanWithFee: number
  monthlyImpact: number // Approximate impact on monthly payment
  isExempt: boolean
  exemptionReason?: string
  savingsWithDownPayment?: {
    fivePercent: number
    tenPercent: number
  }
}

const DEFAULT_INPUTS: FundingFeeCalculatorInputs = {
  loanAmount: 350000,
  loanType: 'purchase',
  refinanceType: 'cashOut',
  downPaymentPercent: 0,
  isFirstTimeUse: true,
  hasDisabilityRating: false,
  includeInLoan: true,
}

export function useFundingFeeCalculator(initialInputs?: Partial<FundingFeeCalculatorInputs>) {
  const [inputs, setInputs] = useState<FundingFeeCalculatorInputs>({
    ...DEFAULT_INPUTS,
    ...initialInputs,
  })

  const updateInput = useCallback((field: keyof FundingFeeCalculatorInputs, value: number | boolean | string) => {
    setInputs(prev => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const results = useMemo<FundingFeeCalculatorResults>(() => {
    const { 
      loanAmount, 
      loanType, 
      refinanceType, 
      downPaymentPercent, 
      isFirstTimeUse, 
      hasDisabilityRating,
      includeInLoan 
    } = inputs

    // Check if exempt
    if (hasDisabilityRating) {
      return {
        fundingFee: 0,
        feePercentage: 0,
        totalLoanWithFee: loanAmount,
        monthlyImpact: 0,
        isExempt: true,
        exemptionReason: 'VA disability rating (10% or higher)',
      }
    }

    // Calculate funding fee
    const fundingFee = calculateVAFundingFee({
      loanAmount,
      isFirstTimeUse,
      hasDisabilityRating,
      downPaymentPercent,
      loanType,
      refinanceType: loanType === 'refinance' ? refinanceType : undefined,
    })

    const feePercentage = getFundingFeePercentage(
      isFirstTimeUse,
      hasDisabilityRating,
      downPaymentPercent,
      loanType
    )

    // Calculate total loan amount if fee is included
    const totalLoanWithFee = includeInLoan ? loanAmount + fundingFee : loanAmount

    // Estimate monthly payment impact (30-year loan at 6.5% for demonstration)
    const monthlyRate = 0.065 / 12
    const numPayments = 360
    const monthlyImpact = includeInLoan 
      ? (fundingFee * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : 0

    // Calculate potential savings with down payments
    let savingsWithDownPayment
    if (loanType === 'purchase' && downPaymentPercent < 5) {
      const currentFee = fundingFee
      
      // Calculate fee with 5% down
      const feeWith5Down = calculateVAFundingFee({
        loanAmount: loanAmount * 0.95, // Reduced loan amount
        isFirstTimeUse,
        hasDisabilityRating,
        downPaymentPercent: 5,
        loanType,
      })
      
      // Calculate fee with 10% down
      const feeWith10Down = calculateVAFundingFee({
        loanAmount: loanAmount * 0.90, // Reduced loan amount
        isFirstTimeUse,
        hasDisabilityRating,
        downPaymentPercent: 10,
        loanType,
      })
      
      savingsWithDownPayment = {
        fivePercent: currentFee - feeWith5Down,
        tenPercent: currentFee - feeWith10Down,
      }
    }

    return {
      fundingFee,
      feePercentage,
      totalLoanWithFee,
      monthlyImpact,
      isExempt: false,
      savingsWithDownPayment,
    }
  }, [inputs])

  const resetCalculator = useCallback(() => {
    setInputs(DEFAULT_INPUTS)
  }, [])

  return {
    inputs,
    results,
    updateInput,
    resetCalculator,
  }
}