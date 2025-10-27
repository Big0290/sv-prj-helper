/**
 * Audio Player Component
 *
 * A fully-featured audio player with play/pause controls, seek functionality,
 * volume control, and progress tracking. Supports metadata display and
 * responsive design with glass morphism styling.
 *
 * @example
 * ```svelte
 * <AudioPlayer
 *   src="/audio/song.mp3"
 *   title="My Song"
 *   artist="Artist Name"
 *   autoplay={false}
 *   loop={true}
 * />
 * ```
 */
interface Props {
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
declare const Audio: import("svelte").Component<Props, {}, "">;
type Audio = ReturnType<typeof Audio>;
export default Audio;
//# sourceMappingURL=Audio.svelte.d.ts.map