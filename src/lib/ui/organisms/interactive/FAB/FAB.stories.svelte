<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FAB from './FAB.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Interactive/FAB',
    component: FAB,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of FAB component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
