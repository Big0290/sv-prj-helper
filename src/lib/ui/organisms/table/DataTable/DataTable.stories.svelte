<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DataTable from './DataTable.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Table/DataTable',
    component: DataTable,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of DataTable component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
