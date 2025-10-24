import type { Snippet } from 'svelte';
interface Props {
    variant?: 'default' | 'elevated' | 'outlined';
    padding?: 'sm' | 'md' | 'lg';
    interactive?: boolean;
    onclick?: (e: MouseEvent) => void;
    ariaLabel?: string;
    class?: string;
    children: Snippet;
}
declare const Card: import("svelte").Component<Props, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;
