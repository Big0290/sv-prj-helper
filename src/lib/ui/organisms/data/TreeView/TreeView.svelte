<script module lang="ts">
export interface TreeNode {
		id: string;
		label: string;
		icon?: string;
		children?: TreeNode[];
		expanded?: boolean;
	}
</script>

<script lang="ts">
	import TreeView from './TreeView.svelte';
	
	
	interface Props {
		nodes: TreeNode[];
		onNodeClick?: (node: TreeNode) => void;
	}
	let { nodes, onNodeClick }: Props = $props();
	let expanded = $state<Record<string, boolean>>({});
	function toggle(id: string) {
		expanded[id] = !expanded[id];
	}
</script>

<div class="tree">
	{#each nodes as node}
		<div class="tree-node">
			<button type="button" class="node-label" onclick={() => { if(node.children) toggle(node.id); onNodeClick?.(node); }}>
				{#if node.children}
					<svg class="chevron" class:open={expanded[node.id]} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M9 18l6-6-6-6" />
					</svg>
				{/if}
				{#if node.icon}
					<svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d={node.icon} />
					</svg>
				{/if}
				{node.label}
			</button>
			{#if node.children && expanded[node.id]}
				<div class="children">
					<TreeView nodes={node.children} {onNodeClick} />
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.tree { font-size: var(--font-size-sm); }
	.tree-node { margin: var(--spacing-1) 0; }
	.node-label { width: 100%; display: flex; align-items: center; gap: var(--spacing-2); padding: var(--spacing-2) var(--spacing-3); background: none; border: none; border-radius: var(--radius-sm); text-align: left; cursor: pointer; transition: background var(--transition-fast); }
	.node-label:hover { background: var(--color-neutral-100); }
	.chevron { transition: transform var(--transition-fast); }
	.chevron.open { transform: rotate(90deg); }
	.children { margin-left: var(--spacing-6); }
</style>
