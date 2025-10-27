<script lang="ts">
	import { Card, Stack, Heading, Text, Button, Flex, Input, Checkbox, Select } from '$lib/ui';
	import CodeEditor from './CodeEditor.svelte';
	import LivePreview from './LivePreview.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import ResponsiveControls from './ResponsiveControls.svelte';
	import type { PropDefinition, CodeExample } from '$lib/docs/types.js';

	interface Props {
		componentName: string;
		props: PropDefinition[];
		examples: CodeExample[];
		showThemeToggle?: boolean;
		showResponsiveControls?: boolean;
	}

	let { 
		componentName, 
		props, 
		examples,
		showThemeToggle = true,
		showResponsiveControls = true
	}: Props = $props();

	let selectedExample = $state(0);
	let propValues = $state<Record<string, any>>({});
	let showCode = $state(true);
	let showProps = $state(true);
	let liveCode = $state('');
	let viewportSize = $state<'mobile' | 'tablet' | 'desktop'>('desktop');
	let isDarkMode = $state(false);

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

		let code = example.code;

		// Inject prop values into the component
		if (props.length > 0 && Object.keys(propValues).length > 0) {
			const componentTag = `<${componentName}`;
			const activeProps = Object.entries(propValues)
				.filter(([key, value]) => {
					// Include prop if it has a meaningful value
					if (typeof value === 'boolean') return value;
					if (typeof value === 'string') return value !== '';
					if (typeof value === 'number') return value !== 0;
					return value != null;
				});

			if (activeProps.length > 0) {
				const propsString = activeProps
					.map(([key, value]) => {
						if (typeof value === 'boolean') {
							return `  ${key}`;
						}
						if (typeof value === 'string') {
							return `  ${key}="${value}"`;
						}
						return `  ${key}={${value}}`;
					})
					.join('\n');

				code = code.replace(
					new RegExp(`<${componentName}[^>]*>`, 'g'),
					`${componentTag}\n${propsString}\n>`
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

	function copyCode() {
		navigator.clipboard.writeText(liveCode);
		// Could add toast notification here
	}

	function exportExample() {
		const blob = new Blob([liveCode], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${componentName}-example.svelte`;
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<div class="enhanced-playground">
	<!-- Playground Header -->
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
				{#if showThemeToggle}
					<ThemeToggle bind:isDarkMode />
				{/if}
				
				{#if showResponsiveControls}
					<ResponsiveControls bind:viewportSize />
				{/if}
				
				<Button 
					variant="ghost" 
					size="sm"
					onclick={() => showCode = !showCode}
				>
					{showCode ? 'Hide' : 'Show'} Code
				</Button>
				
				{#if props.length > 0}
					<Button 
						variant="ghost" 
						size="sm"
						onclick={() => showProps = !showProps}
					>
						{showProps ? 'Hide' : 'Show'} Props
					</Button>
					<Button variant="ghost" size="sm" onclick={resetProps}>
						Reset
					</Button>
				{/if}
			</div>
		</Flex>
	</div>

	<div class="playground-content">
		<!-- Main Layout -->
		<div class="playground-layout" 
			 class:code-hidden={!showCode}
			 class:props-hidden={!showProps}>
			
			<!-- Live Preview -->
			<div class="preview-panel">
				<Card class="preview-container">
					<div class="preview-header">
						<Flex justify="space-between" align="center">
							<Text size="sm" weight="medium">Preview</Text>
							<div class="preview-actions">
								<Button variant="ghost" size="sm" onclick={copyCode}>
									Copy Code
								</Button>
								<Button variant="ghost" size="sm" onclick={exportExample}>
									Export
								</Button>
							</div>
						</Flex>
					</div>
					<div class="preview-content" 
						 class:mobile={viewportSize === 'mobile'}
						 class:tablet={viewportSize === 'tablet'}
						 class:desktop={viewportSize === 'desktop'}
						 class:dark-mode={isDarkMode}>
						<LivePreview code={liveCode} />
					</div>
				</Card>
			</div>

			<!-- Code Editor -->
			{#if showCode}
				<div class="code-panel">
					<Card class="code-container">
						<div class="code-header">
							<Flex justify="space-between" align="center">
								<Text size="sm" weight="medium">Code</Text>
								<div class="code-actions">
									<Button variant="ghost" size="sm" onclick={copyCode}>
										Copy
									</Button>
								</div>
							</Flex>
						</div>
						<div class="code-content">
							<CodeEditor 
								bind:value={liveCode}
								language="svelte"
								readonly={false}
								theme={isDarkMode ? 'dark' : 'light'}
							/>
						</div>
					</Card>
				</div>
			{/if}
		</div>

		<!-- Props Panel -->
		{#if props.length > 0 && showProps}
			<Card class="props-panel">
				<Stack gap="4">
					<Flex justify="space-between" align="center">
						<Heading as="h4" size="5">Props</Heading>
						<Button variant="ghost" size="sm" onclick={resetProps}>
							Reset All
						</Button>
					</Flex>
					
					<div class="props-grid">
						{#each props as prop}
							<div class="prop-control">
								<div class="prop-header">
									<label class="prop-label">
										<Text size="sm" weight="medium">{prop.name}</Text>
										{#if !prop.required}
											<Text size="xs" color="var(--text-secondary)">optional</Text>
										{/if}
									</label>
									<Text size="xs" color="var(--text-secondary)" class="prop-type">
										{prop.type}
									</Text>
								</div>
								
								<div class="prop-input">
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
												<option value="">Default</option>
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
								</div>
								
								{#if prop.description}
									<Text size="xs" color="var(--text-secondary)" class="prop-description">
										{prop.description}
									</Text>
								{/if}
							</div>
						{/each}
					</div>
				</Stack>
			</Card>
		{/if}
	</div>
</div>

<style>
	.enhanced-playground {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		padding: 1.5rem;
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
	}

	.playground-header {
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--glass-border);
	}

	.example-selector {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.example-select {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		background: var(--glass-bg);
		color: var(--text-primary);
		font-size: 0.875rem;
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
	}

	.playground-controls {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
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
		border-bottom: 1px solid var(--glass-border);
		background: var(--glass-bg-hover);
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
		transition: all var(--transition-base);
	}

	/* Responsive preview modes */
	.preview-content.mobile {
		max-width: 375px;
		margin: 0 auto;
		border: 2px solid var(--border-color);
		border-radius: var(--radius-lg);
	}

	.preview-content.tablet {
		max-width: 768px;
		margin: 0 auto;
		border: 2px solid var(--border-color);
		border-radius: var(--radius-lg);
	}

	.preview-content.desktop {
		width: 100%;
	}

	.preview-content.dark-mode {
		background: var(--bg-primary-dark);
		color: var(--text-primary-dark);
	}

	.preview-actions,
	.code-actions {
		display: flex;
		gap: 0.25rem;
	}

	.props-panel {
		margin-top: 1rem;
	}

	.props-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.prop-control {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1rem;
		background: var(--glass-bg-hover);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
	}

	.prop-header {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.prop-label {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.prop-type {
		font-family: var(--font-mono);
		background: var(--glass-bg);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-sm);
		border: 1px solid var(--glass-border);
	}

	.prop-input {
		display: flex;
		align-items: center;
	}

	.prop-description {
		line-height: 1.4;
	}

	@media (max-width: 1024px) {
		.playground-layout {
			grid-template-columns: 1fr;
		}

		.playground-controls {
			justify-content: flex-start;
		}
	}

	@media (max-width: 768px) {
		.enhanced-playground {
			padding: 1rem;
		}

		.playground-header {
			flex-direction: column;
			gap: 1rem;
			align-items: stretch;
		}

		.props-grid {
			grid-template-columns: 1fr;
		}

		.playground-controls {
			flex-wrap: wrap;
			gap: 0.5rem;
		}
	}
</style>