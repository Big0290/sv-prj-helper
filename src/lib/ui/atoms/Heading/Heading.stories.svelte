<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Heading from './Heading.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Heading',
		component: Heading,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A heading component with support for all HTML heading levels and customizable sizes and weights.'
				}
			}
		}
	});
</script>

<Story name="H1">
	<Heading as="h1">Heading Level 1</Heading>
</Story>

<Story name="H2">
	<Heading as="h2">Heading Level 2</Heading>
</Story>

<Story name="H3">
	<Heading as="h3">Heading Level 3</Heading>
</Story>

<Story name="H4">
	<Heading as="h4">Heading Level 4</Heading>
</Story>

<Story name="H5">
	<Heading as="h5">Heading Level 5</Heading>
</Story>

<Story name="H6">
	<Heading as="h6">Heading Level 6</Heading>
</Story>

<Story name="AllSizes">
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<Heading size="1">Heading Size 1</Heading>
		<Heading size="2">Heading Size 2</Heading>
		<Heading size="3">Heading Size 3</Heading>
		<Heading size="4">Heading Size 4</Heading>
		<Heading size="5">Heading Size 5</Heading>
		<Heading size="6">Heading Size 6</Heading>
	</div>
</Story>

<Story name="Weights">
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<Heading weight="normal">Normal weight heading</Heading>
		<Heading weight="medium">Medium weight heading</Heading>
		<Heading weight="semibold">Semibold weight heading</Heading>
		<Heading weight="bold">Bold weight heading</Heading>
	</div>
</Story>

<Story name="Alignments">
	<div style="display: flex; flex-direction: column; gap: 1rem; width: 100%;">
		<Heading align="left">Left Aligned</Heading>
		<Heading align="center">Center Aligned</Heading>
		<Heading align="right">Right Aligned</Heading>
	</div>
</Story>

<Story name="CustomColor">
	<Heading color="#8b5cf6">Custom Purple Color</Heading>
</Story>

<Story name="ArticleExample">
	<article style="max-width: 600px;">
		<Heading as="h1" size="1" align="center">Article Title</Heading>
		<Heading as="h2" size="2">Section 1: Introduction</Heading>
		<Heading as="h3" size="3">Subsection 1.1</Heading>
		<Heading as="h3" size="3">Subsection 1.2</Heading>
		<Heading as="h2" size="2">Section 2: Main Content</Heading>
	</article>
</Story>
