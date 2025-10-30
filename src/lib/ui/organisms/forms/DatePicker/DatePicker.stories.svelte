<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import DatePicker from './DatePicker.svelte'

  const { Story } = defineMeta({
    title: 'Organisms/Forms/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'A date picker component with calendar interface.',
        },
      },
    },
  })

  const selectedDate = new Date('2024-01-15')
  const minDate = new Date('2024-01-01')
  const maxDate = new Date('2024-12-31')
</script>

<Story name="Default" args={{ value: null }} />

<Story name="WithLabel" args={{ value: null, label: 'Select Date' }} />

<Story name="PreSelected" args={{ value: selectedDate }} />

<Story name="CustomPlaceholder" args={{ value: null, placeholder: 'Choose a date' }} />
