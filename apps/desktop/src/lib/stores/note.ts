import { get, writable } from 'svelte/store';
import { readTextFile, writeTextFile, type FileEntry } from '@tauri-apps/api/fs';

function createNote() {
	const store = writable({
		path: '',
		name: '',
		content: ''
	});
	const { subscribe, update, set } = store;

	async function save() {
		const note = get(store);

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
	}

	return {
		subscribe,
		update,
		set,
		load,
		save,
		reset: () =>
			set({
				path: '',
				name: '',
				content: ''
			})
	};
}

export const note = createNote();
