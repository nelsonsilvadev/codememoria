import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { Fragment } from 'react'

import FavoriteRepository from '../components/FavoriteRepository'
import Logo from '../components/Logo'
import { useFavorites } from '../context/FavoritesContext'

const Favorites = () => {
  const theme = useTheme()
  const { favorites } = useFavorites()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const renderFavoriteRepositories = () =>
    favorites.map((repo, index) => (
      <Fragment key={repo.id}>
        <FavoriteRepository {...repo} />
        {index < favorites.length - 1 && <Divider />}
      </Fragment>
    ))

  const Header = () => (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Logo
        style={{
          height: 80,
          marginBottom: 12,
        }}
      />

      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontSize: isMobile ? 36 : 50 }}
      >
        My Favorite Repositories
      </Typography>

      <Typography variant="h6" sx={{ fontSize: isMobile ? 18 : 20 }}>
        List of GitHub Repositories
      </Typography>
    </Box>
  )

  return (
    <Container>
      <Header />

      <Box mt={4}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">Favorites</Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6" sx={{ lineHeight: 'normal' }}>
              {`${favorites.length} ${
                favorites.length === 1 ? 'Favorite' : 'Favorites'
              }`}
            </Typography>
          </Grid>
        </Grid>

        {favorites.length > 0 ? (
          <Box mt={2}>{renderFavoriteRepositories()}</Box>
        ) : (
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            You currently have no favorited repositories.
          </Typography>
        )}
      </Box>
    </Container>
  )
}

export default Favorites
