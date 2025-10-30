<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Tabs from './Tabs.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Navigation/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of Tabs component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <Tabs>Default Tabs</Tabs>
</Story>

<Story name="Variation 1">
  <Tabs>Variation 1</Tabs>
</Story>

<Story name="Variation 2">
  <Tabs>Variation 2</Tabs>
</Story>
