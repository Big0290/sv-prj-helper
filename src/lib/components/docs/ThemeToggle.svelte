<script lang="ts">
	import { Button, Text } from '$lib/ui';
	import { useTheme } from '$lib/components/hooks/useTheme.svelte.js';

	interface Props {
		isDarkMode?: boolean;
		size?: 'sm' | 'md' | 'lg';
		showLabel?: boolean;
		showSystemOption?: boolean;
		persistTheme?: boolean;
	}

	let { 
		isDarkMode = $bindable(false),
		size = 'sm',
		showLabel = false,
		showSystemOption = true,
		persistTheme = true
	}: Props = $props();

	let theme = $state<'light' | 'dark' | 'system'>('system');
	let currentTheme = $state<'light' | 'dark'>('light');
	let isTransitioning = $state(false);

	// Try to get theme context, fallback to local state
	let themeContext: ReturnType<typeof useTheme> | null = null;
	
	try {
		themeContext = useTheme();
		currentTheme = themeContext.current();
	} catch {
		// No theme context available, use local state
		initializeLocalTheme();
	}

	// Initialize local theme management
	function initializeLocalTheme() {
		if (typeof window !== 'undefined') {
			// Load persisted theme
			if (persistTheme) {
				const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
				if (savedTheme) {
					theme = savedTheme;
				}
			}
			
			updateLocalTheme(theme);
		}
	}

	// Update local theme state
	function updateLocalTheme(newTheme: 'light' | 'dark' | 'system') {
		if (newTheme === 'system') {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			currentTheme = prefersDark ? 'dark' : 'light';
		} else {
			currentTheme = newTheme;
		}
		
		// Apply theme with transition
		applyThemeWithTransition(currentTheme);
		
		// Persist theme
		if (persistTheme) {
			localStorage.setItem('theme', newTheme);
		}
	}

	// Apply theme with smooth transition
	function applyThemeWithTransition(targetTheme: 'light' | 'dark') {
		isTransitioning = true;
		
		// Add transition class
		document.documentElement.classList.add('theme-transitioning');
		
		// Apply theme
		document.documentElement.setAttribute('data-theme', targetTheme);
		
		// Remove transition class after animation
		setTimeout(() => {
			document.documentElement.classList.remove('theme-transitioning');
			isTransitioning = false;
		}, 300);
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
					const newTheme = mediaQuery.matches ? 'dark' : 'light';
					if (newTheme !== currentTheme) {
						currentTheme = newTheme;
						applyThemeWithTransition(newTheme);
					}
				}
			};

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
			// Cycle through themes: light -> dark -> system (if enabled) -> light
			if (currentTheme === 'light') {
				setTheme('dark');
			} else if (currentTheme === 'dark' && showSystemOption) {
				setTheme('system');
			} else {
				setTheme('light');
			}
		}
	}

	function setTheme(newTheme: 'light' | 'dark' | 'system') {
		theme = newTheme;
		
		if (themeContext) {
			themeContext.set(newTheme);
			currentTheme = themeContext.current();
		} else {
			updateLocalTheme(newTheme);
		}
	}

	// Icons and labels for different states
	const themeConfig = {
		light: { icon: '☀️', label: 'Light', description: 'Light theme' },
		dark: { icon: '🌙', label: 'Dark', description: 'Dark theme' },
		system: { icon: '💻', label: 'System', description: 'Follow system preference' }
	};

	// Get next theme for toggle button
	const nextTheme = $derived((): 'light' | 'dark' | 'system' => {
		if (theme === 'light') return 'dark';
		if (theme === 'dark' && showSystemOption) return 'system';
		return 'light';
	});
</script>

