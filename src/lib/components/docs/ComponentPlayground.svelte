<script lang="ts">
	import { Card, Stack, Heading, Text, Button, Flex, Input, Checkbox, Select } from '$lib/ui';
	import CodeEditor from './CodeEditor.svelte';
	import LivePreview from './LivePreview.svelte';
	import type { PropDefinition, CodeExample } from '$lib/docs/types.js';

	interface Props {
		componentName: string;
		props: PropDefinition[];
		examples: CodeExample[];
	}

	let { componentName, props, examples }: Props = $props();

	let selectedExample = $state(0);
	let propValues = $state<Record<string, any>>({});
	let showCode = $state(true);
	let liveCode = $state('');

	// Initialize prop values with defaults
	$effect(() => {
		const initialValues: Record<string, any> = {};
		props.forEach(prop => {
			if (prop.defaultValue !== undefined) {
				initialValues[prop.name] = parseDefaultValue(prop.defaultValue, prop.type);
			} else if (prop.type.includes('boolean')) {
				initialValues[prop.name] = false;
			} else if (prop.type.includes('string')) {
				initialValues[prop.name] = '';
			} else if (prop.type.includes('number')) {
				initialValues[prop.name] = 0;
			}
		});
		propValues = initialValues;
	});

	// Update live code when example or props change
	$effect(() => {
		if (examples.length > 0) {
			liveCode = generateLiveCode();
		}
	});

	function parseDefaultValue(value: string, type: string): any {
		if (type.includes('boolean')) {
			return value === 'true';
		}
		if (type.includes('number')) {
			return parseInt(value) || 0;
		}
		return value.replace(/['"]/g, '');
	}

	function generateLiveCode(): string {
		const example = examples[selectedExample];
		if (!example) return '';

		// Start with the basic example
		let code = example.code;

		// If we have props to inject, modify the component tag
		if (props.length > 0 && Object.keys(propValues).length > 0) {
			const componentTag = `<${componentName}`;
			const propsString = Object.entries(propValues)
				.filter(([key, value]) => value !== '' && value !== false && value !== 0)
				.map(([key, value]) => {
					if (typeof value === 'boolean') {
						return value ? key : '';
					}
					if (typeof value === 'string') {
						return `${key}="${value}"`;
					}
					return `${key}={${value}}`;
				})
				.filter(Boolean)
				.join('\n  ');

			if (propsString) {
				code = code.replace(
					new RegExp(`<${componentName}[^>]*>`, 'g'),
					`${componentTag}\n  ${propsString}\n>`
				);
			}
		}

		return code;
	}

	function handlePropChange(propName: string, value: any) {
		propValues = { ...propValues, [propName]: value };
	}

	function resetProps() {
		const resetValues: Record<string, any> = {};
		props.forEach(prop => {
			if (prop.defaultValue !== undefined) {
				resetValues[prop.name] = parseDefaultValue(prop.defaultValue, prop.type);
			} else if (prop.type.includes('boolean')) {
				resetValues[prop.name] = false;
			} else {
				resetValues[prop.name] = '';
			}
		});
		propValues = resetValues;
	}

	function getUnionOptions(type: string): string[] {
		const unionMatch = type.match(/'([^']+)'/g);
		return unionMatch ? unionMatch.map(match => match.replace(/'/g, '')) : [];
	}
</script>

<div class="playground">
	<div class="playground-header">
		<Flex justify="space-between" align="center" wrap>
			<div class="example-selector">
				{#if examples.length > 1}
					<Text size="sm" weight="medium">Example:</Text>
					<select 
						bind:value={selectedExample}
						class="example-select"
					>
						{#each examples as example, index}
							<option value={index}>{example.title}</option>
						{/each}
					</select>
				{/if}
			</div>
			
			<div class="playground-controls">
				<Button 
					variant="ghost" 
					size="sm"
					onclick={() => showCode = !showCode}
				>
					{showCode ? 'Hide' : 'Show'} Code
				</Button>
				{#if props.length > 0}
					<Button variant="ghost" size="sm" onclick={resetProps}>
						Reset Props
					</Button>
				{/if}
			</div>
		</Flex>
	</div>

	<div class="playground-content">
		<div class="playground-layout" class:code-hidden={!showCode}>
			<!-- Live Preview -->
			<div class="preview-panel">
				<Card class="preview-container">
					<div class="preview-header">
						<Text size="sm" weight="medium">Preview</Text>
					</div>
					<div class="preview-content">
						<LivePreview code={liveCode} />
					</div>
				</Card>
			</div>

			<!-- Code Editor -->
			{#if showCode}
				<div class="code-panel">
					<Card class="code-container">
						<div class="code-header">
							<Text size="sm" weight="medium">Code</Text>
						</div>
						<div class="code-content">
							<CodeEditor 
								bind:value={liveCode}
								language="svelte"
								readonly={false}
							/>
						</div>
					</Card>
				</div>
			{/if}
		</div>

		<!-- Props Panel -->
		{#if props.length > 0}
			<Card class="props-panel">
				<Stack gap="4">
					<Heading as="h4" size="5">Props</Heading>
					
					<div class="props-grid">
						{#each props as prop}
							<div class="prop-control">
								<label class="prop-label">
									<Text size="sm" weight="medium">{prop.name}</Text>
									{#if !prop.required}
										<Text size="xs" color="var(--text-secondary)">optional</Text>
									{/if}
								</label>
								
								{#if prop.type.includes('boolean')}
									<Checkbox 
										checked={propValues[prop.name] || false}
										onchange={(e) => handlePropChange(prop.name, (e.target as HTMLInputElement).checked)}
									/>
								{:else if prop.type.includes('|') && !prop.type.includes('number')}
									{@const options = getUnionOptions(prop.type)}
									{#if options.length > 0}
										<Select 
											value={propValues[prop.name] || ''}
											onchange={(e) => handlePropChange(prop.name, (e.target as HTMLInputElement).value)}
										>
											<option value="">Select...</option>
											{#each options as option}
												<option value={option}>{option}</option>
											{/each}
										</Select>
									{:else}
										<Input 
											value={propValues[prop.name] || ''}
											oninput={(e) => handlePropChange(prop.name, (e.target as HTMLInputElement).value)}
											placeholder={prop.description}
											size="sm"
										/>
									{/if}
								{:else if prop.type.includes('number')}
									<Input 
										type="number"
										value={propValues[prop.name] || 0}
										oninput={(e) => handlePropChange(prop.name, parseInt((e.target as HTMLInputElement).value) || 0)}
										placeholder={prop.description}
										size="sm"
									/>
								{:else}
									<Input 
										value={propValues[prop.name] || ''}
										oninput={(e) => handlePropChange(prop.name, (e.target as HTMLInputElement).value)}
										placeholder={prop.description}
										size="sm"
									/>
								{/if}
								
								<Text size="xs" color="var(--text-secondary)">
									{prop.description}
								</Text>
							</div>
						{/each}
					</div>
				</Stack>
			</Card>
		{/if}
	</div>
</div>

<style>
	.playground {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.playground-header {
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-color);
	}

	.example-selector {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.example-select {
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background: var(--bg-secondary);
		color: var(--text-primary);
		font-size: 0.875rem;
	}

	.playground-controls {
		display: flex;
		gap: 0.5rem;
	}

	.playground-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		min-height: 400px;
	}

	.playground-layout.code-hidden {
		grid-template-columns: 1fr;
	}

	.preview-panel,
	.code-panel {
		display: flex;
		flex-direction: column;
	}

	.preview-container,
	.code-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.preview-header,
	.code-header {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border-color);
		background: var(--bg-secondary);
	}

	.preview-content,
	.code-content {
		flex: 1;
		padding: 1rem;
		min-height: 300px;
	}

	.preview-content {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-primary);
	}

	.props-panel {
		margin-top: 1rem;
	}

	.props-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.prop-control {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.prop-label {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	@media (max-width: 768px) {
		.playground-layout {
			grid-template-columns: 1fr;
		}

		.playground-header {
			flex-direction: column;
			gap: 1rem;
			align-items: stretch;
		}

		.props-grid {
			grid-template-columns: 1fr;
		}
	}
</style>