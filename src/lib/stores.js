import { writable } from 'svelte/store';

export let note = writable({});
export let notes = writable([]);

export let tags = writable([]);
