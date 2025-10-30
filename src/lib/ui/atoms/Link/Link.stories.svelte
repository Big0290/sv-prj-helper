<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Link from './Link.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Link',
		component: Link,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A link component with support for external links, different underline styles, and sizes.'
				}
			}
		}
	});
</script>

<Story name="Default">
	<Link href="#default">Default Link</Link>
</Story>

<Story name="AllSizes">
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<Link href="#xs" size="xs">Extra Small Link</Link>
		<Link href="#sm" size="sm">Small Link</Link>
		<Link href="#base" size="base">Base Link</Link>
		<Link href="#lg" size="lg">Large Link</Link>
	</div>
</Story>

<Story name="External">
	<Link href="https://example.com" external>External Link</Link>
</Story>

<Story name="UnderlineStyles">
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<Link href="#none" underline="none">No Underline (hover to see)</Link>
		<Link href="#hover" underline="hover">Hover Underline</Link>
		<Link href="#always" underline="always">Always Underlined</Link>
	</div>
</Story>

<Story name="CustomColor">
	<Link href="#custom" color="#ef4444">Custom Red Link</Link>
</Story>

<Story name="NavigationExample">
	<nav style="display: flex; gap: 1.5rem;">
		<Link href="#home">Home</Link>
		<Link href="#about">About</Link>
		<Link href="#services">Services</Link>
		<Link href="#contact">Contact</Link>
	</nav>
</Story>

<Story name="FooterLinks">
	<footer style="display: flex; flex-direction: column; gap: 0.5rem;">
		<Link href="#privacy" underline="always">Privacy Policy</Link>
		<Link href="#terms" underline="always">Terms of Service</Link>
		<Link href="#support" external>Support</Link>
	</footer>
</Story>
