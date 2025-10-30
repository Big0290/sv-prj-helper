<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Menu from './Menu.svelte'

  const { Story } = defineMeta({
    title: 'Molecules/Menu',
    component: Menu,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'A menu component with dropdown functionality and customizable placement.',
        },
      },
    },
  })
</script>

<Story name="Default" args={{ open: false, placement: 'bottom-start' }} />

<Story name="BottomEnd" args={{ open: false, placement: 'bottom-end' }} />

<Story name="TopStart" args={{ open: false, placement: 'top-start' }} />
