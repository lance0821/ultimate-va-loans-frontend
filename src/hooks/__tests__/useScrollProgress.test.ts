import { renderHook, act } from '@testing-library/react'
import { useScrollProgress } from '../useScrollProgress'

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock window properties
const mockScrollHeight = 2000
const mockInnerHeight = 800
const mockPageYOffset = 0

beforeEach(() => {
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    value: mockScrollHeight,
    writable: true
  })
  Object.defineProperty(window, 'innerHeight', {
    value: mockInnerHeight,
    writable: true
  })
  Object.defineProperty(window, 'pageYOffset', {
    value: mockPageYOffset,
    writable: true
  })
})

describe('useScrollProgress', () => {
  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useScrollProgress())
    
    expect(result.current.scrollProgress).toBe(0)
    expect(result.current.currentSection).toBeNull()
    expect(result.current.sectionsInView).toEqual([])
    expect(result.current.isNearBottom).toBe(false)
  })

  it('updates scroll progress on scroll', () => {
    const { result } = renderHook(() => useScrollProgress())
    
    act(() => {
      // Simulate scrolling to 50%
      Object.defineProperty(window, 'pageYOffset', { value: 600, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    
    expect(result.current.scrollProgress).toBe(50)
  })

  it('sets isNearBottom when scroll > 90%', () => {
    const { result } = renderHook(() => useScrollProgress())
    
    act(() => {
      // Simulate scrolling to 95%
      Object.defineProperty(window, 'pageYOffset', { value: 1140, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    
    expect(result.current.isNearBottom).toBe(true)
  })

  it('tracks sections with IntersectionObserver', () => {
    const mockElement = document.createElement('div')
    const { result } = renderHook(() => useScrollProgress())
    
    act(() => {
      result.current.trackSection('test-section', mockElement)
    })
    
    // Verify observer was created
    expect(IntersectionObserver).toHaveBeenCalled()
  })
})