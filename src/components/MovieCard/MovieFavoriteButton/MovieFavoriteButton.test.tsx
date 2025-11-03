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
  it('renders ion-button with aria-label', () => {
    const { container } = render(<MovieFavoriteButton movieId={1} movieTitle='Test' />)

    const button = container.querySelector('ion-button')
    expect(button?.getAttribute('aria-label')).toBe('Adicionar aos favoritos')
  })

  it('uses clear fill style', () => {
    const { container } = render(<MovieFavoriteButton movieId={1} movieTitle='Test' />)

    const button = container.querySelector('ion-button')
    expect(button?.getAttribute('fill')).toBe('clear')
  })
})
