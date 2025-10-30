<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Navbar from './Navbar.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Navigation/Navbar',
    component: Navbar,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of Navbar component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
