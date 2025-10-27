export interface TablePaginationProps {
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
export interface TablePaginationEvents {
}
export interface TablePaginationSlots {
    default: {};
}
//# sourceMappingURL=TablePagination.types.d.ts.map