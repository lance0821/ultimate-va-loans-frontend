import { render, screen } from '@testing-library/react';
import PurchaseHeroSection from '../PurchaseHeroSection';

describe('PurchaseHeroSection', () => {
  it('renders the main headline', () => {
    render(<PurchaseHeroSection />);
    expect(screen.getByText('Purchase a Home with Your VA Loan')).toBeInTheDocument();
  });

  it('displays 0% down payment benefit', () => {
    render(<PurchaseHeroSection />);
    expect(screen.getByText(/0% down payment/)).toBeInTheDocument();
  });

  it('shows all four key benefits', () => {
    render(<PurchaseHeroSection />);
    expect(screen.getByText(/No down payment required/)).toBeInTheDocument();
    expect(screen.getByText(/No private mortgage insurance/)).toBeInTheDocument();
    expect(screen.getByText(/Competitive interest rates/)).toBeInTheDocument();
    expect(screen.getByText(/Limited closing costs/)).toBeInTheDocument();
  });

  it('renders both CTA buttons with correct links', () => {
    render(<PurchaseHeroSection />);
    
    const eligibilityButton = screen.getByRole('link', { name: /Check Your Eligibility/i });
    expect(eligibilityButton).toHaveAttribute('href', '/eligibility/check');
    
    const preApprovalButton = screen.getByRole('link', { name: /Get Pre-Approved/i });
    expect(preApprovalButton).toHaveAttribute('href', '/get-started');
  });

  it('displays trust indicator text', () => {
    render(<PurchaseHeroSection />);
    expect(screen.getByText(/20,000 veterans/)).toBeInTheDocument();
  });

  it('renders hero image with proper alt text', () => {
    render(<PurchaseHeroSection />);
    const image = screen.getByAltText(/military family/i);
    expect(image).toBeInTheDocument();
  });

  it('shows VA loan approved badge', () => {
    render(<PurchaseHeroSection />);
    expect(screen.getByText('VA Loan Approved')).toBeInTheDocument();
    expect(screen.getByText('0% Down Payment')).toBeInTheDocument();
  });
});