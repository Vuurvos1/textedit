import { writable } from 'svelte/store';

export let note = writable({});
export let notes = writable([]);
