<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import MoneyCounter from './MoneyCounter.svelte'

  const { Story } = defineMeta({
    title: 'Organisms/Interactive/MoneyCounter',
    component: MoneyCounter,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component:
            'A money counter component that tracks CDN and USD currency counts separately. Switch between currencies to maintain independent counts for each.',
        },
      },
    },
  })
</script>

<Story name="Default">
  <MoneyCounter denomination={0.05} />
</Story>

<Story name="Nickel">
  <MoneyCounter denomination={0.05} denominationLabel="5¢" />
</Story>

<Story name="Quarter">
  <MoneyCounter denomination={0.25} denominationLabel="25¢" />
</Story>

<Story name="DollarBill">
  <MoneyCounter denomination={1.0} denominationLabel="$1" />
</Story>

<Story name="FiveDollarBill">
  <MoneyCounter denomination={5.0} denominationLabel="$5" />
</Story>
