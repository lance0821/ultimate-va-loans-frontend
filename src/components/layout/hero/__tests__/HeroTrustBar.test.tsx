import { render, screen } from '@testing-library/react'
import { HeroTrustBar } from '../HeroTrustBar'
import { useMediaQuery } from '@/hooks/useMediaQuery'

jest.mock('@/hooks/useMediaQuery')

describe('HeroTrustBar', () => {
  beforeEach(() => {
    (useMediaQuery as jest.Mock).mockReturnValue(false)
  })
  
  it('renders veteran badge in compact mode', () => {
    render(<HeroTrustBar variant="compact" />)
    
    expect(screen.getByRole('button', { name: /veteran owned/i })).toBeInTheDocument()
  })
  
  it('hides rating on mobile in compact mode', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true)
    render(<HeroTrustBar variant="compact" />)
    
    expect(screen.queryByText(/4.9/)).not.toBeInTheDocument()
  })
  
  it('shows all trust signals in full mode', () => {
    render(<HeroTrustBar variant="full" />)
    
    expect(screen.getByRole('button', { name: /veteran owned/i })).toBeInTheDocument()
    expect(screen.getByText(/4.9/)).toBeInTheDocument()
    expect(screen.getByText('VA Approved')).toBeInTheDocument()
  })
})