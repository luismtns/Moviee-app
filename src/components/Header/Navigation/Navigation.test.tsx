import { render } from '@testing-library/react'
import { vi } from 'vitest'
import { Navigation } from './Navigation'

vi.mock('react-router-dom', () => ({
  useHistory: () => ({ push: vi.fn() }),
  useLocation: () => ({ pathname: '/home' }),
}))

describe('Navigation', () => {
  it('renders two buttons', () => {
    const { container } = render(<Navigation />)

    const buttons = container.querySelectorAll('ion-button')
    expect(buttons).toHaveLength(2)
  })

  it('renders home button with href', () => {
    const { container } = render(<Navigation />)

    const homeButton = container.querySelector('ion-button[href="/home"]')
    expect(homeButton).toBeTruthy()
  })

  it('renders favorites button with href', () => {
    const { container } = render(<Navigation />)

    const favButton = container.querySelector('ion-button[href="/favorites"]')
    expect(favButton).toBeTruthy()
  })

  it('highlights active route', () => {
    const { container } = render(<Navigation />)

    const activeButton = container.querySelector('ion-button[fill="solid"]')
    expect(activeButton).toBeTruthy()
  })
})
