import type { Snippet } from 'svelte';

export interface ChatSearchProps {
results?: SearchResult[];
		isSearching?: boolean;
		query?: string;
		onSearch?: (query: string) => void;
		onResultClick?: (resultId: string) => void;
		onClose?: () => void;
		placeholder?: string;
}

export interface ChatSearchEvents {
  // Add component events here
}

export interface ChatSearchSlots {
  default: {};
}