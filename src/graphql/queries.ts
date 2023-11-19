import { gql } from '@apollo/client'

// Note: Just added a GraphQL fragment to avoid repeating the same fields in the queries.
// Something that will not happen since I'm just using one query in this app.
export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $after: String) {
    search(query: $query, type: REPOSITORY, first: 10, after: $after) {
      edges {
        node {
          ...RepositoryFields
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  fragment RepositoryFields on Repository {
    id
    name
    description
    languages(first: 10) {
      edges {
        node {
          id
          name
        }
      }
    }
    stargazerCount
    forkCount
    url
    updatedAt
  }
`
