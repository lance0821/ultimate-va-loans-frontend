import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import StoryCard from '../StoryCard';
import { SUCCESS_STORIES } from '@/lib/constants/success-stories-data';

expect.extend(toHaveNoViolations);

const mockStory = SUCCESS_STORIES[0];
const mockOnReadMore = jest.fn();

describe('StoryCard', () => {
  beforeEach(() => {
    mockOnReadMore.mockClear();
  });

  it('renders story information correctly', () => {
    render(<StoryCard story={mockStory} onReadMore={mockOnReadMore} />);
    
    expect(screen.getByText(mockStory.name)).toBeInTheDocument();
    expect(screen.getByText(mockStory.branch)).toBeInTheDocument();
    expect(screen.getByText(mockStory.location)).toBeInTheDocument();
    expect(screen.getByText(mockStory.quote)).toBeInTheDocument();
  });

  it('displays story image with correct alt text', () => {
    render(<StoryCard story={mockStory} onReadMore={mockOnReadMore} />);
    
    const image = screen.getByAltText(`${mockStory.name} - Veteran Success Story`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockStory.image);
  });

  it('shows financial details', () => {
    render(<StoryCard story={mockStory} onReadMore={mockOnReadMore} />);
    
    expect(screen.getByText('Purchase Price')).toBeInTheDocument();
    expect(screen.getByText('Monthly Savings')).toBeInTheDocument();
    expect(screen.getByText('Closing Time')).toBeInTheDocument();
  });

  it('formats currency correctly', () => {
    render(<StoryCard story={mockStory} onReadMore={mockOnReadMore} />);
    
    const purchasePrice = screen.getByText(/\$[0-9,]+/);
    expect(purchasePrice).toBeInTheDocument();
  });

  it('calls onReadMore when Read Full Story button is clicked', () => {
    render(<StoryCard story={mockStory} onReadMore={mockOnReadMore} />);
    
    const readMoreButton = screen.getByText('Read Full Story');
    fireEvent.click(readMoreButton);
    
    expect(mockOnReadMore).toHaveBeenCalledWith(mockStory);
    expect(mockOnReadMore).toHaveBeenCalledTimes(1);
  });

  it('displays before/after preview', () => {
    render(<StoryCard story={mockStory} onReadMore={mockOnReadMore} />);
    
    expect(screen.getByText('Before:')).toBeInTheDocument();
    expect(screen.getByText('After:')).toBeInTheDocument();
  });

  it('shows video indicator when video testimonial exists', () => {
    const storyWithVideo = {
      ...mockStory,
      videoTestimonial: {
        url: 'https://example.com/video',
        duration: '3:45',
        thumbnail: '/images/thumbnail.jpg'
      }
    };
    
    render(<StoryCard story={storyWithVideo} onReadMore={mockOnReadMore} />);
    
    expect(screen.getByText('Video Available')).toBeInTheDocument();
  });

  it('does not show video indicator when no video testimonial', () => {
    const storyWithoutVideo = {
      ...mockStory,
      videoTestimonial: undefined
    };
    
    render(<StoryCard story={storyWithoutVideo} onReadMore={mockOnReadMore} />);
    
    expect(screen.queryByText('Video Available')).not.toBeInTheDocument();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<StoryCard story={mockStory} onReadMore={mockOnReadMore} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper button role and is clickable', () => {
    render(<StoryCard story={mockStory} onReadMore={mockOnReadMore} />);
    
    const button = screen.getByRole('button', { name: 'Read Full Story' });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('has proper semantic structure', () => {
    render(<StoryCard story={mockStory} onReadMore={mockOnReadMore} />);
    
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays correct number of days for closing time', () => {
    render(<StoryCard story={mockStory} onReadMore={mockOnReadMore} />);
    
    expect(screen.getByText(`${mockStory.details.closingTime} days`)).toBeInTheDocument();
  });
});