import type { Snippet } from 'svelte';
interface Props {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    href?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    rel?: string;
    ariaLabel?: string;
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
}
declare const Button: import("svelte").Component<Props, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
//# sourceMappingURL=Button.svelte.d.ts.map