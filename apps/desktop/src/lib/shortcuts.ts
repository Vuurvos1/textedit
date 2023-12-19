import { toggleFileSearch } from '$lib/stores';
import { commandPalleteOpen, searchNoteOpen } from '$lib/stores/state';
import { get } from 'svelte/store';

export type KeyboardShortcut = {
	name: string;
	keys: string[];
	meta?: boolean;
	shift?: boolean;
	description: string;
	action: () => void;
};

export const shortcuts: KeyboardShortcut[] = [
	{
		name: 'File search',
		keys: ['o'],
		meta: true,
		description: 'Open file search',
		action: () => {
			toggleFileSearch.set(Symbol());
			searchNoteOpen.set(!get(searchNoteOpen));
			console.log('Open file search');
		}
	},
	{
		name: 'Command palette',
		keys: ['k'],
		meta: true,
		description: 'Open command palette',
		action: () => {
			commandPalleteOpen.set(!get(commandPalleteOpen));
			console.log('Open command palette');
		}
	},
	{
		name: 'Cancel',
		keys: ['Escape'],
		meta: false,
		description: 'Cancel current action',
		action: () => {
			console.log('Cancel action');

			// close all modals
			commandPalleteOpen.set(false);
			searchNoteOpen.set(false);
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
