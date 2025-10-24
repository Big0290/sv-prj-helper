import { type Snippet } from 'svelte';
interface Props {
    children?: Snippet;
    variant?: 'filled' | 'outlined' | 'soft';
    size?: 'sm' | 'base' | 'lg';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
    removable?: boolean;
    disabled?: boolean;
    onRemove?: () => void;
    [key: string]: any;
}
declare const Chip: import("svelte").Component<Props, {}, "">;
type Chip = ReturnType<typeof Chip>;
export default Chip;
