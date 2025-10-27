export interface AudioProps {
    /** Audio source URL (required) */
    src: string;
    /** Track title - defaults to 'Audio Track' */
    title?: string;
    /** Artist name - optional */
    artist?: string;
    /** Auto-play on load - defaults to false */
    autoplay?: boolean;
    /** Loop playback - defaults to false */
    loop?: boolean;
    /** Custom CSS class for styling */
    class?: string;
}
export interface AudioEvents {
}
export interface AudioSlots {
    default: {};
}
//# sourceMappingURL=Audio.types.d.ts.map