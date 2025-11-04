import { render } from '@testing-library/react'
import { TabBar } from './TabBar'

describe('TabBar', () => {
  it('renders two tab buttons', () => {
    const { container } = render(<TabBar />)

    const buttons = container.querySelectorAll('ion-tab-button')
    expect(buttons).toHaveLength(2)
  })

  it('renders home tab', () => {
    const { container } = render(<TabBar />)

    const homeButton = container.querySelector('ion-tab-button[tab="home"]')
    expect(homeButton).toBeTruthy()
    expect(homeButton?.getAttribute('href')).toBe('/home')
  })

  it('renders favorites tab', () => {
    const { container } = render(<TabBar />)

    const favButton = container.querySelector('ion-tab-button[tab="favorites"]')
    expect(favButton).toBeTruthy()
    expect(favButton?.getAttribute('href')).toBe('/favorites')
  })

  it('displays labels', () => {
    const { container } = render(<TabBar />)

    const labels = container.querySelectorAll('ion-label')
    expect(labels).toHaveLength(2)
  })
})
