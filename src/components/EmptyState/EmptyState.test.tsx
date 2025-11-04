import { render } from '@testing-library/react'
import { vi } from 'vitest'
import EmptyState from './EmptyState'

vi.mock('@ionic/react', async () => {
  const actual = await vi.importActual('@ionic/react')
  return {
    ...actual,
    IonIcon: () => null,
  }
})

describe('EmptyState', () => {
  it('renders message', () => {
    const { container } = render(<EmptyState icon='film-outline' message='Test' />)
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
