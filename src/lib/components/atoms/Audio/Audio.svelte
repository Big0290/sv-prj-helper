<script lang="ts">
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

  let { src,
    title = "Audio Track",
    artist,
    autoplay = false,
    loop = false,
    class: className = "",
   }: AudioProps = $props();

  // Audio element reference
  let audioElement: HTMLAudioElement;

  // Reactive state variables
  let isPlaying = $state(false);
  let currentTime = $state(0);
  let duration = $state(0);
  let volume = $state(1);
  let isLoading = $state(true);
  let hasError = $state(false);

  /**
   * Toggle play/pause state
   */
  function togglePlay() {
    if (!audioElement || hasError) return;
    if (audioElement.paused) {
      audioElement.play().catch(handlePlayError);
    } else {
      audioElement.pause();
    }
  }

  /**
   * Handle play errors (e.g., autoplay restrictions)
   */
  function handlePlayError(error: Error) {
    console.warn("Audio play failed:", error);
    isPlaying = false;
  }

  /**
   * Update current time during playback
   */
  function handleTimeUpdate() {
    if (audioElement) {
      currentTime = audioElement.currentTime;
    }
  }

  /**
   * Handle metadata loading and duration updates
   */
  function handleLoadedMetadata() {
    if (audioElement?.duration && isFinite(audioElement.duration)) {
      duration = audioElement.duration;
      isLoading = false;
      hasError = false;
    }
  }

  /**
   * Handle audio loading errors
   */
  function handleError() {
    hasError = true;
    isLoading = false;
    isPlaying = false;
  }

  /**
   * Handle when audio can start playing
   */
  function handleCanPlay() {
    isLoading = false;
    hasError = false;
  }

  /**
   * Effect to ensure duration is properly set when audio element is ready
   */
  $effect(() => {
    if (audioElement) {
      const updateDuration = () => {
        if (audioElement.duration && isFinite(audioElement.duration)) {
          duration = audioElement.duration;
          isLoading = false;
        }
      };

      if (audioElement.readyState >= 1) {
        updateDuration();
      }
    }
  });

  /**
   * Handle seek bar input
   */
  function handleSeek(e: Event) {
    const input = e.target as HTMLInputElement;
    const newTime = parseFloat(input.value);

    if (audioElement && isFinite(newTime)) {
      audioElement.currentTime = newTime;
    }
  }

  /**
   * Handle volume control input
   */
  function handleVolumeChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const newVolume = parseFloat(input.value);

    if (audioElement && newVolume >= 0 && newVolume <= 1) {
      volume = newVolume;
      audioElement.volume = volume;
    }
  }

  /**
   * Format seconds to MM:SS format
   * @param seconds - Time in seconds
   * @returns Formatted time string
   */
  function formatTime(seconds: number): string {
    if (!isFinite(seconds) || isNaN(seconds)) {
      return "0:00";
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  /**
   * Calculate progress percentage for visual indicators
   */
  const progress = $derived(() => {
    if (!duration || !isFinite(duration) || duration === 0) return 0;
    return Math.min((currentTime / duration) * 100, 100);
  });

  /**
   * Determine if controls should be disabled
   */
  const isDisabled = $derived(isLoading || hasError);
</script>

<!--
Audio Player Component

A comprehensive audio player with the following features:
- Play/pause controls with visual feedback
- Seek bar with progress indication
- Volume control (hidden on mobile)
- Time display (current/total)
- Loading and error states
- Responsive design with glass morphism styling
- Keyboard accessibility
- Screen reader support

Props:
- src: Audio file URL (required)
- title: Track title (optional, defaults to 'Audio Track')
- artist: Artist name (optional)
- autoplay: Auto-play on load (optional, defaults to false)
- loop: Loop playback (optional, defaults to false)
- class: Additional CSS classes (optional)

Events:
- Audio element events are handled internally
- No custom events are dispatched currently

Styling:
- Uses CSS custom properties for theming
- Responsive design with mobile-specific adaptations
- Glass morphism effect with backdrop blur
- Dark mode support via prefers-color-scheme
-->
<div class="audio-player {className}">
  <audio
    bind:this={audioElement}
    {src}
    {autoplay}
    {loop}
    preload="metadata"
    onplay={() => (isPlaying = true)}
    onpause={() => (isPlaying = false)}
    ontimeupdate={handleTimeUpdate}
    onloadedmetadata={handleLoadedMetadata}
    ondurationchange={handleLoadedMetadata}
    onloadeddata={handleLoadedMetadata}
    oncanplay={handleCanPlay}
    onerror={handleError}
    aria-label="Audio player for {title}"
  >
    Your browser does not support the audio element.
  </audio>

  <!-- Track Information -->
  <div class="audio-info">
    <div class="audio-title">{title}</div>
    {#if artist}
      <div class="audio-artist">{artist}</div>
    {/if}
  </div>

  <!-- Progress Bar -->
  <div class="audio-progress">
    <div class="progress-track">
      <div
        class="progress-fill"
        style="width: {progress()}%"
        role="progressbar"
        aria-valuenow={progress()}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Playback progress"
      ></div>
    </div>
    <input
      type="range"
      min="0"
      max={duration || 100}
      value={currentTime}
      oninput={handleSeek}
      class="progress-bar"
      style="--progress: {progress()}%"
      aria-label="Seek to position in audio"
      disabled={isDisabled}
    />
  </div>

  <!-- Controls -->
  <div class="audio-controls">
    <button
      type="button"
      class="play-button"
      class:loading={isLoading}
      class:error={hasError}
      onclick={togglePlay}
      disabled={isDisabled}
      aria-label={isPlaying ? "Pause audio" : "Play audio"}
    >
      {#if isLoading}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="loading-spinner"
        >
          <circle cx="12" cy="12" r="3" opacity="0.4">
            <animate
              attributeName="r"
              values="3;6;3"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;0.1;0.4"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      {:else if hasError}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
      {:else if isPlaying}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      {:else}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      {/if}
    </button>

    <span class="time-display" aria-live="polite">
      {formatTime(currentTime)} / {duration > 0
        ? formatTime(duration)
        : "--:--"}
    </span>

    <div class="volume-control">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        {#if volume > 0.5}
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        {:else if volume > 0}
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        {/if}
      </svg>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        oninput={handleVolumeChange}
        class="volume-bar"
        aria-label="Volume control"
      />
    </div>
  </div>

  {#if hasError}
    <div class="error-message" role="alert">
      Failed to load audio. Please check the file URL and try again.
    </div>
  {/if}
</div>

<style>
  .audio-player {
    width: 100%;
    padding: var(--spacing-6);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur-lg));
    -webkit-backdrop-filter: blur(var(--glass-blur-lg));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-xl);
    box-shadow: var(--glass-shadow);
    position: relative;
  }

  .audio-info {
    margin-bottom: var(--spacing-4);
  }

  .audio-title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-neutral-900);
    margin-bottom: var(--spacing-1);
    line-height: 1.4;
  }
  @media (prefers-color-scheme: dark) {
    .audio-title {
      color: var(--color-neutral-50);
    }
  }

  .audio-artist {
    font-size: var(--font-size-sm);
    color: var(--color-neutral-600);
    line-height: 1.4;
  }

  @media (prefers-color-scheme: dark) {
    .audio-artist {
      color: var(--color-neutral-400);
    }
  }

  .audio-progress {
    position: relative;
    margin-bottom: var(--spacing-4);
    height: 6px;
  }

  .progress-track {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: var(--glass-bg-hover);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--color-primary-500),
      var(--color-primary-600)
    );
    border-radius: 3px;
    transition: width 0.1s linear;
  }

  .progress-bar {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 20px;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    z-index: 2;
    margin: 0;
  }

  .progress-bar:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .progress-bar::-webkit-slider-track {
    background: transparent;
    height: 6px;
  }

  .progress-bar::-moz-range-track {
    background: transparent;
    height: 6px;
  }

  .progress-bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: white;
    border: 2px solid var(--color-primary-500);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform var(--transition-fast);
  }

  .progress-bar:not(:disabled)::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }

  .progress-bar::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: white;
    border: 2px solid var(--color-primary-500);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform var(--transition-fast);
  }

  .progress-bar:not(:disabled)::-moz-range-thumb:hover {
    transform: scale(1.2);
  }

  .progress-bar:focus-visible {
    outline: none;
  }

  .progress-bar:focus-visible::-webkit-slider-thumb {
    box-shadow:
      0 0 0 3px rgba(168, 85, 247, 0.3),
      0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .progress-bar:focus-visible::-moz-range-thumb {
    box-shadow:
      0 0 0 3px rgba(168, 85, 247, 0.3),
      0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .audio-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
  }

  .play-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    padding: 0;
    background: linear-gradient(
      135deg,
      var(--color-primary-500),
      var(--color-primary-600)
    );
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all var(--transition-base);
    flex-shrink: 0;
  }

  .play-button:not(:disabled):hover {
    background: linear-gradient(
      135deg,
      var(--color-primary-600),
      var(--color-primary-700)
    );
    transform: scale(1.05);
    box-shadow: var(--glass-shadow-lg);
  }

  .play-button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }

  .play-button.loading {
    background: linear-gradient(
      135deg,
      var(--color-neutral-400),
      var(--color-neutral-500)
    );
  }

  .play-button.error {
    background: linear-gradient(
      135deg,
      var(--color-red-500),
      var(--color-red-600)
    );
  }

  .play-button:focus-visible {
    outline: var(--focus-ring-width) solid var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
  }

  .loading-spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .time-display {
    font-size: var(--font-size-sm);
    font-variant-numeric: tabular-nums;
    color: var(--color-neutral-700);
    white-space: nowrap;
    min-width: 80px;
  }

  @media (prefers-color-scheme: dark) {
    .time-display {
      color: var(--color-neutral-300);
    }
  }

  .volume-control {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    margin-left: auto;
    color: var(--color-neutral-600);
  }

  @media (prefers-color-scheme: dark) {
    .volume-control {
      color: var(--color-neutral-400);
    }
  }

  .volume-bar {
    width: 100px;
    height: 4px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--glass-bg-hover);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }

  .volume-bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: var(--color-primary-500);
    border-radius: 50%;
    cursor: pointer;
    transition: transform var(--transition-fast);
  }

  .volume-bar::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }

  .volume-bar::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: var(--color-primary-500);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: transform var(--transition-fast);
  }

  .volume-bar::-moz-range-thumb:hover {
    transform: scale(1.2);
  }

  .volume-bar:focus-visible {
    outline: var(--focus-ring-width) solid var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
  }

  .error-message {
    margin-top: var(--spacing-3);
    padding: var(--spacing-3);
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: var(--radius-md);
    color: var(--color-red-700);
    font-size: var(--font-size-sm);
    text-align: center;
  }

  @media (prefers-color-scheme: dark) {
    .error-message {
      background: rgba(239, 68, 68, 0.2);
      color: var(--color-red-300);
    }
  }

  @media (max-width: 768px) {
    .volume-control {
      display: none;
    }

    .audio-player {
      padding: var(--spacing-4);
    }

    .time-display {
      font-size: var(--font-size-xs);
      min-width: 70px;
    }
  }

  @media (max-width: 480px) {
    .audio-controls {
      gap: var(--spacing-2);
    }

    .play-button {
      width: 40px;
      height: 40px;
    }

    .play-button svg {
      width: 20px;
      height: 20px;
    }
  }

  /* Reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .play-button,
    .progress-bar::-webkit-slider-thumb,
    .progress-bar::-moz-range-thumb,
    .volume-bar::-webkit-slider-thumb,
    .volume-bar::-moz-range-thumb,
    .loading-spinner {
      transition: none;
      animation: none;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .audio-player {
      border: 2px solid;
    }

    .progress-fill {
      background: currentColor;
    }

    .play-button {
      border: 2px solid;
    }
  }
</style>
