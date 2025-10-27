export interface NavItem {
    id: string;
    label: string;
    icon: string;
    badge?: number;
    onClick?: () => void;
}
interface Props {
    items: NavItem[];
    active?: string;
    onItemClick?: (item: NavItem) => void;
}
declare const BottomNavigation: import("svelte").Component<Props, {}, "active">;
type BottomNavigation = ReturnType<typeof BottomNavigation>;
export default BottomNavigation;
//# sourceMappingURL=BottomNavigation.svelte.d.ts.map