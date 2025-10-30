<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import FocusTrap from './FocusTrap.svelte';

  const { Story } = defineMeta({
    title: 'Utils/FocusTrap',
    component: FocusTrap,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'Description of FocusTrap component.'
        }
      }
    }
  });
</script>

<Story name="Default">
  <FocusTrap>Default FocusTrap</FocusTrap>
</Story>

<Story name="Variation 1">
  <FocusTrap>Variation 1</FocusTrap>
</Story>

<Story name="Variation 2">
  <FocusTrap>Variation 2</FocusTrap>
</Story>
