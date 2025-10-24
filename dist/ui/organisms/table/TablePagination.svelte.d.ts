interface Props {
    currentPage?: number;
    totalPages?: number;
    totalItems: number;
    itemsPerPage?: number;
    pageSizeOptions?: number[];
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
    showPageSize?: boolean;
    showInfo?: boolean;
    variant?: 'default' | 'simple' | 'compact';
}
declare const TablePagination: import("svelte").Component<Props, {}, "currentPage" | "itemsPerPage">;
type TablePagination = ReturnType<typeof TablePagination>;
export default TablePagination;
