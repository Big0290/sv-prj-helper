<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TableToolbar from './TableToolbar.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Table/TableToolbar',
    component: TableToolbar,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of TableToolbar component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <TableToolbar>Default TableToolbar</TableToolbar>
</Story>

<Story name="Variation 1">
  <TableToolbar>Variation 1</TableToolbar>
</Story>

<Story name="Variation 2">
  <TableToolbar>Variation 2</TableToolbar>
</Story>
