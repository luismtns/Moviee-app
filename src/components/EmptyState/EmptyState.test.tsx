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

  it('renders title and button', () => {
    const { container } = render(
      <EmptyState icon='film-outline' message='Test' title='Title' actionLabel='Click' onAction={vi.fn()} />
    )
    expect(container.textContent).toContain('Title')
    expect(container.querySelector('ion-button')).toBeTruthy()
  })

  it('renders children', () => {
    const { container } = render(
      <EmptyState icon='film-outline' message='Test'>
        <div>Child</div>
      </EmptyState>
    )
    expect(container.textContent).toContain('Child')
  })
})
