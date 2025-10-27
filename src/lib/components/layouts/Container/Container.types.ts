import type { Snippet } from 'svelte';

export interface ContainerProps {
maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
		padding?: boolean;
		children: Snippet;
}

export interface ContainerEvents {
  // Add component events here
}

export interface ContainerSlots {
  default: {};
}