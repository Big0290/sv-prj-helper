<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import LiveCodePreview from './LiveCodePreview.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Editor/LiveCodePreview',
    component: LiveCodePreview,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of LiveCodePreview component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <LiveCodePreview>Default LiveCodePreview</LiveCodePreview>
</Story>

<Story name="Variation 1">
  <LiveCodePreview>Variation 1</LiveCodePreview>
</Story>

<Story name="Variation 2">
  <LiveCodePreview>Variation 2</LiveCodePreview>
</Story>
