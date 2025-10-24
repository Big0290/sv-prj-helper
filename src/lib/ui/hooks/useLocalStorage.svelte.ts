export function useLocalStorage<T>(key: string, initialValue: T) {
	// Get initial value from localStorage or use provided initial value
	const getStoredValue = (): T => {
		if (typeof window === 'undefined') return initialValue;
		
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	};

	let storedValue = $state<T>(getStoredValue());

	// Save to localStorage whenever value changes
	$effect(() => {
		if (typeof window === 'undefined') return;
		
		try {
			window.localStorage.setItem(key, JSON.stringify(storedValue));
		} catch (error) {
			console.warn(`Error setting localStorage key "${key}":`, error);
		}
	});

	// Listen for changes from other tabs/windows
	$effect(() => {
		if (typeof window === 'undefined') return;

		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === key && e.newValue) {
				try {
					storedValue = JSON.parse(e.newValue);
				} catch (error) {
					console.warn(`Error parsing storage event for key "${key}":`, error);
				}
			}
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	});

	return {
		get value() {
			return storedValue;
		},
		set value(newValue: T) {
			storedValue = newValue;
		},
		remove: () => {
			if (typeof window !== 'undefined') {
				window.localStorage.removeItem(key);
			}
			storedValue = initialValue;
		}
	};
}
