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

<Story name="WithIcon" args={{}}>
	{#snippet icon()}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; color: #3b82f6;">
			<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
			<circle cx="8.5" cy="7" r="4" />
			<path d="M20 8v6M23 11h-6" />
		</svg>
	{/snippet}
	
	<StatsCard 
		label="New Users"
		value="234"
		trend={18.2}
		icon={icon}
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
