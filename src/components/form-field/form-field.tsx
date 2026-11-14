import type { ComponentPropsWithRef } from 'react'

import { block } from '../../utils/bem'

import './form-field.scss'

const b = block('form-field')

export type FormFieldProps = ComponentPropsWithRef<'div'>

const Root = (props: FormFieldProps) => {
  const { className, ...rest } = props
  return <div className={b(null, className)} {...rest} />
}

export type FormFieldLabelProps = ComponentPropsWithRef<'label'> & {
  required?: boolean
}

const Label = (props: FormFieldLabelProps) => {
  const { children, required, className, ...rest } = props

  return (
    <label className={b('label', className)} {...rest}>
      {children}
      {required && <span className={b('required-indicator')}>*</span>}
    </label>
  )
}

export type FormFieldErrorTextProps = ComponentPropsWithRef<'div'>

const ErrorText = (props: FormFieldErrorTextProps) => {
  const { className, ...rest } = props
  return <div className={b('error-text', className)} {...rest} />
}

export type FormFieldHelperTextProps = ComponentPropsWithRef<'div'>

const HelperText = (props: FormFieldHelperTextProps) => {
  const { className, ...rest } = props
  return <div className={b('helper-text', className)} {...rest} />
}

export const FormField = Object.assign(Root, {
  Label,
  ErrorText,
  HelperText,
})
