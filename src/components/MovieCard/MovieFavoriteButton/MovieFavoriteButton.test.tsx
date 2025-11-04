import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import MovieFavoriteButton from './MovieFavoriteButton'

const mockToggleFavorite = vi.fn()
const mockIsFavorite = vi.fn(() => false)

vi.mock('@/hooks/useFavorites', () => ({
  useFavorites: () => ({
    isFavorite: mockIsFavorite,
    toggleFavorite: mockToggleFavorite,
    isLoading: false,
    canUseFavorites: true,
  }),
}))

vi.mock('@/utils/notifications', () => ({
  notifications: { info: vi.fn() },
}))

describe('MovieFavoriteButton', () => {
  it('renders', () => {
    const { container } = render(<MovieFavoriteButton movieId={1} movieTitle='Test' />)
    expect(container.querySelector('ion-button')).toBeTruthy()
  })

  it('handles click', async () => {
    const { container } = render(<MovieFavoriteButton movieId={1} movieTitle='Test' />)
    const button = container.querySelector('ion-button')
    fireEvent.click(button!)
    expect(mockToggleFavorite).toHaveBeenCalledWith(1)
  })

  it('shows delete icon when showDeleteIcon is true', () => {
    const { container } = render(<MovieFavoriteButton movieId={1} movieTitle='Test' showDeleteIcon={true} />)
    const button = container.querySelector('ion-button')
    expect(button?.getAttribute('aria-label')).toBe('Remover dos favoritos')
  })
})
