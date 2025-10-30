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

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
