import type { User } from '@supabase/supabase-js';
import type { Note, NoteStatus } from './note/note';
import type { Tag, Tags } from './sidebar/tags';

import { writable, derived, get } from 'svelte/store';
import { supabaseClient } from './db';

export const user = writable<User | {}>({}); // TODO: change to be read only?
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
	status: 'public' as NoteStatus | 'untagged' // TODO change/remove notes status
});
export const noteSort = writable('updated_at_desc');

const filterText = (n: Note) => {
	if (get(noteFilter).text === '') return true;
	return n.content.toLowerCase().includes(get(noteFilter).text.toLowerCase());
};

const filterStatus = (n: Note) => {
	return n.status === get(noteFilter).status;
};

const filterTags = (n: Note) => {
	if (get(noteFilter).tag === '') return true;
	return n.tags.filter((t) => t.name === get(noteFilter).tag).length > 0;
};

// Add param for asc/desc that reverses the array?
// created_at, updated_at, title
const sortDateDesc = (a: string | number | Date, b: string | number | Date) => {
	return new Date(b).getTime() - new Date(a).getTime();
};

const sortTextDesc = (a: string, b: string) => {
	return b.localeCompare(a);
};

// this functions seems to be called a lot on the server?
export const filteredNotes = derived(
	[noteFilter, noteSort, notes],
	([$noteFilter, $noteSort, $notes]) => {
		let ns: Note[] = [];

		if ($noteFilter.status === 'untagged') {
			ns = $notes.filter((n) => n.tags.length === 0).filter(filterText);
		} else {
			ns = $notes.filter(filterStatus).filter(filterTags).filter(filterText);
		}

		// sort notes
		if ($noteSort === 'updated_at_desc') {
			ns.sort((a, b) => sortDateDesc(a.updated_at, b.updated_at));
		} else if ($noteSort === 'updated_at_asc') {
			ns.sort((a, b) => sortDateDesc(a.updated_at, b.updated_at)).reverse();
		} else if ($noteSort === 'created_at_desc') {
			ns.sort((a, b) => sortDateDesc(a.created_at, b.created_at));
		} else if ($noteSort === 'created_at_asc') {
			ns.sort((a, b) => sortDateDesc(a.created_at, b.created_at)).reverse();
		} else if ($noteSort === 'title_desc') {
			ns.sort((a, b) => sortTextDesc(a.title, b.title));
		} else if ($noteSort === 'title_asc') {
			ns.sort((a, b) => sortTextDesc(a.title, b.title)).reverse();
		}

		return ns;
	}
);

export const tags = writable(<Tag[]>[]);
export const tagFolders = writable(<Tags>[]);
export const noteTags = writable([]);

/** which part of the app to show on mobile, maybe change to an enum? */
export const showWindow = writable(<'navigation' | 'notes' | 'editor'>'notes');
