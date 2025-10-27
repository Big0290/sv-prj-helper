import type { Snippet } from 'svelte';

export interface CommandPaletteProps {
commands: CommandItem[];
		isOpen?: boolean;
		placeholder?: string;
		shortcut?: string;
		onClose?: () => void;
}

export interface CommandPaletteEvents {
  // Add component events here
}

export interface CommandPaletteSlots {
  default: {};
}