import { writable } from 'svelte/store';

function createNote() {
	return writable('');
}

export const note = createNote();
