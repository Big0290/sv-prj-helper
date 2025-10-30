<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import QuickScan from './QuickScan.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Barcode/QuickScan',
    component: QuickScan,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of QuickScan component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <QuickScan>Default QuickScan</QuickScan>
</Story>

<Story name="Variation 1">
  <QuickScan>Variation 1</QuickScan>
</Story>

<Story name="Variation 2">
  <QuickScan>Variation 2</QuickScan>
</Story>
