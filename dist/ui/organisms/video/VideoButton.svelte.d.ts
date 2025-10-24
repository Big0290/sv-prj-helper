interface Props {
    src: string;
    title: string;
    thumbnail?: string;
    duration?: number;
    variant?: 'inline' | 'modal';
    size?: 'sm' | 'md' | 'lg';
    enableHoverPreview?: boolean;
}
declare const VideoButton: import("svelte").Component<Props, {}, "">;
type VideoButton = ReturnType<typeof VideoButton>;
export default VideoButton;
