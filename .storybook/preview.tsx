import type { Preview } from '@storybook/react-vite'

import '../src/styles/reset.scss'
import '../src/styles/fonts.scss'
import '../src/styles/tokens.scss'
import '../src/styles/base.scss'
import './preview.scss'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: {
        order: ['Inputs', 'Data display', 'Feedback', 'Navigation', 'Miscellaneous'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
