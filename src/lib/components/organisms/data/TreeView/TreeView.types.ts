import type { Snippet } from 'svelte';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  expanded?: boolean;
  icon?: string;
}

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