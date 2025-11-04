import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import FavoriteButton from './FavoriteButton'

vi.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: vi.fn(() => false),
    toggleFavorite: vi.fn(),
    canUseFavorites: true,
  }),
}))

vi.mock('react-router-dom', () => ({
  useHistory: () => ({ push: vi.fn() }),
}))

describe('FavoriteButton', () => {
  it('renders button', () => {
    const { container } = render(<FavoriteButton movieId={1} />)
    expect(container.querySelector('ion-chip')).toBeTruthy()
  })
})
