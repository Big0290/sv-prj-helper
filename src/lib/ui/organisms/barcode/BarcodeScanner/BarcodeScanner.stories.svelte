<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import BarcodeScanner from './BarcodeScanner.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Barcode/BarcodeScanner',
    component: BarcodeScanner,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of BarcodeScanner component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <BarcodeScanner>Default BarcodeScanner</BarcodeScanner>
</Story>

<Story name="Variation 1">
  <BarcodeScanner>Variation 1</BarcodeScanner>
</Story>

<Story name="Variation 2">
  <BarcodeScanner>Variation 2</BarcodeScanner>
</Story>
