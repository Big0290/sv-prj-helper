<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Breadcrumb from './Breadcrumb.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/Breadcrumb',
		component: Breadcrumb,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A breadcrumb navigation component with multiple separator styles and variants.'
				}
			}
		}
	});
</script>

<Story name="Default">
	<Breadcrumb 
		items={[
			{ label: 'Products', href: '#products' },
			{ label: 'Electronics', href: '#electronics' },
			{ label: 'Phone', href: '#phone' }
		]}
	/>
</Story>

<Story name="WithSlash">
	<Breadcrumb 
		items={[
			{ label: 'Home', href: '#home' },
			{ label: 'Blog', href: '#blog' },
			{ label: 'Post' }
		]}
		separator="slash"
	/>
</Story>

<Story name="WithDots">
	<Breadcrumb 
		items={[
			{ label: 'Category 1', href: '#cat1' },
			{ label: 'Category 2', href: '#cat2' },
			{ label: 'Category 3' }
		]}
		separator="dot"
	/>
</Story>

<Story name="SmallSize">
	<Breadcrumb 
		items={[
			{ label: 'Small', href: '#small' },
			{ label: 'Breadcrumb' }
		]}
		size="sm"
	/>
</Story>

<Story name="WithoutHome">
	<Breadcrumb 
		items={[
			{ label: 'First', href: '#first' },
			{ label: 'Second', href: '#second' },
			{ label: 'Third' }
		]}
		showHome={false}
	/>
</Story>

<Story name="Truncated">
	<Breadcrumb 
		items={[
			{ label: 'Level 1', href: '#1' },
			{ label: 'Level 2', href: '#2' },
			{ label: 'Level 3', href: '#3' },
			{ label: 'Level 4', href: '#4' },
			{ label: 'Level 5', href: '#5' },
			{ label: 'Level 6', href: '#6' },
			{ label: 'Current Page' }
		]}
		maxItems={5}
	/>
</Story>
