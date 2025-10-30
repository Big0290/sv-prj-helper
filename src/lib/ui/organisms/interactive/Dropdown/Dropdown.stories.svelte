<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Dropdown from './Dropdown.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Interactive/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of Dropdown component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
