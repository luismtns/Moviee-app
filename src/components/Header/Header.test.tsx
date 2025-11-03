import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

describe('Header', () => {
  it('renders ion-header with toolbar', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(container.querySelector('ion-header')).toBeTruthy()
    expect(container.querySelector('ion-toolbar')).toBeTruthy()
  })

  it('renders logo and app name', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(container.querySelector('.logo-container')).toBeTruthy()
    expect(container.querySelector('.app-name')?.textContent).toBe('Moviee')
  })
})
