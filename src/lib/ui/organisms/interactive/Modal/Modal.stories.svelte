<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Modal from './Modal.svelte'

  const { Story } = defineMeta({
    title: 'Organisms/Interactive/Modal',
    component: Modal,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'A modal dialog component with customizable sizes and behaviors.',
        },
      },
    },
  })
</script>

<Story name="Default">
  <Modal open={true} title="Modal Title" onclose={() => console.log('Modal closed')}>
    <p>Modal content goes here</p>
  </Modal>
</Story>

<Story name="Small">
  <Modal open={true} size="sm" title="Small Modal" onclose={() => console.log('Modal closed')}>
    <p>This is a small modal</p>
  </Modal>
</Story>

<Story name="Large">
  <Modal open={true} size="lg" title="Large Modal" onclose={() => console.log('Modal closed')}>
    <p>This is a large modal with more space for content</p>
  </Modal>
</Story>

