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

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
