import type { ComponentPropsWithRef, ElementType } from 'react'

import { block } from '../../utils/bem'

import './input.scss'

export type InputVariant = 'outline' | 'subtle'

export type InputSize = 's' | 'm' | 'l'

export type InputShape = 'round' | 'brick' | 'round-brick' | 'brick-round'

export type InputOwnProps = {
  /** Вариант оформления поля ввода */
  variant?: InputVariant
  /** Форма скругления углов поля ввода */
  shape?: InputShape
  /** Размер поля ввода */
  size?: InputSize
  /** Показывает состояние ошибки */
  hasError?: boolean
}

export type InputProps<T extends ElementType = 'input'> = Omit<ComponentPropsWithRef<T>, 'size'> &
  InputOwnProps & {
    /** Тег/компонент поля ввода */
    as?: T
  }

const b = block('input')

export const Input = <T extends ElementType = 'input'>(props: InputProps<T>) => {
  const {
    as: Tag = 'input',
    variant = 'outline',
    shape = 'round',
    size = 'm',
    hasError,
    className,
    ...rest
  } = props

  const classes = b(
    {
      variant,
      shape,
      size,
      hasError,
    },
    className,
  )

  return <Tag className={classes} {...rest} />
}
