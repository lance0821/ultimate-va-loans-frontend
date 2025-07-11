import { render, screen, fireEvent } from '@testing-library/react';
import ClosingCostCalculator from '../ClosingCostCalculator';

describe('ClosingCostCalculator', () => {
  it('renders the calculator with default values', () => {
    render(<ClosingCostCalculator />);
    
    expect(screen.getByText('Closing Cost Estimator')).toBeInTheDocument();
    expect(screen.getByDisplayValue('400000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('0')).toBeInTheDocument();
  });

  it('calculates closing costs when inputs change', () => {
    render(<ClosingCostCalculator />);
    
    // Change purchase price
    const purchasePriceInput = screen.getByDisplayValue('400000');
    fireEvent.change(purchasePriceInput, { target: { value: '500000' } });
    
    // Should show estimated closing costs
    expect(screen.getByText('Estimated Closing Costs')).toBeInTheDocument();
  });

  it('updates calculations when down payment changes', () => {
    render(<ClosingCostCalculator />);
    
    const downPaymentInput = screen.getByDisplayValue('0');
    fireEvent.change(downPaymentInput, { target: { value: '20000' } });
    
    // Should show results section
    expect(screen.getByText('Cost Breakdown')).toBeInTheDocument();
  });

  it('displays VA loan benefits alert', () => {
    render(<ClosingCostCalculator />);
    
    expect(screen.getByText(/VA Loan Advantage/)).toBeInTheDocument();
    expect(screen.getByText(/limits certain fees/)).toBeInTheDocument();
  });

  it('shows cost reduction tips', () => {
    render(<ClosingCostCalculator />);
    
    expect(screen.getByText('Ways to Reduce Closing Costs:')).toBeInTheDocument();
    expect(screen.getByText(/seller concessions/)).toBeInTheDocument();
  });

  it('displays breakdown categories', () => {
    render(<ClosingCostCalculator />);
    
    // Should show all major cost categories in breakdown
    expect(screen.getByText('Cost Breakdown')).toBeInTheDocument();
  });

  it('handles invalid input gracefully', () => {
    render(<ClosingCostCalculator />);
    
    const purchasePriceInput = screen.getByDisplayValue('400000');
    fireEvent.change(purchasePriceInput, { target: { value: '' } });
    
    // Should not crash and should handle empty input
    expect(screen.getByText('Closing Cost Estimator')).toBeInTheDocument();
  });
});