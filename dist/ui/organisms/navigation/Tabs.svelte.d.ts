export interface Tab {
    id: string;
    label: string;
    icon?: string;
    disabled?: boolean;
}
interface Props {
    tabs: Tab[];
    activeTab?: string;
    variant?: 'default' | 'pills' | 'underline';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    onTabChange?: (tabId: string) => void;
}
declare const Tabs: import("svelte").Component<Props, {}, "activeTab">;
type Tabs = ReturnType<typeof Tabs>;
export default Tabs;
//# sourceMappingURL=Tabs.svelte.d.ts.map