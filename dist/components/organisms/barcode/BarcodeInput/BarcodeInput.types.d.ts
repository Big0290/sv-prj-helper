export interface BarcodeInputProps {
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
export interface BarcodeInputEvents {
}
export interface BarcodeInputSlots {
    default: {};
}
//# sourceMappingURL=BarcodeInput.types.d.ts.map