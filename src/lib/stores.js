import { writable } from 'svelte/store';
import { supabaseClient } from './db';

// TODO: change to be read only?
export let user = writable({});

supabaseClient.auth.onAuthStateChange((event, session) => {
	user.set(session?.user || {});
});

export let note = writable({
	title: 'Note',
	id: '',
	content: 'Start writing…' // rename to content
});

export let notes = writable([]);

export let tags = writable(
	/** @type {import('$lib/sidebar/tags').tags} */
	[]
);

export let tagFolders = writable(
	/** @type {import('$lib/sidebar/tags').Tags} */
	[]
);

export let noteTags = writable([]);

// TODO: make this more dry?
export const showNavigation = writable(false);
export const showNotes = writable(true);
export const showEditor = writable(false);
