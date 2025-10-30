<script lang="ts">
	interface Props {
		value?: string;
		placeholder?: string;
		suggestions?: string[];
		onSearch?: (value: string) => void;
		onSelect?: (value: string) => void;
		loading?: boolean;
	}

	let {
		value = $bindable(''),
		placeholder = 'Search...',
		suggestions = [],
		onSearch,
		onSelect,
		loading = false
	}: Props = $props();

	let showSuggestions = $state(false);
	let selectedIndex = $state(-1);

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
		showSuggestions = value.length > 0 && suggestions.length > 0;
		selectedIndex = -1;
	}

	function handleSearch() {
		onSearch?.(value);
		showSuggestions = false;
	}

	function selectSuggestion(suggestion: string) {
		value = suggestion;
		showSuggestions = false;
		onSelect?.(suggestion);
		handleSearch();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!showSuggestions || suggestions.length === 0) {
			if (e.key === 'Enter') {
				handleSearch();
			}
			return;
		}

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, suggestions.length - 1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, -1);
				break;
			case 'Enter':
				e.preventDefault();
				if (selectedIndex >= 0) {
					selectSuggestion(suggestions[selectedIndex]);
				} else {
					handleSearch();
				}
				break;
			case 'Escape':
				showSuggestions = false;
				selectedIndex = -1;
				break;
		}
	}

	function handleBlur() {
		// Delay to allow click on suggestion
		setTimeout(() => {
			showSuggestions = false;
			selectedIndex = -1;
		}, 200);
	}
</script>

<div class="search-field">
	<div class="search-input-wrapper">
		<svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.35-4.35" />
		</svg>
		<input
			type="text"
			bind:value
			{placeholder}
			class="search-input"
			oninput={handleInput}
			onkeydown={handleKeydown}
			onblur={handleBlur}
			onfocus={() => showSuggestions = value.length > 0 && suggestions.length > 0}
			aria-label="Search"
			aria-autocomplete="list"
			aria-controls="search-suggestions"
		/>
		{#if loading}
			<div class="search-loading">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="loading-spinner">
					<circle cx="12" cy="12" r="10" opacity="0.25" />
					<path d="M12 2 A 10 10 0 0 1 22 12" opacity="0.75" />
				</svg>
			</div>
		{:else if value}
			<button
				type="button"
				class="search-clear"
				onclick={() => {
					value = '';
					showSuggestions = false;
				}}
				aria-label="Clear search"
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		{/if}
	</div>

	{#if showSuggestions}
		<ul id="search-suggestions" class="suggestions" role="listbox">
			{#each suggestions as suggestion, i}
				<li
					role="option"
					aria-selected={i === selectedIndex}
					class="suggestion"
					class:suggestion-selected={i === selectedIndex}
					onclick={() => selectSuggestion(suggestion)}
					onkeydown={(e) => e.key === 'Enter' && selectSuggestion(suggestion)}
					tabindex="0"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="11" cy="11" r="8" />
						<path d="m21 21-4.35-4.35" />
					</svg>
					{suggestion}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.search-field {
		position: relative;
		width: 100%;
	}

	.search-input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-icon {
		position: absolute;
		left: var(--spacing-4);
		color: var(--color-neutral-500);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: var(--spacing-3) var(--spacing-10) var(--spacing-3) var(--spacing-10);
		font-family: var(--font-sans);
		font-size: var(--font-size-base);
		color: var(--color-neutral-900);
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--glass-shadow);
		transition: all var(--transition-base);
	}

	@media (prefers-color-scheme: dark) {
		.search-input {
			color: var(--color-neutral-50);
		}
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-primary-500);
		box-shadow: var(--glass-shadow-lg), 0 0 0 3px rgba(168, 85, 247, 0.1);
	}

	.search-loading,
	.search-clear {
		position: absolute;
		right: var(--spacing-4);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.search-clear {
		padding: var(--spacing-1);
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		color: var(--color-neutral-500);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.search-clear:hover {
		color: var(--color-neutral-700);
		background: var(--glass-bg-hover);
	}

	@media (prefers-color-scheme: dark) {
		.search-clear:hover {
			color: var(--color-neutral-300);
		}
	}

	.loading-spinner {
		animation: spin 1s linear infinite;
		color: var(--color-primary-500);
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.suggestions {
		position: absolute;
		top: calc(100% + var(--spacing-2));
		left: 0;
		right: 0;
		max-height: 300px;
		overflow-y: auto;
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur-lg));
		-webkit-backdrop-filter: blur(var(--glass-blur-lg));
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--glass-shadow-lg);
		list-style: none;
		margin: 0;
		padding: var(--spacing-2);
		z-index: var(--z-dropdown);
		animation: slideDown var(--transition-fast);
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.suggestion {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-3);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: background-color var(--transition-fast);
		color: var(--color-neutral-900);
	}

	@media (prefers-color-scheme: dark) {
		.suggestion {
			color: var(--color-neutral-100);
		}
	}

	.suggestion:hover,
	.suggestion-selected {
		background: var(--glass-bg-hover);
	}

	.suggestion svg {
		color: var(--color-neutral-500);
		flex-shrink: 0;
	}
</style>
