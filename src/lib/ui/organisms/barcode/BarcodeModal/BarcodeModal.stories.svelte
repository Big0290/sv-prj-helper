<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import BarcodeModal from './BarcodeModal.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Barcode/BarcodeModal',
    component: BarcodeModal,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of BarcodeModal component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
