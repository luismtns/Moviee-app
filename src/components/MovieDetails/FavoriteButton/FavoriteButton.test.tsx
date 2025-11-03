import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import FavoriteButton from './FavoriteButton'

vi.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: vi.fn(() => false),
    toggleFavorite: vi.fn(),
  }),
}))

describe('FavoriteButton', () => {
  it('renders add to favorites when not favorite', () => {
    const { container } = render(<FavoriteButton movieId={1} />)

    const label = container.querySelector('ion-label')
    expect(label?.textContent).toBe('Adicionar aos Favoritos')
  })

  it('renders ion-chip with medium color when not favorite', () => {
    const { container } = render(<FavoriteButton movieId={1} />)

    const chip = container.querySelector('ion-chip')
    expect(chip?.getAttribute('color')).toBe('medium')
  })

  it('has favorite-button class', () => {
    const { container } = render(<FavoriteButton movieId={1} />)

    const chip = container.querySelector('ion-chip')
    expect(chip?.classList.contains('favorite-button')).toBe(true)
  })
})
