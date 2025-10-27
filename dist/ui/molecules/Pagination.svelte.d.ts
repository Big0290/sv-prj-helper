interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
    showFirstLast?: boolean;
    maxVisible?: number;
}
declare const Pagination: import("svelte").Component<Props, {}, "currentPage">;
type Pagination = ReturnType<typeof Pagination>;
export default Pagination;
//# sourceMappingURL=Pagination.svelte.d.ts.map