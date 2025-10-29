interface Props {
    value?: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    error?: string;
    label?: string;
    helperText?: string;
    id?: string;
    name?: string;
    autocomplete?: 'on' | 'off' | 'name' | 'email' | 'username' | 'current-password' | 'new-password' | string;
    maxlength?: number;
    minlength?: number;
    pattern?: string;
    oninput?: (e: Event) => void;
    onchange?: (e: Event) => void;
    onfocus?: (e: FocusEvent) => void;
    onblur?: (e: FocusEvent) => void;
}
declare const Input: import("svelte").Component<Props, {}, "value">;
type Input = ReturnType<typeof Input>;
export default Input;
//# sourceMappingURL=Input.svelte.d.ts.map