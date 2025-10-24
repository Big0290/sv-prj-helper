interface Props {
    videoId: string;
    duration: number;
    currentTime?: number;
    onResume?: (time: number) => void;
    autoSave?: boolean;
    showLabel?: boolean;
}
declare const VideoProgress: import("svelte").Component<Props, {}, "currentTime">;
type VideoProgress = ReturnType<typeof VideoProgress>;
export default VideoProgress;
