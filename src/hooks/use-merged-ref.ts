import { useCallback, type Ref, type RefCallback } from 'react'

const assignRef = <T>(ref: Ref<T> | undefined, value: T | null) => {
  if (!ref) {
    return
  }

  if (typeof ref === 'function') {
    return ref(value)
  }

  ref.current = value
}

export const mergeRefs = <T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> => {
  return (node) => {
    let hasCleanup = false

    const cleanups = refs.map((ref) => {
      const cleanup = assignRef(ref, node)

      if (!hasCleanup && typeof cleanup === 'function') {
        hasCleanup = true
      }

      return cleanup
    })

    if (!hasCleanup) {
      return
    }

    return () => {
      cleanups.forEach((cleanup, index) => {
        if (typeof cleanup === 'function') {
          cleanup()
        } else {
          assignRef(refs[index], null)
        }
      })
    }
  }
}

export const useMergedRef = <T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> => {
  // oxlint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(mergeRefs(...refs), refs)
}
