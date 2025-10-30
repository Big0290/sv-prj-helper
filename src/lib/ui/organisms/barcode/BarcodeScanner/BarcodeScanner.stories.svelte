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

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
