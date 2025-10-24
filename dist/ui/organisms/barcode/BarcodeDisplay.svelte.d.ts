interface Props {
    value: string;
    type?: 'qrcode' | 'code128' | 'code39' | 'ean13' | 'upca';
    size?: number;
    errorCorrection?: 'L' | 'M' | 'Q' | 'H';
    showText?: boolean;
    backgroundColor?: string;
    foregroundColor?: string;
    className?: string;
}
declare const BarcodeDisplay: import("svelte").Component<Props, {}, "">;
type BarcodeDisplay = ReturnType<typeof BarcodeDisplay>;
export default BarcodeDisplay;
