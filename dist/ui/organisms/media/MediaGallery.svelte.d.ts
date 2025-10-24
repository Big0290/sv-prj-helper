interface MediaItem {
    id: string;
    type: 'image' | 'video' | 'audio' | 'file';
    url: string;
    thumbnail?: string;
    name: string;
    size?: number;
    timestamp: Date;
    senderName?: string;
}
interface Props {
    items?: MediaItem[];
    filter?: 'all' | 'image' | 'video' | 'audio' | 'file';
    onItemClick?: (item: MediaItem) => void;
    onClose?: () => void;
    title?: string;
}
declare const MediaGallery: import("svelte").Component<Props, {}, "">;
type MediaGallery = ReturnType<typeof MediaGallery>;
export default MediaGallery;
