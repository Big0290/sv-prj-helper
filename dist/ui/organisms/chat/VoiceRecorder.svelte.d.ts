interface Props {
    onSend?: (audioBlob: Blob, duration: number) => void;
    onCancel?: () => void;
    maxDuration?: number;
}
declare const VoiceRecorder: import("svelte").Component<Props, {}, "">;
type VoiceRecorder = ReturnType<typeof VoiceRecorder>;
export default VoiceRecorder;
