export interface CommandItem {
    id: string;
    label: string;
    description?: string;
    icon?: string;
    shortcut?: string;
    category?: string;
    action: () => void;
}
interface Props {
    commands: CommandItem[];
    isOpen?: boolean;
    placeholder?: string;
    shortcut?: string;
    onClose?: () => void;
}
declare const CommandPalette: import("svelte").Component<Props, {}, "isOpen">;
type CommandPalette = ReturnType<typeof CommandPalette>;
export default CommandPalette;
