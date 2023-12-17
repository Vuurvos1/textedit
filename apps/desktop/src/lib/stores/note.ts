import { writable } from 'svelte/store';
import { readTextFile, type FileEntry } from '@tauri-apps/api/fs';

function createNote() {
	const { subscribe, update, set } = writable({
		path: '',
		name: '',
		content: ''
	});

	async function load(file: FileEntry) {
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
		reset: () =>
			set({
				path: '',
				name: '',
				content: ''
			})
	};
}

export const note = createNote();
