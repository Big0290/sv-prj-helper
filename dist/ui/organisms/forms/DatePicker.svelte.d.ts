interface Props {
    value?: Date | null;
    label?: string;
    placeholder?: string;
    min?: Date;
    max?: Date;
    onChange?: (date: Date | null) => void;
}
declare const DatePicker: import("svelte").Component<Props, {}, "value">;
type DatePicker = ReturnType<typeof DatePicker>;
export default DatePicker;
//# sourceMappingURL=DatePicker.svelte.d.ts.map