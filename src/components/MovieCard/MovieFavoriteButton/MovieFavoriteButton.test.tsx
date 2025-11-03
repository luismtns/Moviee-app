import { render } from '@testing-library/react'
import { vi } from 'vitest'
import MovieFavoriteButton from './MovieFavoriteButton'

vi.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: vi.fn(() => false),
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
  }),
}))

describe('MovieFavoriteButton', () => {
  it('renders button with label', () => {
    const { container } = render(<MovieFavoriteButton movieId={1} movieTitle='Test' />)

    expect(container.querySelector('ion-button')?.getAttribute('aria-label')).toBe('Adicionar aos favoritos')
  })

  it('uses clear fill', () => {
    const { container } = render(<MovieFavoriteButton movieId={1} movieTitle='Test' />)

    expect(container.querySelector('ion-button')?.getAttribute('fill')).toBe('clear')
  })
})
