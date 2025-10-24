interface Props {
    value?: number;
    max?: number;
    readonly?: boolean;
    size?: 'sm' | 'md' | 'lg';
    showValue?: boolean;
    onChange?: (value: number) => void;
}
declare const Rating: import("svelte").Component<Props, {}, "value">;
type Rating = ReturnType<typeof Rating>;
export default Rating;
