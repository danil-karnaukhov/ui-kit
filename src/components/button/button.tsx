import type { ComponentPropsWithRef, ReactNode } from 'react'

import { block } from '../../utils/bem'
import { Spinner, type SpinnerSize } from '../spinner/spinner'

import './button.scss'

export type ButtonVariant = 'solid' | 'outline' | 'subtle' | 'ghost'

export type ButtonColor = 'brand' | 'neutral' | 'success' | 'warning' | 'danger'

export type ButtonShape = 'round' | 'brick' | 'round-brick' | 'brick-round'

export type ButtonSize = 's' | 'm' | 'l'

export type ButtonProps = Omit<ComponentPropsWithRef<'button'>, 'color'> & {
  /** Вариант оформления кнопки */
  variant?: ButtonVariant
  /** Цвет кнопки */
  color?: ButtonColor
  /** Форма скругления углов кнопки */
  shape?: ButtonShape
  /** Размер кнопки */
  size?: ButtonSize
  /** Лейбл кнопки */
  children?: ReactNode
  /** Иконка перед лейблом. Без лейбла кнопка становится icon-only */
  startIcon?: ReactNode
  /**
   * Иконка после лейбла. Отображается только при наличии лейбла.
   * Без лейбла игнорируется — для icon-only используйте `startIcon`.
   */
  endIcon?: ReactNode
  /** Растягивает кнопку на всю доступную ширину */
  fullWidth?: boolean
  /** Блокирует кнопку */
  disabled?: boolean
  /** Показывает индикатор загрузки и блокирует кнопку */
  loading?: boolean
}

const b = block('button')

const spinnerSizes: Record<ButtonSize, SpinnerSize> = {
  s: 'xs',
  m: 's',
  l: 'm',
}

export const Button = (props: ButtonProps) => {
  const {
    variant = 'solid',
    color = 'brand',
    shape = 'round',
    size = 'm',
    startIcon,
    endIcon,
    fullWidth,
    loading,
    disabled,
    children,
    className,
    ...rest
  } = props

  const hasLabel =
    children !== undefined && children !== null && children !== '' && typeof children !== 'boolean'

  const iconOnly = !hasLabel && Boolean(startIcon)

  const showEndIcon = hasLabel && Boolean(endIcon)

  const classes = b(
    {
      variant,
      color,
      shape,
      size,
      iconOnly,
      fullWidth,
      loading,
    },
    className,
  )

  return (
    <button className={classes} type='button' disabled={disabled || loading} {...rest}>
      {startIcon && <span className={b('startIcon')}>{startIcon}</span>}

      {hasLabel && <span className={b('label')}>{children}</span>}

      {showEndIcon && <span className={b('endIcon')}>{endIcon}</span>}

      {loading && <Spinner className={b('spinner')} color='inherit' size={spinnerSizes[size]} />}
    </button>
  )
}
