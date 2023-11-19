import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Grid,
  Link,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { FC } from 'react'

import { useFavorites } from '../context/FavoritesContext'
import { IRepository } from '../types'

import { formatDistanceToNow } from 'date-fns'

const FavoriteRepository: FC<IRepository> = ({
  id,
  name,
  description,
  languages,
  stars,
  forks,
  url,
  updatedAt,
  rating,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { removeFavorite, setRating } = useFavorites()

  const handleRatingChange = (newValue: number | null) => {
    setRating(id, newValue || 0)
  }

  const Header = () => (
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Box sx={{ flexBasis: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1" sx={{ wordBreak: 'break-word' }}>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            sx={{ display: 'inline-block' }}
          >
            {name}
          </Link>
        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontWeight: 500 }}
        >
          {languages[0]?.name || 'No primary language'}
        </Typography>
      </Box>
    </AccordionSummary>
  )

  const Details = () => (
    <AccordionDetails>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="body2" color="textSecondary">
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
            Updated{' '}
            {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
            {stars !== undefined && <span> · ⭐ {stars}</span>}
            {forks !== undefined && <span> · 🍴 {forks}</span>}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Rating
            value={rating}
            onChange={(_, newValue) => handleRatingChange(newValue)}
            sx={{ mb: 1 }}
          />

          <Button
            variant="outlined"
            color="error"
            startIcon={<StarBorderIcon />}
            onClick={() => removeFavorite(id)}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          >
            Unfavorite
          </Button>
        </Grid>
      </Grid>
    </AccordionDetails>
  )

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <Header />
      <Details />
    </Accordion>
  )
}

export default FavoriteRepository
