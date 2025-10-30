<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import BottomNavigation from './BottomNavigation.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Navigation/BottomNavigation',
    component: BottomNavigation,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of BottomNavigation component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
