interface Props {
    columns: Array<{
        key: string;
        label: string;
    }>;
    rows: Array<Record<string, any>>;
    onRowClick?: (row: Record<string, any>) => void;
    className?: string;
}
declare const TableCard: import("svelte").Component<Props, {}, "">;
type TableCard = ReturnType<typeof TableCard>;
export default TableCard;
