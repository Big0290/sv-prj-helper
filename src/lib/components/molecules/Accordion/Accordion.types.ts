import type { Snippet } from 'svelte';

export interface AccordionProps {
title: string;
		open?: boolean;
		children: Snippet;
}

export interface AccordionEvents {
  // Add component events here
}

export interface AccordionSlots {
  default: {};
}