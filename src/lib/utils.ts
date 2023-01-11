import { get } from 'svelte/store';
import type { Note } from './note/note';
import { note } from './stores';

/**
 * @param {function} func
 * @param {number} delay
 */
export function debounce(func, delay = 250) {
	/** @type {setTimeout | any} */
	let timeout;

	/** @param {any} args */
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
		}, delay);
	};
}

export async function saveNote() {
	// TODO: add error handling
	// TODO: add loading state
	// add note param?

	console.log('saving note...');
	const n = <Note>get(note);

	const res = await fetch('/api/note', {
		method: 'PATCH',
		body: JSON.stringify({
			note_id: n.id,
			title: n.title,
			content: n.content
		}),
		headers: {
			'content-type': 'application/json'
		}
	});

	if (res.ok) {
		console.log('saving ok');
		return;
	}
}
