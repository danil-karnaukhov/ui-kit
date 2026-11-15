import { createRef } from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Input } from './input'

describe('Input', () => {
  it('forwards native input props to the input element', () => {
    render(
      <Input
        aria-label='Поле'
        name='email'
        type='email'
        placeholder='email@example.com'
        disabled
      />,
    )
    const input = screen.getByRole('textbox', { name: 'Поле' })

    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('name', 'email')
    expect(input).toHaveAttribute('placeholder', 'email@example.com')
    expect(input).toBeDisabled()
  })

  it('renders a textarea when as="textarea"', () => {
    render(<Input as='textarea' aria-label='Поле' rows={4} />)
    const input = screen.getByRole('textbox', { name: 'Поле' })

    expect(input.tagName).toBe('TEXTAREA')
    expect(input).toHaveAttribute('rows', '4')
  })

  it('applies a custom className to the input element', () => {
    render(<Input className='custom' aria-label='Поле' />)
    const input = screen.getByRole('textbox', { name: 'Поле' })

    expect(input).toHaveClass('input', 'custom')
  })

  it('forwards a ref to the input element', () => {
    const ref = createRef<HTMLInputElement>()

    render(<Input ref={ref} aria-label='Поле' />)
    const input = screen.getByRole('textbox', { name: 'Поле' })

    expect(ref.current).toBe(input)
  })
})
