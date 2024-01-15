import { writable, get } from 'svelte/store';

export type Theme = 'dark' | 'light' | 'system';

function createThemeStore() {
	const store = writable<Theme>('dark');
	const { subscribe, set, update } = store;

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (ev) => {
		if (get(store) === 'system') return;
		set(ev.matches ? 'dark' : 'light');
	});

	subscribe((theme) => {
		// TODO: change to tauri options?
		if (theme === 'dark') {
			document.body.classList.remove('theme-light');
			document.body.classList.add('theme-dark');
			return;
		}
		if (theme === 'light') {
			document.body.classList.remove('theme-dark');
			document.body.classList.add('theme-light');
			return;
		}
	});

	return {
		set,
		subscribe,
		update,
		reset: () => set('dark')
	};
}

export const theme = createThemeStore();
