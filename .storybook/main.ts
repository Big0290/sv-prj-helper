import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  stories: [
    '../src/lib/ui/**/*.stories.@(js|ts|svelte)',
    '../src/stories/**/*.stories.@(js|ts|svelte)',
    '!../src/stories/Configure.mdx' // Exclude example docs
  ],
  addons: [
    '@storybook/addon-svelte-csf',
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest'
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
};
export default config;