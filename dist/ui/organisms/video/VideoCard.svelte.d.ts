interface Props {
    title: string;
    src: string;
    thumbnail?: string;
    description?: string;
    duration?: number;
    views?: number;
    uploadDate?: Date | string;
    author?: string;
    onClick?: () => void;
    enableHoverPreview?: boolean;
}
declare const VideoCard: import("svelte").Component<Props, {}, "">;
type VideoCard = ReturnType<typeof VideoCard>;
export default VideoCard;
