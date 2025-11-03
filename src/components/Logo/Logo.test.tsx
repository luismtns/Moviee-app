import { render } from '@testing-library/react'
import Logo from './Logo'

describe('Logo', () => {
  it('renders ion-img with correct alt', () => {
    const { container } = render(<Logo />)

    const logo = container.querySelector('ion-img')
    expect(logo?.getAttribute('alt')).toBe('Moviee Logo')
  })
})
