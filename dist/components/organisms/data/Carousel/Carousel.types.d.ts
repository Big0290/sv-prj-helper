export interface CarouselProps {
    items: CarouselItem[];
    activeIndex?: number;
    variant?: 'default' | 'cards' | 'fade' | 'stack';
    autoPlay?: boolean;
    interval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    loop?: boolean;
    aspectRatio?: string;
    onSlideChange?: (index: number) => void;
}
export interface CarouselEvents {
}
export interface CarouselSlots {
    default: {};
}
//# sourceMappingURL=Carousel.types.d.ts.map