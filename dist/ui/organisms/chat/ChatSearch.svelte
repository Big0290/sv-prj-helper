<script lang="ts">
	interface SearchResult {
		id: string;
		messageText: string;
		senderName: string;
		timestamp: Date;
		matchedText?: string;
	}

	interface Props {
		results?: SearchResult[];
		isSearching?: boolean;
		query?: string;
		onSearch?: (query: string) => void;
		onResultClick?: (resultId: string) => void;
		onClose?: () => void;
		placeholder?: string;
	}

	let {
		results = [],
		isSearching = false,
		query = $bindable(''),
		onSearch,
		onResultClick,
		onClose,
		placeholder = 'Search messages...'
	}: Props = $props();

	let inputElement: HTMLInputElement;

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		query = target.value;
		onSearch?.(query);
	}

	function handleClear() {
		query = '';
		onSearch?.('');
		inputElement?.focus();
	}

	function formatTime(date: Date): string {
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(diff / 3600000);
		const days = Math.floor(diff / 86400000);

		if (minutes < 1) return 'Just now';
		if (minutes < 60) return `${minutes}m ago`;
		if (hours < 24) return `${hours}h ago`;
		if (days < 7) return date.toLocaleDateString('en-US', { weekday: 'short' });
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

	function highlightMatch(text: string, query: string): string {
		if (!query) return text;
		const regex = new RegExp(`(${query})`, 'gi');
		return text.replace(regex, '<mark>$1</mark>');
	}

	$effect(() => {
		inputElement?.focus();
	});
</script>

<div class="chat-search">
	<div class="search-header">
		<div class="search-input-container">
			<svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="11" cy="11" r="8" />
				<path d="m21 21-4.35-4.35" />
			</svg>
			<input
				bind:this={inputElement}
				type="text"
				class="search-input"
				{placeholder}
				value={query}
				oninput={handleInput}
			/>
			{#if query}
				<button type="button" class="clear-btn" onclick={handleClear} aria-label="Clear search">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			{/if}
		</div>
		{#if onClose}
			<button type="button" class="close-btn" onclick={onClose} aria-label="Close search">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		{/if}
	</div>

	<div class="search-results">
		{#if isSearching}
			<div class="search-state">
				<div class="spinner"></div>
				<p>Searching...</p>
			</div>
		{:else if query && results.length === 0}
			<div class="search-state">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.35-4.35" />
				</svg>
				<p>No messages found</p>
				<span>Try different keywords</span>
			</div>
		{:else if query}
			<div class="results-list">
				<div class="results-header">
					<span class="results-count">{results.length} {results.length === 1 ? 'result' : 'results'}</span>
				</div>
				{#each results as result (result.id)}
					<button
						type="button"
						class="result-item"
						onclick={() => onResultClick?.(result.id)}
					>
						<div class="result-header">
							<span class="sender-name">{result.senderName}</span>
							<span class="timestamp">{formatTime(result.timestamp)}</span>
						</div>
						<div class="result-text">
							{@html highlightMatch(result.messageText, query)}
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<div class="search-state">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.35-4.35" />
				</svg>
				<p>Search messages</p>
				<span>Enter keywords to find messages</span>
			</div>
		{/if}
	</div>
</div>

<style>
	.chat-search {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: var(--glass-shadow-lg);
	}

	.search-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-4);
		border-bottom: 1px solid var(--glass-border);
	}

	.search-input-container {
		position: relative;
		flex: 1;
	}

	.search-icon {
		position: absolute;
		left: var(--spacing-3);
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-neutral-400);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: var(--spacing-3) var(--spacing-10) var(--spacing-3) var(--spacing-10);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		color: var(--color-neutral-100);
		font-size: var(--font-size-sm);
		transition: all var(--transition-fast);
	}

	.search-input::placeholder {
		color: var(--color-neutral-500);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--color-primary-500);
		background: rgba(255, 255, 255, 0.08);
	}

	.clear-btn {
		position: absolute;
		right: var(--spacing-2);
		top: 50%;
		transform: translateY(-50%);
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		border-radius: var(--radius-full);
		color: var(--color-neutral-400);
		cursor: pointer;
		transition: all var(--transition-fast);
		padding: 0;
	}

	.clear-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-neutral-200);
	}

	.close-btn {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		color: var(--color-neutral-400);
		cursor: pointer;
		transition: all var(--transition-fast);
		flex-shrink: 0;
		padding: 0;
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: var(--color-primary-500);
		color: var(--color-neutral-200);
	}

	.search-results {
		flex: 1;
		overflow-y: auto;
	}

	.search-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-3);
		padding: var(--spacing-10) var(--spacing-4);
		color: var(--color-neutral-500);
		text-align: center;
	}

	.search-state svg {
		opacity: 0.5;
	}

	.search-state p {
		margin: 0;
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-300);
	}

	.search-state span {
		font-size: var(--font-size-sm);
		color: var(--color-neutral-500);
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 3px solid rgba(255, 255, 255, 0.1);
		border-top-color: var(--color-primary-500);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.results-list {
		display: flex;
		flex-direction: column;
	}

	.results-header {
		padding: var(--spacing-3) var(--spacing-4);
		border-bottom: 1px solid var(--glass-border);
	}

	.results-count {
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-400);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.result-item {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
		padding: var(--spacing-3) var(--spacing-4);
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--glass-border);
		text-align: left;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.result-item:last-child {
		border-bottom: none;
	}

	.result-item:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.result-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-2);
	}

	.sender-name {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-200);
	}

	.timestamp {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
	}

	.result-text {
		font-size: var(--font-size-sm);
		color: var(--color-neutral-300);
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.result-text :global(mark) {
		background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.3), rgba(var(--color-primary-rgb), 0.4));
		color: var(--color-primary-200);
		border-radius: var(--radius-sm);
		padding: 0 2px;
	}
</style>
