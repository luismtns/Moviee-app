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

  it('renders app name', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(container.querySelector('.app-name')?.textContent).toBe('Moviee')
  })

  it('renders back button when backHref provided', () => {
    const { container } = render(
      <MemoryRouter>
        <Header backHref='/home' />
      </MemoryRouter>
    )

    expect(container.querySelector('ion-back-button')).toBeTruthy()
  })

  it('does not render back button without backHref', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(container.querySelector('ion-back-button')).toBeFalsy()
  })
})
