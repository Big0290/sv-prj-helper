<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CodeBlock from './CodeBlock.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Editor/CodeBlock',
    component: CodeBlock,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of CodeBlock component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <CodeBlock>Default CodeBlock</CodeBlock>
</Story>

<Story name="Variation 1">
  <CodeBlock>Variation 1</CodeBlock>
</Story>

<Story name="Variation 2">
  <CodeBlock>Variation 2</CodeBlock>
</Story>
