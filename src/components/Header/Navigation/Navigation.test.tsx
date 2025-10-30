import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Navigation } from './Navigation'

vi.mock('react-router-dom', () => ({
  useHistory: () => ({ push: vi.fn() }),
  useLocation: () => ({ pathname: '/' }),
}))

describe('Navigation', () => {
  it('renders navigation buttons', () => {
    render(<Navigation />)

    expect(screen.getByText('Home')).toBeTruthy()
    expect(screen.getByText('Favoritos')).toBeTruthy()
  })
})
