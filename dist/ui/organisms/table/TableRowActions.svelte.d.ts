interface Action {
    id: string;
    label: string;
    icon?: string;
    variant?: 'default' | 'danger';
    onClick: () => void;
}
interface Props {
    actions?: Action[];
}
declare const TableRowActions: import("svelte").Component<Props, {}, "">;
type TableRowActions = ReturnType<typeof TableRowActions>;
export default TableRowActions;
//# sourceMappingURL=TableRowActions.svelte.d.ts.map