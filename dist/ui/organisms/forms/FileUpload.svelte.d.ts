interface Props {
    accept?: string;
    multiple?: boolean;
    maxSize?: number;
    onUpload?: (files: File[]) => void;
    label?: string;
}
declare const FileUpload: import("svelte").Component<Props, {}, "">;
type FileUpload = ReturnType<typeof FileUpload>;
export default FileUpload;
