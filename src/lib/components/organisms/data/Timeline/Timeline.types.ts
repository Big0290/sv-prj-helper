import type { Snippet } from 'svelte';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  content?: string;
  timestamp: Date;
  type?: string;
  variant?: string;
  icon?: string;
}

export interface TimelineProps {
items: TimelineItem[];
		variant?: 'default' | 'compact' | 'detailed' | 'alternating';
		position?: 'left' | 'right' | 'center';
		showLine?: boolean;
		showTime?: boolean;
		timeFormat?: 'relative' | 'absolute' | 'time' | 'date';
		onItemClick?: (item: TimelineItem) => void;
}

export interface TimelineEvents {
  // Add component events here
}

export interface TimelineSlots {
  default: {};
}