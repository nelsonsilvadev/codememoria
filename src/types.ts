import { ReactNode } from 'react'

interface ILanguage {
  id: string
  name: string
}

interface IRepositoryBase {
  id: string
  name: string
  description: string
  url: string
  updatedAt: string
  rating?: number
}

export interface IRepository extends IRepositoryBase {
  languages: ILanguage[]
  stars: number
  forks: number
}

export interface IRepositoryGraph extends IRepositoryBase {
  languages: { edges: Array<{ node: ILanguage }> }
  stargazerCount?: number
  forkCount?: number
}

export interface IChildren {
  children: ReactNode
}
