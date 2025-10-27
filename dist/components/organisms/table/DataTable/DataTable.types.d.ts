export interface DataTableProps {
    columns: Column[];
    rows: Row[];
    selectable?: boolean;
    selectedRows?: (string | number)[];
    onRowSelect?: (selectedIds: (string | number)[]) => void;
    onSort?: (key: string, direction: 'asc' | 'desc') => void;
}
export interface DataTableEvents {
}
export interface DataTableSlots {
    default: {};
}
//# sourceMappingURL=DataTable.types.d.ts.map