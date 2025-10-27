export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: 'slash' | 'chevron' | 'dot' | 'arrow';
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'pills' | 'underline';
    showHome?: boolean;
    maxItems?: number;
    onItemClick?: (item: BreadcrumbItem, index: number) => void;
}
export interface BreadcrumbEvents {
}
export interface BreadcrumbSlots {
    default: {};
}
//# sourceMappingURL=Breadcrumb.types.d.ts.map