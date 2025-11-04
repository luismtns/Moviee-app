import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import MovieSynopsis from './MovieSynopsis'

describe('MovieSynopsis', () => {
  it('renders overview', () => {
    const { container } = render(<MovieSynopsis overview='Test' />)
    expect(container.textContent).toContain('Test')
  })

  it('shows default when empty', () => {
    const { container } = render(<MovieSynopsis overview='' />)
    expect(container.textContent).toContain('não disponível')
  })
})
