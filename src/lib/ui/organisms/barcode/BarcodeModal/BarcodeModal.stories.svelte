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

<Story name="Default">
  <BarcodeModal>Default BarcodeModal</BarcodeModal>
</Story>

<Story name="Variation 1">
  <BarcodeModal>Variation 1</BarcodeModal>
</Story>

<Story name="Variation 2">
  <BarcodeModal>Variation 2</BarcodeModal>
</Story>
