import type { Snippet } from 'svelte';
export interface TimelineItem {
    id: string;
    title: string;
    description?: string;
    timestamp: Date | string;
    icon?: string;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    content?: Snippet;
}
interface Props {
    items: TimelineItem[];
    variant?: 'default' | 'compact' | 'detailed' | 'alternating';
    position?: 'left' | 'right' | 'center';
    showLine?: boolean;
    showTime?: boolean;
    timeFormat?: 'relative' | 'absolute' | 'time' | 'date';
    onItemClick?: (item: TimelineItem) => void;
}
declare const Timeline: import("svelte").Component<Props, {}, "">;
type Timeline = ReturnType<typeof Timeline>;
export default Timeline;
//# sourceMappingURL=Timeline.svelte.d.ts.map