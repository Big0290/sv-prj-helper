<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import SearchField from './SearchField.svelte'

  const { Story } = defineMeta({
    title: 'Organisms/Forms/SearchField',
    component: SearchField,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'A search field component with suggestions and loading states.',
        },
      },
    },
  })

  const suggestions = ['React', 'Vue', 'Svelte', 'Angular', 'Next.js', 'Nuxt.js']
</script>

<Story name="Default" args={{ value: '' }} />

<Story name="WithPlaceholder" args={{ value: '', placeholder: 'Search products...' }} />

<Story name="WithSuggestions" args={{ value: '', suggestions }} />

<Story name="Loading" args={{ value: '', placeholder: 'Searching...', loading: true }} />

<Story name="WithValue" args={{ value: 'Svelte' }} />
