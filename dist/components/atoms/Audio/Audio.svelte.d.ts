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
import type { AudioProps } from './Audio.types.js';
declare const Audio: import("svelte").Component<AudioProps, {}, "">;
type Audio = ReturnType<typeof Audio>;
export default Audio;
//# sourceMappingURL=Audio.svelte.d.ts.map