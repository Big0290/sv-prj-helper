<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Stepper from './Stepper.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Navigation/Stepper',
    component: Stepper,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of Stepper component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <Stepper>Default Stepper</Stepper>
</Story>

<Story name="Variation 1">
  <Stepper>Variation 1</Stepper>
</Story>

<Story name="Variation 2">
  <Stepper>Variation 2</Stepper>
</Story>
