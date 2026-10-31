import { describe, expect, it } from 'vitest'

import { block, type Modifiers, type ClassNameMix } from '../bem'

describe('block()', () => {
  const b = block('button')

  describe.for([
    {
      name: 'block',
      base: 'button',
      build: (modifiers?: Modifiers | null, mix?: ClassNameMix) => b(modifiers, mix),
    },
    {
      name: 'element',
      base: 'button__icon',
      build: (modifiers?: Modifiers | null, mix?: ClassNameMix) => b('icon', modifiers, mix),
    },
  ])('$name', ({ base, build }) => {
    it('returns the base class without modifiers or mix', () => {
      expect(build()).toBe(base)
    })

    it('adds string and boolean modifiers', () => {
      expect(build({ size: 'm', hidden: true })).toBe(`${base} ${base}_size_m ${base}_hidden`)
    })

    it('filters out empty modifier values among non-empty ones', () => {
      expect(build({ size: 'm', theme: '', disabled: false, loading: undefined })).toBe(
        `${base} ${base}_size_m`,
      )
    })

    it.for<[string, Modifiers | null]>([
      ['null', null],
      ['empty object', {}],
      ['all object values are empty', { size: '', hidden: false, loading: undefined }],
    ])('does not add modifiers: %s', ([, modifiers]) => {
      expect(build(modifiers)).toBe(base)
    })

    it('adds a mix with a single class', () => {
      expect(build(null, 'class1')).toBe(`${base} class1`)
    })

    it('adds a mix with an array of classes', () => {
      expect(build(null, ['class1', 'class2'])).toBe(`${base} class1 class2`)
    })

    it('adds modifiers and mix', () => {
      expect(build({ size: 'm', hidden: true }, ['class1', 'class2'])).toBe(
        `${base} ${base}_size_m ${base}_hidden class1 class2`,
      )
    })

    it('filters out empty mix values among non-empty ones', () => {
      expect(build(null, ['class1', '', undefined, 'class2'])).toBe(`${base} class1 class2`)
    })

    it.for<[string, ClassNameMix]>([
      ['empty string', ''],
      ['empty array', []],
      ['all array values are empty', ['', undefined]],
    ])('does not add mix: %s', ([, mix]) => {
      expect(build(null, mix)).toBe(base)
    })
  })
})
