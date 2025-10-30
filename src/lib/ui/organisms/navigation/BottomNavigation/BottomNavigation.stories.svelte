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

<Story name="Default">
  <BottomNavigation>Default BottomNavigation</BottomNavigation>
</Story>

<Story name="Variation 1">
  <BottomNavigation>Variation 1</BottomNavigation>
</Story>

<Story name="Variation 2">
  <BottomNavigation>Variation 2</BottomNavigation>
</Story>
