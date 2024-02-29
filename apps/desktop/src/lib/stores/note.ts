import { get, writable } from 'svelte/store';
import { readTextFile, writeTextFile, type FileEntry } from '@tauri-apps/api/fs';

// TODO, change to readable only store?
export const noteChange = writable(Symbol());

function createNote() {
	const store = writable({
		path: '',
		name: '',
		content: ''
	});
	const { subscribe, update, set } = store;

	async function save() {
		const note = get(store);
		console.info('Saving note...', note);

		if (!note.path || !note.content) return;

		writeTextFile(note.path, note.content);
	}

	async function load(file: FileEntry) {
		await save();

		const fileContents = await readTextFile(file.path);

		set({
			path: file.path,
			name: file.name,
			content: fileContents
		});

		noteChange.set(Symbol());
	}

	async function updateContent(content: string) {
		update((note) => ({ ...note, content }));
	}

	return {
		subscribe,
		update,
		set,
		load,
		save,
		updateContent,
		reset: () =>
			set({
				path: '',
				name: '',
				content: ''
			})
	};
}

export const note = createNote();

// TODO: keep track of last opened note and try to open on startup, else grab first note in list?
