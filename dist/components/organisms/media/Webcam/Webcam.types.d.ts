export interface WebcamProps {
    onCapture?: (blob: Blob) => void;
    onRecordingComplete?: (blob: Blob) => void;
    height?: string;
    width?: string;
    facingMode?: 'user' | 'environment';
    mirrored?: boolean;
    variant?: 'photo' | 'video' | 'both';
    showControls?: boolean;
}
export interface WebcamEvents {
}
export interface WebcamSlots {
    default: {};
}
//# sourceMappingURL=Webcam.types.d.ts.map