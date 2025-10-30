<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Timeline from './Timeline.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Data/Timeline',
    component: Timeline,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of Timeline component.'
        }
      }
    }
  });
</script>

<Story name="Default" args={{}} />

<Story name="Variation 1" args={{}} />

<Story name="Variation 2" args={{}} />
