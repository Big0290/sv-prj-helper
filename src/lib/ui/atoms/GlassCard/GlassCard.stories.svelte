<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import GlassCard from './GlassCard.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/GlassCard',
		component: GlassCard,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A glassmorphism card component with multiple variants, blur levels, and interactive states.'
				}
			}
		}
	});
</script>

<Story name="Default">
	<GlassCard>
		<h3>Default Glass Card</h3>
		<p>This is a default glass card with medium blur and shadow.</p>
	</GlassCard>
</Story>

<Story name="Variants">
	<div style="display: flex; gap: 1rem;">
		<GlassCard variant="default">
			<h4>Default</h4>
			<p>Standard card</p>
		</GlassCard>
		<GlassCard variant="elevated">
			<h4>Elevated</h4>
			<p>Raised effect</p>
		</GlassCard>
		<GlassCard variant="subtle">
			<h4>Subtle</h4>
			<p>Softer style</p>
		</GlassCard>
	</div>
</Story>

<Story name="BlurLevels">
	<div style="display: flex; gap: 1rem;">
		<GlassCard blur="sm">
			<h4>Small Blur</h4>
			<p>Light blur effect</p>
		</GlassCard>
		<GlassCard blur="md">
			<h4>Medium Blur</h4>
			<p>Default blur</p>
		</GlassCard>
		<GlassCard blur="lg">
			<h4>Large Blur</h4>
			<p>Heavy blur effect</p>
		</GlassCard>
	</div>
</Story>

<Story name="PaddingSizes">
	<div style="display: flex; gap: 1rem;">
		<GlassCard padding="sm">Small padding</GlassCard>
		<GlassCard padding="md">Medium padding</GlassCard>
		<GlassCard padding="lg">Large padding</GlassCard>
		<GlassCard padding="xl">Extra large padding</GlassCard>
	</div>
</Story>

<Story name="Interactive">
	<GlassCard interactive ariaLabel="Click me">
		<h3>Interactive Card</h3>
		<p>Hover and click this card to see the effects</p>
	</GlassCard>
</Story>

<Story name="WithoutBorder">
	<GlassCard border={false}>
		<h3>No Border</h3>
		<p>Card without border style</p>
	</GlassCard>
</Story>

<Story name="CustomOpacity">
	<GlassCard opacity={0.2}>
		<h3>Custom Opacity</h3>
		<p>Card with 20% opacity</p>
	</GlassCard>
</Story>
