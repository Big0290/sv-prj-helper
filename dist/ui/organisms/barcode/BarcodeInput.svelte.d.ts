interface Props {
    value?: string;
    placeholder?: string;
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    readonly?: boolean;
    error?: string;
    helperText?: string;
    onScan?: (code: string, format: string) => void;
    onChange?: (value: string) => void;
}
declare const BarcodeInput: import("svelte").Component<Props, {}, "value">;
type BarcodeInput = ReturnType<typeof BarcodeInput>;
export default BarcodeInput;
