interface Props {
    length?: number;
    value?: string;
    onComplete?: (code: string) => void;
}
declare const OTPInput: import("svelte").Component<Props, {}, "value">;
type OTPInput = ReturnType<typeof OTPInput>;
export default OTPInput;
