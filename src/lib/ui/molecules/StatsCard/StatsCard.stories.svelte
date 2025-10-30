<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import StatsCard from './StatsCard.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/StatsCard',
		component: StatsCard,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A stat card component for displaying metrics with trends, icons, and loading states.'
				}
			}
		}
	});
</script>

<Story name="Default">
	<StatsCard 
		label="Total Users"
		value="12,543"
	/>
</Story>

<Story name="WithTrend">
	<StatsCard 
		label="Revenue"
		value="$45,231"
		trend={12.5}
	/>
</Story>

<Story name="NegativeTrend">
	<StatsCard 
		label="Active Users"
		value="8,421"
		trend={-3.2}
	/>
</Story>

<Story name="SuccessVariant">
	<StatsCard 
		label="Sales"
		value="$12,345"
		trend={25.8}
		variant="success"
	/>
</Story>

<Story name="WarningVariant">
	<StatsCard 
		label="Pending Orders"
		value="42"
		variant="warning"
	/>
</Story>

<Story name="Loading">
	<StatsCard 
		label="Loading Stats"
		value="--"
		loading={true}
	/>
</Story>

<Story name="DashboardGrid">
	<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
		<StatsCard label="Revenue" value="$125,430" trend={15.3} variant="success" />
		<StatsCard label="Orders" value="1,234" trend={8.7} variant="default" />
		<StatsCard label="Customers" value="5,678" trend={-2.1} variant="warning" />
	</div>
</Story>
