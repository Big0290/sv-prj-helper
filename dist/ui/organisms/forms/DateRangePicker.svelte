<script lang="ts">
	interface Props {
		start?: Date | null;
		end?: Date | null;
		label?: string;
		onRange?: (start: Date | null, end: Date | null) => void;
	}
	let {
		start = $bindable(null),
		end = $bindable(null),
		label,
		onRange
	}: Props = $props();

	const startId = `date-start-${Math.random().toString(36).substr(2, 9)}`;
	const endId = `date-end-${Math.random().toString(36).substr(2, 9)}`;
	
	function handleStartChange(e: Event) {
		const input = e.target as HTMLInputElement;
		start = input.value ? new Date(input.value) : null;
		onRange?.(start, end);
	}
	
	function handleEndChange(e: Event) {
		const input = e.target as HTMLInputElement;
		end = input.value ? new Date(input.value) : null;
		onRange?.(start, end);
	}
</script>

<div class="date-range">
	{#if label}<label class="label" for={startId}>{label}</label>{/if}
	<div class="range-inputs">
		<input 
			id={startId}
			type="date" 
			value={start?.toISOString().split('T')[0]} 
			onchange={handleStartChange} 
			class="date-input"
			aria-label="Start date"
		/>
		<span class="separator">to</span>
		<input 
			id={endId}
			type="date" 
			value={end?.toISOString().split('T')[0]} 
			onchange={handleEndChange} 
			class="date-input"
			aria-label="End date"
		/>
	</div>
</div>

<style>
	.date-range { width: 100%; }
	.label { display: block; margin-bottom: var(--spacing-2); font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--color-neutral-700); }
	.range-inputs { display: flex; align-items: center; gap: var(--spacing-2); }
	.date-input { flex: 1; padding: var(--spacing-2) var(--spacing-3); background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius-md); font-size: var(--font-size-sm); }
	.separator { font-size: var(--font-size-sm); color: var(--color-neutral-500); }
</style>
