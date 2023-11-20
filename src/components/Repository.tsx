import LinkIcon from '@mui/icons-material/Link'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import {
  Box,
  Chip,
  Grid,
  IconButton,
  Link,
  ListItem,
  Typography,
} from '@mui/material'

import { FC } from 'react'

import { useFavorites } from '../context/FavoritesContext'
import { IRepository } from '../types'

import { formatDistanceToNow } from 'date-fns'

// Note: Using FC instead of React.FC (for example) just because it's shorter.
// Regarding using or not semi-colons, I can go either way.
const Repository: FC<IRepository> = ({
  id,
  name,
  description,
  languages,
  stars,
  forks,
  url,
  updatedAt,
}) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const isFavorite = favorites.some((favorite) => favorite.id === id)

  const handleFavoriteClick = () => {
    isFavorite
      ? removeFavorite(id)
      : addFavorite({
          id,
          name,
          description,
          languages,
          stars,
          forks,
          url,
          updatedAt,
          rating: 0,
        })
  }

  // Render repository information
  const Details = () => (
    <>
      <Typography
        variant="h6"
        sx={{ wordBreak: 'break-word', display: 'inline-flex' }}
      >
        <Link href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </Link>
      </Typography>

      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        {description}
      </Typography>

      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap' }}>
        {languages.map((language) => (
          <Chip
            key={language.id}
            label={language.name}
            color="primary"
            size="small"
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>

      <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
        Updated {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
        {stars ? <span> · ⭐ {stars}</span> : null}
        {forks ? <span> · 🍴 {forks}</span> : null}
      </Typography>
    </>
  )

  const Actions = () => (
    <>
      <IconButton
        onClick={handleFavoriteClick}
        color={isFavorite ? 'primary' : 'default'}
      >
        {isFavorite ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>

      <Link href={url} target="_blank" rel="noopener noreferrer">
        <IconButton>
          <LinkIcon />
        </IconButton>
      </Link>
    </>
  )

  return (
    <ListItem
      sx={{
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '15px',
        marginBottom: '15px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Details />
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Actions />
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default Repository
