<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Sidebar from './Sidebar.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Navigation/Sidebar',
    component: Sidebar,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of Sidebar component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <Sidebar>Default Sidebar</Sidebar>
</Story>

<Story name="Variation 1">
  <Sidebar>Variation 1</Sidebar>
</Story>

<Story name="Variation 2">
  <Sidebar>Variation 2</Sidebar>
</Story>
