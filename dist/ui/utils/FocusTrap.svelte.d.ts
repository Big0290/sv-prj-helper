import { type Snippet } from 'svelte';
interface Props {
    children?: Snippet;
    active?: boolean;
    initialFocus?: HTMLElement;
    returnFocus?: boolean;
    [key: string]: any;
}
declare const FocusTrap: import("svelte").Component<Props, {}, "">;
type FocusTrap = ReturnType<typeof FocusTrap>;
export default FocusTrap;
//# sourceMappingURL=FocusTrap.svelte.d.ts.map