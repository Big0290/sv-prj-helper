interface Props {
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    id?: string;
    name?: string;
    value?: string;
    indeterminate?: boolean;
    onchange?: (e: Event) => void;
}
declare const Checkbox: import("svelte").Component<Props, {}, "checked">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
