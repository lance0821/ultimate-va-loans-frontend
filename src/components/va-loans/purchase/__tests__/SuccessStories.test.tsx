import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SuccessStories from '../SuccessStories';

expect.extend(toHaveNoViolations);

describe('SuccessStories', () => {
  it('renders without crashing', () => {
    render(<SuccessStories />);
    expect(screen.getByText('Real Veterans, Real Success Stories')).toBeInTheDocument();
  });

  it('displays success metrics', () => {
    render(<SuccessStories />);
    expect(screen.getByText('10,000+')).toBeInTheDocument();
    expect(screen.getByText('Veterans Helped')).toBeInTheDocument();
  });

  it('renders story cards', () => {
    render(<SuccessStories />);
    expect(screen.getByText('David M.')).toBeInTheDocument();
    expect(screen.getByText('Sarah L.')).toBeInTheDocument();
  });

  it('opens story detail modal when clicking read more', async () => {
    render(<SuccessStories />);
    const readMoreButton = screen.getAllByText('Read Full Story')[0];
    fireEvent.click(readMoreButton);
    
    await waitFor(() => {
      expect(screen.getByText("David M.'s Journey to Homeownership")).toBeInTheDocument();
    });
  });

  it('displays video testimonials section', () => {
    render(<SuccessStories />);
    expect(screen.getByText('Video Testimonials')).toBeInTheDocument();
  });

  it('shows testimonial highlights', () => {
    render(<SuccessStories />);
    expect(screen.getByText('Expert VA Loan Guidance')).toBeInTheDocument();
    expect(screen.getByText('Quick Pre-Approval Process')).toBeInTheDocument();
  });

  it('displays average statistics correctly', () => {
    render(<SuccessStories />);
    expect(screen.getByText('Saved on down payment')).toBeInTheDocument();
    expect(screen.getByText('Save monthly vs renting')).toBeInTheDocument();
    expect(screen.getByText('To close on their home')).toBeInTheDocument();
  });

  it('renders CTA buttons with correct links', () => {
    render(<SuccessStories />);
    const startJourneyButton = screen.getByRole('link', { name: /start your va loan journey/i });
    const talkToExpertButton = screen.getByRole('link', { name: /talk to a va loan expert/i });
    
    expect(startJourneyButton).toHaveAttribute('href', '/get-started');
    expect(talkToExpertButton).toHaveAttribute('href', '/contact');
  });

  it('closes modal when clicking outside or escape', async () => {
    render(<SuccessStories />);
    const readMoreButton = screen.getAllByText('Read Full Story')[0];
    fireEvent.click(readMoreButton);
    
    await waitFor(() => {
      expect(screen.getByText("David M.'s Journey to Homeownership")).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    
    await waitFor(() => {
      expect(screen.queryByText("David M.'s Journey to Homeownership")).not.toBeInTheDocument();
    });
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<SuccessStories />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('displays before and after scenarios in modal', async () => {
    render(<SuccessStories />);
    const readMoreButton = screen.getAllByText('Read Full Story')[0];
    fireEvent.click(readMoreButton);
    
    await waitFor(() => {
      expect(screen.getByText('Before VA Loan')).toBeInTheDocument();
      expect(screen.getByText('After VA Loan')).toBeInTheDocument();
      expect(screen.getByText('The Numbers')).toBeInTheDocument();
    });
  });

  it('formats currency values correctly', () => {
    render(<SuccessStories />);
    expect(screen.getByText(/\$[0-9,]+/)).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<SuccessStories />);
    expect(screen.getByRole('main') || screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getAllByRole('heading')).toHaveLength(4);
  });
});