<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import DateRangePicker from './DateRangePicker.svelte'

  const { Story } = defineMeta({
    title: 'Organisms/Forms/DateRangePicker',
    component: DateRangePicker,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component: 'A date range picker component for selecting start and end dates.',
        },
      },
    },
  })

  const startDate = new Date('2024-01-01')
  const endDate = new Date('2024-01-31')
</script>

<Story name="Default" args={{ start: null, end: null }} />

<Story name="WithLabel" args={{ start: null, end: null, label: 'Date Range' }} />

<Story name="PreSelected" args={{ start: startDate, end: endDate }} />
