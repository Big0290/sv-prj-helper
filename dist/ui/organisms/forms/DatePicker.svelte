<script lang="ts">
	interface Props {
		value?: Date | null;
		label?: string;
		placeholder?: string;
		min?: Date;
		max?: Date;
		onChange?: (date: Date | null) => void;
	}

	let {
		value = $bindable(null),
		label,
		placeholder = 'Select date',
		min,
		max,
		onChange
	}: Props = $props();

	const triggerId = `date-picker-${Math.random().toString(36).substr(2, 9)}`;

	let isOpen = $state(false);
	let currentMonth = $state(value || new Date());

	const days = $derived(() => {
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();
		
		const dates: (Date | null)[] = [];
		for (let i = 0; i < startingDayOfWeek; i++) dates.push(null);
		for (let i = 1; i <= daysInMonth; i++) dates.push(new Date(year, month, i));
		
		return dates;
	});

	function selectDate(date: Date | null) {
		value = date;
		onChange?.(date);
		isOpen = false;
	}

	function prevMonth() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
	}

	function nextMonth() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
	}

	const formatted = $derived(value ? value.toLocaleDateString() : '');
</script>

<div class="date-picker">
	{#if label}<label class="label" for={triggerId}>{label}</label>{/if}
	<button type="button" id={triggerId} class="trigger" onclick={() => (isOpen = !isOpen)} aria-label={label || 'Open date picker'}>
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
			<path d="M16 2v4M8 2v4M3 10h18" />
		</svg>
		<span class:placeholder={!value}>{formatted || placeholder}</span>
	</button>

	{#if isOpen}
		<div class="calendar">
			<div class="header">
				<button type="button" onclick={prevMonth} aria-label="Previous month">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M15 18l-6-6 6-6" />
					</svg>
				</button>
				<span>{currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</span>
				<button type="button" onclick={nextMonth} aria-label="Next month">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M9 18l6-6-6-6" />
					</svg>
				</button>
			</div>
			<div class="weekdays">
				{#each ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as day}
					<div class="weekday">{day}</div>
				{/each}
			</div>
			<div class="days">
				{#each days() as date}
					{#if date}
						<button
							type="button"
							class="day"
							class:selected={value && date.toDateString() === value.toDateString()}
							class:today={date.toDateString() === new Date().toDateString()}
							onclick={() => selectDate(date)}
						>
							{date.getDate()}
						</button>
					{:else}
						<div class="day empty"></div>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.date-picker { position: relative; width: 100%; }
	.label { display: block; margin-bottom: var(--spacing-2); font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--color-neutral-700); }
	.trigger { width: 100%; display: flex; align-items: center; gap: var(--spacing-2); padding: var(--spacing-2) var(--spacing-3); background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: var(--radius-md); text-align: left; cursor: pointer; transition: border-color var(--transition-fast); }
	.trigger:hover { border-color: var(--color-primary-300); }
	.placeholder { color: var(--color-neutral-400); }
	.calendar { position: absolute; top: 100%; left: 0; margin-top: var(--spacing-1); background: var(--glass-bg); backdrop-filter: var(--glass-blur); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-xl); padding: var(--spacing-3); z-index: 100; min-width: 280px; }
	.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--spacing-3); }
	.header span { font-weight: var(--font-weight-semibold); font-size: var(--font-size-sm); }
	.header button { background: none; border: none; padding: var(--spacing-1); border-radius: var(--radius-sm); cursor: pointer; transition: background var(--transition-fast); }
	.header button:hover { background: var(--color-neutral-100); }
	.weekdays { display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--spacing-1); margin-bottom: var(--spacing-2); }
	.weekday { text-align: center; font-size: var(--font-size-xs); font-weight: var(--font-weight-medium); color: var(--color-neutral-500); padding: var(--spacing-1); }
	.days { display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--spacing-1); }
	.day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; background: none; border: none; border-radius: var(--radius-sm); font-size: var(--font-size-sm); cursor: pointer; transition: all var(--transition-fast); }
	.day:not(.empty):hover { background: var(--color-neutral-100); }
	.day.selected { background: var(--color-primary-600); color: white; }
	.day.today { border: 2px solid var(--color-primary-600); }
	.day.empty { cursor: default; }
	@media (prefers-color-scheme: dark) {
		.label { color: var(--color-neutral-100); }
		.day:not(.empty):hover { background: var(--color-neutral-800); }
	}
</style>
