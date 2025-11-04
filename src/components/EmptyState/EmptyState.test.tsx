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

  it('renders button with onAction or actionHref', () => {
    const { container: withAction } = render(
      <EmptyState icon='film-outline' message='Test' actionLabel='Click' onAction={vi.fn()} />
    )
    expect(withAction.querySelector('ion-button')).toBeTruthy()

    const { container: withHref } = render(
      <EmptyState icon='film-outline' message='Test' actionLabel='Click' actionHref='/' />
    )
    expect(withHref.querySelector('ion-button')).toBeTruthy()
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
