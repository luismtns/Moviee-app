import { render } from '@testing-library/react'
import { vi } from 'vitest'
import { Navigation } from './Navigation'

vi.mock('react-router-dom', () => ({
  useHistory: () => ({ push: vi.fn() }),
  useLocation: () => ({ pathname: '/home' }),
}))

vi.mock('@/components/LoginButton/LoginButton', () => ({
  default: () => null,
}))

describe('Navigation', () => {
  it('renders buttons', () => {
    const { container } = render(<Navigation />)
    expect(container.querySelectorAll('ion-button')).toHaveLength(2)
  })

  it('highlights active', () => {
    const { container } = render(<Navigation />)
    expect(container.querySelector('ion-button[fill="solid"]')).toBeTruthy()
  })
})
