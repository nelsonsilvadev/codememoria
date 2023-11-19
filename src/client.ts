import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
// Note: Added apollo-link-context to set the authorization header each time a request is made.
// Before that, if I manually set the token in localStorage, I had to refresh the page to see the data.
import { setContext } from '@apollo/client/link/context'

const GITHUB_GRAPHQL_API_URI = 'https://api.github.com/graphql'

const httpLink = new HttpLink({
  uri: GITHUB_GRAPHQL_API_URI,
})

const authLink = setContext((_, { headers }) => {
  // Note: If there's no token in localStorage, it will look for the token in the .env file.
  const token =
    localStorage.getItem('token') || process.env.REACT_APP_GITHUB_ACCESS_TOKEN
  const authHeader = token ? `Bearer ${token}` : ''

  return {
    headers: {
      ...headers,
      authorization: authHeader,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // Note: Couldn't forget the cache since it's a requirement for Apollo Client.
  // I still need to learn more about cache policies and how to use them.
  cache: new InMemoryCache(),
})

export default client
