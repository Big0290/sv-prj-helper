interface Props {
    value?: string;
    options: Array<{
        value: string;
        label: string;
        disabled?: boolean;
    }>;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    label?: string;
    helperText?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    onchange?: (e: Event) => void;
}
declare const Select: import("svelte").Component<Props, {}, "value">;
type Select = ReturnType<typeof Select>;
export default Select;
