<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Select from './Select.svelte'

  const { Story } = defineMeta({
    title: 'Organisms/Forms/Select',
    component: Select,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'A select dropdown component with options and validation support.',
        },
      },
    },
  })

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  const colorOptions = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
  ]
</script>

<Story name="Default" args={{ value: '', options }} />

<Story name="WithLabel" args={{ value: '', label: 'Choose an option', options }} />

<Story name="WithPlaceholder" args={{ value: '', placeholder: 'Select...', options }} />

<Story name="Required" args={{ value: '', label: 'Color', required: true, options: colorOptions }} />

<Story name="WithError" args={{ value: '', label: 'Category', error: 'This field is required', options }} />

<Story name="Disabled" args={{ value: 'option1', label: 'Color', disabled: true, options: colorOptions }} />
