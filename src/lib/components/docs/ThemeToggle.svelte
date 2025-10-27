<script lang="ts">
	import { Button, Icon } from '$lib/ui';
	import { useTheme } from '$lib/components/hooks/useTheme.svelte.js';

	interface Props {
		isDarkMode?: boolean;
		size?: 'sm' | 'md' | 'lg';
		showLabel?: boolean;
	}

	let { 
		isDarkMode = $bindable(false),
		size = 'sm',
		showLabel = false
	}: Props = $props();

	let theme = $state<'light' | 'dark' | 'system'>('system');
	let currentTheme = $state<'light' | 'dark'>('light');

	// Try to get theme context, fallback to local state
	let themeContext: ReturnType<typeof useTheme> | null = null;
	
	try {
		themeContext = useTheme();
		currentTheme = themeContext.current();
	} catch {
		// No theme context available, use local state
	}

	// Update isDarkMode when theme changes
	$effect(() => {
		isDarkMode = currentTheme === 'dark';
	});

	// Listen for system theme changes
	$effect(() => {
		if (typeof window !== 'undefined') {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			
			const updateSystemTheme = () => {
				if (theme === 'system') {
					currentTheme = mediaQuery.matches ? 'dark' : 'light';
				}
			};

			updateSystemTheme();
			mediaQuery.addEventListener('change', updateSystemTheme);

			return () => {
				mediaQuery.removeEventListener('change', updateSystemTheme);
			};
		}
	});

	function toggleTheme() {
		if (themeContext) {
			// Use theme context if available
			themeContext.toggle();
			currentTheme = themeContext.current();
		} else {
			// Fallback to local state
			currentTheme = currentTheme === 'light' ? 'dark' : 'light';
			theme = currentTheme;
			
			// Apply theme to document
			document.documentElement.setAttribute('data-theme', currentTheme);
		}
	}

	function setTheme(newTheme: 'light' | 'dark' | 'system') {
		theme = newTheme;
		
		if (themeContext) {
			themeContext.set(newTheme);
			currentTheme = themeContext.current();
		} else {
			if (newTheme === 'system') {
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				currentTheme = prefersDark ? 'dark' : 'light';
			} else {
				currentTheme = newTheme;
			}
			
			document.documentElement.setAttribute('data-theme', currentTheme);
		}
	}

	// Icons for different states
	const icons = {
		light: '☀️',
		dark: '🌙',
		system: '💻'
	};
</script>

<div class="theme-toggle">
	<!-- Quick toggle button -->
	<Button 
		variant="ghost" 
		{size}
		onclick={toggleTheme}
		ariaLabel={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
	>
		<span class="theme-icon">
			{currentTheme === 'light' ? icons.light : icons.dark}
		</span>
		{#if showLabel}
			<span class="theme-label">
				{currentTheme === 'light' ? 'Light' : 'Dark'}
			</span>
		{/if}
	</Button>

	<!-- Theme selector dropdown -->
	<div class="theme-selector">
		<select 
			bind:value={theme}
			onchange={(e) => setTheme((e.target as HTMLSelectElement).value as 'light' | 'dark' | 'system')}
			class="theme-select"
			aria-label="Select theme"
		>
			<option value="light">
				{icons.light} Light
			</option>
			<option value="dark">
				{icons.dark} Dark
			</option>
			<option value="system">
				{icons.system} System
			</option>
		</select>
	</div>
</div>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	:global(.theme-toggle .btn) {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: all var(--transition-base);
	}

	:global(.theme-toggle .btn:hover) {
		background: var(--glass-bg-hover);
		transform: translateY(-1px);
	}

	.theme-icon {
		font-size: 1.2em;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform var(--transition-base);
	}

	:global(.theme-toggle .btn:hover) .theme-icon {
		transform: rotate(15deg);
	}

	.theme-label {
		font-size: 0.875rem;
		font-weight: var(--font-weight-medium);
	}

	.theme-selector {
		position: relative;
	}

	.theme-select {
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		background: var(--glass-bg);
		color: var(--text-primary);
		font-size: 0.875rem;
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
		cursor: pointer;
		transition: all var(--transition-base);
		min-width: 120px;
	}

	.theme-select:hover {
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-500);
	}

	.theme-select:focus {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
		border-color: var(--color-primary-500);
	}

	/* Dark theme styles */
	:global([data-theme="dark"]) .theme-select {
		background: var(--glass-bg-dark);
		color: var(--text-primary-dark);
		border-color: var(--glass-border-dark);
	}

	:global([data-theme="dark"]) .theme-select:hover {
		background: var(--glass-bg-hover-dark);
	}

	@media (max-width: 768px) {
		.theme-toggle {
			flex-direction: column;
			gap: 0.25rem;
		}

		.theme-selector {
			display: none; /* Hide dropdown on mobile, use toggle only */
		}
	}
</style>