export interface MessageReactionProps {
    reactions?: Reaction[];
    showPicker?: boolean;
    onReactionClick?: (emoji: string) => void;
    onReactionAdd?: (emoji: string) => void;
    size?: 'sm' | 'md' | 'lg';
}
export interface MessageReactionEvents {
}
export interface MessageReactionSlots {
    default: {};
}
//# sourceMappingURL=MessageReaction.types.d.ts.map