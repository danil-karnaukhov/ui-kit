import type { Meta, StoryObj } from '@storybook/react-vite'

import { Spinner } from './spinner'

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: 'Индикатор загрузки. Показывает, что процесс выполняется.',
      },
    },
  },
  argTypes: {
    color: {
      table: {
        defaultValue: { summary: 'brand' },
      },
    },
    size: {
      table: {
        defaultValue: { summary: 'm' },
      },
    },
  },
  args: {
    color: 'brand',
    size: 'm',
  },
} satisfies Meta<typeof Spinner>

export const Default: StoryObj<typeof meta> = {}

export const Colors: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-row'>
      <Spinner {...args} color='brand' />
      <Spinner {...args} color='inherit' />
    </div>
  ),
  argTypes: {
    color: {
      table: { disable: true },
    },
  },
}

export const Sizes: StoryObj<typeof meta> = {
  render: (args) => (
    <div className='sb-row'>
      <Spinner {...args} size='xs' />
      <Spinner {...args} size='s' />
      <Spinner {...args} size='m' />
      <Spinner {...args} size='l' />
      <Spinner {...args} size='xl' />
    </div>
  ),
  argTypes: {
    size: {
      table: { disable: true },
    },
  },
}

export default meta
