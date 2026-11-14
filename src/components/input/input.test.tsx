import { createRef, type ChangeEventHandler } from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Input } from './input'

describe('Input', () => {
  it('accepts user input in uncontrolled mode', async () => {
    render(<Input aria-label='Поле' />)
    const input = screen.getByRole('textbox', { name: 'Поле' })

    await userEvent.type(input, 'текст')

    expect(input).toHaveValue('текст')
  })

  it('calls onChange handler when typing', async () => {
    const handleChange = vi.fn<ChangeEventHandler<HTMLInputElement>>()

    render(<Input aria-label='Поле' onChange={handleChange} />)
    const input = screen.getByRole('textbox', { name: 'Поле' })

    await userEvent.type(input, 'ab')

    expect(handleChange).toHaveBeenCalledTimes(2)
    expect(handleChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'ab' }) as unknown,
      }),
    )
  })

  it('focuses the input when the root element itself is clicked', async () => {
    render(<Input aria-label='Поле' rootProps={{ 'data-testid': 'root' }} />)
    const input = screen.getByRole('textbox', { name: 'Поле' })
    const root = screen.getByTestId('root')

    await userEvent.click(root)

    expect(input).toHaveFocus()
  })

  it.for([
    { label: 'startContent', props: { startContent: 'До' }, content: 'До' },
    { label: 'endContent', props: { endContent: 'шт.' }, content: 'шт.' },
  ])('focuses the input when a non-interactive $label is clicked', async ({ props, content }) => {
    render(<Input aria-label='Количество' {...props} />)
    const input = screen.getByRole('textbox', { name: 'Количество' })
    const nonInteractiveContent = screen.getByText(content)

    await userEvent.click(nonInteractiveContent)

    expect(input).toHaveFocus()
  })

  it.for([
    { label: 'a button', name: 'Кнопка', role: 'button' as const },
    { label: 'a link', name: 'Ссылка', role: 'link' as const },
  ])('does not steal focus when $label inside startContent is clicked', async ({ name, role }) => {
    render(
      <Input
        aria-label='Поле'
        startContent={
          <>
            <button type='button'>Кнопка</button>
            <a
              href='/test'
              onClick={(event) => {
                event.preventDefault()
              }}
            >
              Ссылка
            </a>
          </>
        }
      />,
    )
    const input = screen.getByRole('textbox', { name: 'Поле' })
    const target = screen.getByRole(role, { name })

    await userEvent.click(target)

    expect(target).toHaveFocus()
    expect(input).not.toHaveFocus()
  })

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

  it('applies a custom className to the root and not to the input', () => {
    render(<Input className='custom' aria-label='Поле' rootProps={{ 'data-testid': 'root' }} />)
    const root = screen.getByTestId('root')
    const input = screen.getByRole('textbox', { name: 'Поле' })

    expect(root).toHaveClass('custom')
    expect(input).not.toHaveClass('custom')
  })

  it('forwards a ref to the input element', () => {
    const ref = createRef<HTMLInputElement>()

    render(<Input ref={ref} aria-label='Поле' />)
    const input = screen.getByRole('textbox', { name: 'Поле' })

    expect(ref.current).toBe(input)
  })
})
