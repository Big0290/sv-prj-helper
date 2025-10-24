interface Props {
    onScan?: (code: string, format: string) => void;
    onError?: (error: string) => void;
    height?: string;
    width?: string;
    autoClose?: boolean;
}
declare const QuickScan: import("svelte").Component<Props, {}, "">;
type QuickScan = ReturnType<typeof QuickScan>;
export default QuickScan;
