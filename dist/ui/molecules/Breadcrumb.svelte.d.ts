export interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: string;
    disabled?: boolean;
}
interface Props {
    items: BreadcrumbItem[];
    separator?: 'slash' | 'chevron' | 'dot' | 'arrow';
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'pills' | 'underline';
    showHome?: boolean;
    maxItems?: number;
    onItemClick?: (item: BreadcrumbItem, index: number) => void;
}
declare const Breadcrumb: import("svelte").Component<Props, {}, "">;
type Breadcrumb = ReturnType<typeof Breadcrumb>;
export default Breadcrumb;
//# sourceMappingURL=Breadcrumb.svelte.d.ts.map