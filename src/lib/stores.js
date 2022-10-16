import { writable } from 'svelte/store';

// /** @type {import('$lib/note/note').Note} */
export let note = writable({});

export let notes = writable([]);

export let tags = writable([]);

// TODO: make this more dry?
export const showNavigation = writable(false);
export const showNotes = writable(true);
export const showEditor = writable(false);
