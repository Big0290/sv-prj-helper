import type { Preview } from '@storybook/sveltekit';
import '../src/lib/styles/theme.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'var(--color-neutral-900, #171717)'
        },
        {
          name: 'light',
          value: 'var(--color-neutral-50, #fafafa)'
        }
      ]
    },
    docs: {
      toc: true
    }
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: ['light', 'dark'],
        dynamicTitle: true
      }
    }
  }
};

export default preview;