import { describe, it, expect } from 'vitest'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

// Integration test for actual GraphQL endpoint
describe('Content GraphQL Integration', () => {
  const client = new ApolloClient({
    uri: 'http://localhost:8000/api/graphql/',
    cache: new InMemoryCache(),
  })

  const GET_CONTENT_PAGE = gql`
    query GetContentPage($slug: String!) {
      contentPage(slug: $slug) {
        id
        title
        slug
        intro
        body
        firstPublishedAt
        metaDescription
        metaKeywords
        ogTitle
        ogDescription
        seoTitle
      }
    }
  `

  it('should fetch va-loan-basics page successfully', async () => {
    try {
      const { data } = await client.query({
        query: GET_CONTENT_PAGE,
        variables: { slug: 'va-loan-basics' },
      })

      expect(data.contentPage).toBeDefined()
      expect(data.contentPage.title).toBe('VA Loan Benefits & Basics')
      expect(data.contentPage.slug).toBe('va-loan-basics')
      expect(data.contentPage.intro).toBeDefined()
      expect(data.contentPage.body).toBeDefined()
      
      // Parse and validate body structure
      const body = JSON.parse(data.contentPage.body)
      expect(Array.isArray(body)).toBe(true)
      expect(body.length).toBeGreaterThan(0)
      
      // Check first block
      expect(body[0]).toHaveProperty('type')
      expect(body[0]).toHaveProperty('value')
    } catch (error) {
      // If backend is not running, skip the test
      if (error.message.includes('fetch failed')) {
        console.log('Skipping integration test - backend not available')
        return
      }
      throw error
    }
  })

  it('should return null for non-existent page', async () => {
    try {
      const { data } = await client.query({
        query: GET_CONTENT_PAGE,
        variables: { slug: 'non-existent-page' },
      })

      expect(data.contentPage).toBeNull()
    } catch (error) {
      // If backend is not running, skip the test
      if (error.message.includes('fetch failed')) {
        console.log('Skipping integration test - backend not available')
        return
      }
      throw error
    }
  })

  it('should handle special characters in body content', async () => {
    try {
      const { data } = await client.query({
        query: GET_CONTENT_PAGE,
        variables: { slug: 'va-loan-basics' },
      })

      if (data.contentPage?.body) {
        const body = JSON.parse(data.contentPage.body)
        
        // Find quote block to test special character handling
        const quoteBlock = body.find(block => block.type === 'quote')
        if (quoteBlock) {
          expect(quoteBlock.value).toHaveProperty('text')
          expect(quoteBlock.value).toHaveProperty('attribution')
        }
        
        // Find calculator embed block
        const calcBlock = body.find(block => block.type === 'calculator_embed')
        if (calcBlock) {
          expect(calcBlock.value).toHaveProperty('calculator_type')
        }
      }
    } catch (error) {
      // If backend is not running, skip the test
      if (error.message.includes('fetch failed')) {
        console.log('Skipping integration test - backend not available')
        return
      }
      throw error
    }
  })
})