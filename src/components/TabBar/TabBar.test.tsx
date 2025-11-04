import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TabBar } from './TabBar'

describe('TabBar', () => {
  it('renders tabs', () => {
    const { container } = render(<TabBar />)
    expect(container.querySelectorAll('ion-tab-button')).toHaveLength(2)
  })
})
