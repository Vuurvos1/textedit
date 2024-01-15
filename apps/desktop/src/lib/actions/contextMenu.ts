import ContextMenu from '$lib/ContextMenu.svelte';

import { icons } from 'lucide';

// | { type: 'divider' }
export type MenuItem = {
	type?: 'item' | 'divider';
	label?: string;
	icon?: keyof typeof icons;
	action?: () => void;
	items?: MenuItem[];
};

// ContextMenuOptions
export function contextMenu(
	node: HTMLElement,
	options: {
		target?: HTMLElement;
		menuItems: MenuItem[];
	}
) {
	if (!options.menuItems || options?.menuItems?.length === 0) return;

	const menu = new ContextMenu({
		target: options.target ?? node,
		props: {
			...options,
			target: node
		}
	});

	return {
		destroy() {
			menu.$destroy();
		}
	};
}
