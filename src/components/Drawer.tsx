import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import StarIcon from '@mui/icons-material/Star'
import {
  AppBar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer as MUIDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from './Logo'

import { useFavorites } from '../context/FavoritesContext'
import { IChildren } from '../types'

const Drawer: FC<IChildren> = ({ children }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { favorites, clearFavorites } = useFavorites()
  const drawerWidth = 240
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const isFullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    setMobileOpen(false)
  }

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const handlePurgeFavorites = () => {
    clearFavorites()
    setDialogOpen(false)
  }

  const drawer = (
    <Box>
      <Toolbar />

      <Box sx={{ overflowY: 'auto' }}>
        <List>
          {['Home', 'Favorites'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() =>
                  handleNavigation(
                    text === 'Home' ? '/' : '/' + text.toLowerCase()
                  )
                }
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <HomeIcon /> : <FavoriteIcon />}
                </ListItemIcon>

                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation('/notes')}>
              <ListItemIcon>
                <NoteAddIcon />
              </ListItemIcon>

              <ListItemText primary="Notes" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={handleDialogOpen}
              disabled={!favorites.length}
            >
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>

              <ListItemText primary="Purge Favorites" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar style={{ paddingLeft: 18, paddingRight: 18 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <Logo style={{ height: 30, marginRight: 10 }} />

            <Typography variant="h6" noWrap component="div">
              Code Memoria
            </Typography>
          </Box>

          {/* Spacer to push the Star icon to the right */}
          <Box sx={{ flexGrow: 1 }} />

          <Badge
            badgeContent={favorites.length}
            color="error"
            onClick={() => navigate('/favorites')}
            style={{ cursor: 'pointer' }}
          >
            <StarIcon />
          </Badge>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <MUIDrawer
          // Note: Client-side only. No working with SSR in here, however, I do love Next.js.
          // No need to use the "useEffect" hook to be sure window is defined.
          container={window.document.body}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </MUIDrawer>

        <MUIDrawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </MUIDrawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>

      {/* Note: Regarding the Dialog component and knowing that it's being used in other components, I would have created a separate component for it.
      Sending the title, content and actions as props. This would have made the Drawer component more readable and easier to maintain.
      Like a did with the TokenInput component. */}
      <Dialog
        fullScreen={isFullScreen}
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {'Purge All Favorites?'}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove all repositories from your favorites
            list? This action cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handlePurgeFavorites} color="error">
            Purge
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Drawer
