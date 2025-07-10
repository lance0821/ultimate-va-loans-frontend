import { gql } from '@apollo/client'
import { getServerApolloClient } from '../client'

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

export async function getContentPage(slug: string) {
  const client = await getServerApolloClient()
  
  try {
    const { data } = await client.query({
      query: GET_CONTENT_PAGE,
      variables: { slug },
    })
    
    if (data.contentPage) {
      // Parse the JSON body from the GraphQL response
      const page = { ...data.contentPage }
      if (page.body) {
        try {
          page.body = JSON.parse(page.body)
        } catch (e) {
          console.error('Error parsing body JSON:', e)
          page.body = []
        }
      }
      return page
    }
    
    return null
  } catch (error) {
    console.error('Error fetching content page:', error)
    return null
  }
}