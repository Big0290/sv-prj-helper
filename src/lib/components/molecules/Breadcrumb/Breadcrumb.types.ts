import type { Snippet } from 'svelte';
import type { BreadcrumbItem } from '../../../types/shared.js';

export interface BreadcrumbProps {
items: BreadcrumbItem[];
		separator?: 'slash' | 'chevron' | 'dot' | 'arrow';
		size?: 'sm' | 'md' | 'lg';
		variant?: 'default' | 'pills' | 'underline';
		showHome?: boolean;
		maxItems?: number;
		onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

export interface BreadcrumbEvents {
  // Add component events here
}

export interface BreadcrumbSlots {
  default: {};
}