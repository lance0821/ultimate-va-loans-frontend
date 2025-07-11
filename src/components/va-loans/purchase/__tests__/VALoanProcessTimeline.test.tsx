import { render, screen, fireEvent } from '@testing-library/react';
import VALoanProcessTimeline from '../VALoanProcessTimeline';
import { VA_LOAN_PROCESS_STEPS } from '@/lib/constants/va-loan-process';

describe('VALoanProcessTimeline', () => {
  it('renders all process steps', () => {
    render(<VALoanProcessTimeline />);
    
    VA_LOAN_PROCESS_STEPS.forEach(step => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.shortDescription)).toBeInTheDocument();
    });
  });

  it('expands step details when clicked', () => {
    render(<VALoanProcessTimeline />);
    
    const firstStep = screen.getByText(VA_LOAN_PROCESS_STEPS[0].title);
    fireEvent.click(firstStep);
    
    // Check if details are visible
    expect(screen.getByText("What's Involved")).toBeInTheDocument();
    expect(screen.getByText("Helpful Tips")).toBeInTheDocument();
  });

  it('shows active state for first step by default', () => {
    render(<VALoanProcessTimeline />);
    
    const firstStepButton = screen.getByRole('button', {
      name: new RegExp(VA_LOAN_PROCESS_STEPS[0].title)
    });
    
    expect(firstStepButton.parentElement).toHaveClass('border-blue-500');
  });

  it('changes active step when another step is clicked', () => {
    render(<VALoanProcessTimeline />);
    
    const secondStep = screen.getByText(VA_LOAN_PROCESS_STEPS[1].title);
    fireEvent.click(secondStep);
    
    const secondStepButton = screen.getByRole('button', {
      name: new RegExp(VA_LOAN_PROCESS_STEPS[1].title)
    });
    
    expect(secondStepButton.parentElement).toHaveClass('border-blue-500');
  });

  it('displays estimated timeline for each step', () => {
    render(<VALoanProcessTimeline />);
    
    VA_LOAN_PROCESS_STEPS.forEach(step => {
      expect(screen.getByText(step.estimatedTime)).toBeInTheDocument();
    });
  });

  it('renders section header correctly', () => {
    render(<VALoanProcessTimeline />);
    
    expect(screen.getByText('Your VA Loan Journey: 5 Simple Steps')).toBeInTheDocument();
    expect(screen.getByText(/From eligibility to keys in hand/)).toBeInTheDocument();
  });

  it('displays total timeline alert', () => {
    render(<VALoanProcessTimeline />);
    
    expect(screen.getByText(/Total Timeline:/)).toBeInTheDocument();
    expect(screen.getByText(/2-4 months from start to finish/)).toBeInTheDocument();
  });

  it('renders CTA buttons at the bottom', () => {
    render(<VALoanProcessTimeline />);
    
    expect(screen.getByText('Check Your Eligibility')).toBeInTheDocument();
    expect(screen.getByText('Download Complete Guide')).toBeInTheDocument();
  });
});