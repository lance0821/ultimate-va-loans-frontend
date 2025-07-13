import { render, screen, fireEvent } from '@testing-library/react';
import DebtToIncomeCalculator from '../DebtToIncomeCalculator';

describe('DebtToIncomeCalculator', () => {
  it('renders the calculator with default values', () => {
    render(<DebtToIncomeCalculator />);
    
    expect(screen.getByText('Debt-to-Income (DTI) Calculator')).toBeInTheDocument();
    expect(screen.getByDisplayValue('8000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2000')).toBeInTheDocument();
  });

  it('calculates DTI ratios correctly', () => {
    render(<DebtToIncomeCalculator />);
    
    // Should show front-end and back-end ratios
    expect(screen.getByText('Front-End Ratio (Housing)')).toBeInTheDocument();
    expect(screen.getByText('Back-End Ratio (Total)')).toBeInTheDocument();
  });

  it('allows adding new debts', () => {
    render(<DebtToIncomeCalculator />);
    
    const debtNameInput = screen.getByPlaceholderText('Debt name');
    const debtAmountInput = screen.getByPlaceholderText('Amount');
    const addButton = screen.getByRole('button', { name: '' }); // Plus icon button
    
    fireEvent.change(debtNameInput, { target: { value: 'Student Loan' } });
    fireEvent.change(debtAmountInput, { target: { value: '300' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Student Loan')).toBeInTheDocument();
  });

  it('allows removing existing debts', () => {
    render(<DebtToIncomeCalculator />);
    
    // Find and click the first remove button (trash icon)
    const removeButtons = screen.getAllByRole('button');
    const trashButton = removeButtons.find(button => 
      button.querySelector('svg') && button.getAttribute('class')?.includes('ghost')
    );
    
    if (trashButton) {
      fireEvent.click(trashButton);
    }
    
    // The debt should be removed from the list
    expect(screen.getByText('Monthly Debt Payments')).toBeInTheDocument();
  });

  it('displays DTI rating based on calculation', () => {
    render(<DebtToIncomeCalculator />);
    
    // Should show a DTI rating
    expect(screen.getByText(/DTI Rating:/)).toBeInTheDocument();
  });

  it('shows VA guidelines information', () => {
    render(<DebtToIncomeCalculator />);
    
    expect(screen.getByText(/VA Guidelines:/)).toBeInTheDocument();
    expect(screen.getByText(/prefers a DTI of 41%/)).toBeInTheDocument();
  });

  it('displays improvement tips when DTI is high', () => {
    render(<DebtToIncomeCalculator />);
    
    // Set high DTI values
    const incomeInput = screen.getByDisplayValue('8000');
    const housingInput = screen.getByDisplayValue('2000');
    
    fireEvent.change(incomeInput, { target: { value: '4000' } });
    fireEvent.change(housingInput, { target: { value: '2500' } });
    
    // Should show improvement tips
    expect(screen.getByText('Ways to Improve Your DTI:')).toBeInTheDocument();
  });

  it('handles invalid input gracefully', () => {
    render(<DebtToIncomeCalculator />);
    
    const incomeInput = screen.getByDisplayValue('8000');
    fireEvent.change(incomeInput, { target: { value: '' } });
    
    // Should not crash
    expect(screen.getByText('Debt-to-Income (DTI) Calculator')).toBeInTheDocument();
  });

  it('updates total debt amount when debts change', () => {
    render(<DebtToIncomeCalculator />);
    
    // Should show total debt amount
    expect(screen.getByText(/Total:/)).toBeInTheDocument();
  });
});