import type { Snippet } from 'svelte';

export interface TreeViewProps {
nodes: TreeNode[];
		onNodeClick?: (node: TreeNode) => void;
}

export interface TreeViewEvents {
  // Add component events here
}

export interface TreeViewSlots {
  default: {};
}