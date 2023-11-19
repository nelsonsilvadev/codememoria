import { ApolloProvider } from '@apollo/client'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import client from './client'
import Drawer from './components/Drawer'
import { FavoritesProvider } from './context/FavoritesContext'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Notes from './pages/Notes'

const App = () => (
  <ApolloProvider client={client}>
    <FavoritesProvider>
      <Router>
        <Drawer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </Drawer>
      </Router>
    </FavoritesProvider>
  </ApolloProvider>
)

export default App
