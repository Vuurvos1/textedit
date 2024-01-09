import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	//
	// 1. prevent vite from obscuring rust errors
	clearScreen: false,
	// 2. tauri expects a fixed port, fail if that port is not available
	server: {
		strictPort: true
	},
	// 3. to make use of `TAURI_DEBUG` and other env variables
	// https://tauri.app/v1/api/config#buildconfig.beforedevcommand
	envPrefix: ['VITE_', 'TAURI_']
});
