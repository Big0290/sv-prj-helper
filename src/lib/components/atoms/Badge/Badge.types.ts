import type { Snippet } from 'svelte';

export interface BadgeProps {
variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
		size?: 'sm' | 'md' | 'lg';
		children: Snippet;
}

export interface BadgeEvents {
  // Add component events here
}

export interface BadgeSlots {
  default: {};
}