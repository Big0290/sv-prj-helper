<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import InfiniteScroll from './InfiniteScroll.svelte';

  const { Story } = defineMeta({
    title: 'Utils/InfiniteScroll',
    component: InfiniteScroll,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of InfiniteScroll component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <InfiniteScroll>Default InfiniteScroll</InfiniteScroll>
</Story>

<Story name="Variation 1">
  <InfiniteScroll>Variation 1</InfiniteScroll>
</Story>

<Story name="Variation 2">
  <InfiniteScroll>Variation 2</InfiniteScroll>
</Story>
