export interface Column {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
}
export interface Row {
    id: string | number;
    [key: string]: any;
}
interface Props {
    columns: Column[];
    rows: Row[];
    selectable?: boolean;
    selectedRows?: (string | number)[];
    onRowSelect?: (selectedIds: (string | number)[]) => void;
    onSort?: (key: string, direction: 'asc' | 'desc') => void;
}
declare const DataTable: import("svelte").Component<Props, {}, "selectedRows">;
type DataTable = ReturnType<typeof DataTable>;
export default DataTable;
//# sourceMappingURL=DataTable.svelte.d.ts.map