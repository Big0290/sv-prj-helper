<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CodeEditor from './CodeEditor.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Editor/CodeEditor',
    component: CodeEditor,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of CodeEditor component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <CodeEditor>Default CodeEditor</CodeEditor>
</Story>

<Story name="Variation 1">
  <CodeEditor>Variation 1</CodeEditor>
</Story>

<Story name="Variation 2">
  <CodeEditor>Variation 2</CodeEditor>
</Story>
