import { describe, it, expect } from 'vitest'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

describe('getContentPage', () => {
  const mockClient = {
    query: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getServerApolloClient).mockResolvedValue(mockClient as any)
  })

  it('should fetch and parse content page successfully', async () => {
    const mockData = {
      data: {
        contentPage: {
          id: '1',
          title: 'Test Page',
          slug: 'test-page',
          intro: 'Test intro',
          body: JSON.stringify([
            { type: 'heading', value: 'Test Heading' },
            { type: 'paragraph', value: '<p>Test paragraph</p>' },
          ]),
          firstPublishedAt: '2025-01-01T00:00:00Z',
          metaDescription: 'Test description',
          metaKeywords: 'test, keywords',
          ogTitle: 'Test OG Title',
          ogDescription: 'Test OG Description',
          seoTitle: 'Test SEO Title',
        },
      },
    }

    mockClient.query.mockResolvedValue(mockData)

    const result = await getContentPage('test-page')

    expect(mockClient.query).toHaveBeenCalledWith({
      query: expect.any(Object),
      variables: { slug: 'test-page' },
    })

    expect(result).toEqual({
      id: '1',
      title: 'Test Page',
      slug: 'test-page',
      intro: 'Test intro',
      body: [
        { type: 'heading', value: 'Test Heading' },
        { type: 'paragraph', value: '<p>Test paragraph</p>' },
      ],
      firstPublishedAt: '2025-01-01T00:00:00Z',
      metaDescription: 'Test description',
      metaKeywords: 'test, keywords',
      ogTitle: 'Test OG Title',
      ogDescription: 'Test OG Description',
      seoTitle: 'Test SEO Title',
    })
  })

  it('should handle null body gracefully', async () => {
    const mockData = {
      data: {
        contentPage: {
          id: '1',
          title: 'Test Page',
          slug: 'test-page',
          body: null,
        },
      },
    }

    mockClient.query.mockResolvedValue(mockData)

    const result = await getContentPage('test-page')

    expect(result?.body).toBeUndefined()
  })

  it('should handle invalid JSON in body', async () => {
    const mockData = {
      data: {
        contentPage: {
          id: '1',
          title: 'Test Page',
          slug: 'test-page',
          body: 'invalid json',
        },
      },
    }

    mockClient.query.mockResolvedValue(mockData)
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const result = await getContentPage('test-page')

    expect(result?.body).toEqual([])
    expect(consoleSpy).toHaveBeenCalledWith('Error parsing body JSON:', expect.any(Error))

    consoleSpy.mockRestore()
  })

  it('should return null when page is not found', async () => {
    const mockData = {
      data: {
        contentPage: null,
      },
    }

    mockClient.query.mockResolvedValue(mockData)

    const result = await getContentPage('non-existent-page')

    expect(result).toBeNull()
  })

  it('should handle query errors gracefully', async () => {
    const error = new Error('GraphQL error')
    mockClient.query.mockRejectedValue(error)
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const result = await getContentPage('test-page')

    expect(result).toBeNull()
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching content page:', error)

    consoleSpy.mockRestore()
  })
})