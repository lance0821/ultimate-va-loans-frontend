import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EligibilityChecker from '../EligibilityChecker';

describe('EligibilityChecker', () => {
  it('renders form elements correctly', () => {
    render(<EligibilityChecker />);
    
    expect(screen.getByText('Check Your VA Loan Eligibility')).toBeInTheDocument();
    expect(screen.getByText('Are you a surviving spouse?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Check My Eligibility' })).toBeInTheDocument();
  });

  it('shows service fields when not a surviving spouse', () => {
    render(<EligibilityChecker />);
    
    // Default should show service fields
    expect(screen.getByText('Type of Service')).toBeInTheDocument();
    expect(screen.getByText('Service Start Date')).toBeInTheDocument();
  });

  it('hides service fields when surviving spouse is selected', async () => {
    render(<EligibilityChecker />);
    
    const survivingSpouseYes = screen.getByLabelText('Yes');
    fireEvent.click(survivingSpouseYes);
    
    // Service fields should be hidden
    expect(screen.queryByText('Type of Service')).not.toBeInTheDocument();
  });

  it('shows discharge fields when not currently serving', () => {
    render(<EligibilityChecker />);
    
    // Default should show discharge fields since stillServing is false
    expect(screen.getByText('Service End Date')).toBeInTheDocument();
    expect(screen.getByText('Discharge Type')).toBeInTheDocument();
  });

  it('submits form and shows results', async () => {
    render(<EligibilityChecker />);
    
    // Fill out form
    const startDateInput = screen.getByLabelText('Service Start Date');
    fireEvent.change(startDateInput, { target: { value: '2020-01-01' } });
    
    const endDateInput = screen.getByLabelText('Service End Date');
    fireEvent.change(endDateInput, { target: { value: '2023-01-01' } });
    
    const submitButton = screen.getByRole('button', { name: 'Check My Eligibility' });
    fireEvent.click(submitButton);
    
    // Check for loading state
    expect(screen.getByText('Checking Eligibility...')).toBeInTheDocument();
    
    // Wait for results
    await waitFor(() => {
      expect(screen.getByText(/You May Be Eligible|Additional Review Needed/)).toBeInTheDocument();
    });
  });

  it('validates required fields', async () => {
    render(<EligibilityChecker />);
    
    const submitButton = screen.getByRole('button', { name: 'Check My Eligibility' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Start date is required')).toBeInTheDocument();
    });
  });

  it('shows appropriate CTAs based on eligibility result', async () => {
    render(<EligibilityChecker />);
    
    // Fill out form with valid active duty service
    const startDateInput = screen.getByLabelText('Service Start Date');
    fireEvent.change(startDateInput, { target: { value: '2020-01-01' } });
    
    const endDateInput = screen.getByLabelText('Service End Date');
    fireEvent.change(endDateInput, { target: { value: '2023-01-01' } });
    
    const submitButton = screen.getByRole('button', { name: 'Check My Eligibility' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Request Certificate of Eligibility')).toBeInTheDocument();
    });
  });

  it('handles surviving spouse eligibility correctly', async () => {
    render(<EligibilityChecker />);
    
    // Select surviving spouse
    const survivingSpouseYes = screen.getByLabelText('Yes');
    fireEvent.click(survivingSpouseYes);
    
    const submitButton = screen.getByRole('button', { name: 'Check My Eligibility' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Surviving spouses.*may qualify/)).toBeInTheDocument();
    });
  });
});