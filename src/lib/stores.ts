import { writable, derived } from 'svelte/store';
import { supabaseClient } from './db';

import type { Note, NoteStatus } from './note/note';
import type { Tag, Tags } from './sidebar/tags';
// TODO: change to be read only?
export const user = writable({});

supabaseClient.auth.onAuthStateChange((event, session) => {
	user.set(session?.user || {});
});

export const updateNote = writable(0);

export const notes = writable(<Note[]>[]);

export const noteDirty = writable(false);

// TODO add saving status
export const note = writable(<Note>{
	id: '',
	created_at: '', // date string
	updated_at: '', // date string
	title: 'Note',
	content: '', // actual note
	data: {}, // TODO figure out how to implement
	status: 'public' as NoteStatus, // TODO change/remove notes status
	tags: [] // TODO figure out how this works
});

// TODO: rename to plural
export const noteFilter = writable({
	text: '',
	tag: '',
	status: 'public' as NoteStatus // TODO change/remove notes status
});
export const noteSort = writable('updated_at');

export const filteredNotes = derived(
	[noteFilter, noteSort, notes],
	([$noteFilter, $noteSort, $notes]) => {
		// note dates are acting kinda funky, because they are saved to often?
		// sort ns by date modified
		let ns = $notes;

		ns = ns.filter((n) => {
			if ($noteFilter.text === '') return true;
			return n.content.toLowerCase().includes($noteFilter.text.toLowerCase());
		});

		ns = ns.filter((n) => {
			return n.status === $noteFilter.status;
		});

		// sort notes by date, newest first (descending)
		ns.sort((a, b) => {
			return b.updated_at.localeCompare(b.updated_at);
		});

		return ns;
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
