export type Modifiers = Record<string, string | boolean | undefined>

export type ClassNameMix = string | (string | undefined)[]

export type ClassNameFormatter = {
  (element: string, mix?: ClassNameMix): string
  (element: string, modifiers?: Modifiers | null, mix?: ClassNameMix): string
  (modifiers?: Modifiers | null, mix?: ClassNameMix): string
}

const formatModifiers = (base: string, modifiers: Modifiers | null | undefined): string => {
  if (!modifiers) {
    return ''
  }

  let result = ''

  for (const [modifier, value] of Object.entries(modifiers)) {
    if (!value) {
      continue
    }

    result += value === true ? ` ${base}_${modifier}` : ` ${base}_${modifier}_${value}`
  }

  return result
}

const formatMix = (mix: ClassNameMix | undefined): string => {
  if (!mix) {
    return ''
  }

  if (typeof mix === 'string') {
    return ` ${mix}`
  }

  let result = ''

  for (const className of mix) {
    if (className) {
      result += ` ${className}`
    }
  }

  return result
}

export const block = (blockName: string): ClassNameFormatter => {
  return (
    elementOrModifiers?: string | Modifiers | null,
    modifiersOrMix?: Modifiers | ClassNameMix | null,
    elementMix?: ClassNameMix,
  ): string => {
    const isSecondArgMix = typeof modifiersOrMix === 'string' || Array.isArray(modifiersOrMix)

    let base = blockName
    let modifiers: Modifiers | null | undefined

    if (typeof elementOrModifiers === 'string') {
      base += `__${elementOrModifiers}`
      modifiers = isSecondArgMix ? undefined : modifiersOrMix
    } else {
      modifiers = elementOrModifiers
    }

    return (
      base +
      formatModifiers(base, modifiers) +
      formatMix(isSecondArgMix ? modifiersOrMix : elementMix)
    )
  }
}
