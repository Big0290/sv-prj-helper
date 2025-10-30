<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Drawer from './Drawer.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Interactive/Drawer',
    component: Drawer,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of Drawer component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <Drawer>Default Drawer</Drawer>
</Story>

<Story name="Variation 1">
  <Drawer>Variation 1</Drawer>
</Story>

<Story name="Variation 2">
  <Drawer>Variation 2</Drawer>
</Story>
