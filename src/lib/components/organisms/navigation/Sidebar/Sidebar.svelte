<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SidebarProps } from './Sidebar.types.js';
	let { children,
		isOpen = $bindable(false),
		position = 'left',
		width = '280px',
		overlay = true,
		onClose
	 }: SidebarProps = $props();
</script>

{#if overlay && isOpen}
	<div 
		class="overlay" 
		onclick={() => { isOpen = false; onClose?.(); }}
		onkeydown={(e) => e.key === 'Escape' && (isOpen = false, onClose?.())}
		role="button"
		tabindex="-1"
		aria-label="Close sidebar"
	></div>
{/if}

<aside class="sidebar" class:open={isOpen} data-position={position} style="width: {width}">
	{@render children()}
</aside>

<style>
	.overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 998; animation: fadeIn 0.2s; }
	@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
	.sidebar { position: fixed; top: 0; bottom: 0; background: var(--glass-bg); backdrop-filter: var(--glass-blur); border-right: 1px solid var(--glass-border); z-index: 999; transform: translateX(-100%); transition: transform 0.3s; padding: var(--spacing-4); overflow-y: auto; }
	.sidebar[data-position="left"] { left: 0; }
	.sidebar[data-position="right"] { right: 0; left: auto; transform: translateX(100%); border-right: none; border-left: 1px solid var(--glass-border); }
	.sidebar.open { transform: translateX(0); }
</style>
