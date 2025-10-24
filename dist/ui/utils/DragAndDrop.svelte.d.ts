interface Props {
    onDrop?: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
    maxSize?: number;
    maxFiles?: number;
    disabled?: boolean;
}
declare const DragAndDrop: import("svelte").Component<Props, {}, "">;
type DragAndDrop = ReturnType<typeof DragAndDrop>;
export default DragAndDrop;
