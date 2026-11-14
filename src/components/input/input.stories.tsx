import type { Meta, StoryObj } from '@storybook/react-vite'
import { EyeIcon, LinkIcon, LockIcon, SearchIcon } from 'lucide-react'

import { Input } from './input'

const icons = {
  SearchIcon: <SearchIcon />,
  EyeIcon: <EyeIcon />,
  LinkIcon: <LinkIcon />,
  LockIcon: <LockIcon />,
}

const meta = {
  title: 'Inputs/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'Поле ввода текста.',
      },
    },
  },
  argTypes: {
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
    startContent: {
      control: { type: 'select' },
      options: Object.keys(icons),
      mapping: icons,
    },
    endContent: {
      control: { type: 'select' },
      options: Object.keys(icons),
      mapping: icons,
    },
    rootProps: {
      table: {
        type: { summary: 'Object' },
        defaultValue: { summary: '{}' },
      },
    },
    error: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    variant: 'outline',
    shape: 'round',
    size: 'm',
    placeholder: 'Введите значение',
    error: false,
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
      <Input {...args} shape='round-clear' />
      <Input {...args} shape='clear-round' />
      <Input {...args} shape='clear-clear' />
    </div>
  ),
  argTypes: {
    shape: {
      table: { disable: true },
    },
  },
}

export const StartAndEndContent: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-column'>
      <Input {...args} startContent={icons.LinkIcon} />
      <Input {...args} endContent={icons.SearchIcon} />
      <Input {...args} startContent={icons.LockIcon} endContent={icons.EyeIcon} />
      <Input {...args} startContent='До' endContent='шт.' />
    </div>
  ),
  argTypes: {
    startContent: {
      table: { disable: true },
    },
    endContent: {
      table: { disable: true },
    },
  },
}

export const Sizes: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-column'>
      <Input {...args} size='s' startContent={icons.SearchIcon} />
      <Input {...args} size='m' startContent={icons.SearchIcon} />
      <Input {...args} size='l' startContent={icons.SearchIcon} />
    </div>
  ),
  argTypes: {
    size: {
      table: { disable: true },
    },
  },
}

export const Error: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-column'>
      <Input {...args} variant='outline' error />
      <Input {...args} variant='subtle' error />
    </div>
  ),
  argTypes: {
    variant: {
      table: { disable: true },
    },
    error: {
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
