import { writable, get, derived } from 'svelte/store';
import { supabaseClient } from './db';

import type { Note } from './note/note';
import type { Tag, Tags } from './sidebar/tags';
// TODO: change to be read only?
export let user = writable({});

supabaseClient.auth.onAuthStateChange((event, session) => {
	user.set(session?.user || {});
});

// function createNotes() {
// 	const { subscribe, set, update } = writable(<Note[]>[]);

// 	return {
// 		subscribe,
// 		set,
// 		update
// 	};
// }

export const updateNote = writable(0);

export const notes = writable(<Note[]>[]);

// add thingie to update the note when the note id changes, when the note id changes, update the note
// could remove the need of updateNote
// also add saving status
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
		setNote: (note: Note) => {
			update((n) => note);
		},
		update
	};
}

export const note = createNote();

// export const note = writable(<Note>{
// 	id: '',
// 	created_at: '', // date string
// 	updated_at: '', // date string
// 	title: 'Note',
// 	content: '', // actual note
// 	data: {}, // TODO figure out how to implement
// 	status: 'notes', // TODO change/remove notes status
// 	tags: [] // TODO figure out how this works
// });

// filtered notes could be a derived store that takes something to filter the notes on
// this is what the notelist should show?

// function createNote() {
// 	const store = writable(<Note>{
// 		id: '',
// 		created_at: '', // date string
// 		updated_at: '', // date string
// 		title: 'Note',
// 		content: '', // actual note
// 		data: {}, // TODO figure out how to implement
// 		status: 'notes', // TODO change/remove notes status
// 		tags: [] // TODO figure out how this works
// 	});

// 	// get: store.get,
// 	// const { subscribe, set, update } = writable(<Note>{});

// 	return {
// 		subscribe: store.subscribe,
// 		set: store.set,
// 		update: store.update,
// 		save: async () => {
// 			console.log('saving note...');
// 			const n = get(store);

// 			const res = await fetch('/api/note', {
// 				method: 'PATCH',
// 				body: JSON.stringify({
// 					note_id: n.id,
// 					title: n.title,
// 					content: n.content
// 				}),
// 				headers: {
// 					'content-type': 'application/json'
// 				}
// 			});

// 			if (res.ok) {
// 				console.log('saving ok');
// 				return;
// 			}
// 		}
// 	};
// }

// export const note = createNote();

// TODO: move this into the note store component?
// TODO: before you change notes in the sidebar the note should also be saved

// /** @type {import('$lib/sidebar/tags').tags} */
export let tags = writable(<Tag[]>[]);

// /** @type {import('$lib/sidebar/tags').Tags} */
export let tagFolders = writable(<Tags>[]);

export let noteTags = writable([]);

// TODO: make this more dry?
export const showNavigation = writable(false);
export const showNotes = writable(true);
export const showEditor = writable(false);
