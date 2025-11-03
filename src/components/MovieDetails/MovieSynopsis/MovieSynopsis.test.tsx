import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import MovieSynopsis from './MovieSynopsis'

describe('MovieSynopsis', () => {
  it('renders synopsis title', () => {
    const { container } = render(<MovieSynopsis overview='Test overview' />)

    const title = container.querySelector('ion-card-title')
    expect(title?.textContent).toBe('Sinopse')
  })

  it('renders overview text', () => {
    const { container } = render(<MovieSynopsis overview='Test overview' />)

    const content = container.querySelector('ion-card-content p')
    expect(content?.textContent).toBe('Test overview')
  })

  it('shows default message when overview is empty', () => {
    const { container } = render(<MovieSynopsis overview='' />)

    const content = container.querySelector('ion-card-content p')
    expect(content?.textContent).toBe('Sinopse não disponível.')
  })

  it('renders ion-card structure', () => {
    const { container } = render(<MovieSynopsis overview='Test overview' />)

    const card = container.querySelector('ion-card')
    const header = container.querySelector('ion-card-header')
    const content = container.querySelector('ion-card-content')

    expect(card).toBeTruthy()
    expect(header).toBeTruthy()
    expect(content).toBeTruthy()
  })
})
