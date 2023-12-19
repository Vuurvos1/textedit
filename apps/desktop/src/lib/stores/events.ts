import { writable } from 'svelte/store';

export const closeFolders = writable(Symbol());
export const toggleFileSearch = writable(Symbol()); // quick switcher
