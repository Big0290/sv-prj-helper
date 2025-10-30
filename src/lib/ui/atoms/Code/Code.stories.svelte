<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Code from './Code.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Code',
		component: Code,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A code component for displaying inline code snippets.'
				}
			}
		}
	});
</script>

<Story name="Inline">
	<p>Here is some <Code>inline code</Code> in a sentence.</p>
</Story>

<Story name="InlineVariables">
	<p>Use <Code>let count</Code> to create a variable.</p>
</Story>

<Story name="InlineFunctions">
	<p>The <Code>handleClick</Code> function is called when clicked.</p>
</Story>

<Story name="InlineCommands">
	<p>Install with <Code>npm install svelte</Code></p>
</Story>

<Story name="MultipleInline">
	<div class="inline-examples">
		<p>Install with <Code>npm install</Code></p>
		<p>Run with <Code>npm run dev</Code></p>
		<p>Build with <Code>npm run build</Code></p>
	</div>
</Story>

<Story name="InParagraph">
	<div class="paragraph-example">
		<p>
			In this paragraph, we demonstrate inline code usage.
			Use <Code>let</Code> to declare variables, 
			<Code>const</Code> for constants, 
			and <Code>function</Code> to define functions.
		</p>
	</div>
</Story>

<style>
	.inline-examples,
	.paragraph-example {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.inline-examples p,
	.paragraph-example p {
		margin: 0;
	}
</style>
