export interface InputProps {
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
    autocomplete?: string;
    maxlength?: number;
    minlength?: number;
    pattern?: string;
    oninput?: (e: Event) => void;
    onchange?: (e: Event) => void;
    onfocus?: (e: FocusEvent) => void;
    onblur?: (e: FocusEvent) => void;
}
export interface InputEvents {
}
export interface InputSlots {
    default: {};
}
//# sourceMappingURL=Input.types.d.ts.map