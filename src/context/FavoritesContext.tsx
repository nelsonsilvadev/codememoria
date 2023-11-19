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

export const useFavorites = () =>
  useContext(FavoritesContext) as IFavoritesContext

export const FavoritesProvider: React.FC<IChildren> = ({ children }) => {
  const [favorites, setFavorites] = useState<IRepository[]>([])

  const addFavorite = (repo: IRepository) => {
    // Note: I'm using some here to check if the repo is already in the favorites array.
    // Using setFavorites here to avoid unnecessary re-renders.
    if (!favorites.some((favorite) => favorite.id === repo.id)) {
      setFavorites((prevFavorites) => [
        ...prevFavorites,
        { ...repo, rating: 0 },
      ])
    }
  }

  const removeFavorite = (repoId: string) => {
    setFavorites((prevFavorites) =>
      // Note: I'm using filter here to remove the repo from the favorites array.
      prevFavorites.filter((repo) => repo.id !== repoId)
    )
  }

  const setRating = (repoId: string, rating: number) => {
    setFavorites((prevFavorites) =>
      // Note: I'm using map here to update the rating of the repo in the favorites array.
      prevFavorites.map((repo) =>
        repo.id === repoId ? { ...repo, rating } : repo
      )
    )
  }

  // Note: I'm using setFavorites here to clear the favorites array.
  const clearFavorites = () => setFavorites([])

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
