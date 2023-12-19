import { toggleFileSearch } from '$lib/stores';

export type KeyboardShortcut = {
	name: string;
	keys: string[];
	meta?: boolean;
	description: string;
	action: () => void;
};

export const shortcuts: KeyboardShortcut[] = [
	{
		name: 'Open file search',
		keys: ['o'],
		meta: true,
		description: 'Open file search',
		action: () => {
			toggleFileSearch.set(Symbol());
			console.log('Open file search');
		}
	}
];

export function handleKeyboardShortcuts(event: KeyboardEvent) {
	if (!navigator) return;

	const shortcut = shortcuts.find((shortcut) => {
		if (shortcut.meta) {
			if (!(event.ctrlKey || event.metaKey)) return false;
		}

		// return shortcut.keys.every((key) => event.getModifierState(key));
		return shortcut.keys.every((key) => key === event.key);
	});

	if (shortcut) {
		event.preventDefault();
		shortcut.action();
	}
}
