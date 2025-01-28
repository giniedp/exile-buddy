import type { Preview } from '@storybook/svelte'
import { themes } from '@storybook/theming'
import '../src/app.css'

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
    },
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
