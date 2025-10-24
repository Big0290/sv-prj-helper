interface Props {
    images: string[];
    columns?: number;
    gap?: string;
    onClick?: (index: number) => void;
}
declare const ImageGallery: import("svelte").Component<Props, {}, "">;
type ImageGallery = ReturnType<typeof ImageGallery>;
export default ImageGallery;
