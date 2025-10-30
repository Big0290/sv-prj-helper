<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TableCard from './TableCard.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Table/TableCard',
    component: TableCard,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of TableCard component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
