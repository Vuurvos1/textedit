import { writable, derived, get } from 'svelte/store';
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

const filterText = (n: Note) => {
	if (get(noteFilter).text === '') return true;
	return n.content.toLowerCase().includes(get(noteFilter).text.toLowerCase());
};

const filterStatus = (n: Note) => {
	return n.status === get(noteFilter).status;
};

// TODO: refactor sort
// Add param for asc/desc that reverses the array?
// created_at, updated_at, title
const sortDateDesc = (a: Note, b: Note) => {
	return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
};

const sortDateAsc = (a: Note, b: Note) => {
	return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
};

const sortCreatedAsc = (a: Note, b: Note) => {
	return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
};

const sortCreatedDesc = (a: Note, b: Note) => {
	return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
};

const sortTitleAsc = (a: Note, b: Note) => {
	return a.title.localeCompare(b.title);
};

const sortTitleDesc = (a: Note, b: Note) => {
	return b.title.localeCompare(a.title);
};

export const filteredNotes = derived(
	[noteFilter, noteSort, notes],
	([$noteFilter, $noteSort, $notes]) => {
		// note dates are acting kinda funky, because they are saved to often?
		// sort ns by date modified
		let ns = $notes.filter(filterText).filter(filterStatus);

		// sort notes
		if ($noteSort === 'updated_at_desc') {
			ns.sort(sortDateDesc);
		} else if ($noteSort === 'updated_at_asc') {
			ns.sort(sortDateAsc);
		} else if ($noteSort === 'created_at_desc') {
			ns.sort(sortCreatedDesc);
		} else if ($noteSort === 'created_at_asc') {
			ns.sort(sortCreatedAsc);
		} else if ($noteSort === 'title_desc') {
			ns.sort(sortTitleDesc);
		} else if ($noteSort === 'title_asc') {
			ns.sort(sortTitleAsc);
		}

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
