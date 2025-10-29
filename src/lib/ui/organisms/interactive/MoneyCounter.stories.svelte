<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MoneyCounter from './MoneyCounter.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/Interactive/MoneyCounter',
		component: MoneyCounter,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A money counter component for counting coins with denomination support, currency selection, and quick adjustment buttons.'
				}
			}
		},
		argTypes: {
			denomination: {
				control: { type: 'number', step: 0.01 },
				description: 'The denomination value (e.g., 0.05 for 5 cents)'
			},
			denominationLabel: {
				control: { type: 'text' },
				description: 'Display label for the denomination (e.g., "5¢")'
			},
			count: {
				control: { type: 'number', step: 1 },
				description: 'Current count value'
			},
			currency: {
				control: { type: 'select' },
				options: ['CDN', 'USD'],
				description: 'Currency code'
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Whether the component is disabled'
			},
			min: {
				control: { type: 'number', step: 1 },
				description: 'Minimum count value'
			},
			max: {
				control: { type: 'number', step: 1 },
				description: 'Maximum count value'
			}
		}
	});
</script>

<Story name="Default" args={{ denomination: 0.05, count: 20 }} />

<Story name="FiveCents" args={{ denomination: 0.05, denominationLabel: '5¢', count: 20 }} />

<Story name="TenCents" args={{ denomination: 0.10, denominationLabel: '10¢', count: 0 }} />

<Story name="Quarter" args={{ denomination: 0.25, denominationLabel: '25¢', count: 0 }} />

<Story name="OneDollar" args={{ denomination: 1.00, denominationLabel: '$1', count: 0 }} />

<Story name="WithMinMax" args={{ denomination: 0.05, min: 0, max: 100, count: 50 }} />

<Story name="Disabled" args={{ denomination: 0.05, count: 20, disabled: true }} />

<Story name="USDCurrency" args={{ denomination: 0.05, currency: 'USD', count: 20 }} />
