import { useLazyQuery } from '@apollo/client'
import SearchIcon from '@mui/icons-material/Search'
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  LinearProgress,
  List,
  TextField,
  Typography,
} from '@mui/material'

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import Repository from './Repository'
import TokenInput from './TokenInput'

import { SEARCH_REPOSITORIES } from '../graphql/queries'
import { IRepositoryGraph } from '../types'
import { tokenValidation } from '../utils'

import debounce from 'lodash.debounce'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchRepositories, { data, loading, error, fetchMore }] =
    useLazyQuery(SEARCH_REPOSITORIES)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [newToken, setNewToken] = useState('')
  const [isValidToken, setIsValidToken] = useState(true)
  const lastRepositoryElementRef = useRef<HTMLDivElement | null>(null)

  // Note: Debounce is being used here to avoid unnecessary API calls.
  // I'm using useCallback here to avoid unnecessary re-renders.
  // Re-renders since debounce is a function that is being created on every render.
  const debouncedSearch = useCallback(
    debounce((query) => {
      searchRepositories({ variables: { query } })
    }, 500),
    [searchRepositories]
  )

  // Note: Here, I am checking if the error message includes 401, which is the status code for unauthorized access.
  useEffect(() => {
    if (error?.message.includes('401')) {
      setIsValidToken(true)
      setShowErrorDialog(true)
    }
  }, [error])

  // Note: Well, pagination is a good feature to have and that's why I implemented it.
  // Infinite scrolling is a good option to have for a better user experience.
  // However, a load more button would be another good option to have.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && data?.search.pageInfo.hasNextPage) {
          fetchMore({
            variables: {
              after: data.search.pageInfo.endCursor,
              query: searchTerm,
            },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prevResult
              return {
                search: {
                  ...prevResult.search,
                  edges: [
                    ...prevResult.search.edges,
                    ...fetchMoreResult.search.edges,
                  ],
                  pageInfo: fetchMoreResult.search.pageInfo,
                },
              }
            },
          })
        }
      },
      { threshold: 1.0 }
    )

    if (lastRepositoryElementRef.current) {
      observer.observe(lastRepositoryElementRef.current)
    }

    return () => observer.disconnect()
  }, [loading, data, searchTerm, fetchMore])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim()
    setSearchTerm(query)
    debouncedSearch(query)
  }

  // Note: The tokenValidation represents a regular expression to validate the token format.
  const validateTokenFormat = useCallback(
    debounce((token: string) => {
      setIsValidToken(tokenValidation.test(token))
    }, 500),
    []
  )

  const handleDialogTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    const token = e.target.value.trim()

    if (token.length > 0) setIsValidToken(true)
    else validateTokenFormat(token)

    setNewToken(token)
  }

  const handleRetryWithNewToken = (e: FormEvent) => {
    e.preventDefault()
    if (isValidToken) {
      localStorage.setItem('token', newToken)
      setShowErrorDialog(false)
      setNewToken('')
      setIsValidToken(false)
    }
  }

  const RepositoryList = () => (
    <List>
      {data?.search.edges.map(
        (edge: { node: IRepositoryGraph }, index: number) => {
          const isLastElement = index === data.search.edges.length - 1

          return (
            <div
              ref={isLastElement ? lastRepositoryElementRef : null}
              key={edge.node.id}
            >
              <Repository
                id={edge.node.id}
                name={edge.node.name}
                description={edge.node.description}
                url={edge.node.url}
                languages={edge.node.languages.edges.map(
                  (languageEdge) => languageEdge.node
                )}
                stars={edge.node.stargazerCount || 0}
                forks={edge.node.forkCount || 0}
                updatedAt={edge.node.updatedAt}
              />
            </div>
          )
        }
      )}
    </List>
  )

  const ErrorDialog = () => (
    <Dialog open={showErrorDialog} onClose={() => setShowErrorDialog(false)}>
      <DialogTitle>Authentication Error</DialogTitle>

      <DialogContent>
        <DialogContentText>
          The provided GitHub token is incorrect or expired. Please enter a new
          token.
        </DialogContentText>

        <TokenInput
          newToken={newToken}
          isValidToken={isValidToken}
          onTokenChange={handleDialogTokenChange}
          onTokenSubmit={handleRetryWithNewToken}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setShowErrorDialog(false)} color="primary">
          Cancel
        </Button>

        <Button
          onClick={handleRetryWithNewToken}
          color="primary"
          disabled={!isValidToken}
        >
          Retry
        </Button>
      </DialogActions>
    </Dialog>
  )

  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        autoFocus
        hiddenLabel
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        placeholder="Search for a GitHub repository..."
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error.message}</Alert>}

      {!loading && data && !data.search.edges.length && (
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          No repositories were found.
        </Typography>
      )}

      <RepositoryList />
      <ErrorDialog />
    </Box>
  )
}

export default Search
