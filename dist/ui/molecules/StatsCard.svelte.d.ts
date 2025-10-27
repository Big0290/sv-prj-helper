import type { Snippet } from 'svelte';
interface Props {
    label: string;
    value: string | number;
    trend?: number;
    icon?: Snippet;
    variant?: 'default' | 'success' | 'warning' | 'danger';
    loading?: boolean;
}
declare const StatsCard: import("svelte").Component<Props, {}, "">;
type StatsCard = ReturnType<typeof StatsCard>;
export default StatsCard;
//# sourceMappingURL=StatsCard.svelte.d.ts.map