interface Props {
    src: string;
    poster?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    width?: string;
    height?: string;
    aspectRatio?: '16/9' | '4/3' | '1/1';
}
declare const Video: import("svelte").Component<Props, {}, "">;
type Video = ReturnType<typeof Video>;
export default Video;
