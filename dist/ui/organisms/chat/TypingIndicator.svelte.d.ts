interface Props {
    userName?: string;
    avatar?: string;
    showAvatar?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'bubble' | 'inline';
}
declare const TypingIndicator: import("svelte").Component<Props, {}, "">;
type TypingIndicator = ReturnType<typeof TypingIndicator>;
export default TypingIndicator;
