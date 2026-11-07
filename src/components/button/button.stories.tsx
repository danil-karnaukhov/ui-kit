import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from 'lucide-react'

import { Button } from './button'

const icons = {
  Plus: <PlusIcon />,
  ChevronDown: <ChevronDownIcon />,
  ChevronLeft: <ChevronLeftIcon />,
  ChevronRight: <ChevronRightIcon />,
}

const meta = {
  title: 'Inputs/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Элемент управления, инициирующий действие по клику.',
      },
    },
  },
  argTypes: {
    variant: {
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    color: {
      table: {
        defaultValue: { summary: 'brand' },
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
    children: {
      control: { type: 'text' },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    startIcon: {
      control: { type: 'select' },
      options: Object.keys(icons),
      mapping: icons,
    },
    endIcon: {
      control: { type: 'select' },
      options: Object.keys(icons),
      mapping: icons,
    },
    fullWidth: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    variant: 'solid',
    color: 'brand',
    shape: 'round',
    size: 'm',
    children: 'Кнопка',
    fullWidth: false,
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>

export const Default: StoryObj<typeof meta> = {}

export const Variants: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-row'>
      <Button {...args} variant='solid' />
      <Button {...args} variant='outline' />
      <Button {...args} variant='subtle' />
      <Button {...args} variant='ghost' />
    </div>
  ),
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
}

export const Colors: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-row'>
      <Button {...args} color='neutral' />
      <Button {...args} color='brand' />
      <Button {...args} color='success' />
      <Button {...args} color='warning' />
      <Button {...args} color='danger' />
    </div>
  ),
  argTypes: {
    color: {
      table: { disable: true },
    },
  },
}

export const Shape: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-row'>
      <Button {...args} shape='round' />
      <Button {...args} shape='brick' />
      <Button {...args} shape='round-brick' />
      <Button {...args} shape='brick-round' />
    </div>
  ),
  argTypes: {
    shape: {
      table: { disable: true },
    },
  },
}

export const Icons: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-row'>
      <Button {...args} startIcon={icons.Plus} />
      <Button {...args} endIcon={icons.ChevronDown} />
      <Button {...args} startIcon={icons.ChevronLeft} endIcon={icons.ChevronRight} />
    </div>
  ),
  argTypes: {
    startIcon: {
      table: { disable: true },
    },
    endIcon: {
      table: { disable: true },
    },
  },
}

export const OnlyIcon: StoryObj<typeof meta> = {
  render: (args) => {
    const argsWithoutChildren = { ...args, children: undefined }

    return (
      <div className='sb-row'>
        <Button {...argsWithoutChildren} variant='solid' startIcon={icons.Plus} />
        <Button {...argsWithoutChildren} variant='outline' startIcon={icons.Plus} />
        <Button {...argsWithoutChildren} variant='subtle' startIcon={icons.Plus} />
        <Button {...argsWithoutChildren} variant='ghost' startIcon={icons.Plus} />
      </div>
    )
  },
  argTypes: {
    children: {
      table: { disable: true },
    },
    variant: {
      table: { disable: true },
    },
  },
}

export const Sizes: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-row'>
      <Button {...args} size='s' />
      <Button {...args} size='m' />
      <Button {...args} size='l' />
    </div>
  ),
  argTypes: {
    size: {
      table: { disable: true },
    },
  },
}

export const Loading: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-row'>
      <Button {...args} variant='solid' loading />
      <Button {...args} variant='outline' loading />
      <Button {...args} variant='subtle' loading />
      <Button {...args} variant='ghost' loading />
    </div>
  ),
  argTypes: {
    variant: {
      table: { disable: true },
    },
    loading: {
      table: { disable: true },
    },
  },
}

export const Disabled: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-row'>
      <Button {...args} variant='solid' disabled />
      <Button {...args} variant='outline' disabled />
      <Button {...args} variant='subtle' disabled />
      <Button {...args} variant='ghost' disabled />
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
