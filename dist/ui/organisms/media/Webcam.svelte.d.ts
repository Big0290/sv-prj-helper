interface Props {
    onCapture?: (blob: Blob) => void;
    onRecordingComplete?: (blob: Blob) => void;
    height?: string;
    width?: string;
    facingMode?: 'user' | 'environment';
    mirrored?: boolean;
    variant?: 'photo' | 'video' | 'both';
    showControls?: boolean;
}
declare const Webcam: import("svelte").Component<Props, {}, "">;
type Webcam = ReturnType<typeof Webcam>;
export default Webcam;
