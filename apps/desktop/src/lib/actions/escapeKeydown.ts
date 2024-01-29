import type { Action } from 'svelte/action';

export const escapeKeydown: Action<HTMLElement, (ev: KeyboardEvent) => void> = (node, handler) => {
	const handleKeydown = (event: KeyboardEvent) => {
		if (event && event.key === 'Escape') {
			event.preventDefault();

			handler(event);
		}
	};

	document.addEventListener('keydown', handleKeydown);

	return {
		destroy() {
			document.removeEventListener('keydown', handleKeydown);
		}
	};
};