<div class="theme-toggle" class:transitioning={isTransitioning}>
	<!-- Quick toggle button -->
	<Button 
		variant="ghost" 
		{size}
		onclick={toggleTheme}
		ariaLabel={`Switch to ${themeConfig[nextTheme()].description}`}
		disabled={isTransitioning}
	>
		<span class="theme-icon" class:spinning={isTransitioning}>
			{themeConfig[theme].icon}
		</span>
		{#if showLabel}
			<span class="theme-label">
				{themeConfig[theme].label}
			</span>
		{/if}
	</Button>

	<!-- Theme selector dropdown -->
	<div class="theme-selector">
		<select 
			bind:value={theme}
			onchange={(e) => setTheme((e.target as HTMLSelectElement).value as 'light' | 'dark' | 'system')}
			class="theme-select"
			aria-label="Select theme preference"
			disabled={isTransitioning}
		>
			<option value="light">
				{themeConfig.light.icon} {themeConfig.light.label}
			</option>
			<option value="dark">
				{themeConfig.dark.icon} {themeConfig.dark.label}
			</option>
			{#if showSystemOption}
				<option value="system">
					{themeConfig.system.icon} {themeConfig.system.label}
				</option>
			{/if}
		</select>
	</div>

	<!-- Current theme indicator -->
	<div class="theme-indicator">
		<Text size="xs" color="var(--text-secondary)">
			{theme === 'system' ? `System (${currentTheme})` : themeConfig[theme].label}
		</Text>
	</div>
</div>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		transition: opacity var(--transition-base);
	}

	.theme-toggle.transitioning {
		opacity: 0.8;
	}

	:global(.theme-toggle .btn) {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: all var(--transition-base);
		position: relative;
		overflow: hidden;
	}

	:global(.theme-toggle .btn:hover) {
		background: var(--glass-bg-hover);
		transform: translateY(-1px);
		box-shadow: var(--shadow-sm);
	}

	:global(.theme-toggle .btn:disabled) {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
	}

	.theme-icon {
		font-size: 1.2em;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-base);
		position: relative;
	}

	.theme-icon.spinning {
		animation: spin 0.3s ease-in-out;
	}

	@keyframes spin {
		0% { transform: rotate(0deg) scale(1); }
		50% { transform: rotate(180deg) scale(1.1); }
		100% { transform: rotate(360deg) scale(1); }
	}

	:global(.theme-toggle .btn:hover) .theme-icon:not(.spinning) {
		transform: rotate(15deg) scale(1.1);
	}

	.theme-label {
		font-size: 0.875rem;
		font-weight: var(--font-weight-medium);
		transition: all var(--transition-base);
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
		min-width: 140px;
	}

	.theme-select:hover:not(:disabled) {
		background: var(--glass-bg-hover);
		border-color: var(--color-primary-500);
		transform: translateY(-1px);
	}

	.theme-select:focus {
		outline: var(--focus-ring-width) solid var(--focus-ring-color);
		outline-offset: var(--focus-ring-offset);
		border-color: var(--color-primary-500);
	}

	.theme-select:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.theme-indicator {
		display: flex;
		align-items: center;
		padding: 0.25rem 0.5rem;
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-sm);
		backdrop-filter: blur(var(--glass-blur));
		-webkit-backdrop-filter: blur(var(--glass-blur));
	}

	/* Global theme transition styles */
	:global(html.theme-transitioning) {
		transition: 
			background-color 0.3s ease,
			color 0.3s ease;
	}

	:global(html.theme-transitioning *) {
		transition: 
			background-color 0.3s ease,
			color 0.3s ease,
			border-color 0.3s ease,
			box-shadow 0.3s ease !important;
	}

	/* Dark theme styles */
	:global([data-theme="dark"]) .theme-select {
		background: var(--glass-bg-dark);
		color: var(--text-primary-dark);
		border-color: var(--glass-border-dark);
	}

	:global([data-theme="dark"]) .theme-select:hover:not(:disabled) {
		background: var(--glass-bg-hover-dark);
	}

	:global([data-theme="dark"]) .theme-indicator {
		background: var(--glass-bg-dark);
		border-color: var(--glass-border-dark);
	}

	/* Responsive behavior */
	@media (max-width: 768px) {
		.theme-toggle {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.theme-selector {
			width: 100%;
		}

		.theme-select {
			width: 100%;
		}

		.theme-indicator {
			align-self: stretch;
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.theme-selector {
			display: none; /* Hide dropdown on very small screens */
		}

		.theme-indicator {
			display: none;
		}
	}
</style>