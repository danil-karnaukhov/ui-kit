import type { ComponentPropsWithRef } from 'react'

import { block } from '../../utils/bem'

import './spinner.scss'

export type SpinnerColor = 'brand' | 'inherit'

export type SpinnerSize = 'xs' | 's' | 'm' | 'l' | 'xl'

export type SpinnerProps = Omit<
  ComponentPropsWithRef<'span'>,
  'children' | 'dangerouslySetInnerHTML' | 'color'
> & {
  /** Цвет индикатора. `inherit` наследует `color` родителя */
  color?: SpinnerColor
  /** Размер индикатора */
  size?: SpinnerSize
}

const b = block('spinner')

export const Spinner = (props: SpinnerProps) => {
  const { color = 'brand', size = 'm', className, ...rest } = props

  const classes = b(
    {
      color: color === 'inherit' ? undefined : color,
      size,
    },
    className,
  )

  return (
    <span className={classes} {...rest}>
      <svg>
        <circle
          cx='50%'
          cy='50%'
          pathLength={100}
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
        />
      </svg>
    </span>
  )
}
