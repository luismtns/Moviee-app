// Core Movie Types
export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
}

export interface MovieDetails extends Movie {
  runtime: number
  genres: Genre[]
  status: string
  tagline: string
  popularity: number
  homepage: string | null
  budget: number
  revenue: number
  account_states?: {
    favorite: boolean
    rated: boolean | { value: number }
    watchlist: boolean
  }
}

export interface Genre {
  id: number
  name: string
}

export interface MoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
