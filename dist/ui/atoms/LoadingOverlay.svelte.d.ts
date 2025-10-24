interface Props {
    isLoading?: boolean;
    message?: string;
    variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
    blur?: boolean;
    fullscreen?: boolean;
}
declare const LoadingOverlay: import("svelte").Component<Props, {}, "">;
type LoadingOverlay = ReturnType<typeof LoadingOverlay>;
export default LoadingOverlay;
