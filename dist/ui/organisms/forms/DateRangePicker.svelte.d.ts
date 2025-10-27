interface Props {
    start?: Date | null;
    end?: Date | null;
    label?: string;
    onRange?: (start: Date | null, end: Date | null) => void;
}
declare const DateRangePicker: import("svelte").Component<Props, {}, "start" | "end">;
type DateRangePicker = ReturnType<typeof DateRangePicker>;
export default DateRangePicker;
//# sourceMappingURL=DateRangePicker.svelte.d.ts.map