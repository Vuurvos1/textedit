import { writable, derived } from 'svelte/store';
import { supabaseClient } from './db';

import type { Note } from './note/note';
import type { Tag, Tags } from './sidebar/tags';
// TODO: change to be read only?
export const user = writable({});

supabaseClient.auth.onAuthStateChange((event, session) => {
	user.set(session?.user || {});
});

export const updateNote = writable(0);

export const notes = writable(<Note[]>[]);

// TODO add saving status
function createNote() {
	const { subscribe, set, update } = writable(<Note>{
		id: '',
		created_at: '', // date string
		updated_at: '', // date string
		title: 'Note',
		content: '', // actual note
		data: {}, // TODO figure out how to implement
		status: 'notes', // TODO change/remove notes status
		tags: [] // TODO figure out how this works
	});

	return {
		subscribe,
		set,
		update
	};
}

export const note = createNote();

export const noteFilter = writable('');
export const noteSort = writable('updated_at');

export const filteredNotes = derived(
	[noteFilter, noteSort, notes],
	([$noteFilter, $noteSort, $notes]) => {
		// note dates are acting kinda funky
		// sort ns by date modified
		// ns.sort((a, b) => {
		// 	return a.updated_at.localeCompare(b.updated_at);
		// 	// return b.updated_at.localeCompare(a.updated_at);
		// });

		return $notes.filter((n) => {
			if ($noteFilter === '') return true;
			return n.content.toLowerCase().includes($noteFilter.toLowerCase());
		});
	}
);

// filtered notes could be a derived store that takes something to filter the notes on
// this is what the notelist should show?

export const tags = writable(<Tag[]>[]);
export const tagFolders = writable(<Tags>[]);
export const noteTags = writable([]);

// TODO: make this more dry?
export const showNavigation = writable(false);
export const showNotes = writable(true);
export const showEditor = writable(false);
