import { createRef } from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner } from './spinner'

describe('Spinner', () => {
  it('renders with the default brand color and medium size', () => {
    render(<Spinner data-testid='spinner' />)
    const spinnerElement = screen.getByTestId('spinner')

    expect(spinnerElement).toHaveClass('spinner', 'spinner_color_brand', 'spinner_size_m')
  })

  it('does not add a color modifier for the inherited color', () => {
    render(<Spinner data-testid='spinner' color='inherit' />)
    const spinnerElement = screen.getByTestId('spinner')

    expect(spinnerElement.className).not.toContain('spinner_color_')
  })

  it('merges a custom className with the component classes', () => {
    render(<Spinner data-testid='spinner' className='custom' />)
    const spinnerElement = screen.getByTestId('spinner')

    expect(spinnerElement).toHaveClass('spinner', 'custom')
  })

  it('forwards a ref to the root element', () => {
    const ref = createRef<HTMLSpanElement>()

    render(<Spinner ref={ref} data-testid='spinner' />)
    const spinnerElement = screen.getByTestId('spinner')

    expect(ref.current).toBe(spinnerElement)
  })
})
