import React, { createContext, useContext, useState } from 'react'

import { IChildren, IRepository } from '../types'

interface IFavoritesContext {
  favorites: IRepository[]
  addFavorite: (repo: IRepository) => void
  removeFavorite: (repoId: string) => void
  setRating: (repoId: string, rating: number) => void
  clearFavorites: () => void
}

const FavoritesContext = createContext<IFavoritesContext | null>(null)

export const useFavorites = () => {
  return useContext(FavoritesContext) as IFavoritesContext
}

export const FavoritesProvider: React.FC<IChildren> = ({ children }) => {
  const [favorites, setFavorites] = useState<IRepository[]>([])

  const addFavorite = (repo: IRepository) => {
    if (!favorites.some((f) => f.id === repo.id)) {
      setFavorites([...favorites, { ...repo, rating: 0 }])
    }
  }

  const removeFavorite = (repoId: string) => {
    setFavorites(favorites.filter((repo) => repo.id !== repoId))
  }

  const setRating = (repoId: string, rating: number) => {
    setFavorites(
      favorites.map((repo) =>
        repo.id === repoId ? { ...repo, rating: rating } : repo
      )
    )
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        setRating,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
