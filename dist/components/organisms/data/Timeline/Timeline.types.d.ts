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
}
export interface TimelineSlots {
    default: {};
}
//# sourceMappingURL=Timeline.types.d.ts.map