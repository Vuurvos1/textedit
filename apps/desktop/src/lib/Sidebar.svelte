<script lang="ts">
	import Folder from '$lib/Folder.svelte';
	import { open } from '@tauri-apps/api/dialog';
	import {
		readDir,
		createDir,
		writeTextFile,
		BaseDirectory,
		type FileEntry
	} from '@tauri-apps/api/fs';
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
	import { onMount } from 'svelte';
	import IconButton from '$lib/IconButton.svelte';
	import { closeFolders } from './stores/events';

	let loading = false;
	let fileTree: FileEntry[] = []; // TODO: keep this in sync with the file system
	let filePath = '';

	// TODO: move file tree stuff to a store
	async function openFolder(directory?: string) {
		loading = true;

		if (!directory) {
			const openRes = await open({ directory: true, multiple: false });
			directory = Array.isArray(openRes) ? openRes[0] : openRes;
		}

		localStorage.setItem('filePath', directory);

		const files = (await readDir(directory, { recursive: true })).sort(
			(a, b) => (a.children ? -1 : b.children ? 1 : a.name.localeCompare(b.name)) // TODO: is localeCompare a good idea??
		);
		fileTree = files;

		loading = false;
	}

	async function createFolder() {
		// TODO: should create new folder in edit mode
		console.log('creating folder', BaseDirectory.Document);
		await createDir('TextEdit/test', {
			dir: BaseDirectory.Document
		});
	}

	async function createFile() {
		// TODO: should create new file in edit mode
		// TODO: default name of
		console.log('writing file', BaseDirectory.Document);
		await writeTextFile('TextEdit/test.md', 'Hello world!', {
			dir: BaseDirectory.Document
		});
	}

	// TODO: when moving files, if 2 have the same name append (1) to the end of the name or more if needed

	onMount(() => {
		const path = localStorage.getItem('filePath');
		if (path) {
			filePath = path;
		}

		if (filePath) {
			openFolder(filePath);
		}
	});
</script>

<div class="flex h-full flex-row">
	<div class="flex flex-col gap-1 border-r px-2 py-3">
		<IconButton name="Search">
			<FileSearchIcon size="20" />
		</IconButton>

		<IconButton name="Command pallete">
			<TerminalIcon size="20" />
		</IconButton>

		<div class="mt-auto"></div>

		<IconButton on:click={() => openFolder()} name="Open vault">
			<ImportIcon size="20" />
		</IconButton>

		<button class="rounded px-1 py-1 hover:bg-gray-200">
			<span class="sr-only">Settings</span>
			<SettingsIcon size="20" />
		</button>
	</div>

	<div class="flex flex-col overflow-hidden border-r py-2">
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

		<div class="scrollbar-stable w-80 overflow-y-auto overflow-x-hidden">
			<!-- notes -->
			<Folder name="Home" files={fileTree} expanded />
		</div>
	</div>
</div>

<style>
</style>
