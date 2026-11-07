import { createRef } from 'react'

import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './button'

describe('Button', () => {
  it('uses type="button" by default', () => {
    render(<Button>Кнопка</Button>)
    const button = screen.getByRole('button', { name: 'Кнопка' })

    expect(button).toHaveAttribute('type', 'button')
  })

  it('allows overriding the default type', () => {
    render(<Button type='submit'>Кнопка</Button>)
    const button = screen.getByRole('button', { name: 'Кнопка' })

    expect(button).toHaveAttribute('type', 'submit')
  })

  it('renders 0 as a label', () => {
    render(<Button>{0}</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveTextContent('0')
    expect(button).not.toHaveClass('button_iconOnly')
  })

  it.for([
    { label: 'undefined', children: undefined },
    { label: 'null', children: null },
    { label: 'empty string', children: '' },
    { label: 'false', children: false },
    { label: 'true', children: true },
  ])('does not render a label for $label children', ({ children }) => {
    render(
      <Button aria-label='Кнопка' startIcon={<svg />}>
        {children}
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Кнопка' })

    expect(button).toHaveClass('button_iconOnly')
    expect(button).not.toHaveTextContent(/\S/)
  })

  it('renders the label between the start and end icons', () => {
    render(
      <Button startIcon={<svg data-testid='start-icon' />} endIcon={<svg data-testid='end-icon' />}>
        Кнопка
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Кнопка' })
    const label = within(button).getByText('Кнопка')
    const startIcon = screen.getByTestId('start-icon')
    const endIcon = screen.getByTestId('end-icon')

    expect(startIcon.compareDocumentPosition(label) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(label.compareDocumentPosition(endIcon) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(button).not.toHaveClass('button_iconOnly')
  })

  it('marks a button with only a start icon as icon-only', () => {
    render(<Button aria-label='Добавить' startIcon={<svg data-testid='start-icon' />} />)
    const button = screen.getByRole('button', { name: 'Добавить' })
    const startIcon = screen.getByTestId('start-icon')

    expect(button).toHaveClass('button_iconOnly')
    expect(button).not.toHaveTextContent(/\S/)
    expect(button).toContainElement(startIcon)
  })

  it('ignores the end icon without a label', () => {
    render(<Button aria-label='Добавить' endIcon={<svg data-testid='end-icon' />} />)
    const button = screen.getByRole('button', { name: 'Добавить' })
    const endIcon = screen.queryByTestId('end-icon')

    expect(button).not.toHaveClass('button_iconOnly')
    expect(button).not.toHaveTextContent(/\S/)
    expect(endIcon).toBeNull()
  })

  it('ignores the end icon when both icons are passed without a label', () => {
    render(
      <Button
        aria-label='Добавить'
        startIcon={<svg data-testid='start-icon' />}
        endIcon={<svg data-testid='end-icon' />}
      />,
    )
    const button = screen.getByRole('button', { name: 'Добавить' })
    const startIcon = screen.getByTestId('start-icon')
    const endIcon = screen.queryByTestId('end-icon')

    expect(button).toHaveClass('button_iconOnly')
    expect(button).toContainElement(startIcon)
    expect(endIcon).toBeNull()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn<() => void>()

    render(<Button onClick={handleClick}>Кнопка</Button>)
    const button = screen.getByRole('button', { name: 'Кнопка' })

    await userEvent.click(button)

    expect(handleClick).toHaveBeenCalledOnce()
  })

  it.for([
    { label: 'disabled', props: { disabled: true } },
    { label: 'loading', props: { loading: true } },
  ])('does not call onClick when $label', async ({ props }) => {
    const handleClick = vi.fn<() => void>()

    render(
      <Button {...props} onClick={handleClick}>
        Кнопка
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Кнопка' })

    await userEvent.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('disables the button while loading', () => {
    render(<Button loading>Кнопка</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows a spinner while loading', () => {
    render(<Button loading>Кнопка</Button>)
    const button = screen.getByRole('button', { name: 'Кнопка' })

    expect(button.querySelector('.button__spinner')).not.toBeNull()
  })

  it('merges a custom className with the component classes', () => {
    render(<Button className='custom'>Кнопка</Button>)
    const button = screen.getByRole('button', { name: 'Кнопка' })

    expect(button).toHaveClass('button', 'custom')
  })

  it('forwards a ref to the root element', () => {
    const ref = createRef<HTMLButtonElement>()

    render(<Button ref={ref}>Кнопка</Button>)
    const button = screen.getByRole('button', { name: 'Кнопка' })

    expect(ref.current).toBe(button)
  })
})
