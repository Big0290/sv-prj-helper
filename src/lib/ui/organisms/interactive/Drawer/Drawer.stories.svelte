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

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
