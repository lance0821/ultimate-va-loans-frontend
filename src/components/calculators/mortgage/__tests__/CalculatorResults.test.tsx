import { render, screen, fireEvent } from '@testing-library/react'
import { CalculatorResults } from '../CalculatorResults'
import { mockCalculatorResults } from '@/lib/test-utils/mocks'

describe('SimplifiedMortgageCalculator', () => {
  const defaultProps = {
    results: mockCalculatorResults,
    inputs: {
      isFirstTimeUse: true,
      hasDisabilityRating: false,
      downPayment: 10
    }
  }

  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear()
  })

  it('should show only essential payment info by default', () => {
    render(<CalculatorResults {...defaultProps} />)
    
    // Should show primary payment
    expect(screen.getByText('$2,450')).toBeInTheDocument()
    expect(screen.getByText('Principal & Interest: $1,950')).toBeInTheDocument()
    
    // Should NOT show detailed metrics by default
    expect(screen.queryByText('Total Interest Paid')).not.toBeInTheDocument()
    expect(screen.queryByText('Total Amount Paid')).not.toBeInTheDocument()
  })

  it('should toggle details when button clicked', () => {
    render(<CalculatorResults {...defaultProps} />)
    
    const toggleButton = screen.getByRole('button', { name: /view details/i })
    
    // Click to show details
    fireEvent.click(toggleButton)
    
    // Should now show detailed metrics
    expect(screen.getByText('Total Interest Paid')).toBeInTheDocument()
    expect(screen.getByText('Total Amount Paid')).toBeInTheDocument()
    expect(toggleButton).toHaveTextContent('Hide Details')
    
    // Click to hide details
    fireEvent.click(toggleButton)
    
    // Should hide detailed metrics again
    expect(screen.queryByText('Total Interest Paid')).not.toBeInTheDocument()
    expect(toggleButton).toHaveTextContent('View Details')
  })

  it('should persist detail preference in localStorage', () => {
    const { rerender } = render(<CalculatorResults {...defaultProps} />)
    
    // Open details
    fireEvent.click(screen.getByRole('button', { name: /view details/i }))
    
    // Check localStorage
    expect(window.localStorage.getItem('calculator-detail-preference')).toBe('"detailed"')
    
    // Remount component
    rerender(<CalculatorResults {...defaultProps} />)
    
    // Should still show details
    expect(screen.getByText('Total Interest Paid')).toBeInTheDocument()
  })

  it('should have accessible toggle button', () => {
    render(<CalculatorResults {...defaultProps} />)
    
    const toggleButton = screen.getByRole('button', { name: /view details/i })
    
    // Check ARIA attributes
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(toggleButton).toHaveAttribute('aria-controls', 'detailed-results')
    
    // Open details
    fireEvent.click(toggleButton)
    
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('should render correctly on mobile viewport', () => {
    // Mock mobile viewport
    window.innerWidth = 375
    
    render(<CalculatorResults {...defaultProps} />)
    
    // Check for mobile-specific classes
    const container = screen.getByText('Estimated Monthly Payment').closest('div')
    expect(container).toHaveClass('text-center')
    
    // CTA buttons should be stacked vertically
    const ctaContainer = screen.getByText('Get Pre-Approved').closest('div')
    expect(ctaContainer).toHaveClass('flex-col')
  })
})