import ContextMenu from '$lib/ContextMenu.svelte';

type ContextMenuOptions = {
	items: {
		label: string;
		icon?: string;
		onClick: () => void;
	}[];
};

// ContextMenuOptions
export function contextMenu(node: HTMLElement, options: any) {
	const menu = new ContextMenu({
		target: node,
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
