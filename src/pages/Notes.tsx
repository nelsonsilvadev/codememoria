import GitHubIcon from '@mui/icons-material/GitHub'
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

interface IItem {
  title: string
  description: string
}

const Notes = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const features = [
    {
      title: 'Title',
      description: 'Description',
    },
  ]

  const issuesAndResolutions = [
    {
      title: 'Title',
      description: 'Description',
    },
  ]

  const renderListItems = (items: IItem[]) =>
    items.map((item, index) => (
      <ListItem key={index}>
        <ListItemText primary={item.title} secondary={item.description} />
      </ListItem>
    ))

  const Header = () => (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <GitHubIcon sx={{ fontSize: isMobile ? 50 : 80, mb: 2 }} />

      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontSize: isMobile ? 36 : 50 }}
      >
        Development Notes
      </Typography>
    </Box>
  )

  return (
    <Container>
      <Header />

      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: isMobile ? 22 : 24 }}
      >
        Feature Highlights
      </Typography>

      <List>{renderListItems(features)}</List>

      <Typography
        variant="h4"
        sx={{ fontSize: isMobile ? 22 : 24, mt: 4 }}
        gutterBottom
      >
        Issues and Resolutions
      </Typography>

      <List>{renderListItems(issuesAndResolutions)}</List>
    </Container>
  )
}

export default Notes
