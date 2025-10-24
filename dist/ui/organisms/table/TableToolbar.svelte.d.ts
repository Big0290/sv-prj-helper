interface Action {
    id: string;
    label: string;
    icon?: string;
    variant?: 'default' | 'primary' | 'danger';
    onClick: () => void;
}
interface Props {
    title?: string;
    searchPlaceholder?: string;
    searchValue?: string;
    onSearch?: (value: string) => void;
    actions?: Action[];
    showSearch?: boolean;
}
declare const TableToolbar: import("svelte").Component<Props, {}, "searchValue">;
type TableToolbar = ReturnType<typeof TableToolbar>;
export default TableToolbar;
