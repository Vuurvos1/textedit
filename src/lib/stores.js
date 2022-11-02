import { writable } from 'svelte/store';

export let note = writable(
	/** @type {import('$lib/note/note').Note} */
	{}
);

export let notes = writable([]);

export let tags = writable(
	/** @type {import('$lib/sidebar/tags').tags} */
	[]
);

export let tagFolders = writable(
	/** @type {import('$lib/sidebar/tags').Tags} */
	[]
);

export let noteTags = writable([]);

// TODO: make this more dry?
export const showNavigation = writable(false);
export const showNotes = writable(true);
export const showEditor = writable(false);
