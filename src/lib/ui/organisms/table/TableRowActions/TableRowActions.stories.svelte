<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TableRowActions from './TableRowActions.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Table/TableRowActions',
    component: TableRowActions,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of TableRowActions component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
