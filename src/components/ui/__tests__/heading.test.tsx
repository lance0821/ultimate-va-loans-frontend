import { render, screen } from '@testing-library/react'
import { Heading } from '../heading'

describe('Heading', () => {
  it('renders with correct hierarchy class', () => {
    render(<Heading level="h1">Test Heading</Heading>)
    const heading = screen.getByText('Test Heading')
    expect(heading).toHaveClass('vh-hero-title')
  })

  it('applies weight variants correctly', () => {
    const { rerender } = render(
      <Heading weight="primary">Primary Weight</Heading>
    )
    expect(screen.getByText('Primary Weight')).toHaveClass('vh-primary')
    
    rerender(<Heading weight="secondary">Secondary Weight</Heading>)
    expect(screen.getByText('Secondary Weight')).toHaveClass('vh-secondary')
    
    rerender(<Heading weight="tertiary">Tertiary Weight</Heading>)
    expect(screen.getByText('Tertiary Weight')).toHaveClass('vh-tertiary')
  })

  it('uses semantic HTML tags based on level prop', () => {
    const { container, rerender } = render(
      <Heading level="h1" as="h1">H1 Heading</Heading>
    )
    expect(container.querySelector('h1')).toBeInTheDocument()
    
    rerender(<Heading level="h2" as="h2">H2 Heading</Heading>)
    expect(container.querySelector('h2')).toBeInTheDocument()
    
    rerender(<Heading level="h3" as="h3">H3 Heading</Heading>)
    expect(container.querySelector('h3')).toBeInTheDocument()
  })

  it('applies text alignment classes', () => {
    const { rerender } = render(
      <Heading align="center">Centered</Heading>
    )
    expect(screen.getByText('Centered')).toHaveClass('text-center')
    
    rerender(<Heading align="right">Right Aligned</Heading>)
    expect(screen.getByText('Right Aligned')).toHaveClass('text-right')
  })

  it('merges custom className with variant classes', () => {
    render(
      <Heading level="h2" className="custom-class">Custom Class</Heading>
    )
    const heading = screen.getByText('Custom Class')
    expect(heading).toHaveClass('vh-section-title')
    expect(heading).toHaveClass('custom-class')
  })
})