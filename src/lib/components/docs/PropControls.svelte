<script lang="ts">
	import { Button, Input, Checkbox, Select, Text, Stack, Flex } from '$lib/ui';
	import type { PropDefinition } from '$lib/docs/types.js';

	interface Props {
		prop: PropDefinition;
		value: any;
		onchange: (value: any) => void;
		disabled?: boolean;
	}

	let { prop, value, onchange, disabled = false }: Props = $props();

	// Parse prop type to determine control type
	const propType = $derived(() => {
		const type = prop.type.toLowerCase();
		
		if (type.includes('boolean')) return 'boolean';
		if (type.includes('number')) return 'number';
		if (type.includes('string') && type.includes('|')) return 'union';
		if (type.includes('array') || type.includes('[]')) return 'array';
		if (type.includes('object') || type.includes('{')) return 'object';
		if (type.includes('function') || type.includes('=>')) return 'function';
		if (type.includes('date')) return 'date';
		if (type.includes('color')) return 'color';
		return 'string';
	});

	// Extract union options from type string
	const unionOptions = $derived(() => {
		if (propType() !== 'union') return [];
		
		const matches = prop.type.match(/'([^']+)'|"([^"]+)"/g);
		if (matches) {
			return matches.map(match => match.replace(/['"]/g, ''));
		}
		
		// Handle enum-style unions like 'sm' | 'md' | 'lg'
		const enumMatch = prop.type.match(/\|\s*'([^']+)'/g);
		if (enumMatch) {
			return enumMatch.map(match => match.replace(/\|\s*'([^']+)'/, '$1'));
		}
		
		return [];
	});

	// Validation state
	let validationError = $state<string | null>(null);
	let isValid = $derived(() => validationError === null);

	// Validate prop value
	function validateValue(newValue: any): string | null {
		if (prop.required && (newValue === undefined || newValue === null || newValue === '')) {
			return `${prop.name} is required`;
		}

		switch (propType()) {
			case 'number':
				if (newValue !== '' && isNaN(Number(newValue))) {
					return 'Must be a valid number';
				}
				break;
			
			case 'array':
				if (typeof newValue === 'string') {
					try {
						JSON.parse(newValue);
					} catch {
						return 'Must be valid JSON array format';
					}
				}
				break;
			
			case 'object':
				if (typeof newValue === 'string') {
					try {
						JSON.parse(newValue);
					} catch {
						return 'Must be valid JSON object format';
					}
				}
				break;
			
			case 'function':
				if (typeof newValue === 'string' && newValue.trim()) {
					// Basic function syntax validation
					if (!newValue.includes('=>') && !newValue.startsWith('function')) {
						return 'Must be a valid function (arrow function or function declaration)';
					}
				}
				break;
		}

		return null;
	}

	// Handle value changes with validation
	function handleChange(newValue: any) {
		validationError = validateValue(newValue);
		if (validationError === null) {
			onchange(newValue);
		}
	}

	// Parse array/object values for display
	function parseComplexValue(val: any): string {
		if (typeof val === 'object') {
			return JSON.stringify(val, null, 2);
		}
		return String(val || '');
	}

	// Convert string back to appropriate type
	function convertValue(stringValue: string, targetType: string): any {
		switch (targetType) {
			case 'number':
				return stringValue === '' ? 0 : Number(stringValue);
			case 'boolean':
				return stringValue === 'true';
			case 'array':
			case 'object':
				try {
					return JSON.parse(stringValue);
				} catch {
					return stringValue;
				}
			default:
				return stringValue;
		}
	}
</script>

<div class="prop-control" class:has-error={!isValid}>
	<div class="prop-header">
		<Flex justify="space-between" align="center">
			<div class="prop-info">
				<Text size="sm" weight="medium" class="prop-name">
					{prop.name}
					{#if prop.required}
						<span class="required-indicator">*</span>
					{/if}
				</Text>
				<Text size="xs" color="var(--text-secondary)" class="prop-type">
					{prop.type}
				</Text>
			</div>
			{#if prop.defaultValue}
				<Button 
					variant="ghost" 
					size="sm"
					onclick={() => handleChange(prop.defaultValue)}
					disabled={disabled}
				>
					Reset
				</Button>
			{/if}
		</Flex>
	</div>

	<div class="prop-input">
		{#if propType() === 'boolean'}
			<Checkbox 
				checked={Boolean(value)}
				onchange={(e) => handleChange((e.target as HTMLInputElement).checked)}
				disabled={disabled}
			/>
			
		{:else if propType() === 'union' && unionOptions().length > 0}
			<Select 
				value={String(value || '')}
				options={[
					{ value: '', label: 'Default' },
					...unionOptions().map(opt => ({ value: opt, label: opt }))
				]}
				onchange={(e) => handleChange((e.target as HTMLSelectElement).value)}
				disabled={disabled}
			/>
			
		{:else if propType() === 'number'}
			<Input 
				type="number"
				value={String(value || '')}
				oninput={(e) => handleChange((e.target as HTMLInputElement).value)}
				placeholder={prop.description}
				disabled={disabled}
			/>
			
		{:else if propType() === 'color'}
			<div class="color-input-group">
				<input
					type="color"
					value={String(value || '#000000')}
					oninput={(e) => handleChange((e.target as HTMLInputElement).value)}
					disabled={disabled}
					class="color-picker"
				/>
				<Input 
					type="text"
					value={String(value || '')}
					oninput={(e) => handleChange((e.target as HTMLInputElement).value)}
					placeholder="Enter color value"
					disabled={disabled}
				/>
			</div>
			
		{:else if propType() === 'date'}
			<input
				type="datetime-local"
				value={value instanceof Date ? value.toISOString().slice(0, 16) : String(value || '')}
				oninput={(e) => handleChange(new Date((e.target as HTMLInputElement).value))}
				disabled={disabled}
				class="date-input"
			/>
			
		{:else if propType() === 'array' || propType() === 'object'}
			<div class="complex-input">
				<textarea
					class="json-input"
					value={parseComplexValue(value)}
					oninput={(e) => {
						const stringValue = (e.target as HTMLTextAreaElement).value;
						const convertedValue = convertValue(stringValue, propType());
						handleChange(convertedValue);
					}}
					placeholder={propType() === 'array' ? '["item1", "item2"]' : '{"key": "value"}'}
					disabled={disabled}
					rows="3"
				></textarea>
			</div>
			
		{:else if propType() === 'function'}
			<div class="function-input">
				<textarea
					class="function-textarea"
					value={String(value || '')}
					oninput={(e) => handleChange((e.target as HTMLTextAreaElement).value)}
					placeholder="() => console.log('hello')"
					disabled={disabled}
					rows="2"
				></textarea>
			</div>
			
		{:else}
			<Input 
				type="text"
				value={String(value || '')}
				oninput={(e) => handleChange((e.target as HTMLInputElement).value)}
				placeholder={prop.description}
				disabled={disabled}
			/>
		{/if}
	</div>

	{#if validationError}
		<div class="validation-error">
			<Text size="xs" color="var(--color-error-500)">
				{validationError}
			</Text>
		</div>
	{/if}

	{#if prop.description}
		<div class="prop-description">
			<Text size="xs" color="var(--text-secondary)">
				{prop.description}
			</Text>
		</div>
	{/if}
</div>

<style>
	.prop-control {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1rem;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		transition: all var(--transition-base);
	}

	.prop-control:hover {
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-300);
	}

	.prop-control.has-error {
		border-color: var(--color-error-500);
		background: var(--color-error-50);
	}

	.prop-header {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.prop-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	:global(.prop-name) {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.required-indicator {
		color: var(--color-error-500);
		font-weight: bold;
	}

	:global(.prop-type) {
		font-family: var(--font-mono);
		background: var(--glass-bg-hover);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius-sm);
		border: 1px solid var(--glass-border);
		font-size: 0.75rem;
	}

	.prop-input {
		display: flex;
		flex-direction: column;
	}

	.color-input-group {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.color-picker {
		width: 60px;
		height: 40px;
		padding: 0;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		background: var(--glass-bg);
		cursor: pointer;
		transition: all var(--transition-base);
	}

	.color-picker:hover {
		border-color: var(--color-primary-300);
	}

	.color-picker:focus {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
		border-color: var(--color-primary-500);
	}

	.date-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		background: var(--glass-bg);
		color: var(--text-primary);
		font-size: 0.875rem;
		transition: all var(--transition-base);
	}

	.date-input:focus {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
		border-color: var(--color-primary-500);
	}

	.complex-input,
	.function-input {
		display: flex;
		flex-direction: column;
	}

	.json-input,
	.function-textarea {
		padding: 0.75rem;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		background: var(--glass-bg);
		color: var(--text-primary);
		font-family: var(--font-mono);
		font-size: 0.875rem;
		resize: vertical;
		min-height: 80px;
		transition: all var(--transition-base);
	}

	.json-input:focus,
	.function-textarea:focus {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
		border-color: var(--color-primary-500);
	}

	.validation-error {
		padding: 0.5rem;
		background: var(--color-error-50);
		border: 1px solid var(--color-error-200);
		border-radius: var(--radius-sm);
	}

	.prop-description {
		padding-top: 0.25rem;
		border-top: 1px solid var(--glass-border);
	}

	/* Dark theme support */
	:global([data-theme="dark"]) .prop-control {
		background: var(--glass-bg-dark);
		border-color: var(--glass-border-dark);
	}

	:global([data-theme="dark"]) .prop-control:hover {
		background: var(--glass-bg-hover-dark);
	}

	:global([data-theme="dark"]) .prop-control.has-error {
		background: var(--color-error-900);
		border-color: var(--color-error-400);
	}

	:global([data-theme="dark"]) .json-input,
	:global([data-theme="dark"]) .function-textarea {
		background: var(--glass-bg-dark);
		color: var(--text-primary-dark);
		border-color: var(--glass-border-dark);
	}

	:global([data-theme="dark"]) .validation-error {
		background: var(--color-error-900);
		border-color: var(--color-error-700);
	}
</style>