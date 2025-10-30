<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SimpleTable from './SimpleTable.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Table/SimpleTable',
    component: SimpleTable,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of SimpleTable component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <SimpleTable>Default SimpleTable</SimpleTable>
</Story>

<Story name="Variation 1">
  <SimpleTable>Variation 1</SimpleTable>
</Story>

<Story name="Variation 2">
  <SimpleTable>Variation 2</SimpleTable>
</Story>
