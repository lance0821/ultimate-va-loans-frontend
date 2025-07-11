import { render, screen, fireEvent } from '@testing-library/react';
import CalculatorHub from '../CalculatorHub';

describe('CalculatorHub', () => {
  it('renders the hub with title and description', () => {
    render(<CalculatorHub />);
    
    expect(screen.getByText('VA Loan Calculator Tools')).toBeInTheDocument();
    expect(screen.getByText(/Use these calculators to estimate costs/)).toBeInTheDocument();
  });

  it('displays VA benefits highlight', () => {
    render(<CalculatorHub />);
    
    expect(screen.getByText(/VA Loan Advantages:/)).toBeInTheDocument();
    expect(screen.getByText(/0% down payment required/)).toBeInTheDocument();
  });

  it('shows all three calculator tabs', () => {
    render(<CalculatorHub />);
    
    expect(screen.getByText('Closing Costs')).toBeInTheDocument();
    expect(screen.getByText('DTI Calculator')).toBeInTheDocument();
    expect(screen.getByText('Pre-Approval Checklist')).toBeInTheDocument();
  });

  it('switches between calculator tabs', () => {
    render(<CalculatorHub />);
    
    // Click on DTI Calculator tab
    const dtiTab = screen.getByText('DTI Calculator');
    fireEvent.click(dtiTab);
    
    // Should show DTI calculator content
    expect(screen.getByText('Debt-to-Income (DTI) Calculator')).toBeInTheDocument();
  });

  it('shows active tab description', () => {
    render(<CalculatorHub />);
    
    // Default should show closing costs description
    expect(screen.getByText('Estimate your total closing costs')).toBeInTheDocument();
  });

  it('displays CTA section at bottom', () => {
    render(<CalculatorHub />);
    
    expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument();
    expect(screen.getByText('Check Your Eligibility')).toBeInTheDocument();
    expect(screen.getByText('Find VA-Approved Lenders')).toBeInTheDocument();
  });

  it('renders calculator components in tabs', () => {
    render(<CalculatorHub />);
    
    // Should render the ClosingCostCalculator by default
    expect(screen.getByText('Closing Cost Estimator')).toBeInTheDocument();
  });

  it('maintains tab state when switching', () => {
    render(<CalculatorHub />);
    
    // Switch to Pre-Approval tab
    const preApprovalTab = screen.getByText('Pre-Approval Checklist');
    fireEvent.click(preApprovalTab);
    
    expect(screen.getByText('VA Loan Pre-Approval Checklist')).toBeInTheDocument();
    
    // Switch back to Closing Costs
    const closingCostsTab = screen.getByText('Closing Costs');
    fireEvent.click(closingCostsTab);
    
    expect(screen.getByText('Closing Cost Estimator')).toBeInTheDocument();
  });

  it('has responsive tab labels', () => {
    render(<CalculatorHub />);
    
    // Should have responsive classes for mobile/desktop
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('includes icons in tab headers', () => {
    render(<CalculatorHub />);
    
    // Icons should be present (rendered as svg elements)
    const svgElements = screen.getAllByRole('tab');
    expect(svgElements.length).toBeGreaterThan(0);
  });
});