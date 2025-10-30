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

<Story name="Default">
  <Navbar>Default Navbar</Navbar>
</Story>

<Story name="Variation 1">
  <Navbar>Variation 1</Navbar>
</Story>

<Story name="Variation 2">
  <Navbar>Variation 2</Navbar>
</Story>
