import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import TestimonialVideo from '../TestimonialVideo';

expect.extend(toHaveNoViolations);

const mockProps = {
  name: 'John Doe',
  videoUrl: 'https://www.youtube.com/embed/test-video',
  duration: '3:45',
  thumbnail: '/images/test-thumbnail.jpg'
};

describe('TestimonialVideo', () => {
  it('renders video thumbnail correctly', () => {
    render(<TestimonialVideo {...mockProps} />);
    
    const thumbnail = screen.getByAltText(`${mockProps.name} video testimonial`);
    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute('src', mockProps.thumbnail);
  });

  it('displays video duration badge', () => {
    render(<TestimonialVideo {...mockProps} />);
    
    expect(screen.getByText(mockProps.duration)).toBeInTheDocument();
  });

  it('shows play button icon', () => {
    render(<TestimonialVideo {...mockProps} />);
    
    const playButton = screen.getByRole('button');
    expect(playButton).toBeInTheDocument();
  });

  it('displays video title', () => {
    render(<TestimonialVideo {...mockProps} />);
    
    expect(screen.getByText(`Watch ${mockProps.name}'s Story`)).toBeInTheDocument();
  });

  it('opens modal when thumbnail is clicked', async () => {
    render(<TestimonialVideo {...mockProps} />);
    
    const thumbnailButton = screen.getByRole('button');
    fireEvent.click(thumbnailButton);
    
    await waitFor(() => {
      expect(screen.getByText(`${mockProps.name}'s VA Loan Success Story`)).toBeInTheDocument();
    });
  });

  it('displays iframe in modal with correct src', async () => {
    render(<TestimonialVideo {...mockProps} />);
    
    const thumbnailButton = screen.getByRole('button');
    fireEvent.click(thumbnailButton);
    
    await waitFor(() => {
      const iframe = screen.getByTitle(`${mockProps.name} testimonial`);
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute('src', mockProps.videoUrl);
    });
  });

  it('iframe has proper security attributes', async () => {
    render(<TestimonialVideo {...mockProps} />);
    
    const thumbnailButton = screen.getByRole('button');
    fireEvent.click(thumbnailButton);
    
    await waitFor(() => {
      const iframe = screen.getByTitle(`${mockProps.name} testimonial`);
      expect(iframe).toHaveAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      expect(iframe).toHaveAttribute('allowFullScreen');
    });
  });

  it('closes modal when escape key is pressed', async () => {
    render(<TestimonialVideo {...mockProps} />);
    
    const thumbnailButton = screen.getByRole('button');
    fireEvent.click(thumbnailButton);
    
    await waitFor(() => {
      expect(screen.getByText(`${mockProps.name}'s VA Loan Success Story`)).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    
    await waitFor(() => {
      expect(screen.queryByText(`${mockProps.name}'s VA Loan Success Story`)).not.toBeInTheDocument();
    });
  });

  it('has hover effects on thumbnail', () => {
    render(<TestimonialVideo {...mockProps} />);
    
    const thumbnailButton = screen.getByRole('button');
    expect(thumbnailButton).toHaveClass('group');
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<TestimonialVideo {...mockProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('modal has proper dialog role and labeling', async () => {
    render(<TestimonialVideo {...mockProps} />);
    
    const thumbnailButton = screen.getByRole('button');
    fireEvent.click(thumbnailButton);
    
    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(screen.getByText(`${mockProps.name}'s VA Loan Success Story`)).toBeInTheDocument();
    });
  });

  it('displays correct modal description', async () => {
    render(<TestimonialVideo {...mockProps} />);
    
    const thumbnailButton = screen.getByRole('button');
    fireEvent.click(thumbnailButton);
    
    await waitFor(() => {
      expect(screen.getByText('Hear firsthand how the VA loan helped this veteran achieve homeownership')).toBeInTheDocument();
    });
  });

  it('maintains aspect ratio for video container', async () => {
    render(<TestimonialVideo {...mockProps} />);
    
    const thumbnailButton = screen.getByRole('button');
    fireEvent.click(thumbnailButton);
    
    await waitFor(() => {
      const videoContainer = screen.getByTitle(`${mockProps.name} testimonial`).parentElement;
      expect(videoContainer).toHaveClass('aspect-video');
    });
  });

  it('has proper iframe dimensions', async () => {
    render(<TestimonialVideo {...mockProps} />);
    
    const thumbnailButton = screen.getByRole('button');
    fireEvent.click(thumbnailButton);
    
    await waitFor(() => {
      const iframe = screen.getByTitle(`${mockProps.name} testimonial`);
      expect(iframe).toHaveAttribute('width', '100%');
      expect(iframe).toHaveAttribute('height', '100%');
    });
  });
});