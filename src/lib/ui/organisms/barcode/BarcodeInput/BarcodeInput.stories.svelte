<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import BarcodeInput from './BarcodeInput.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Barcode/BarcodeInput',
    component: BarcodeInput,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of BarcodeInput component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <BarcodeInput>Default BarcodeInput</BarcodeInput>
</Story>

<Story name="Variation 1">
  <BarcodeInput>Variation 1</BarcodeInput>
</Story>

<Story name="Variation 2">
  <BarcodeInput>Variation 2</BarcodeInput>
</Story>
