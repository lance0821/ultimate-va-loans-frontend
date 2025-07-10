import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/api/graphql/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      errorPolicy: 'all',
    },
  },
})

// For server-side rendering
export async function getServerApolloClient() {
  return apolloClient
}