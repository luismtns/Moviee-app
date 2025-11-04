import { render } from '@testing-library/react'
import { vi } from 'vitest'
import EmptyState from './EmptyState'

describe('EmptyState', () => {
  it('renders icon and message', () => {
    const { container } = render(<EmptyState icon='film-outline' message='Test' />)
    expect(container.querySelector('ion-icon')).toBeTruthy()
    expect(container.textContent).toContain('Test')
  })

  it('renders title', () => {
    const { container } = render(<EmptyState icon='film-outline' message='Test' title='Title' />)
    expect(container.textContent).toContain('Title')
  })

  it('renders button', () => {
    const { container } = render(
      <EmptyState icon='film-outline' message='Test' actionLabel='Click' onAction={vi.fn()} />
    )
    expect(container.querySelector('ion-button')).toBeTruthy()
  })
})
