export interface MediaGalleryProps {
    items?: MediaItem[];
    filter?: 'all' | 'image' | 'video' | 'audio' | 'file';
    onItemClick?: (item: MediaItem) => void;
    onClose?: () => void;
    title?: string;
}
export interface MediaGalleryEvents {
}
export interface MediaGallerySlots {
    default: {};
}
//# sourceMappingURL=MediaGallery.types.d.ts.map