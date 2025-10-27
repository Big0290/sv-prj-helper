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
import type { DataTableProps } from './DataTable.types.js';
declare const DataTable: import("svelte").Component<DataTableProps, {}, "selectedRows">;
type DataTable = ReturnType<typeof DataTable>;
export default DataTable;
//# sourceMappingURL=DataTable.svelte.d.ts.map