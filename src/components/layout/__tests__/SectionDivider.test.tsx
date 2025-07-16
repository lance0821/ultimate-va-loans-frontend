import { render } from '@testing-library/react'
import { SectionDivider } from '../SectionDivider'

describe('SectionDivider', () => {
  it('renders wave divider correctly', () => {
    const { container } = render(<SectionDivider type="wave" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 1200 60')
  })

  it('renders fade divider correctly', () => {
    const { container } = render(<SectionDivider type="fade" />)
    const divider = container.querySelector('.section-divider-fade')
    expect(divider).toBeInTheDocument()
  })

  it('renders dots divider correctly', () => {
    const { container } = render(<SectionDivider type="dots" />)
    const dots = container.querySelectorAll('.animate-pulse')
    expect(dots).toHaveLength(3)
  })

  it('renders line divider by default', () => {
    const { container } = render(<SectionDivider />)
    const line = container.querySelector('.border-t')
    expect(line).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<SectionDivider className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('uses custom color for wave', () => {
    const { container } = render(<SectionDivider type="wave" color="#ff0000" />)
    const path = container.querySelector('path')
    expect(path).toHaveAttribute('fill', '#ff0000')
  })
})