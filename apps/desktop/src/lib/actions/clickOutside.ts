import type { Pointer } from 'lucide-svelte';
import type { Action } from 'svelte/action';

export const clickOutside: Action<HTMLElement, (ev: Pointer) => void> = (node, handler) => {
	const handleClick = (event) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			// node.dispatchEvent(new CustomEvent('click_outside', node));
			handler(event);
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
