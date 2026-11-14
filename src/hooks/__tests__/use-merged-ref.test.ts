import { createRef } from 'react'

import { describe, expect, it, vi } from 'vitest'

import { mergeRefs } from '../use-merged-ref'

describe('mergeRefs()', () => {
  it('assigns the node to object refs and calls callback refs, skipping undefined refs', () => {
    const objectRef = createRef<HTMLDivElement>()
    const callbackRef = vi.fn<(node: HTMLDivElement | null) => void>()
    const node = document.createElement('div')

    mergeRefs(undefined, objectRef, undefined, callbackRef, undefined)(node)

    expect(objectRef.current).toBe(node)
    expect(callbackRef).toHaveBeenCalledExactlyOnceWith(node)
  })

  it('returns no cleanup when no ref provides one', () => {
    const objectRef = createRef<HTMLDivElement>()
    const callbackRef = vi.fn<(node: HTMLDivElement | null) => void>()
    const node = document.createElement('div')

    expect(mergeRefs()(node)).toBeUndefined()
    expect(mergeRefs(objectRef, callbackRef)(node)).toBeUndefined()
  })

  it('calls cleanups returned by callback refs and detaches the remaining refs', () => {
    const objectRef = createRef<HTMLDivElement>()
    const cleanup = vi.fn<() => void>()
    const refWithCleanup = vi.fn<(node: HTMLDivElement | null) => (() => void) | undefined>()
    refWithCleanup.mockReturnValue(cleanup)
    const refWithoutCleanup = vi.fn<(node: HTMLDivElement | null) => void>()
    const node = document.createElement('div')

    const detach = mergeRefs(objectRef, refWithCleanup, refWithoutCleanup)(node)

    expect(detach).toBeTypeOf('function')
    expect(cleanup).not.toHaveBeenCalled()

    detach?.()

    expect(objectRef.current).toBeNull()
    expect(cleanup).toHaveBeenCalledOnce()
    expect(refWithCleanup).toHaveBeenCalledOnce()
    expect(refWithCleanup).not.toHaveBeenCalledWith(null)
    expect(refWithoutCleanup).toHaveBeenLastCalledWith(null)
  })
})
