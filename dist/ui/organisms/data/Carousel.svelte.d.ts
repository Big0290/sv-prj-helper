import type { Snippet } from 'svelte';
export interface CarouselItem {
    id: string;
    content: Snippet;
    image?: string;
    title?: string;
    description?: string;
}
interface Props {
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
declare const Carousel: import("svelte").Component<Props, {}, "activeIndex">;
type Carousel = ReturnType<typeof Carousel>;
export default Carousel;
