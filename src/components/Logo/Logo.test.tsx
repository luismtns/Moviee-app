import { render, screen } from '@testing-library/react'
import Logo from './Logo'

describe('Logo', () => {
  it('renders logo image', () => {
    render(<Logo />)

    const logo = screen.getByAltText('Moviee Logo')
    expect(logo).toBeTruthy()
  })
})
