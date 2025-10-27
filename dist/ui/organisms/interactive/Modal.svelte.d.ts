import type { Snippet } from 'svelte';
interface Props {
    open?: boolean;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    onclose?: () => void;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
    children: Snippet;
}
declare const Modal: import("svelte").Component<Props, {}, "open">;
type Modal = ReturnType<typeof Modal>;
export default Modal;
//# sourceMappingURL=Modal.svelte.d.ts.map