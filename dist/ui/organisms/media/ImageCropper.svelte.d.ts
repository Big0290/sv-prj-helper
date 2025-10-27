interface Props {
    src: string;
    aspectRatio?: number;
    onCrop?: (blob: Blob) => void;
    minWidth?: number;
    minHeight?: number;
}
declare const ImageCropper: import("svelte").Component<Props, {}, "">;
type ImageCropper = ReturnType<typeof ImageCropper>;
export default ImageCropper;
//# sourceMappingURL=ImageCropper.svelte.d.ts.map