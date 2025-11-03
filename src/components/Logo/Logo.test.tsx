import { render } from '@testing-library/react'
import Logo from './Logo'

describe('Logo', () => {
  it('renders logo image', () => {
    const { container } = render(<Logo />)

    expect(container.querySelector('ion-img')).toBeTruthy()
  })
})
