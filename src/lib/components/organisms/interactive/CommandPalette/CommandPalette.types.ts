import type { Snippet } from 'svelte';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  shortcut?: string;
  category?: string;
  action: () => void;
}

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