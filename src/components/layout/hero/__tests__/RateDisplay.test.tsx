import { render, screen } from '@testing-library/react'
import { RateDisplay } from '../RateDisplay'
import { currentVARates, formatRate } from '@/lib/constants/va-rates'

describe('RateDisplay', () => {
  it('renders the rate display component', () => {
    render(<RateDisplay />)
    
    // Check header
    expect(screen.getByText("Today's VA Rates")).toBeInTheDocument()
    
    // Check purchase rate is displayed
    expect(screen.getByText(formatRate(currentVARates.purchaseRate))).toBeInTheDocument()
    
    // Check date
    expect(screen.getByText(`As of ${currentVARates.lastUpdated}`)).toBeInTheDocument()
    
    // Check CTA link
    expect(screen.getByText('View All Rates')).toBeInTheDocument()
  })
  
  it('shows both rates when they differ by 0.125% or more', () => {
    render(<RateDisplay />)
    
    const purchaseRate = formatRate(currentVARates.purchaseRate)
    const refinanceRate = formatRate(currentVARates.refinanceRate)
    
    // With default rates (6.875% and 6.750%), both should show
    expect(screen.getByText(purchaseRate)).toBeInTheDocument()
    expect(screen.getByText(refinanceRate)).toBeInTheDocument()
  })
})