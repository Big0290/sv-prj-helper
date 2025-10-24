interface Props {
    isOpen?: boolean;
    onClose?: () => void;
    onScan?: (code: string, format: string) => void;
    title?: string;
    beepOnScan?: boolean;
}
declare const BarcodeModal: import("svelte").Component<Props, {}, "isOpen">;
type BarcodeModal = ReturnType<typeof BarcodeModal>;
export default BarcodeModal;
