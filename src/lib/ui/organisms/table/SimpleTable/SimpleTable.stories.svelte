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

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
