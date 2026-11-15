import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './input'

const meta = {
  title: 'Inputs/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          'Полиморфное поле ввода. Рендерит `<input>` по умолчанию; через `as` можно указать другой тег.',
      },
    },
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['input', 'textarea', 'select', 'button'],
      table: {
        defaultValue: { summary: 'input' },
      },
    },
    variant: {
      table: {
        defaultValue: { summary: 'outline' },
      },
    },
    shape: {
      table: {
        defaultValue: { summary: 'round' },
      },
    },
    size: {
      table: {
        defaultValue: { summary: 'm' },
      },
    },
    placeholder: {
      description: 'Подсказка, отображаемая в пустом поле ввода',
    },
    hasError: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: 'Блокирует поле ввода',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    as: 'input',
    variant: 'outline',
    shape: 'round',
    size: 'm',
    placeholder: 'Введите значение',
    hasError: false,
    disabled: false,
  },
} satisfies Meta<typeof Input>

export const Default: StoryObj<typeof meta> = {}

export const Variants: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-column'>
      <Input {...args} variant='outline' />
      <Input {...args} variant='subtle' />
    </div>
  ),
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
}

export const Shape: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-column'>
      <Input {...args} shape='round' />
      <Input {...args} shape='brick' />
      <Input {...args} shape='round-brick' />
      <Input {...args} shape='brick-round' />
    </div>
  ),
  argTypes: {
    shape: {
      table: { disable: true },
    },
  },
}

export const Sizes: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-column'>
      <Input {...args} size='s' />
      <Input {...args} size='m' />
      <Input {...args} size='l' />
    </div>
  ),
  argTypes: {
    size: {
      table: { disable: true },
    },
  },
}

export const Textarea: StoryObj<typeof meta> = {
  args: {
    as: 'textarea',
    rows: 4,
  },
  argTypes: {
    as: {
      table: { disable: true },
    },
  },
}

export const Error: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-column'>
      <Input {...args} variant='outline' hasError />
      <Input {...args} variant='subtle' hasError />
    </div>
  ),
  argTypes: {
    variant: {
      table: { disable: true },
    },
    hasError: {
      table: { disable: true },
    },
  },
}

export const Disabled: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-column'>
      <Input {...args} variant='outline' disabled />
      <Input {...args} variant='subtle' disabled />
    </div>
  ),
  argTypes: {
    variant: {
      table: { disable: true },
    },
    disabled: {
      table: { disable: true },
    },
  },
}

export default meta
