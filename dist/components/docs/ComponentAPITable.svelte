<script lang="ts">
	import { Card, Text, Badge } from '../../ui';
	import type { PropDefinition, EventDefinition, SlotDefinition } from '../../docs/types.js';

	interface Props {
		items: PropDefinition[] | EventDefinition[] | SlotDefinition[];
		type: 'props' | 'events' | 'slots';
	}

	let { items, type }: Props = $props();

	function isRequired(item: any): boolean {
		return 'required' in item ? item.required : false;
	}

	function getTypeDisplay(item: any): string {
		if ('type' in item) {
			return item.type;
		}
		return 'unknown';
	}

	function getDefaultValue(item: any): string {
		if ('defaultValue' in item && item.defaultValue !== undefined) {
			return item.defaultValue;
		}
		return '-';
	}

	function getEventDetail(item: any): string {
		if ('detail' in item && item.detail) {
			return item.detail;
		}
		return '-';
	}

	function getSlotProps(item: any): string {
		if ('props' in item && item.props) {
			return Object.entries(item.props)
				.map(([key, value]) => `${key}: ${value}`)
				.join(', ');
		}
		return '-';
	}
</script>

<div class="api-table">
	<Card class="table-container">
		<div class="table-wrapper">
			<table class="api-table-element">
				<thead>
					<tr>
						{#if type === 'props'}
							<th>Name</th>
							<th>Type</th>
							<th>Default</th>
							<th>Required</th>
							<th>Description</th>
						{:else if type === 'events'}
							<th>Event</th>
							<th>Type</th>
							<th>Detail</th>
							<th>Description</th>
						{:else if type === 'slots'}
							<th>Slot</th>
							<th>Props</th>
							<th>Description</th>
						{/if}
					</tr>
				</thead>
				<tbody>
					{#each items as item}
						<tr>
							{#if type === 'props'}
								<td>
									<code class="prop-name">{item.name}</code>
								</td>
								<td>
									<code class="type-display">{getTypeDisplay(item)}</code>
								</td>
								<td>
									{#if getDefaultValue(item) !== '-'}
										<code class="default-value">{getDefaultValue(item)}</code>
									{:else}
										<Text size="sm" color="var(--text-secondary)">-</Text>
									{/if}
								</td>
								<td>
									{#if isRequired(item)}
										<Badge variant="error" size="xs">Required</Badge>
									{:else}
										<Badge variant="secondary" size="xs">Optional</Badge>
									{/if}
								</td>
								<td>
									<Text size="sm">{item.description}</Text>
								</td>
							{:else if type === 'events'}
								<td>
									<code class="event-name">{item.name}</code>
								</td>
								<td>
									<code class="type-display">{getTypeDisplay(item)}</code>
								</td>
								<td>
									{#if getEventDetail(item) !== '-'}
										<code class="event-detail">{getEventDetail(item)}</code>
									{:else}
										<Text size="sm" color="var(--text-secondary)">-</Text>
									{/if}
								</td>
								<td>
									<Text size="sm">{item.description}</Text>
								</td>
							{:else if type === 'slots'}
								<td>
									<code class="slot-name">{item.name}</code>
								</td>
								<td>
									{#if getSlotProps(item) !== '-'}
										<code class="slot-props">{getSlotProps(item)}</code>
									{:else}
										<Text size="sm" color="var(--text-secondary)">-</Text>
									{/if}
								</td>
								<td>
									<Text size="sm">{item.description}</Text>
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
</div>

<style>
	.api-table {
		width: 100%;
	}

	.table-container {
		padding: 0;
		overflow: hidden;
	}

	.table-wrapper {
		overflow-x: auto;
	}

	.api-table-element {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}

	.api-table-element th {
		background: var(--bg-secondary);
		color: var(--text-primary);
		font-weight: 600;
		text-align: left;
		padding: 0.75rem 1rem;
		border-bottom: 2px solid var(--border-color);
		white-space: nowrap;
	}

	.api-table-element td {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--border-color);
		vertical-align: top;
	}

	.api-table-element tr:hover {
		background: var(--bg-secondary);
	}

	.api-table-element tr:last-child td {
		border-bottom: none;
	}

	/* Code styling */
	code {
		background: var(--bg-secondary);
		padding: 0.125rem 0.375rem;
		border-radius: var(--radius-sm);
		font-family: var(--font-family-mono, 'Monaco', 'Courier New', monospace);
		font-size: 0.8125rem;
		border: 1px solid var(--border-color);
	}

	.prop-name,
	.event-name,
	.slot-name {
		color: var(--color-primary);
		font-weight: 600;
	}

	.type-display {
		color: var(--color-secondary);
		max-width: 200px;
		word-break: break-word;
	}

	.default-value {
		color: var(--color-success);
	}

	.event-detail,
	.slot-props {
		color: var(--text-secondary);
		max-width: 150px;
		word-break: break-word;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.api-table-element {
			font-size: 0.8125rem;
		}

		.api-table-element th,
		.api-table-element td {
			padding: 0.5rem 0.75rem;
		}

		/* Stack table on very small screens */
		@media (max-width: 480px) {
			.api-table-element,
			.api-table-element thead,
			.api-table-element tbody,
			.api-table-element th,
			.api-table-element td,
			.api-table-element tr {
				display: block;
			}

			.api-table-element thead tr {
				position: absolute;
				top: -9999px;
				left: -9999px;
			}

			.api-table-element tr {
				border: 1px solid var(--border-color);
				margin-bottom: 0.5rem;
				padding: 0.5rem;
				border-radius: var(--radius-md);
			}

			.api-table-element td {
				border: none;
				position: relative;
				padding: 0.25rem 0 0.25rem 30%;
				text-align: left;
			}

			.api-table-element td:before {
				content: attr(data-label) ": ";
				position: absolute;
				left: 0;
				width: 25%;
				padding-right: 0.5rem;
				white-space: nowrap;
				font-weight: 600;
				color: var(--text-secondary);
			}
		}
	}
</style>