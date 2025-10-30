<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ConfirmDialog from './ConfirmDialog.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Interactive/ConfirmDialog',
    component: ConfirmDialog,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of ConfirmDialog component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
