export interface TabsProps {
    tabs: Tab[];
    activeTab?: string;
    variant?: 'default' | 'pills' | 'underline';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    onTabChange?: (tabId: string) => void;
}
export interface TabsEvents {
}
export interface TabsSlots {
    default: {};
}
//# sourceMappingURL=Tabs.types.d.ts.map