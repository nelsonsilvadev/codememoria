import GitHubIcon from '@mui/icons-material/GitHub'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Link,
  Paper,
  Typography,
} from '@mui/material'

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

import Search from '../components/Search'
import TokenInput from '../components/TokenInput'
import { tokenValidation } from '../utils'

import debounce from 'lodash.debounce'

const Home = () => {
  const [token, setToken] = useState('')
  const [newToken, setNewToken] = useState('')
  const [isValidToken, setIsValidToken] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken || '')
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem('token')
      setToken(storedToken || '')
      if (!storedToken) setNewToken('')
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const validateTokenFormat = useCallback(
    debounce((token: string) => {
      setIsValidToken(tokenValidation.test(token))
    }, 500),
    []
  )

  const handleTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    const token = e.target.value.trim()

    if (token.length > 0) setIsValidToken(true)
    else validateTokenFormat(token)

    setNewToken(token)
  }

  const handleTokenSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isValidToken) {
      localStorage.setItem('token', newToken)
      setToken(newToken)
      setNewToken('')
      setIsValidToken(false)
    }
  }

  const handleClearAccessToken = () => setDialogOpen(true)

  const handleConfirmClearAccessToken = () => {
    localStorage.removeItem('token')
    setToken('')
    setDialogOpen(false)
  }

  const Loading = () => (
    <Container>
      <CircularProgress />
    </Container>
  )

  // Note: Avoiding flickering problem when loading the page regarding the token validation
  if (isLoading) return <Loading />

  const Header = () => (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <GitHubIcon sx={{ fontSize: { xs: 50, sm: 80 }, mb: 2 }} />

      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontSize: { xs: 36, sm: 50 } }}
      >
        Code Memoria Explorer
      </Typography>

      <Typography variant="h6" sx={{ fontSize: { xs: 18, sm: 20 } }}>
        Discover and Explore GitHub Repositories
      </Typography>

      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        marginTop={1}
      >
        <Grid item>
          <Link
            href="https://github.com/nelsonsilvadev/codememoria"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="contained" color="primary">
              Uncover the Source
            </Button>
          </Link>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearAccessToken}
            disabled={!token}
          >
            Clear Access Token
          </Button>
        </Grid>
      </Grid>
    </Box>
  )

  const Content = () => (
    <Paper elevation={2} sx={{ p: 2, mt: 3, mb: 2 }}>
      <Typography variant="body1" paragraph>
        Use the search bar below to find repositories on GitHub. Start typing to
        see results, and scroll down for more.
      </Typography>

      <Typography variant="body1" paragraph>
        You can also explore details about each repository, such as the
        programming languages used, last updated date, and more.
      </Typography>

      <Typography variant="caption" sx={{ mt: 2 }} color="primary">
        After submitting the token, press <strong>ENTER</strong> and you can
        start searching if the token is valid.
      </Typography>
    </Paper>
  )

  const ClearTokenDialog = () => (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>Clear Access Token?</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to clear your GitHub Access Token? This action
          will require you to enter the token again for future searches.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setDialogOpen(false)} color="primary">
          Cancel
        </Button>

        <Button
          onClick={handleConfirmClearAccessToken}
          color="primary"
          autoFocus
        >
          Clear
        </Button>
      </DialogActions>
    </Dialog>
  )

  // Note: Just splitting the return into multiple components for readability
  return (
    <Container>
      <Header />
      <Content />

      {!token ? (
        <TokenInput
          newToken={newToken}
          isValidToken={isValidToken}
          onTokenChange={handleTokenChange}
          onTokenSubmit={handleTokenSubmit}
        />
      ) : (
        <Search />
      )}

      <ClearTokenDialog />
    </Container>
  )
}

export default Home
