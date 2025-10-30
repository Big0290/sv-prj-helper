<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MoneyCounter from './MoneyCounter.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Interactive/MoneyCounter',
    component: MoneyCounter,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of MoneyCounter component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <MoneyCounter>Default MoneyCounter</MoneyCounter>
</Story>

<Story name="Variation 1">
  <MoneyCounter>Variation 1</MoneyCounter>
</Story>

<Story name="Variation 2">
  <MoneyCounter>Variation 2</MoneyCounter>
</Story>
