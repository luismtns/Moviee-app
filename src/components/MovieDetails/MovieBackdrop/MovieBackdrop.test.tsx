import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import MovieBackdrop from './MovieBackdrop'

describe('MovieBackdrop', () => {
  it('renders backdrop with background image', () => {
    const { container } = render(<MovieBackdrop backdropPath='/test-backdrop.jpg' />)

    const backdrop = container.querySelector('.movie-backdrop') as HTMLElement
    expect(backdrop).toBeTruthy()
    expect(backdrop?.style.backgroundImage).toContain('/test-backdrop.jpg')
  })

  it('renders overlay', () => {
    const { container } = render(<MovieBackdrop backdropPath='/test-backdrop.jpg' />)

    const overlay = container.querySelector('.backdrop-overlay')
    expect(overlay).toBeTruthy()
  })

  it('handles null backdrop path', () => {
    const { container } = render(<MovieBackdrop backdropPath={null} />)

    const backdrop = container.querySelector('.movie-backdrop')
    expect(backdrop).toBeTruthy()
  })
})
