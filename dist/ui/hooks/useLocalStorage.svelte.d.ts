export declare function useLocalStorage<T>(key: string, initialValue: T): {
    value: T;
    remove: () => void;
};
