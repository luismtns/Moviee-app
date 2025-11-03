import { render } from '@testing-library/react'
import { vi } from 'vitest'
import { Navigation } from './Navigation'

vi.mock('react-router-dom', () => ({
  useHistory: () => ({ push: vi.fn() }),
  useLocation: () => ({ pathname: '/' }),
}))

describe('Navigation', () => {
  it('renders two buttons', () => {
    const { container } = render(<Navigation />)

    const buttons = container.querySelectorAll('ion-button')
    expect(buttons).toHaveLength(2)
  })
})
