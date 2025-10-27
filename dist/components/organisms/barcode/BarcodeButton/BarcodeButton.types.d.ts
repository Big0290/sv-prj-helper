export interface BarcodeButtonProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    label?: string;
    modalTitle?: string;
    onScan?: (code: string, format: string) => void;
}
export interface BarcodeButtonEvents {
}
export interface BarcodeButtonSlots {
    default: {};
}
//# sourceMappingURL=BarcodeButton.types.d.ts.map