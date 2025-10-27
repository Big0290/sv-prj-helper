export interface VideoPlaylistProps {
    videos: VideoItem[];
    autoPlayNext?: boolean;
    currentIndex?: number;
    onVideoChange?: (index: number) => void;
    orientation?: 'horizontal' | 'vertical';
}
export interface VideoPlaylistEvents {
}
export interface VideoPlaylistSlots {
    default: {};
}
//# sourceMappingURL=VideoPlaylist.types.d.ts.map