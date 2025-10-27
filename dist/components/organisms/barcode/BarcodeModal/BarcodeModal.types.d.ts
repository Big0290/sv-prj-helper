export interface BarcodeModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onScan?: (code: string, format: string) => void;
    title?: string;
    beepOnScan?: boolean;
}
export interface BarcodeModalEvents {
}
export interface BarcodeModalSlots {
    default: {};
}
//# sourceMappingURL=BarcodeModal.types.d.ts.map