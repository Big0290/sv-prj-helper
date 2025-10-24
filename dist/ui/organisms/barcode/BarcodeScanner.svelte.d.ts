interface Props {
    onScan?: (code: string, format: string) => void;
    onError?: (error: string) => void;
    width?: string;
    height?: string;
    continuousScan?: boolean;
    showSettings?: boolean;
}
declare const BarcodeScanner: import("svelte").Component<Props, {}, "">;
type BarcodeScanner = ReturnType<typeof BarcodeScanner>;
export default BarcodeScanner;
