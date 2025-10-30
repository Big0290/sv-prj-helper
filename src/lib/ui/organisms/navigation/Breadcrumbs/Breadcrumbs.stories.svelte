<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Breadcrumbs from './Breadcrumbs.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/Navigation/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of Breadcrumbs component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <Breadcrumbs>Default Breadcrumbs</Breadcrumbs>
</Story>

<Story name="Variation 1">
  <Breadcrumbs>Variation 1</Breadcrumbs>
</Story>

<Story name="Variation 2">
  <Breadcrumbs>Variation 2</Breadcrumbs>
</Story>
