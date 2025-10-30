export function useMediaQuery(query: string) {
	let matches = $state(false);

	$effect(() => {
		if (typeof window === 'undefined') return;

		const mediaQuery = window.matchMedia(query);
		matches = mediaQuery.matches;

		const handler = (event: MediaQueryListEvent) => {
			matches = event.matches;
		};

		mediaQuery.addEventListener('change', handler);

		return () => {
			mediaQuery.removeEventListener('change', handler);
		};
	});

	return {
		get matches() {
			return matches;
		}
	};
}
