<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CommandPalette from './CommandPalette.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Interactive/CommandPalette',
    component: CommandPalette,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of CommandPalette component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <CommandPalette>Default CommandPalette</CommandPalette>
</Story>

<Story name="Variation 1">
  <CommandPalette>Variation 1</CommandPalette>
</Story>

<Story name="Variation 2">
  <CommandPalette>Variation 2</CommandPalette>
</Story>
