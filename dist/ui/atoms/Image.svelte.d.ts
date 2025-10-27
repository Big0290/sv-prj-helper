interface Props {
    src: string;
    alt: string;
    width?: string | number;
    height?: string | number;
    fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    loading?: 'lazy' | 'eager';
    fallback?: string;
    onLoad?: () => void;
    onError?: () => void;
    [key: string]: any;
}
declare const Image: import("svelte").Component<Props, {}, "">;
type Image = ReturnType<typeof Image>;
export default Image;
//# sourceMappingURL=Image.svelte.d.ts.map