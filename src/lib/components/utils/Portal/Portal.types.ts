import type { Snippet } from 'svelte';

export interface PortalProps {
children?: Snippet;
		target?: HTMLElement | string;
}

export interface PortalEvents {
  // Add component events here
}

export interface PortalSlots {
  default: {};
}