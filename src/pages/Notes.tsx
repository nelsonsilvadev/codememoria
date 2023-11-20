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

import Logo from '../components/Logo'

interface IItem {
  title: string
  description: string
}

const Notes = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const features = [
    {
      title: 'React Context API for Features',
      description:
        'Implemented a custom React Context API to manage states such as favorites, providing a seamless global state management across the application.',
    },
    {
      title: 'Local Storage for Token Persistence',
      description:
        'Utilized local storage to persist GitHub access tokens, ensuring user convenience by retaining session state across page reloads.',
    },
    {
      title: 'Favorites Count on Header',
      description:
        'Dynamically displayed the count of favorited repositories in the application header, enhancing user engagement and accessibility.',
    },
    {
      title: 'Purge Favorites with Confirmation Dialog',
      description:
        'Implemented a purge functionality for favorites with a dialog-based confirmation, ensuring a user-friendly way to manage favorites.',
    },
    {
      title: 'Token Validation Using RegEx',
      description:
        'Incorporated regular expressions for validating GitHub access tokens, handling different token formats effectively.',
    },
    {
      title: 'Handling Token Expiry with Dialog Prompts',
      description:
        'Implemented a system to prompt the user via dialog boxes for token update on detection of incorrect or expired tokens.',
    },
    {
      title: 'Debouncing for Optimized Search',
      description:
        'Used debouncing with a 500-millisecond delay in search functionality to minimize unnecessary API calls, enhancing performance and user experience.',
    },
    {
      title: 'Apollo Client for GraphQL Integration',
      description:
        'Leveraged Apollo Client for managing GraphQL queries and caching, facilitating efficient data fetching and state management.',
    },
    {
      title: 'Repository Rating Feature',
      description:
        'Enabled users to rate repositories, adding an interactive and personalized aspect to repository exploration.',
    },
    {
      title: 'Responsive Design for Cross-Device Compatibility',
      description:
        "Focused on responsive design principles to ensure the application's compatibility and optimal experience across various devices and screen sizes.",
    },
    {
      title: 'Comprehensive Error Handling and Loading States',
      description:
        'Implemented thorough error handling and loading state indicators, ensuring a smooth and informative user experience.',
    },
  ]

  const issuesAndResolutions = [
    {
      title: 'Handling Token Expiry and Incorrect Tokens',
      description:
        'Developed a mechanism to detect expired or incorrect tokens, prompting users to update their token via a dialog, thus ensuring uninterrupted access.',
    },
    {
      title: 'Managing Local Storage for Token Updates',
      description:
        'Addressed challenges in updating the Apollo client when the token in local storage changed, ensuring consistent and accurate data fetching.',
    },
    {
      title: 'Optimizing useCallback Hook Usage',
      description:
        'Resolved issues related to unnecessary re-creations of debounced functions by efficiently using the useCallback hook.',
    },
    {
      title: 'Initial Loading UX with Local Storage Token',
      description:
        'Fixed a flickering issue during the initial load when a token was present in local storage, ensuring a seamless transition to the search feature.',
    },
    {
      title: 'UI Responsiveness Across Different Devices',
      description:
        'Tackled various UI challenges to make the application responsive, ensuring a consistent user experience on both mobile and desktop devices.',
    },
    {
      title: 'Effective GraphQL Query Optimization',
      description:
        'Implemented strategic optimizations in GraphQL queries to enhance performance, reduce data over-fetching and improve response times.',
    },
    {
      title: 'Robust Pagination in GraphQL',
      description:
        'Incorporated pagination in GraphQL queries to handle large datasets efficiently, allowing users to navigate through extensive data seamlessly.',
    },
    {
      title: 'Interactive Dialog Components for User Actions',
      description:
        'Utilized dialog components for critical actions like clearing data or updating tokens, enhancing user engagement and decision-making clarity.',
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
