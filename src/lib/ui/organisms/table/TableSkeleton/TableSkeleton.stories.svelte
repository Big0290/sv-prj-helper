<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TableSkeleton from './TableSkeleton.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Table/TableSkeleton',
    component: TableSkeleton,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of TableSkeleton component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <TableSkeleton>Default TableSkeleton</TableSkeleton>
</Story>

<Story name="Variation 1">
  <TableSkeleton>Variation 1</TableSkeleton>
</Story>

<Story name="Variation 2">
  <TableSkeleton>Variation 2</TableSkeleton>
</Story>
