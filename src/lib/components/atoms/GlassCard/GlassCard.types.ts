import type { Snippet } from 'svelte';

export interface GlassCardProps {
	/**
	 * Visual variant of the glass card
	 * @default 'default'
	 */
	variant?: 'default' | 'elevated' | 'subtle';
	
	/**
	 * Blur intensity level
	 * @default 'md'
	 */
	blur?: 'sm' | 'md' | 'lg';
	
	/**
	 * Background opacity (0-1)
	 * @default 0.1
	 */
	opacity?: number;
	
	/**
	 * Whether to show glass border
	 * @default true
	 */
	border?: boolean;
	
	/**
	 * Shadow intensity level
	 * @default 'md'
	 */
	shadow?: 'sm' | 'md' | 'lg';
	
	/**
	 * Whether the card is interactive (clickable)
	 * @default false
	 */
	interactive?: boolean;
	
	/**
	 * Internal padding size
	 * @default 'md'
	 */
	padding?: 'sm' | 'md' | 'lg' | 'xl';
	
	/**
	 * Click handler for interactive cards
	 */
	onclick?: (e: MouseEvent) => void;
	
	/**
	 * Accessible label for interactive cards
	 */
	ariaLabel?: string;
	
	/**
	 * Additional CSS classes
	 */
	class?: string;
	
	/**
	 * Card content
	 */
	children: Snippet;
}

export interface GlassCardEvents {
	click: MouseEvent;
}

export interface GlassCardSlots {
	default: {};
}