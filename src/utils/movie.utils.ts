// Movie utilities
export const movieUtils = {
  getImageUrl: (path: string | null, size: 'w200' | 'w500' | 'original' = 'w500'): string | null => {
    if (!path) return null
    const baseUrl = import.meta.env.VITE_TMDB_IMG_BASE || 'https://image.tmdb.org/t/p'
    return `${baseUrl}/${size}${path}`
  },

  sortByTitle: <T extends { title: string }>(items: T[]): T[] => {
    return [...items].sort((a, b) => a.title.localeCompare(b.title))
  },

  sortByRating: <T extends { vote_average: number }>(items: T[]): T[] => {
    return [...items].sort((a, b) => b.vote_average - a.vote_average)
  },

  sortByReleaseDate: <T extends { release_date: string }>(items: T[]): T[] => {
    return [...items].sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
  },

  filterByMinRating: <T extends { vote_average: number }>(items: T[], minRating: number): T[] => {
    return items.filter((item) => item.vote_average >= minRating)
  },
}
