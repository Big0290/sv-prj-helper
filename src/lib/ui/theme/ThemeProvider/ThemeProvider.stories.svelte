<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ThemeProvider from './ThemeProvider.svelte';

  const { Story } = defineMeta({
    title: 'Theme/ThemeProvider',
    component: ThemeProvider,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of ThemeProvider component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <ThemeProvider>Default ThemeProvider</ThemeProvider>
</Story>

<Story name="Variation 1">
  <ThemeProvider>Variation 1</ThemeProvider>
</Story>

<Story name="Variation 2">
  <ThemeProvider>Variation 2</ThemeProvider>
</Story>
