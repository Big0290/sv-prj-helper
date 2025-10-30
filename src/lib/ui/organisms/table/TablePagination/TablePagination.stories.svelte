<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TablePagination from './TablePagination.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Table/TablePagination',
    component: TablePagination,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of TablePagination component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
