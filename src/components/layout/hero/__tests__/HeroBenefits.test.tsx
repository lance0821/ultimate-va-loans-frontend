import { render, screen } from '@testing-library/react'
import { HeroBenefits } from '../HeroBenefits'
import { DollarSign, Shield } from 'lucide-react'

describe('HeroBenefits', () => {
  const mockBenefits = [
    { icon: DollarSign, text: 'Test Benefit 1', highlight: true },
    { icon: Shield, text: 'Test Benefit 2' }
  ]
  
  it('renders all benefits', () => {
    render(<HeroBenefits benefits={mockBenefits} />)
    
    expect(screen.getByText('Test Benefit 1')).toBeInTheDocument()
    expect(screen.getByText('Test Benefit 2')).toBeInTheDocument()
  })
  
  it('sorts highlighted benefits first', () => {
    render(<HeroBenefits benefits={mockBenefits} />)
    
    const items = screen.getAllByRole('listitem')
    expect(items[0]).toHaveTextContent('Test Benefit 1')
  })
  
  it('uses simple animations by default', () => {
    const { container } = render(<HeroBenefits animationStyle="simple" />)
    
    const items = container.querySelectorAll('li')
    items.forEach(item => {
      expect(item.className).toContain('animate-fade-in')
      expect(item.className).not.toContain('delay')
    })
  })
  
  it('applies correct variant classes', () => {
    const { container } = render(<HeroBenefits variant="grid" />)
    
    expect(container.querySelector('.hero-benefits')).toHaveClass('grid')
  })
})