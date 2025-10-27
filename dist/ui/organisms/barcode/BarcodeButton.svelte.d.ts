interface Props {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    label?: string;
    modalTitle?: string;
    onScan?: (code: string, format: string) => void;
}
declare const BarcodeButton: import("svelte").Component<Props, {}, "">;
type BarcodeButton = ReturnType<typeof BarcodeButton>;
export default BarcodeButton;
//# sourceMappingURL=BarcodeButton.svelte.d.ts.map