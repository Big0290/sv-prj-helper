<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import TagInput from './TagInput.svelte'

  const { Story } = defineMeta({
    title: 'Molecules/TagInput',
    component: TagInput,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'A tag input component for adding and removing multiple tags.',
        },
      },
    },
  })
</script>

<Story name="Default" args={{ tags: [] }} />

<Story name="WithInitialTags" args={{ tags: ['React', 'Svelte', 'Vue'] }} />

<Story name="MaxTags" args={{ tags: [], maxTags: 5 }} />

<Story name="CustomPlaceholder" args={{ tags: [], placeholder: 'Add skills...' }} />

<Story name="Disabled" args={{ tags: ['tag1', 'tag2'], disabled: true }} />
