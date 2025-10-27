export interface VideoCardProps {
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
export interface VideoCardEvents {
}
export interface VideoCardSlots {
    default: {};
}
//# sourceMappingURL=VideoCard.types.d.ts.map