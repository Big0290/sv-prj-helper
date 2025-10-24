interface Props {
    columns: Array<{
        key: string;
        label: string;
    }>;
    rows: Array<Record<string, any>>;
    striped?: boolean;
    hoverable?: boolean;
    compact?: boolean;
    className?: string;
}
declare const SimpleTable: import("svelte").Component<Props, {}, "">;
type SimpleTable = ReturnType<typeof SimpleTable>;
export default SimpleTable;
