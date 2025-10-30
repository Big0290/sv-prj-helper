<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ScrollArea from './ScrollArea.svelte';

  const { Story } = defineMeta({
    title: 'Utils/ScrollArea',
    component: ScrollArea,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of ScrollArea component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <ScrollArea>Default ScrollArea</ScrollArea>
</Story>

<Story name="Variation 1">
  <ScrollArea>Variation 1</ScrollArea>
</Story>

<Story name="Variation 2">
  <ScrollArea>Variation 2</ScrollArea>
</Story>
