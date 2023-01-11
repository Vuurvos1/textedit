import { writable, get, derived } from 'svelte/store';
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

// filtered notes could be a derived store that takes something to filter the notes on
// this is what the notelist should show?

export const tags = writable(<Tag[]>[]);
export const tagFolders = writable(<Tags>[]);
export const noteTags = writable([]);

// TODO: make this more dry?
export const showNavigation = writable(false);
export const showNotes = writable(true);
export const showEditor = writable(false);
