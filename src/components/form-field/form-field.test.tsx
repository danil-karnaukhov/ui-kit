import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Input } from '../input/input'

import { FormField } from './form-field'

describe('FormField', () => {
  it('renders a complete field from the compound components', () => {
    render(
      <FormField>
        <FormField.Label htmlFor='email'>Email</FormField.Label>
        <Input id='email' aria-describedby='email-help email-error' />
        <FormField.HelperText id='email-help'>Подсказка</FormField.HelperText>
        <FormField.ErrorText id='email-error'>Некорректный email</FormField.ErrorText>
      </FormField>,
    )
    const input = screen.getByLabelText('Email')

    expect(input).toHaveAccessibleDescription('Подсказка Некорректный email')
  })

  it('does not render the required indicator by default', () => {
    render(<FormField.Label>Email</FormField.Label>)
    const label = screen.getByText('Email')
    const requiredIndicator = within(label).queryByText('*')

    expect(requiredIndicator).toBeNull()
  })

  it('renders the required indicator when required', () => {
    render(<FormField.Label required>Email</FormField.Label>)
    const label = screen.getByText('Email')
    const requiredIndicator = within(label).getByText('*')

    expect(requiredIndicator).toHaveClass('form-field__required-indicator')
  })
})
