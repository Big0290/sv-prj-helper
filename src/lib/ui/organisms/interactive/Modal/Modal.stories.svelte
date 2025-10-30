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
  <script>
    let open = $state(false)
  </script>

  <button class="trigger-btn" onclick={() => (open = true)}>Open Modal</button>

  <Modal {open} title="Modal Title" onclose={() => (open = false)}>
    <p>Modal content goes here</p>
  </Modal>
</Story>

<Story name="Small">
  <script>
    let open = $state(false)
  </script>

  <button class="trigger-btn" onclick={() => (open = true)}>Open Small Modal</button>

  <Modal {open} size="sm" title="Small Modal" onclose={() => (open = false)}>
    <p>This is a small modal</p>
  </Modal>
</Story>

<Story name="Large">
  <script>
    let open = $state(false)
  </script>

  <button class="trigger-btn" onclick={() => (open = true)}>Open Large Modal</button>

  <Modal {open} size="lg" title="Large Modal" onclose={() => (open = false)}>
    <p>This is a large modal with more space for content</p>
  </Modal>
</Story>

<style>
  .trigger-btn {
    padding: 0.75rem 1.5rem;
    background: var(--color-primary-500, #8b5cf6);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.2s;
  }

  .trigger-btn:hover {
    background: var(--color-primary-600, #7c3aed);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }

  .trigger-btn:active {
    transform: translateY(0);
  }
</style>
