export interface BarcodeDisplayProps {
    value: string;
    type?: 'qrcode' | 'code128' | 'code39' | 'ean13' | 'upca';
    size?: number;
    errorCorrection?: 'L' | 'M' | 'Q' | 'H';
    showText?: boolean;
    backgroundColor?: string;
    foregroundColor?: string;
    className?: string;
}
export interface BarcodeDisplayEvents {
}
export interface BarcodeDisplaySlots {
    default: {};
}
//# sourceMappingURL=BarcodeDisplay.types.d.ts.map