<script module lang="ts">
export interface CommandItem {
		id: string;
		label: string;
		description?: string;
		icon?: string;
		shortcut?: string;
		category?: string;
		action: () => void;
	}
</script>

<script lang="ts">
	

	interface Props {
		commands: CommandItem[];
		isOpen?: boolean;
		placeholder?: string;
		shortcut?: string;
		onClose?: () => void;
	}

	let {
		commands,
		isOpen = $bindable(false),
		placeholder = 'Type a command or search...',
		shortcut = '⌘K',
		onClose
	}: Props = $props();

	let searchQuery = $state('');
	let selectedIndex = $state(0);
	let inputEl = $state<HTMLInputElement>();

	const filteredCommands = $derived(() => {
		if (!searchQuery) return commands;
		const query = searchQuery.toLowerCase();
		return commands.filter(
			(cmd) =>
				cmd.label.toLowerCase().includes(query) ||
				cmd.description?.toLowerCase().includes(query) ||
				cmd.category?.toLowerCase().includes(query)
		);
	});

	const groupedCommands = $derived(() => {
		const groups: Record<string, CommandItem[]> = {};
		filteredCommands().forEach((cmd) => {
			const category = cmd.category || 'Commands';
			if (!groups[category]) groups[category] = [];
			groups[category].push(cmd);
		});
		return groups;
	});

	$effect(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				isOpen = !isOpen;
			}

			if (!isOpen) return;

			if (e.key === 'Escape') {
				handleClose();
			} else if (e.key === 'ArrowDown') {
				e.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, filteredCommands().length - 1);
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
			} else if (e.key === 'Enter' && filteredCommands()[selectedIndex]) {
				e.preventDefault();
				executeCommand(filteredCommands()[selectedIndex]);
			}
		};

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	$effect(() => {
		if (isOpen) {
			selectedIndex = 0;
			searchQuery = '';
			setTimeout(() => inputEl?.focus(), 50);
		}
	});

	function handleClose() {
		isOpen = false;
		onClose?.();
	}

	function executeCommand(command: CommandItem) {
		command.action();
		handleClose();
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	}
</script>

{#if isOpen}
	<div
		class="command-palette-backdrop"
		onclick={handleBackdropClick}
		onkeydown={(e) => e.key === 'Escape' && handleClose()}
		role="dialog"
		aria-modal="true"
		aria-label="Command palette"
		tabindex="-1"
	>
		<div class="command-palette">
			<div class="command-search">
				<svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
				<input
					bind:this={inputEl}
					bind:value={searchQuery}
					type="text"
					class="search-input"
					{placeholder}
					autocomplete="off"
					spellcheck="false"
				/>
				<kbd class="shortcut-badge">{shortcut}</kbd>
			</div>

			<div class="command-list">
				{#if filteredCommands().length > 0}
					{#each Object.entries(groupedCommands()) as [category, items]}
						<div class="command-group">
							<div class="group-label">{category}</div>
							{#each items as command, i}
								{@const globalIndex = filteredCommands().indexOf(command)}
								<button
									type="button"
									class="command-item"
									class:selected={globalIndex === selectedIndex}
									onclick={() => executeCommand(command)}
									onmouseenter={() => (selectedIndex = globalIndex)}
								>
									{#if command.icon}
										<svg class="command-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d={command.icon} />
										</svg>
									{/if}
									<div class="command-content">
										<div class="command-label">{command.label}</div>
										{#if command.description}
											<div class="command-description">{command.description}</div>
										{/if}
									</div>
									{#if command.shortcut}
										<kbd class="command-shortcut">{command.shortcut}</kbd>
									{/if}
								</button>
							{/each}
						</div>
					{/each}
				{:else}
					<div class="empty-state">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<p>No commands found</p>
					</div>
				{/if}
			</div>

			<div class="command-footer">
				<div class="footer-hints">
					<span><kbd>↑↓</kbd> Navigate</span>
					<span><kbd>↵</kbd> Select</span>
					<span><kbd>esc</kbd> Close</span>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.command-palette-backdrop {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: 20vh;
		animation: fadeIn 0.15s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.command-palette {
		width: 100%;
		max-width: 640px;
		max-height: 60vh;
		background: var(--glass-bg);
		backdrop-filter: var(--glass-blur);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-xl);
		box-shadow: var(--shadow-2xl);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		animation: slideDown 0.2s ease-out;
	}

	@keyframes slideDown {
		from {
			transform: translateY(-20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.command-search {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-4);
		border-bottom: 1px solid var(--glass-border);
	}

	.search-icon {
		color: var(--color-neutral-500);
		flex-shrink: 0;
	}

	.search-input {
		flex: 1;
		border: none;
		background: none;
		font-size: var(--font-size-lg);
		color: var(--color-neutral-800);
		outline: none;
	}

	.search-input::placeholder {
		color: var(--color-neutral-400);
	}

	.shortcut-badge {
		padding: var(--spacing-1) var(--spacing-2);
		background: var(--color-neutral-200);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		font-family: monospace;
		color: var(--color-neutral-600);
		flex-shrink: 0;
	}

	.command-list {
		flex: 1;
		overflow-y: auto;
		padding: var(--spacing-2);
	}

	.command-group {
		margin-bottom: var(--spacing-2);
	}

	.group-label {
		padding: var(--spacing-2) var(--spacing-3);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		color: var(--color-neutral-500);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.command-item {
		width: 100%;
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		padding: var(--spacing-3);
		background: none;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all var(--transition-fast);
		text-align: left;
	}

	.command-item:hover,
	.command-item.selected {
		background: var(--color-primary-100);
	}

	.command-icon {
		color: var(--color-neutral-600);
		flex-shrink: 0;
	}

	.command-item.selected .command-icon {
		color: var(--color-primary-600);
	}

	.command-content {
		flex: 1;
		min-width: 0;
	}

	.command-label {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--color-neutral-800);
	}

	.command-description {
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
		margin-top: var(--spacing-1);
	}

	.command-shortcut {
		padding: var(--spacing-1) var(--spacing-2);
		background: var(--color-neutral-100);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
		font-family: monospace;
		color: var(--color-neutral-600);
		flex-shrink: 0;
	}

	.command-footer {
		padding: var(--spacing-3) var(--spacing-4);
		border-top: 1px solid var(--glass-border);
		background: var(--color-neutral-50);
	}

	.footer-hints {
		display: flex;
		gap: var(--spacing-4);
		font-size: var(--font-size-xs);
		color: var(--color-neutral-500);
	}

	.footer-hints kbd {
		padding: var(--spacing-1) var(--spacing-2);
		background: white;
		border: 1px solid var(--color-neutral-300);
		border-radius: var(--radius-sm);
		font-family: monospace;
		font-size: var(--font-size-xs);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-12);
		color: var(--color-neutral-400);
		text-align: center;
	}

	.empty-state svg {
		margin-bottom: var(--spacing-4);
		opacity: 0.5;
	}

	@media (prefers-color-scheme: dark) {
		.search-input {
			color: var(--color-neutral-100);
		}

		.command-label {
			color: var(--color-neutral-100);
		}

		.shortcut-badge,
		.command-shortcut {
			background: var(--color-neutral-800);
			color: var(--color-neutral-300);
		}

		.footer-hints kbd {
			background: var(--color-neutral-800);
			border-color: var(--color-neutral-700);
		}
	}

	@media (max-width: 768px) {
		.command-palette-backdrop {
			padding-top: 10vh;
		}

		.command-palette {
			max-height: 80vh;
			margin: 0 var(--spacing-4);
		}
	}
</style>
