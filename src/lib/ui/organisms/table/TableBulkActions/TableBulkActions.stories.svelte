<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TableBulkActions from './TableBulkActions.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Table/TableBulkActions',
    component: TableBulkActions,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of TableBulkActions component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
