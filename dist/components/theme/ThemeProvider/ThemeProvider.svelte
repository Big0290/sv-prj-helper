<script lang="ts">
	import { setContext } from 'svelte';
	import { type Snippet } from 'svelte';

	import type { ThemeProviderProps } from './ThemeProvider.types.js';

	let { children,
		theme = $bindable('system'),
		customTheme
	 }: ThemeProviderProps = $props();

	let resolvedTheme = $state<'light' | 'dark'>('light');

	function updateTheme(newTheme: 'light' | 'dark' | 'system') {
		if (newTheme === 'system') {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			resolvedTheme = prefersDark ? 'dark' : 'light';
		} else {
			resolvedTheme = newTheme;
		}
		
		document.documentElement.setAttribute('data-theme', resolvedTheme);
		
		if (customTheme) {
			Object.entries(customTheme).forEach(([key, value]) => {
				document.documentElement.style.setProperty(key, value);
			});
		}
	}

	$effect(() => {
		updateTheme(theme);
		
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = () => {
			if (theme === 'system') {
				updateTheme('system');
			}
		};
		
		mediaQuery.addEventListener('change', handleChange);
		
		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	});

	// Provide theme context
	setContext('theme', {
		current: () => resolvedTheme,
		toggle: () => {
			theme = resolvedTheme === 'light' ? 'dark' : 'light';
		},
		set: (newTheme: 'light' | 'dark' | 'system') => {
			theme = newTheme;
		}
	});
</script>

{#if children}
	{@render children()}
{/if}
