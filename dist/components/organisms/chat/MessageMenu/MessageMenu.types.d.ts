export interface MessageMenuProps {
    open?: boolean;
    onClose?: () => void;
    onItemClick?: (itemId: string) => void;
    items?: MenuItem[];
    position?: {
        x: number;
        y: number;
    };
}
export interface MessageMenuEvents {
}
export interface MessageMenuSlots {
    default: {};
}
//# sourceMappingURL=MessageMenu.types.d.ts.map