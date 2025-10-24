interface Props {
    group?: string;
    disabled?: boolean;
    label?: string;
    id?: string;
    name?: string;
    value: string;
    onchange?: (e: Event) => void;
}
declare const Radio: import("svelte").Component<Props, {}, "group">;
type Radio = ReturnType<typeof Radio>;
export default Radio;
