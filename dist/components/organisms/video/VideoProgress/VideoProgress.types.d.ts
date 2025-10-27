export interface VideoProgressProps {
    videoId: string;
    duration: number;
    currentTime?: number;
    onResume?: (time: number) => void;
    autoSave?: boolean;
    showLabel?: boolean;
}
export interface VideoProgressEvents {
}
export interface VideoProgressSlots {
    default: {};
}
//# sourceMappingURL=VideoProgress.types.d.ts.map