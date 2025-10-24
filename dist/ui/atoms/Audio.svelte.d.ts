interface Props {
    src: string;
    title?: string;
    artist?: string;
    autoplay?: boolean;
    loop?: boolean;
}
declare const Audio: import("svelte").Component<Props, {}, "">;
type Audio = ReturnType<typeof Audio>;
export default Audio;
