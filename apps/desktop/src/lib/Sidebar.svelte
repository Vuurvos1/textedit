<script lang="ts">
	import Folder from '$lib/Folder.svelte';
	import { open } from '@tauri-apps/api/dialog';
	import { readDir, createDir, writeTextFile } from '@tauri-apps/api/fs';
	import {
		ArrowUpNarrowWideIcon,
		ChevronsDownUpIcon,
		FileSearchIcon,
		FolderPlusIcon,
		ImportIcon,
		PenSquareIcon,
		SettingsIcon,
		TerminalIcon
	} from 'lucide-svelte';
	import IconButton from '$lib/IconButton.svelte';
	import { closeFolders, toggleFileSearch } from './stores/events';
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

	async function createFolder() {
		// TODO: should create new folder in edit mode
		const directory = localStorage.getItem('filePath');
		const files = await readDir(directory, { recursive: false });

		// TODO: don't need a double filter with regex maybe?
		// const untitledFolders = files.filter((f) => f.children && f.name.match(/^Untitled(?: \d+)?/g));

		const existingIndices = files
			.map((folder) => {
				const match = folder.name.match(/^Untitled (\d+)$/);
				return match ? parseInt(match[1]) : null;
			})
			.filter((index) => index !== null);

		let newIndex = 1;
		while (existingIndices.includes(newIndex)) {
			newIndex++;
		}

		const folderName = `Untitled${newIndex > 0 ? ' ' + String(newIndex) : ''}`;

		console.info('Creating folder', folderName);

		await createDir(`${directory.replaceAll('\\', '/')}/${folderName}`);

		fileTree.reload();
	}

	async function createFile() {
		// TODO: should create new file in edit mode
		// TODO: fix when there are already untitled files
		const directory = localStorage.getItem('filePath');
		const files = await readDir(directory, { recursive: false });

		// TODO: maybe change to a reduce?
		const existingIndices = files
			.map((file) => {
				if (file.children) return null;
				if (!file.name.match(/^Untitled(?: \d+)?.md/g)) return null;

				const match = file.name.match(/\d+/);

				return match ? Number(match) : null;
			})
			.filter((index) => index !== null);

		// TODO: there must be a better way to do this
		// Find the smallest available index
		let newIndex = 1;
		while (existingIndices.includes(newIndex)) {
			newIndex++;
		}

		const fileName = `Untitled${newIndex > 0 ? ' ' + String(newIndex) : ''}.md`;
		const path = `${directory.replaceAll('\\', '/')}/${fileName}`;

		console.info('Creating file', path);

		await writeTextFile(path, '');

		fileTree.reload();
	}

	// TODO: when moving files, if 2 have the same name append (1) to the end of the name or more if needed
</script>

<div class="bg-bg-secondary flex h-full flex-row">
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

	<div class="flex w-full flex-col overflow-hidden py-2">
		<div class="mb-3 flex w-full flex-row justify-center gap-1 px-3">
			<IconButton name="New note" on:click={createFile}>
				<PenSquareIcon size="20" />
			</IconButton>

			<IconButton name="New folder" on:click={createFolder}>
				<FolderPlusIcon size="20" />
			</IconButton>

			<IconButton name="Change sort order">
				<!-- TODO: change icon based on search order -->
				<ArrowUpNarrowWideIcon size="20" />
			</IconButton>

			<IconButton
				name="Collapse all"
				on:click={() => {
					closeFolders.update((f) => Symbol());
				}}
			>
				<!-- TODO: change to open all folders if all are closed -->
				<!-- <ChevronsUpDownIcon size="20" /> -->
				<ChevronsDownUpIcon size="20" />
			</IconButton>
		</div>

		<div
			class="scrollbar-stable scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-transparent max-h-full min-h-full w-full overflow-y-auto overflow-x-hidden pl-2"
		>
			<!-- notes -->
			<Folder name="Home" path="" children={$fileTree} expanded />
		</div>
	</div>
</div>

<style>
</style>
