import { get } from 'svelte/store';
import { note, noteDirty } from './stores';

/**
 * @param {function} func
 * @param {number} delay
 */
export function debounce(func: Function, delay = 250) {
	let timeout: NodeJS.Timeout;

	return (...args: any) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
		}, delay);
	};
}

export async function saveNote() {
	// only save if note is dirty
	if (!get(noteDirty)) return;

	// TODO: add error handling
	// TODO: add loading state
	// TODO: add note as a param?
	// TODO: move this into the note store component?

	console.log('saving note...');
	const n = get(note);

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
		noteDirty.set(false);
		return;
	}
}
