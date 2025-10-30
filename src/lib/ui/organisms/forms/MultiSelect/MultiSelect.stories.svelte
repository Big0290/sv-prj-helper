<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import MultiSelect from './MultiSelect.svelte'

  const { Story } = defineMeta({
    title: 'Organisms/Forms/MultiSelect',
    component: MultiSelect,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'A multi-select component for selecting multiple options from a list.',
        },
      },
    },
  })

  const options = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ]
</script>

<Story name="Default" args={{ selected: [], options }} />

<Story name="WithLabel" args={{ selected: [], label: 'Skills', options }} />

<Story name="PreSelected" args={{ selected: ['js', 'svelte'], options }} />

<Story name="MaxSelection" args={{ selected: [], max: 3, options }} />

<Story name="NonSearchable" args={{ selected: [], searchable: false, options }} />
