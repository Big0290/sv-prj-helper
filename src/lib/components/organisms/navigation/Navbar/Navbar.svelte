<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { NavbarProps } from './Navbar.types.js';

	let { children  }: NavbarProps = $props();
</script>

<nav class="navbar">
	{@render children()}
</nav>

<style>
	.navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-4);
		background: var(--glass-bg);
		backdrop-filter: blur(var(--glass-blur-lg));
		-webkit-backdrop-filter: blur(var(--glass-blur-lg));
		border-bottom: 1px solid var(--glass-border);
	}
</style>
