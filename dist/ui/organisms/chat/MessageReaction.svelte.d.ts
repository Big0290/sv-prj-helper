export interface Reaction {
    emoji: string;
    count: number;
    userReacted: boolean;
    users?: string[];
}
interface Props {
    reactions?: Reaction[];
    showPicker?: boolean;
    onReactionClick?: (emoji: string) => void;
    onReactionAdd?: (emoji: string) => void;
    size?: 'sm' | 'md' | 'lg';
}
declare const MessageReaction: import("svelte").Component<Props, {}, "">;
type MessageReaction = ReturnType<typeof MessageReaction>;
export default MessageReaction;
//# sourceMappingURL=MessageReaction.svelte.d.ts.map