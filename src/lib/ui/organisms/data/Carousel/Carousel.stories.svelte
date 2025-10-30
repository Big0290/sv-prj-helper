<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Carousel from './Carousel.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Data/Carousel',
    component: Carousel,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of Carousel component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <Carousel>Default Carousel</Carousel>
</Story>

<Story name="Variation 1">
  <Carousel>Variation 1</Carousel>
</Story>

<Story name="Variation 2">
  <Carousel>Variation 2</Carousel>
</Story>
