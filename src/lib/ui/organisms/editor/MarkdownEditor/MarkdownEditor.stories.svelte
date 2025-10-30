<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MarkdownEditor from './MarkdownEditor.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Editor/MarkdownEditor',
    component: MarkdownEditor,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of MarkdownEditor component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <MarkdownEditor>Default MarkdownEditor</MarkdownEditor>
</Story>

<Story name="Variation 1">
  <MarkdownEditor>Variation 1</MarkdownEditor>
</Story>

<Story name="Variation 2">
  <MarkdownEditor>Variation 2</MarkdownEditor>
</Story>
