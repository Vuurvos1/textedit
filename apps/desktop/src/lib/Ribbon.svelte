<script lang="ts">
	import { open } from '@tauri-apps/api/dialog';
	import { FileSearchIcon, ImportIcon, SettingsIcon, TerminalIcon } from 'lucide-svelte';
	import IconButton from '$lib/IconButton.svelte';
	import { toggleFileSearch } from './stores/events';
	import { fileTree } from '$lib/stores';
	import { settingsModalOpen, searchNoteOpen, commandPalleteOpen } from '$lib/stores';

	let loading = false;

	// TODO: move file tree stuff to a store
	async function openFolder(directory?: string) {
		loading = true;

		if (!directory) {
			const openRes = await open({ directory: true, multiple: false });
			directory = Array.isArray(openRes) ? openRes[0] : openRes;
		}

		fileTree.load(directory);

		loading = false;
	}
</script>

<div class="border-border-divider flex flex-col gap-1 border-r px-2 py-3">
	<IconButton
		name="Search"
		on:click={() => {
			$toggleFileSearch = Symbol();
			$searchNoteOpen = true;
		}}
	>
		<FileSearchIcon size="20" />
	</IconButton>

	<IconButton
		name="Command pallete"
		on:click={() => {
			$commandPalleteOpen = true;
		}}
	>
		<TerminalIcon size="20" />
	</IconButton>

	<div class="mt-auto"></div>

	<IconButton on:click={() => openFolder()} name="Open vault">
		<ImportIcon size="20" />
	</IconButton>

	<IconButton
		name="Settings"
		on:click={() => {
			$settingsModalOpen = true;
		}}
	>
		<SettingsIcon size="20" />
	</IconButton>
</div>
