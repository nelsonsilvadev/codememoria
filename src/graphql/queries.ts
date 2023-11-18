import { gql } from '@apollo/client'

export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $after: String) {
    search(query: $query, type: REPOSITORY, first: 10, after: $after) {
      edges {
        node {
          ... on Repository {
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
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`
