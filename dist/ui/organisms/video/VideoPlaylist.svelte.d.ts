export interface VideoItem {
    id: string;
    title: string;
    src: string;
    thumbnail?: string;
    duration?: number;
}
interface Props {
    videos: VideoItem[];
    autoPlayNext?: boolean;
    currentIndex?: number;
    onVideoChange?: (index: number) => void;
    orientation?: 'horizontal' | 'vertical';
}
declare const VideoPlaylist: import("svelte").Component<Props, {}, "currentIndex">;
type VideoPlaylist = ReturnType<typeof VideoPlaylist>;
export default VideoPlaylist;
