<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import BarcodeDisplay from './BarcodeDisplay.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Barcode/BarcodeDisplay',
    component: BarcodeDisplay,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of BarcodeDisplay component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <BarcodeDisplay>Default BarcodeDisplay</BarcodeDisplay>
</Story>

<Story name="Variation 1">
  <BarcodeDisplay>Variation 1</BarcodeDisplay>
</Story>

<Story name="Variation 2">
  <BarcodeDisplay>Variation 2</BarcodeDisplay>
</Story>
