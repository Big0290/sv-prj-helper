interface MenuItem {
    id: string;
    label: string;
    icon: string;
    variant?: 'default' | 'danger';
    disabled?: boolean;
}
interface Props {
    open?: boolean;
    onClose?: () => void;
    onItemClick?: (itemId: string) => void;
    items?: MenuItem[];
    position?: {
        x: number;
        y: number;
    };
}
declare const MessageMenu: import("svelte").Component<Props, {}, "">;
type MessageMenu = ReturnType<typeof MessageMenu>;
export default MessageMenu;
//# sourceMappingURL=MessageMenu.svelte.d.ts.map