export function useDialog() {
    let isOpen = $state(false);
    return {
        get isOpen() {
            return isOpen;
        },
        open: () => {
            isOpen = true;
        },
        close: () => {
            isOpen = false;
        },
        toggle: () => {
            isOpen = !isOpen;
        }
    };
}
