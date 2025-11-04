import { describe, expect, it } from 'vitest'
import { movieUtils } from './movie.utils'

describe('movieUtils', () => {
  describe('getImageUrl', () => {
    it('returns default image for null path', () => {
      expect(movieUtils.getImageUrl(null)).toBe('/assets/unavailable-cover.png')
    })

    it('builds url with w500 by default', () => {
      const url = movieUtils.getImageUrl('/test.jpg')
      expect(url).toContain('w500/test.jpg')
    })

    it('builds url with custom size', () => {
      const url = movieUtils.getImageUrl('/test.jpg', 'w200')
      expect(url).toContain('w200/test.jpg')
    })
  })

  describe('sortByTitle', () => {
    it('sorts items alphabetically', () => {
      const items = [{ title: 'C' }, { title: 'A' }, { title: 'B' }]
      const sorted = movieUtils.sortByTitle(items)
      expect(sorted.map((i) => i.title)).toEqual(['A', 'B', 'C'])
    })
  })

  describe('sortByRating', () => {
    it('sorts items by rating descending', () => {
      const items = [{ vote_average: 5 }, { vote_average: 9 }, { vote_average: 7 }]
      const sorted = movieUtils.sortByRating(items)
      expect(sorted.map((i) => i.vote_average)).toEqual([9, 7, 5])
    })
  })

  describe('sortByReleaseDate', () => {
    it('sorts items by date descending', () => {
      const items = [{ release_date: '2020-01-01' }, { release_date: '2023-01-01' }, { release_date: '2021-01-01' }]
      const sorted = movieUtils.sortByReleaseDate(items)
      expect(sorted.map((i) => i.release_date)).toEqual(['2023-01-01', '2021-01-01', '2020-01-01'])
    })
  })

  describe('filterByMinRating', () => {
    it('filters items by minimum rating', () => {
      const items = [{ vote_average: 5 }, { vote_average: 8 }, { vote_average: 3 }]
      const filtered = movieUtils.filterByMinRating(items, 6)
      expect(filtered).toHaveLength(1)
      expect(filtered[0].vote_average).toBe(8)
    })
  })
})
