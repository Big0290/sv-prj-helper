<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Portal from './Portal.svelte';

  const { Story } = defineMeta({
    title: 'Utils/Portal',
    component: Portal,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of Portal component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <Portal>Default Portal</Portal>
</Story>

<Story name="Variation 1">
  <Portal>Variation 1</Portal>
</Story>

<Story name="Variation 2">
  <Portal>Variation 2</Portal>
</Story>
