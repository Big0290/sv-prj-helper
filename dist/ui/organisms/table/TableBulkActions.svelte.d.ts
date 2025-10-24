interface Action {
    id: string;
    label: string;
    icon?: string;
    variant?: 'default' | 'danger';
    onClick: () => void;
}
interface Props {
    selectedCount: number;
    actions?: Action[];
    onClear?: () => void;
}
declare const TableBulkActions: import("svelte").Component<Props, {}, "">;
type TableBulkActions = ReturnType<typeof TableBulkActions>;
export default TableBulkActions;
