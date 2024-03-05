<script lang="ts">
	import File from './File.svelte';
	import DeleteDialog from './DeleteDialog.svelte';
	import { ChevronRightIcon } from 'lucide-svelte';
	import { draggable, dropzone, contextMenu, clickOutside } from '$lib/actions';
	import { renameFile, BaseDirectory, removeDir, type FileEntry } from '@tauri-apps/api/fs';
	import { fileTree, closeFolders } from '$lib/stores';
	import { tick } from 'svelte';

	import { note } from '$lib/stores';

	export let expanded = true;
	export let name: string;
	export let path: string;
	export let children: FileEntry[] = [];
	export let depth = 0;

	let editing = false;
	let editedName = name;
	let nameInput: HTMLInputElement;

	let showConfirmDialog = false;

	async function handleInput(ev: KeyboardEvent) {
		if (ev.key === 'Enter') {
			editing = false;

			const lastIndex = path.lastIndexOf(name);
			const newPath = path.slice(0, lastIndex) + editedName;

			name = editedName;
			await renameFile(path, newPath.trim());
			fileTree.reload();
		}

		if (ev.key === 'Escape') {
			editing = false;
		}
	}

	function toggle() {
		expanded = !expanded;
	}

	closeFolders.subscribe(() => {
		expanded = false;
	});

	async function moveFile(data) {
		const newPath = `${path}/${data.name}`;
		await renameFile(data.path, newPath, { dir: BaseDirectory.Document });
		expanded = true;
		fileTree.reload();
	}
</script>

<!-- TODO: make folder/file hovers always full width -->
{#if depth > 0}
	<button
		class:border-purple-500={editing}
		class:border-transparent={!editing}
		class="folder hover:bg-hover flex w-full flex-row items-center gap-2 rounded border-2 px-4 py-1 text-sm"
		use:draggable={JSON.stringify({ name, path })}
		use:dropzone={{
			dragoverClasses: ['droppable', 'bg-blue-300'],
			onDropzone: (data, ev) => {
				const d = JSON.parse(data);
				moveFile(d);
			}
		}}
		on:click={toggle}
		use:contextMenu={{
			menuItems: [
				{
					icon: 'PenLine',
					label: 'Rename',
					action: async () => {
						editing = true;
						editedName = name;
						await tick();
						nameInput.focus();
					}
				},
				{
					icon: 'Trash2',
					label: 'Delete',
					action: async () => {
						showConfirmDialog = true;
					}
				}
			]
		}}
	>
		<div class="transition" class:rotate-90={expanded}>
			<ChevronRightIcon size="16" />
		</div>

		{#if editing}
			<input
				bind:this={nameInput}
				class="w-full bg-transparent"
				bind:value={editedName}
				use:clickOutside={() => {
					editing = false;
				}}
				on:keyup|stopPropagation|preventDefault
				on:keydown|stopPropagation={handleInput}
			/>
		{:else}
			<span class="truncate">
				{name}
			</span>
		{/if}
	</button>

	{#if showConfirmDialog}
		<DeleteDialog
			bind:open={showConfirmDialog}
			path={name}
			onConfirm={async () => {
				await removeDir(path, { recursive: true });
				fileTree.reload();
				showConfirmDialog = false;

				// only reset note if it's open
				if ($note.path.startsWith(path)) {
					note.reset();
				}
			}}
		/>
	{/if}
{/if}

<div class:open={expanded || depth === 0} class="files grid">
	<ul class="overflow-y-hidden {depth > 0 && `ml-6 border-l border-gray-500/40 pl-2`}">
		{#each children as file (file.path)}
			<li>
				{#if file.children}
					<svelte:self depth={depth + 1} {...file} />
				{:else}
					<File {...file} />
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	.files {
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.075s ease-out;
	}

	.files.open {
		grid-template-rows: 1fr;
	}

	.folder:global(.droppable) {
	}

	.folder:global(.droppable) * {
		pointer-events: none;
	}
</style>
