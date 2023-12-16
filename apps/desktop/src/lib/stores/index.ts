import { writable } from 'svelte/store';

export * from '$lib/stores/events'
export * from '$lib/stores/files'

export const note = writable('');
