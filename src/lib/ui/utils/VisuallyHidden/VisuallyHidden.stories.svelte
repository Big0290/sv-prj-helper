<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import VisuallyHidden from './VisuallyHidden.svelte';

  const { Story } = defineMeta({
    title: 'Utils/VisuallyHidden',
    component: VisuallyHidden,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of VisuallyHidden component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <VisuallyHidden>Default VisuallyHidden</VisuallyHidden>
</Story>

<Story name="Variation 1">
  <VisuallyHidden>Variation 1</VisuallyHidden>
</Story>

<Story name="Variation 2">
  <VisuallyHidden>Variation 2</VisuallyHidden>
</Story>
