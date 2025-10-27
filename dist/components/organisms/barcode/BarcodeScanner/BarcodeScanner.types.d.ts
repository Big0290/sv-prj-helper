export interface BarcodeScannerProps {
    onScan?: (code: string, format: string) => void;
    onError?: (error: string) => void;
    width?: string;
    height?: string;
    continuousScan?: boolean;
    showSettings?: boolean;
}
export interface BarcodeScannerEvents {
}
export interface BarcodeScannerSlots {
    default: {};
}
//# sourceMappingURL=BarcodeScanner.types.d.ts.map