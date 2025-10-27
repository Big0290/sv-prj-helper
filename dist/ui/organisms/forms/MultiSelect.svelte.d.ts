export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface Props {
    options: SelectOption[];
    selected?: string[];
    placeholder?: string;
    label?: string;
    searchable?: boolean;
    max?: number;
    onSelect?: (values: string[]) => void;
}
declare const MultiSelect: import("svelte").Component<Props, {}, "selected">;
type MultiSelect = ReturnType<typeof MultiSelect>;
export default MultiSelect;
//# sourceMappingURL=MultiSelect.svelte.d.ts.map