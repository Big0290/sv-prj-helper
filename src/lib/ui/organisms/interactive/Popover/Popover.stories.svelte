<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Popover from './Popover.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Interactive/Popover',
    component: Popover,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of Popover component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <Popover>Default Popover</Popover>
</Story>

<Story name="Variation 1">
  <Popover>Variation 1</Popover>
</Story>

<Story name="Variation 2">
  <Popover>Variation 2</Popover>
</Story>
