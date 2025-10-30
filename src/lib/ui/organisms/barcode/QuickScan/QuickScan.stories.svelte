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

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
