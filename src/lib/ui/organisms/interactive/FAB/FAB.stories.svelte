<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FAB from './FAB.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Interactive/FAB',
    component: FAB,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of FAB component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <FAB>Default FAB</FAB>
</Story>

<Story name="Variation 1">
  <FAB>Variation 1</FAB>
</Story>

<Story name="Variation 2">
  <FAB>Variation 2</FAB>
</Story>
