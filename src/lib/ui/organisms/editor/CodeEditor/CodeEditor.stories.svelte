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

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
