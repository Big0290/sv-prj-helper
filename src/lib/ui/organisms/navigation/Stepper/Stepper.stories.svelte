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

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
