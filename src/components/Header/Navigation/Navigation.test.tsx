import { render } from '@testing-library/react'
import { vi } from 'vitest'
import { Navigation } from './Navigation'

vi.mock('react-router-dom', () => ({
  useHistory: () => ({ push: vi.fn() }),
  useLocation: () => ({ pathname: '/' }),
}))

describe('Navigation', () => {
  it('renders navigation buttons', () => {
    const { container } = render(<Navigation />)

    const buttons = container.querySelectorAll('ion-button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].textContent?.trim()).toBe('Home')
    expect(buttons[1].textContent?.trim()).toBe('Favoritos')
  })
})
