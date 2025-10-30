<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import MessageMenu from './MessageMenu.svelte'

  const { Story } = defineMeta({
    title: 'Organisms/Chat/MessageMenu',
    component: MessageMenu,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'A context menu component for message actions.',
        },
      },
    },
  })

  const customItems = [
    { id: 'save', label: 'Save', icon: 'save' },
    { id: 'share', label: 'Share', icon: 'share' },
    { id: 'delete', label: 'Delete', icon: 'delete', variant: 'danger' },
  ]
</script>

<Story name="Default" args={{ open: false, position: { x: 0, y: 0 } }} />

<Story name="CustomItems" args={{ open: false, items: customItems, position: { x: 0, y: 0 } }} />
