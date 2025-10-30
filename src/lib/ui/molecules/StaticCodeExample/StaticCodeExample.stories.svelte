<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import StaticCodeExample from './StaticCodeExample.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/StaticCodeExample',
		component: StaticCodeExample,
		tags: ['autodocs'],
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component: 'A comprehensive code example component with copy functionality and language support.'
				}
			}
		}
	});
</script>

<Story name="BasicExample">
	<StaticCodeExample 
		title="Button Component"
		description="A simple button component example"
		code="Button component example"
	/>
</Story>

<Story name="JavaScriptCode">
	<StaticCodeExample 
		title="Array Methods"
		description="Common JavaScript array operations"
		language="javascript"
		code="const users = [1, 2, 3]; const doubled = users.map(x => x * 2);"
	/>
</Story>

<Story name="TypeScriptCode">
	<StaticCodeExample 
		title="TypeScript Interface"
		description="Defining types with interfaces"
		language="typescript"
		code="interface User id: number; name: string;"
	/>
</Story>

<Story name="WithoutCopy">
	<StaticCodeExample 
		title="Read-only Code"
		description="Code example without copy button"
		showCopyButton={false}
		code="const config = theme: dark;"
	/>
</Story>
