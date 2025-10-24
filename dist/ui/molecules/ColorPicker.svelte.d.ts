interface Props {
    value?: string;
    label?: string;
    onChange?: (color: string) => void;
}
declare const ColorPicker: import("svelte").Component<Props, {}, "value">;
type ColorPicker = ReturnType<typeof ColorPicker>;
export default ColorPicker;
