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
	return n.tags.filter((t) => t === get(noteFilter).tag).length > 0;
};

// Add param for asc/desc that reverses the array?
// created_at, updated_at, title
const sortDateDesc = (a: string | number | Date, b: string | number | Date) => {
	return new Date(b).getTime() - new Date(a).getTime();
};

const sortTextDesc = (a: string, b: string) => {
	return b.localeCompare(a);
};

export const filteredNotes = derived(
	[noteFilter, noteSort, notes],
	([$noteFilter, $noteSort, $notes]) => {
		// note dates are acting kinda funky, because they are saved to often?
		// sort ns by date modified
		const ns = $notes.filter(filterStatus).filter(filterTags).filter(filterText);

		// TODO: sorting by updated at still acting kinda funky, value gets updated to often?
		// TODO: maybe switch parameters instead of calling reverse?
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

// filtered notes could be a derived store that takes something to filter the notes on
// this is what the notelist should show?

export const tags = writable(<Tag[]>[]);
export const tagFolders = writable(<Tags>[]);
export const noteTags = writable([]);

// TODO: make this more dry?
export const showNavigation = writable(false);
export const showNotes = writable(true);
export const showEditor = writable(false);
