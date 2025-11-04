import { beforeEach, describe, expect, it } from 'vitest'
import { notifications, useToastStore } from './notifications'

describe('notifications', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] })
  })

  it('adds success toast', () => {
    notifications.success('Success')
    const toasts = useToastStore.getState().toasts
    expect(toasts).toHaveLength(1)
    expect(toasts[0].type).toBe('success')
    expect(toasts[0].message).toBe('Success')
  })

  it('adds error toast', () => {
    notifications.error('Error')
    const toasts = useToastStore.getState().toasts
    expect(toasts).toHaveLength(1)
    expect(toasts[0].type).toBe('error')
  })

  it('adds warning toast', () => {
    notifications.warning('Warning')
    const toasts = useToastStore.getState().toasts
    expect(toasts[0].type).toBe('warning')
  })

  it('adds info toast', () => {
    notifications.info('Info')
    const toasts = useToastStore.getState().toasts
    expect(toasts[0].type).toBe('info')
  })

  it('removes toast by id', () => {
    notifications.success('Test')
    const id = useToastStore.getState().toasts[0].id
    useToastStore.getState().removeToast(id)
    expect(useToastStore.getState().toasts).toHaveLength(0)
  })
})
