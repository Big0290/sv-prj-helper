interface Props {
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string;
    height?: string;
    count?: number;
    className?: string;
}
declare const Skeleton: import("svelte").Component<Props, {}, "">;
type Skeleton = ReturnType<typeof Skeleton>;
export default Skeleton;
