import { type ComponentPropsWithRef, type MouseEvent, type ReactNode, useRef } from 'react'

import { useMergedRef } from '../../hooks/use-merged-ref'
import { block } from '../../utils/bem'

import './input.scss'

export type InputVariant = 'outline' | 'subtle'

export type InputSize = 's' | 'm' | 'l'

export type InputShape =
  | 'round'
  | 'brick'
  | 'round-brick'
  | 'brick-round'
  | 'round-clear'
  | 'clear-round'
  | 'clear-clear'

export type InputRootProps = Omit<
  ComponentPropsWithRef<'div'>,
  'children' | 'dangerouslySetInnerHTML' | 'className'
> &
  Record<`data-${string}`, string | number | boolean | undefined>

export type InputProps = Omit<
  ComponentPropsWithRef<'input'>,
  'children' | 'dangerouslySetInnerHTML' | 'size'
> & {
  /** Вариант оформления поля ввода */
  variant?: InputVariant
  /** Форма скругления углов поля ввода */
  shape?: InputShape
  /** Размер поля ввода */
  size?: InputSize
  /** Подсказка, отображаемая в пустом поле ввода */
  placeholder?: string
  /** Контент перед полем ввода */
  startContent?: ReactNode
  /** Контент после поля ввода */
  endContent?: ReactNode
  /** Дополнительные пропсы корневого элемента */
  rootProps?: InputRootProps
  /** Показывает состояние ошибки */
  error?: boolean
  /** Блокирует поле ввода */
  disabled?: boolean
}

const b = block('input')

export const Input = (props: InputProps) => {
  const {
    variant = 'outline',
    shape = 'round',
    size = 'm',
    startContent,
    endContent,
    rootProps = {},
    ref,
    className,
    error,
    ...rest
  } = props

  const { onMouseDown: rootOnMouseDown, ...rootRest } = rootProps

  const inputRef = useRef<HTMLInputElement>(null)

  const mergedRef = useMergedRef(ref, inputRef)

  const classes = b(
    {
      variant,
      shape,
      size,
      error,
    },
    className,
  )

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    rootOnMouseDown?.(event)

    if (event.target instanceof Element && !event.target.closest('input, button, a')) {
      event.preventDefault()
      inputRef.current?.focus()
    }
  }

  return (
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions
    <div {...rootRest} className={classes} onMouseDown={handleMouseDown}>
      {startContent && <div className={b('start-content')}>{startContent}</div>}

      <input ref={mergedRef} {...rest} />

      {endContent && <div className={b('end-content')}>{endContent}</div>}
    </div>
  )
}
