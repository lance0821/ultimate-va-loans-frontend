import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getContentPage } from '../queries/content'
import { getServerApolloClient } from '../client'

vi.mock('../client')

describe('getContentPage', () => {
  const mockClient = {
    query: vi.fn(),
    // Add minimal ApolloClient properties to satisfy type checking
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cache: {} as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    link: {} as any,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getServerApolloClient).mockResolvedValue(mockClient as unknown as Awaited<ReturnType<typeof getServerApolloClient>>)
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
            {
              type: 'paragraph',
              children: [{ text: 'Test content' }],
            },
          ]),
          contentBlocks: [],
        },
      },
    }

    mockClient.query.mockResolvedValueOnce(mockData)

    const result = await getContentPage('test-page')

    expect(result).toEqual({
      ...mockData.data.contentPage,
      parsedBody: [
        {
          type: 'paragraph',
          children: [{ text: 'Test content' }],
        },
      ],
    })

    expect(mockClient.query).toHaveBeenCalledWith({
      query: expect.any(Object),
      variables: { slug: 'test-page' },
    })
  })

  it('should return null when page not found', async () => {
    mockClient.query.mockResolvedValueOnce({
      data: { contentPage: null },
    })

    const result = await getContentPage('non-existent')

    expect(result).toBeNull()
  })

  it('should handle query errors gracefully', async () => {
    mockClient.query.mockRejectedValueOnce(new Error('GraphQL error'))

    await expect(getContentPage('error-page')).rejects.toThrow('GraphQL error')
  })

  it('should parse body content correctly with complex structure', async () => {
    const complexBody = [
      {
        type: 'heading',
        level: 2,
        children: [{ text: 'Test Heading' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: 'Some text with ' },
          { text: 'bold', bold: true },
          { text: ' and ' },
          { text: 'italic', italic: true },
          { text: ' formatting.' },
        ],
      },
      {
        type: 'list',
        format: 'unordered',
        children: [
          {
            type: 'list-item',
            children: [{ text: 'First item' }],
          },
          {
            type: 'list-item',
            children: [{ text: 'Second item' }],
          },
        ],
      },
    ]

    const mockData = {
      data: {
        contentPage: {
          id: '2',
          title: 'Complex Page',
          slug: 'complex-page',
          intro: 'Complex intro',
          body: JSON.stringify(complexBody),
          contentBlocks: [],
        },
      },
    }

    mockClient.query.mockResolvedValueOnce(mockData)

    const result = await getContentPage('complex-page')

    expect(result?.parsedBody).toEqual(complexBody)
  })

  it('should handle content blocks with nested data', async () => {
    const mockData = {
      data: {
        contentPage: {
          id: '3',
          title: 'Page with Blocks',
          slug: 'page-with-blocks',
          intro: 'Intro with blocks',
          body: '[]',
          contentBlocks: [
            {
              __typename: 'HeroBlock',
              id: 'hero-1',
              title: 'Hero Title',
              subtitle: 'Hero Subtitle',
              ctaText: 'Get Started',
              ctaLink: '/get-started',
            },
            {
              __typename: 'ContentSection',
              id: 'content-1',
              heading: 'Section Heading',
              content: 'Section content text',
            },
          ],
        },
      },
    }

    mockClient.query.mockResolvedValueOnce(mockData)

    const result = await getContentPage('page-with-blocks')

    expect(result?.contentBlocks).toHaveLength(2)
    expect(result?.contentBlocks?.[0]).toMatchObject({
      __typename: 'HeroBlock',
      title: 'Hero Title',
    })
    expect(result?.contentBlocks?.[1]).toMatchObject({
      __typename: 'ContentSection',
      heading: 'Section Heading',
    })
  })

  it('should handle empty or invalid body JSON gracefully', async () => {
    const mockData = {
      data: {
        contentPage: {
          id: '4',
          title: 'Invalid Body Page',
          slug: 'invalid-body',
          intro: 'Page with invalid body',
          body: 'invalid json',
          contentBlocks: [],
        },
      },
    }

    mockClient.query.mockResolvedValueOnce(mockData)

    const result = await getContentPage('invalid-body')

    // Should return the page but with empty parsedBody
    expect(result).toBeDefined()
    expect(result?.parsedBody).toEqual([])
  })
})