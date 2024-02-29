import { writable } from 'svelte/store';

export type Runtime = {
	language: string;
	version: string;
	aliases: string[];
};
function createExecutionEngines() {
	const { subscribe, set, update } = writable<Runtime[]>([]);

	fetch('https://emkc.org/api/v2/piston/runtimes')
		.then((res) => res.json())
		.then((data) => set(data as Runtime[]));

	return {
		subscribe,
		set,
		update
	};
}

export const engineRuntimes = createExecutionEngines();
