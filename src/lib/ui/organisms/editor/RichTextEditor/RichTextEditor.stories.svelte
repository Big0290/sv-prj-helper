<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import RichTextEditor from './RichTextEditor.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Editor/RichTextEditor',
    component: RichTextEditor,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of RichTextEditor component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <RichTextEditor>Default RichTextEditor</RichTextEditor>
</Story>

<Story name="Variation 1">
  <RichTextEditor>Variation 1</RichTextEditor>
</Story>

<Story name="Variation 2">
  <RichTextEditor>Variation 2</RichTextEditor>
</Story>
